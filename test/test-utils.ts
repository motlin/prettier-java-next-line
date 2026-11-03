import { expect } from "chai";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prettier from "prettier";
import plugin from "../dist/index.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function testSampleWithOptions({
  testFolder,
  exclusive
}: {
  testFolder: string;
  exclusive?: boolean;
}) {
  const itOrItOnly = exclusive ? it.only : it;
  const inputPath = path.resolve(testFolder, "_input.java");
  const expectedPath = path.resolve(testFolder, "_output.java");
  const relativeInputPath = path.relative(__dirname, inputPath);

  let inputContents: string;
  let expectedContents: string;

  const prettierrcPath = path.resolve(testFolder, ".prettierrc.json");
  const prettierOptions = existsSync(prettierrcPath)
    ? JSON.parse(readFileSync(prettierrcPath, "utf-8"))
    : {};

  before(() => {
    inputContents = readFileSync(inputPath, "utf8");
    expectedContents = readFileSync(expectedPath, "utf8");
  });

  itOrItOnly(`can format <${relativeInputPath}>`, async () => {
    const actual = await formatJavaSnippet({
      snippet: inputContents,
      prettierOptions
    });

    expect(actual).to.equal(expectedContents);
  });

  it(`Performs a stable formatting for <${relativeInputPath}>`, async () => {
    const firstPass = await formatJavaSnippet({
      snippet: inputContents,
      prettierOptions
    });

    const secondPass = await formatJavaSnippet({
      snippet: firstPass,
      prettierOptions
    });
    expect(secondPass).to.equal(firstPass);
  });
}

export function testSample(testFolder: string, exclusive?: boolean) {
  testSampleWithOptions({ testFolder, exclusive });
}

export function testRepositorySample(
  testFolder: string,
  command: string,
  args: string[],
  unwrittenPaths: string[] = []
) {
  (["same-line", "next-line"] as const).forEach(braceStyle =>
    testRepositorySampleWithBraceStyle(
      testFolder,
      command,
      args,
      unwrittenPaths,
      braceStyle
    )
  );
}

function testRepositorySampleWithBraceStyle(
  testFolder: string,
  command: string,
  args: string[],
  unwrittenPaths: string[],
  braceStyle: "same-line" | "next-line"
) {
  describe(`Prettify the repository <${testFolder}> with braceStyle ${braceStyle}`, function () {
    this.timeout(0);

    const testsamples = path.resolve(__dirname, "../test-samples");
    const samplesDir = path.resolve(
      testsamples,
      `${path.basename(testFolder)}-${braceStyle}`
    );
    const prettierOptions = { braceStyle };

    if (existsSync(samplesDir)) {
      rmSync(samplesDir, { recursive: true });
    }
    cpSync(testFolder, samplesDir, { recursive: true });

    readdirSync(samplesDir, { encoding: "utf-8", recursive: true })
      .filter(filePath => filePath.endsWith(".java"))
      .forEach(filePath => {
        it(`Performs a stable formatting for <${filePath}>`, async () => {
          const javaFilePath = path.join(samplesDir, filePath);
          const javaFileText = readFileSync(javaFilePath, "utf8");

          const firstPass = await formatJavaSnippet({
            snippet: javaFileText,
            prettierOptions
          });
          const secondPass = await formatJavaSnippet({
            snippet: firstPass,
            prettierOptions
          });
          expect(secondPass).to.equal(firstPass);
          if (!unwrittenPaths.some(prefix => filePath.startsWith(prefix))) {
            writeFileSync(javaFilePath, firstPass);
          }
        });
      });

    it(`verify semantic validity ${testFolder} with braceStyle ${braceStyle}`, function () {
      const code = spawnSync(command, args, {
        cwd: samplesDir,
        maxBuffer: Infinity
      });
      if (code.status !== 0) {
        console.log("error", code.error);
        console.log("stderr", code.stderr);
        (code.output ?? []).forEach(out => console.log("output", out));

        expect.fail(
          `Cannot build ${testFolder} with braceStyle ${braceStyle}, please check the output below:\n${code.error ?? code.stderr}`
        );
      }
    });
  });
}

export async function formatJavaSnippet({
  snippet,
  prettierOptions = {}
}: {
  snippet: string;
  prettierOptions?: Record<string, unknown>;
}) {
  return await prettier.format(snippet, {
    parser: "java",
    plugins: [plugin],
    braceStyle: "same-line",
    ...prettierOptions
  });
}

export async function expectSnippetToBeFormatted({
  snippet,
  expectedOutput,
  prettierOptions = {}
}: {
  snippet: string;
  expectedOutput: string;
  prettierOptions?: Record<string, unknown>;
}) {
  const onePass = await formatJavaSnippet({
    snippet,
    prettierOptions
  });
  const secondPass = await formatJavaSnippet({
    snippet: onePass,
    prettierOptions
  });

  expect(onePass).to.equal(expectedOutput);
  expect(secondPass).to.equal(expectedOutput);
}
