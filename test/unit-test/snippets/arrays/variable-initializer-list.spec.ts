import { expectSnippetToBeFormatted } from "../../../test-utils.ts";

describe("VariableInitializerList", () => {
  it("format variableInitializerList with one variableInitializer", async () => {
    await expectSnippetToBeFormatted({
      snippet: "int[] a = {alpha };",
      expectedOutput: "int[] a = { alpha };\n"
    });
  });

  it("format variableInitializerList with multiple variableInitializer", async () => {
    await expectSnippetToBeFormatted({
      snippet: "int[] a = {alpha,beta, gamma};",
      expectedOutput: "int[] a = { alpha, beta, gamma };\n"
    });
  });
});
