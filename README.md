# Prettier Java Next Line

Prettier Java Next Line is a fork of
[prettier-plugin-java](https://github.com/jhipster/prettier-java) with
configurable opening-brace placement. It defaults to Allman-style, next-line
braces.

The option was proposed upstream in
[jhipster/prettier-java#840](https://github.com/jhipster/prettier-java/pull/840)
and declined because upstream intentionally preserves one brace style.

## Installation

Use it with Prettier:

```bash
npm install --save-dev prettier prettier-java-next-line
```

Or use the matching Prettier Next Line fork through an npm alias:

```bash
npm install --save-dev \
  prettier@npm:prettier-next-line \
  prettier-java-next-line
```

## Configuration

Load the plugin explicitly:

```json
{
  "plugins": ["prettier-java-next-line"]
}
```

Next-line braces are the default. Use the inherited K&R placement when needed:

```json
{
  "plugins": ["prettier-java-next-line"],
  "braceStyle": "same-line"
}
```

## Spotless Maven

Spotless loads a package named `prettier`, so install Prettier Next Line under
that name with an npm alias:

```xml
<prettier>
    <devDependencies>
        <prettier>npm:prettier-next-line@3.10.0-dev</prettier>
        <prettier-java-next-line>2.10.3-beta.1</prettier-java-next-line>
    </devDependencies>
    <configFile>.prettierrc.json5</configFile>
    <config>
        <parser>java</parser>
        <plugins>prettier-java-next-line</plugins>
    </config>
</prettier>
```

## CLI

With upstream Prettier:

```bash
npx prettier --check --plugin=prettier-java-next-line "**/*.java"
npx prettier --write --plugin=prettier-java-next-line "**/*.java"
```

With the aliased Prettier Next Line fork, use `npx prettier-next-line` instead.

## Example

```java
public class Example
{
    public void method()
    {
        if (condition)
        {
            doSomething();
        }
    }
}
```

## Upstream

Prettier Java Next Line tracks
[jhipster/prettier-java](https://github.com/jhipster/prettier-java) and keeps
fork-specific behavior focused on brace placement.

## License

Apache-2.0
