import { expectSnippetToBeFormatted } from "../../test-utils.ts";

const prettierOptions = { braceStyle: "next-line" };

describe("next-line brace placement", () => {
  it("keeps a space between do and a body that is not a block", async () => {
    await expectSnippetToBeFormatted({
      snippet: "class A { void m() { do i++; while (i < 10); } }",
      expectedOutput: [
        "class A",
        "{",
        "  void m()",
        "  {",
        "    do i++;",
        "    while (i < 10);",
        "  }",
        "}",
        "",
      ].join("\n"),
      prettierOptions,
    });
  });

  it("puts a record body brace right after the implements clause", async () => {
    await expectSnippetToBeFormatted({
      snippet: "record Foo(int a) implements Bar { void m() {} }",
      expectedOutput: [
        "record Foo(int a)",
        "  implements Bar",
        "{",
        "  void m()",
        "  {",
        "  }",
        "}",
        "",
      ].join("\n"),
      prettierOptions,
    });
  });

  it("puts the brace of a case whose only statement is a block on the next line", async () => {
    await expectSnippetToBeFormatted({
      snippet:
        "class A { void m(int x) { switch (x) { case 1: { foo(); } } } }",
      expectedOutput: [
        "class A",
        "{",
        "  void m(int x)",
        "  {",
        "    switch (x)",
        "    {",
        "      case 1:",
        "      {",
        "        foo();",
        "      }",
        "    }",
        "  }",
        "}",
        "",
      ].join("\n"),
      prettierOptions,
    });
  });

  it("prints a comment between try and its block on its own line", async () => {
    await expectSnippetToBeFormatted({
      snippet:
        "class A { void m() { try // c\n{ foo(); } finally { bar(); } } }",
      expectedOutput: [
        "class A",
        "{",
        "  void m()",
        "  {",
        "    try",
        "    // c",
        "    {",
        "      foo();",
        "    }",
        "    finally",
        "    {",
        "      bar();",
        "    }",
        "  }",
        "}",
        "",
      ].join("\n"),
      prettierOptions,
    });
  });

  it("keeps an own-line comment between a method header and its block", async () => {
    await expectSnippetToBeFormatted({
      snippet: "class A { void f()\n// c\n{ foo(); } }",
      expectedOutput: [
        "class A",
        "{",
        "  void f()",
        "  // c",
        "  {",
        "    foo();",
        "  }",
        "}",
        "",
      ].join("\n"),
      prettierOptions,
    });
  });

  it("prints one space before an end-of-line comment after method parameters", async () => {
    await expectSnippetToBeFormatted({
      snippet: "class A { void f() // c\n{ foo(); } }",
      expectedOutput: [
        "class A",
        "{",
        "  void f() // c",
        "  {",
        "    foo();",
        "  }",
        "}",
        "",
      ].join("\n"),
      prettierOptions,
    });
  });

  it("separates an enum instance initializer by one blank line", async () => {
    await expectSnippetToBeFormatted({
      snippet: "enum E { A, B; { init(); } }",
      expectedOutput: [
        "enum E",
        "{",
        "  A,",
        "  B;",
        "",
        "  {",
        "    init();",
        "  }",
        "}",
        "",
      ].join("\n"),
      prettierOptions,
    });
  });
});
