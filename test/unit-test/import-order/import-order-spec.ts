import { expect } from "chai";
import path from "node:path";
import { fileURLToPath } from "node:url";
import options from "../../../src/options.ts";
import { testSampleWithOptions } from "../../test-utils.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("prettier-java", () => {
  it("defaults importOrder to empty", () => {
    expect(options.importOrder.default).to.equal("");
  });

  testSampleWithOptions({
    testFolder: path.resolve(__dirname, "./spotlessGroups")
  });
  testSampleWithOptions({
    testFolder: path.resolve(__dirname, "./staticGroupInsertedFirst")
  });
  testSampleWithOptions({
    testFolder: path.resolve(__dirname, "./longestPrefixWins")
  });
  testSampleWithOptions({
    testFolder: path.resolve(__dirname, "./moduleImportsFirst")
  });
});
