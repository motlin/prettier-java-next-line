import { expectSnippetToBeFormatted } from "../../../test-utils.ts";

describe("Enum Body", () => {
  it("Remove trailing comma when --trailing-comma='none'", async () => {
    const snippet = "enum E {ONE,TWO,THREE,}";
    // prettier-ignore
    const expectedOutput =
      "enum E {\n" +
      "  ONE,\n" +
      "  TWO,\n" +
      "  THREE\n" +
      "}\n";
    await expectSnippetToBeFormatted({
      snippet,
      expectedOutput,
      prettierOptions: {
        trailingComma: "none"
      }
    });
  });

  it("Add trailing comma when specified", async () => {
    const snippet = "enum E {ONE,TWO,THREE}";
    // prettier-ignore
    const expectedOutput =
      "enum E {\n" +
      "  ONE,\n" +
      "  TWO,\n" +
      "  THREE,\n" +
      "}\n";
    const prettierOptions = {
      trailingComma: "all"
    };
    await expectSnippetToBeFormatted({
      snippet,
      expectedOutput,
      prettierOptions
    });
  });

  it("Keep one trailing comma if there is already one", async () => {
    const snippet =
      "enum E {" + "\n  ONE," + "\n  TWO," + "\n  THREE," + "\n}\n";
    // prettier-ignore
    const expectedOutput =
      "enum E {\n" +
      "  ONE,\n" +
      "  TWO,\n" +
      "  THREE,\n" +
      "}\n";
    const prettierOptions = {
      trailingComma: "all"
    };
    await expectSnippetToBeFormatted({
      snippet,
      expectedOutput,
      prettierOptions
    });
  });

  it("Remove trailing comma in enum constant list with semicolon when --trailing-comma='none'", async () => {
    const snippet = "enum E {ONE,TWO,THREE,;}";
    // prettier-ignore
    const expectedOutput =
      "enum E {\n" +
      "  ONE,\n" +
      "  TWO,\n" +
      "  THREE\n" +
      "}\n";
    await expectSnippetToBeFormatted({
      snippet,
      expectedOutput,
      prettierOptions: {
        trailingComma: "none"
      }
    });
  });

  it("Add trailing comma in enum constant list with semicolon when specified", async () => {
    const snippet = "enum E {ONE,TWO,THREE;}";
    // prettier-ignore
    const expectedOutput =
      "enum E {\n" +
      "  ONE,\n" +
      "  TWO,\n" +
      "  THREE,\n" +
      "}\n";
    const prettierOptions = {
      trailingComma: "all"
    };
    await expectSnippetToBeFormatted({
      snippet,
      expectedOutput,
      prettierOptions
    });
  });
});
