import { expect } from "chai";
import path from "node:path";
import { fileURLToPath } from "node:url";
import options from "../../../src/options.ts";
import { testSampleWithOptions } from "../../test-utils.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("prettier-java", () => {
  it("defaults arrayInitializerLayout to always-break", () => {
    expect(options.arrayInitializerLayout.default).to.equal("always-break");
  });

  testSampleWithOptions({
    testFolder: path.resolve(__dirname, "./fit")
  });
  testSampleWithOptions({
    testFolder: path.resolve(__dirname, "./fitWithoutBracketSpacing")
  });
});
