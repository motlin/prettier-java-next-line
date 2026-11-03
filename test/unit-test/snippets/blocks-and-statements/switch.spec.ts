import { expectSnippetToBeFormatted } from "../../../test-utils.ts";

describe("Switches", () => {
  describe("Switch Statement", () => {
    it("should format switch statement", async () => {
      const snippet =
        "switch (answer) {\n" +
        "  case YES:\n" +
        '    return "Yes";\n' +
        "  default:\n" +
        '    return "NO";\n' +
        "}";

      const expectedOutput =
        "switch (answer) {\n" +
        "  case YES:\n" +
        '    return "Yes";\n' +
        "  default:\n" +
        '    return "NO";\n' +
        "}\n";

      await expectSnippetToBeFormatted({
        snippet,
        expectedOutput
      });
    });
  });
});
