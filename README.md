# Maculate Java

Maculate Java is a thin fork of
[prettier-plugin-java](https://github.com/jhipster/prettier-java) for the
[Maculate](https://github.com/motlin/maculate) formatter. It adds configurable
same-line and next-line brace styles for Java.

## Installation

```bash
npm install --save-dev maculate maculate-java
```

## Configuration

Load the plugin explicitly in your Maculate configuration:

```json
{
  "plugins": ["maculate-java"],
  "braceStyle": "next-line"
}
```

`braceStyle` accepts:

- `"same-line"` for opening braces on the declaration line;
- `"next-line"` for Allman-style opening braces.

## CLI

Check Java formatting without changing files:

```bash
npx maculate --check --plugin=maculate-java "**/*.java"
```

Format Java files in place:

```bash
npx maculate --write --plugin=maculate-java "**/*.java"
```

## Example

Input:

```java
public class Example {
    public void method() {
        if (condition) {
            doSomething();
        }
    }
}
```

With `"braceStyle": "next-line"`:

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

Maculate Java follows
[jhipster/prettier-java](https://github.com/jhipster/prettier-java) and keeps
its fork-specific changes focused on Maculate compatibility and brace style.

## License

Apache-2.0
