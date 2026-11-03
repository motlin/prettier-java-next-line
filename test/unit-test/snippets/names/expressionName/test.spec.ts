import { expectSnippetToBeFormatted } from "../../../../test-utils.ts";

describe("expressionName", () => {
  it("can format a ExpressionName without dots", async () => {
    await expectSnippetToBeFormatted({
      snippet: "x=myExpression;",
      expectedOutput: "x = myExpression;\n"
    });
  });

  it("can format a ExpressionName with dots", async () => {
    await expectSnippetToBeFormatted({
      snippet: "x=myExpression.with.lot.of.dots;",
      expectedOutput: "x = myExpression.with.lot.of.dots;\n"
    });
  });
});
