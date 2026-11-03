import { expectSnippetToBeFormatted } from "../../../../test-utils.ts";

describe("MethodName", () => {
  it("can format a MethodName", async () => {
    await expectSnippetToBeFormatted({
      snippet: "test( );",
      expectedOutput: "test();\n"
    });
  });
});
