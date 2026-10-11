import type { Doc } from "prettier";
import { builders } from "prettier/doc";
import { SyntaxType, type NamedNode } from "../node-types.ts";
import {
  printBlock,
  printDanglingComments,
  printValue,
  type NamedNodePath,
  type NamedNodePrinters,
  type PrintFunction
} from "./helpers.ts";

const { group, hardline, indent, join, line } = builders;

export default {
  program(path, print, options) {
    if (!path.node.namedChildren.length) {
      return [printDanglingComments(path), hardline];
    }

    const parts: Doc[] = [];

    if (path.node.namedChildren[0].type !== SyntaxType.ImportDeclaration) {
      parts.push(path.call(print, "namedChildren", 0));
    }

    const moduleImports: ImportEntry[] = [];
    const imports: ImportEntry[] = [];
    const otherDeclarations: Doc[] = [];

    path.each(child => {
      const doc = print(child);

      if (child.node.type === SyntaxType.ImportDeclaration) {
        const names = extractNames(
          child.node.namedChildren[0] as NamedNode<
            SyntaxType.Identifier | SyntaxType.ScopedIdentifier
          >
        );
        if (
          child.node.namedChildren.some(
            ({ type }) => type === SyntaxType.Asterisk
          )
        ) {
          names.push("*");
        }
        const modifier = child.node.children[1].type;
        (modifier === "module" ? moduleImports : imports).push({
          doc,
          names,
          isStatic: modifier === "static"
        });
      } else if (!child.isFirst) {
        otherDeclarations.push(doc);
      }
    }, "namedChildren");

    parts.push(
      ...[
        moduleImports.sort(compareFqn),
        ...groupImports(imports, options.importOrder as string)
      ]
        .filter(group => group.length)
        .map(group =>
          join(
            hardline,
            group.map(({ doc }) => doc)
          )
        ),
      ...otherDeclarations
    );

    return [...join([hardline, hardline], parts), hardline];
  },

  package_declaration(path, print) {
    const annotations: Doc[] = [];
    const identifier: Doc[] = [];
    path.each(child => {
      switch (child.node.type) {
        case SyntaxType.Annotation:
        case SyntaxType.MarkerAnnotation:
          annotations.push(print(child));
          break;
        case SyntaxType.Identifier:
        case SyntaxType.ScopedIdentifier:
          identifier.push(print(child));
          break;
      }
    }, "namedChildren");
    return join(hardline, [...annotations, ["package ", ...identifier, ";"]]);
  },

  import_declaration(path, print) {
    const declaration: Doc[] = ["import "];

    const modifier = path.node.children[1].type;
    if (modifier === "module" || modifier === "static") {
      declaration.push(modifier, " ");
    }

    const identifierIndex = path.node.namedChildren.findIndex(
      ({ type }) =>
        type === SyntaxType.Identifier || type === SyntaxType.ScopedIdentifier
    );
    declaration.push(path.call(print, "namedChildren", identifierIndex));

    if (
      path.node.namedChildren.some(({ type }) => type === SyntaxType.Asterisk)
    ) {
      declaration.push(".*");
    }
    declaration.push(";");

    return declaration;
  },

  module_declaration(path, print) {
    const parts: Doc[] = [];

    path.each(child => {
      if (
        child.node.type === SyntaxType.Annotation ||
        child.node.type === SyntaxType.MarkerAnnotation
      ) {
        parts.push(print(child));
      }
    }, "namedChildren");

    if (path.node.children.some(({ type }) => type === "open")) {
      parts.push("open");
    }

    parts.push(
      "module",
      path.call(print, "nameNode"),
      path.call(print, "bodyNode")
    );

    return join(" ", parts);
  },

  module_body(path, print, options) {
    return printBlock(
      path,
      path.map(
        child =>
          child.previous && child.node.start.row > child.previous.end.row + 1
            ? [hardline, print(child)]
            : print(child),
        "namedChildren"
      ),
      options
    );
  },

  requires_module_directive(path, print) {
    const parts: Doc[] = ["requires"];

    path.each(child => {
      if (child.node.type === SyntaxType.RequiresModifier) {
        parts.push(print(child));
      }
    }, "namedChildren");

    parts.push(path.call(print, "moduleNode"));

    return [...join(" ", parts), ";"];
  },

  exports_module_directive: printToModuleNamesDirective,
  opens_module_directive: printToModuleNamesDirective,

  uses_module_directive(path, print) {
    return ["uses ", path.call(print, "typeNode"), ";"];
  },

  provides_module_directive(path, print) {
    const [provided, ...providers] = path.map(print, "namedChildren");
    return [
      "provides ",
      provided,
      group(
        indent([
          line,
          group(indent(["with", line, ...join([",", line], providers)]))
        ])
      ),
      ";"
    ];
  },

  requires_modifier: printValue
} satisfies Partial<NamedNodePrinters>;

