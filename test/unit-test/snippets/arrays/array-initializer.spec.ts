import { expectSnippetToBeFormatted } from "../../../test-utils.ts";

describe("Arrays Initializer", () => {
  it("can format an empty arrayInitializer", async () => {
    await expectSnippetToBeFormatted({
      snippet: "int[] a = { };",
      expectedOutput: "int[] a = {};\n"
    });
  });

  it("can format a arrayInitializer", async () => {
    await expectSnippetToBeFormatted({
      snippet: "int[] a = {alpha};",
      expectedOutput: "int[] a = { alpha };\n"
    });
  });

  describe("Trailing Commas", () => {
    it("should remove extra comma in arrayInitializer by default", async () => {
      await expectSnippetToBeFormatted({
        snippet: "int[] a = {alpha,};",
        expectedOutput: "int[] a = { alpha };\n"
      });
    });

    it("should remove extra comma in arrayInitializer if it does not fit in one line and --trailing-comma='none'", async () => {
      const snippet = "int[] a = {oneVeryLongArrayValue,};";
      const prettierOptions = {
        printWidth: 15,
        trailingComma: "none"
      };
      // prettier-ignore
      const expectedOutput =
        "int[] a = {\n" +
        "  oneVeryLongArrayValue\n" +
        "};\n";

      await expectSnippetToBeFormatted({
        snippet,
        expectedOutput,
        prettierOptions
      });
    });

    it("should remove extra comma in arrayInitializer if it fit in one line and --trailing-comma='all'", async () => {
      await expectSnippetToBeFormatted({
        snippet: "int[] a = {oneVeryLongArrayValue,};",
        expectedOutput: "int[] a = { oneVeryLongArrayValue };\n",
        prettierOptions: {
          trailingComma: "all"
        }
      });
    });

    it("should not add extra comma in arrayInitializer if it fit in one line and --trailing-comma='all'", async () => {
      await expectSnippetToBeFormatted({
        snippet: "int[] a = {oneVeryLongArrayValue};",
        expectedOutput: "int[] a = { oneVeryLongArrayValue };\n",
        prettierOptions: {
          trailingComma: "all"
        }
      });
    });

    it("should keep extra comma in arrayInitializer if it does not fit in one line and --trailing-comma='all'", async () => {
      // prettier-ignore
      const expectedOutput =
        "int[] a = {\n" +
        "  oneVeryLongArrayValue /* COMMA */,\n" +
        "};\n";

      await expectSnippetToBeFormatted({
        snippet: "int[] a = {oneVeryLongArrayValue /* COMMA */,};",
        expectedOutput,
        prettierOptions: {
          printWidth: 15,
          trailingComma: "all"
        }
      });
    });

    it("should add extra comma in arrayInitializer if it does not fit in one line and --trailing-comma='all'", async () => {
      // prettier-ignore
      const expectedOutput =
        "int[] a = {\n" +
        "  oneVeryLongArrayValue,\n" +
        "};\n";

      await expectSnippetToBeFormatted({
        snippet: "int[] a = {oneVeryLongArrayValue};",
        expectedOutput,
        prettierOptions: {
          printWidth: 15,
          trailingComma: "all"
        }
      });
    });
  });
});
