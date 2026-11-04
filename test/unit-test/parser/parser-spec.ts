import { expect } from "chai";
import { Tree } from "web-tree-sitter";
import plugin from "../../../dist/index.mjs";

describe("prettier-java: parser", () => {
  const originalDelete = Tree.prototype.delete;
  let deleteCount = 0;

  beforeEach(() => {
    deleteCount = 0;
    Tree.prototype.delete = function (this: Tree) {
      deleteCount++;
      return originalDelete.call(this);
    };
  });

  afterEach(() => {
    Tree.prototype.delete = originalDelete;
  });

  const parse = (text: string) =>
    plugin.parsers!.java.parse(text) as Promise<unknown>;

  it("deletes the tree after a successful parse", async () => {
    await parse("class A {}");
    expect(deleteCount).to.equal(1);
  });

  it("deletes the tree when parsing fails", async () => {
    let error: unknown;
    try {
      await parse("class A {");
    } catch (e) {
      error = e;
    }
    expect(error).to.be.instanceOf(Error);
    expect((error as Error).message).to.match(/^Failed to parse: /);
    expect(deleteCount).to.equal(1);
  });
});
