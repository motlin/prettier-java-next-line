import { expectSnippetToBeFormatted } from "../../../test-utils.ts";

describe("Class Body", () => {
  it("should handle an empty class body", async () => {
    await expectSnippetToBeFormatted({
      snippet: "class A { }",
      expectedOutput: "class A {}\n"
    });
  });

  it("should handle a class body with one field declaration", async () => {
    // prettier-ignore
    const expectedOutput =
      "class A {\n" +
      "\n" +
      "  int i;\n" +
      "}\n";

    await expectSnippetToBeFormatted({
      snippet: "class A {int i;}",
      expectedOutput
    });
  });

  it("should handle blank lines between field declarations", async () => {
    // prettier-ignore
    const snippet =
      "class A {\n" +
      "  int i;\n" +
      "  int j;\n" +
      "  \n" +
      "  int k;\n" +
      "}\n";

    // prettier-ignore
    const expectedOutput =
      "class A {\n" +
      "\n" +
      "  int i;\n" +
      "  int j;\n" +
      "\n" +
      "  int k;\n" +
      "}\n";

    await expectSnippetToBeFormatted({
      snippet,
      expectedOutput
    });
  });

  it("should add exactly one blank lines between field declarations", async () => {
    // prettier-ignore
    const snippet =
      "class A {\n" +
      "  int i;\n" +
      "\n" +
      "\n" +
      "  \n" +
      "  int j;\n" +
      "}\n";

    // prettier-ignore
    const expectedOutput =
      "class A {\n" +
      "\n" +
      "  int i;\n" +
      "\n" +
      "  int j;\n" +
      "}\n";

    await expectSnippetToBeFormatted({
      snippet,
      expectedOutput
    });
  });

  it("should add exactly one blank lines before method declarations", async () => {
    const snippet =
      "class A {\n" +
      "  int i;\n" +
      "  void t() {}" +
      "\n" +
      "  void u() {}" +
      "\n" +
      "\n" +
      "void v() {}" +
      "}\n";

    const expectedOutput =
      "class A {\n" +
      "\n" +
      "  int i;\n" +
      "\n" +
      "  void t() {}\n" +
      "\n" +
      "  void u() {}\n" +
      "\n" +
      "  void v() {}\n" +
      "}\n";

    await expectSnippetToBeFormatted({
      snippet,
      expectedOutput
    });
  });

  describe("Empty statements", () => {
    it("should handle an class body with only empty statements", async () => {
      await expectSnippetToBeFormatted({
        snippet: "class A {;;}",
        expectedOutput: "class A {}\n"
      });
    });

    it("should handle blank lines between field declarations", async () => {
      const snippet =
        "class A {\n" +
        "  int i;;int j;;\n" +
        "  int k;;\n" +
        "  ;\n" +
        "  int l;;\n" +
        "  \n" +
        "  int m;;\n" +
        "}\n";

      const expectedOutput =
        "class A {\n" +
        "\n" +
        "  int i;\n" +
        "  int j;\n" +
        "  int k;\n" +
        "\n" +
        "  int l;\n" +
        "\n" +
        "  int m;\n" +
        "}\n";

      await expectSnippetToBeFormatted({
        snippet,
        expectedOutput
      });
    });

    it("should handle blank lines before method declarations", async () => {
      const snippet =
        "class A {\n" +
        "  int i;;\n" +
        "  void t() {}" +
        "\n" +
        "\n;" +
        "  void u() {}" +
        "\n;;" +
        "\n" +
        "void v() {}" +
        "}\n";

      const expectedOutput =
        "class A {\n" +
        "\n" +
        "  int i;\n" +
        "\n" +
        "  void t() {}\n" +
        "\n" +
        "  void u() {}\n" +
        "\n" +
        "  void v() {}\n" +
        "}\n";

      await expectSnippetToBeFormatted({
        snippet,
        expectedOutput
      });
    });

    it("should print comments attached to empty statement where only empty statements", async () => {
      await expectSnippetToBeFormatted({
        snippet: "class A {;/* TODO */;}",
        expectedOutput: "class A {\n" + "  /* TODO */\n" + "}\n"
      });
    });

    it("should print comments attached to empty statement between field declarations", async () => {
      const snippet =
        "class A {\n" +
        "  int i;/* TODO */;int j;;\n" +
        "  int k;/* TODO */;\n" +
        "  \n" +
        "  /* TODO */;\n" +
        "  \n" +
        "  int l;;\n" +
        "}\n";

      const expectedOutput =
        "class A {\n" +
        "\n" +
        "  int i; /* TODO */\n" +
        "  int j;\n" +
        "  int k; /* TODO */\n" +
        "\n" +
        "  /* TODO */ int l;\n" +
        "}\n";

      await expectSnippetToBeFormatted({
        snippet,
        expectedOutput
      });
    });
  });
});