function extractNames(
  node: NamedNode<SyntaxType.Identifier | SyntaxType.ScopedIdentifier>
): string[] {
  return node.type === SyntaxType.Identifier
    ? [node.value]
    : [...extractNames(node.scopeNode), node.nameNode.value];
}

type ImportEntry = { doc: Doc; names: string[]; isStatic: boolean };

const STATIC_PREFIX = "static ";
const CATCH_ALL_PREFIX = "";

function groupImports(imports: ImportEntry[], importOrder: string) {
  if (!importOrder) {
    return [
      imports.filter(({ isStatic }) => isStatic),
      imports.filter(({ isStatic }) => !isStatic)
    ]
      .filter(group => group.length)
      .map(group => group.sort(compareFqn));
  }

  const groups = parseImportOrder(importOrder);
  const prefixes = groups.flat();
  const importsByPrefix = new Map<
    string,
    { key: string; entry: ImportEntry }[]
  >();
  for (const entry of imports) {
    const key = importKey(entry);
    const prefix = prefixes
      .filter(candidate => key.startsWith(candidate))
      .reduce((best, candidate) =>
        candidate.length > best.length ? candidate : best
      );
    importsByPrefix.set(prefix, [
      ...(importsByPrefix.get(prefix) ?? []),
      { key, entry }
    ]);
  }

  return groups
    .map(group =>
      group.flatMap(prefix =>
        (importsByPrefix.get(prefix) ?? [])
          .sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
          .map(({ entry }) => entry)
      )
    )
    .filter(group => group.length);
}

/**
 * Parses an import order in Spotless's format: groups separated by `,` are
 * printed with blank lines between them, prefixes joined by `|` share a group,
 * `#` marks a static prefix, and an empty prefix catches everything else.
 * Each import belongs to its longest matching prefix.
 */
function parseImportOrder(importOrder: string) {
  const knownPrefixes = new Set<string>();
  const groups = importOrder.split(",").map(group =>
    group
      .split("|")
      .map(prefix =>
        prefix.startsWith("#") ? STATIC_PREFIX + prefix.slice(1) : prefix
      )
      .filter(prefix => {
        if (knownPrefixes.has(prefix)) {
          return false;
        }
        knownPrefixes.add(prefix);
        return true;
      })
  );

  if (!knownPrefixes.has(STATIC_PREFIX)) {
    const lastStaticGroupIndex = groups.findLastIndex(group =>
      group.some(prefix => prefix.startsWith(STATIC_PREFIX))
    );
    groups.splice(Math.max(lastStaticGroupIndex, 0), 0, [STATIC_PREFIX]);
  }
  if (!knownPrefixes.has(CATCH_ALL_PREFIX)) {
    groups.push([CATCH_ALL_PREFIX]);
  }
  return groups;
}

function importKey({ names, isStatic }: ImportEntry) {
  return (isStatic ? STATIC_PREFIX : "") + names.join(".");
}

function compareFqn(
  { names: a }: { names: string[] },
  { names: b }: { names: string[] }
) {
  const minParts = Math.min(a.length, b.length);
  for (let i = 0; i < minParts; i++) {
    const imageA = a[i];
    const imageB = b[i];
    if (imageA < imageB) {
      return -1;
    } else if (imageA > imageB) {
      return 1;
    }
  }

  return a.length - b.length;
}

function printToModuleNamesDirective(
  path: NamedNodePath<
    SyntaxType.ExportsModuleDirective | SyntaxType.OpensModuleDirective
  >,
  print: PrintFunction
) {
  const prefix =
    path.node.type === SyntaxType.ExportsModuleDirective ? "exports" : "opens";
  const directive = [prefix, " ", path.call(print, "packageNode")];
  if (path.node.modulesNodes.length) {
    const moduleNames = join([",", line], path.map(print, "modulesNodes"));
    directive.push(
      group(indent([line, group(indent(["to", line, ...moduleNames]))]))
    );
  }
  directive.push(";");
  return directive;
}
