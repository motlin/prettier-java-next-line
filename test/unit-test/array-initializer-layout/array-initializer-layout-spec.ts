import { expect } from "chai";
import path from "node:path";
import { fileURLToPath } from "node:url";
import options from "../../../src/options.ts";
import {
  expectSnippetToBeFormatted,
  testSampleWithOptions
} from "../../test-utils.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("prettier-java", () => {
  it("defaults arrayInitializerLayout to always-break", () => {
    expect(options.arrayInitializerLayout.default).to.equal("always-break");
  });

  it("keeps an empty commented annotation array inline in next-line mode", async () => {
    await expectSnippetToBeFormatted({
      snippet: "@SuppressWarnings({ /* none */ }) class A {}",
      expectedOutput: [
        "@SuppressWarnings({/* none */})",
        "class A",
        "{",
        "}",
        ""
      ].join("\n"),
      prettierOptions: { braceStyle: "next-line" }
    });
  });

  it("moves an empty commented array initializer to the next line with always-break", async () => {
    await expectSnippetToBeFormatted({
      snippet: "class A { int[] a = { /* none */ }; }",
      expectedOutput: [
        "class A",
        "{",
        "  int[] a =",
        "  {/* none */};",
        "}",
        ""
      ].join("\n"),
      prettierOptions: {
        braceStyle: "next-line",
        arrayInitializerLayout: "always-break"
      }
    });
  });

  it("keeps an empty commented array initializer inline with fit", async () => {
    await expectSnippetToBeFormatted({
      snippet: "class A { int[] a = { /* none */ }; }",
      expectedOutput: [
        "class A",
        "{",
        "  int[] a = {/* none */};",
        "}",
        ""
      ].join("\n"),
      prettierOptions: {
        braceStyle: "next-line",
        arrayInitializerLayout: "fit"
      }
    });
  });

  testSampleWithOptions({
    testFolder: path.resolve(__dirname, "./fit")
  });
  testSampleWithOptions({
    testFolder: path.resolve(__dirname, "./fitWithoutBracketSpacing")
  });
});
