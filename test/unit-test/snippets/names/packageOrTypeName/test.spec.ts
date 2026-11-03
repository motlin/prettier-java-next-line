import { expectSnippetToBeFormatted } from "../../../../test-utils.ts";

describe("PackageOrTypeName", () => {
  it("can format a PackageOrTypeName without dots", async () => {
    await expectSnippetToBeFormatted({
      snippet: "package com;",
      expectedOutput: "package com;\n"
    });
  });

  it("can format a PackageOrTypeName with dots", async () => {
    await expectSnippetToBeFormatted({
      snippet: "package com.iluwatar.abstractdocument;",
      expectedOutput: "package com.iluwatar.abstractdocument;\n"
    });
  });
});
