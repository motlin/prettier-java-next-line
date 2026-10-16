import { expect } from "chai";
import path from "node:path";
import { fileURLToPath } from "node:url";
import options from "../../../src/options.ts";
import { testSampleWithOptions } from "../../test-utils.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("prettier-java", () => {
  it("defaults closingBracket to next-line", () => {
    expect(options.closingBracket.default).to.equal("next-line");
  });

  testSampleWithOptions({
    testFolder: path.resolve(__dirname, "./sameLine")
  });
});
