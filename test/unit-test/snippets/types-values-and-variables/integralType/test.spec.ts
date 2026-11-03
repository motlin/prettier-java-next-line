import { expectSnippetToBeFormatted } from "../../../../test-utils.ts";

describe("integralType", () => {
  it("can format byte keyword", async () => {
    await expectSnippetToBeFormatted({
      snippet: "byte  x;",
      expectedOutput: "byte x;\n"
    });
  });

  it("can format short keyword", async () => {
    await expectSnippetToBeFormatted({
      snippet: "short  x;",
      expectedOutput: "short x;\n"
    });
  });

  it("can format int keyword", async () => {
    await expectSnippetToBeFormatted({
      snippet: "int  x;",
      expectedOutput: "int x;\n"
    });
  });

  it("can format long keyword", async () => {
    await expectSnippetToBeFormatted({
      snippet: "long  x;",
      expectedOutput: "long x;\n"
    });
  });

  it("can format char keyword", async () => {
    await expectSnippetToBeFormatted({
      snippet: "char  x;",
      expectedOutput: "char x;\n"
    });
  });
});
