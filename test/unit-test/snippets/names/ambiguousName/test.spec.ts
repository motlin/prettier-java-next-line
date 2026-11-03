import { expectSnippetToBeFormatted } from "../../../../test-utils.ts";

describe("AmbiguousName", () => {
  it("can format a AmbiguousName without dots", async () => {
    await expectSnippetToBeFormatted({
      snippet: "x=myAmbiguousName;",
      expectedOutput: "x = myAmbiguousName;\n"
    });
  });

  it("can format a AmbiguousName with dots", async () => {
    await expectSnippetToBeFormatted({
      snippet: "x=myAmbiguousName.with.lot.of.dots;",
      expectedOutput: "x = myAmbiguousName.with.lot.of.dots;\n"
    });
  });
});
