import { expectSnippetToBeFormatted } from "../../test-utils.ts";

const prettierOptions = { braceStyle: "same-line" };

const expectedOutput = [
  "class A {",
  "",
  "  void f() {",
  "    // c",
  "    foo();",
  "  }",
  "}",
  ""
].join("\n");

describe("same-line comments between a method header and its block", () => {
  it("moves an own-line comment into the block", async () => {
    await expectSnippetToBeFormatted({
      snippet: "class A { void f()\n// c\n{ foo(); } }",
      expectedOutput,
      prettierOptions
    });
  });

  it("moves an end-of-line comment into the block", async () => {
    await expectSnippetToBeFormatted({
      snippet: "class A { void f() // c\n{ foo(); } }",
      expectedOutput,
      prettierOptions
    });
  });

  it("moves a comment into an empty block", async () => {
    await expectSnippetToBeFormatted({
      snippet: "class A { void f() // c\n{} }",
      expectedOutput: [
        "class A {",
        "",
        "  void f() {",
        "    // c",
        "  }",
        "}",
        ""
      ].join("\n"),
      prettierOptions
    });
  });
});

describe("same-line comments between a constructor header and its body", () => {
  it("moves an own-line comment into the constructor body", async () => {
    await expectSnippetToBeFormatted({
      snippet: "class A { A()\n// c\n{ foo(); } }",
      expectedOutput: expectedOutput.replace("void f()", "A()"),
      prettierOptions
    });
  });

  it("moves an end-of-line comment into the constructor body", async () => {
    await expectSnippetToBeFormatted({
      snippet: "class A { A() // c\n{ foo(); } }",
      expectedOutput: expectedOutput.replace("void f()", "A()"),
      prettierOptions
    });
  });

  it("moves an end-of-line comment into a compact constructor body", async () => {
    await expectSnippetToBeFormatted({
      snippet: "record R(int x) { R // c\n{ foo(); } }",
      expectedOutput: [
        "record R(int x) {",
        "  R {",
        "    // c",
        "    foo();",
        "  }",
        "}",
        ""
      ].join("\n"),
      prettierOptions
    });
  });
});
