import path from "node:path";
import { fileURLToPath } from "node:url";
import { testSample } from "../../test-utils.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("prettier-java", () => {
  testSample(path.resolve(__dirname, "spaces"));
  testSample(path.resolve(__dirname, "tabs"));
  testSample(path.resolve(__dirname, "spaces-start"));
  testSample(path.resolve(__dirname, "tabs-start"));
});
