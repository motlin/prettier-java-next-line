import { expectSnippetToBeFormatted } from "../../../test-utils.ts";

describe("element Value Array Initializer", () => {
  it("can format a elementValueArrayInitializer", async () => {
    await expectSnippetToBeFormatted({
      snippet: "@A({alpha}) class B {}",
      expectedOutput: "@A({ alpha })\nclass B {}\n"
    });
  });

  it("keeps a short elementValueArrayInitializer inline with next-line braces", async () => {
    await expectSnippetToBeFormatted({
      snippet: '@A({"alpha", "beta", "charlie"}) class B {}',
      expectedOutput: '@A({ "alpha", "beta", "charlie" })\nclass B\n{\n}\n',
      prettierOptions: {
        braceStyle: "next-line"
      }
    });
  });

  describe("Trailing Commas", () => {
    it("should remove extra comma in elementValueArrayInitializer by default", async () => {
      await expectSnippetToBeFormatted({
        snippet: "@A({alpha,}) class B {}",
        expectedOutput: "@A({ alpha })\nclass B {}\n"
      });
    });

    it("should remove extra comma in elementValueArrayInitializer if it does not fit in one line and --trailing-comma='none'", async () => {
      // prettier-ignore
      const expectedOutput =
        "@A({\n" +
        "  oneVeryLongArrayValue\n" +
        "})\nclass B {}\n";

      await expectSnippetToBeFormatted({
        snippet: "@A({oneVeryLongArrayValue,}) class B {}",
        expectedOutput,
        prettierOptions: {
          printWidth: 15,
          trailingComma: "none"
        }
      });
    });

    it("should remove extra comma in elementValueArrayInitializer if it fit in one line and --trailing-comma='all'", async () => {
      await expectSnippetToBeFormatted({
        snippet: "@A({oneVeryLongArrayValue,}) class B {}",
        expectedOutput: "@A({ oneVeryLongArrayValue })\nclass B {}\n",
        prettierOptions: {
          trailingComma: "all"
        }
      });
    });

    it("should not add extra comma in elementValueArrayInitializer if it fit in one line and --trailing-comma='all'", async () => {
      await expectSnippetToBeFormatted({
        snippet: "@A({oneVeryLongArrayValue}) class B {}",
        expectedOutput: "@A({ oneVeryLongArrayValue })\nclass B {}\n",
        prettierOptions: {
          trailingComma: "all"
        }
      });
    });

    it("should keep extra comma in elementValueArrayInitializer if it does not fit in one line and --trailing-comma='all'", async () => {
      // prettier-ignore
      const expectedOutput =
        "@A({\n" +
        "  oneVeryLongArrayValue /* COMMA */,\n" +
        "})\nclass B {}\n";

      await expectSnippetToBeFormatted({
        snippet: "@A({oneVeryLongArrayValue /* COMMA */,}) class B {}",
        expectedOutput,
        prettierOptions: {
          printWidth: 15,
          trailingComma: "all"
        }
      });
    });

    it("should add extra comma in elementValueArrayInitializer if it does not fit in one line and --trailing-comma='all'", async () => {
      // prettier-ignore
      const expectedOutput =
        "@A({\n" +
        "  oneVeryLongArrayValue,\n" +
        "})\nclass B {}\n";

      await expectSnippetToBeFormatted({
        snippet: "@A({oneVeryLongArrayValue}) class B {}",
        expectedOutput,
        prettierOptions: {
          printWidth: 15,
          trailingComma: "all"
        }
      });
    });
  });
});
