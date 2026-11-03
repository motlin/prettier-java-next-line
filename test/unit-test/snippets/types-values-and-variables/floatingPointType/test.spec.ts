import { expectSnippetToBeFormatted } from "../../../../test-utils.ts";

describe("floatingPointType", () => {
  it("can format float keyword", async () => {
    await expectSnippetToBeFormatted({
      snippet: "float  x;",
      expectedOutput: "float x;\n"
    });
  });

  it("can format double keyword", async () => {
    await expectSnippetToBeFormatted({
      snippet: "double  x;",
      expectedOutput: "double x;\n"
    });
  });
});
