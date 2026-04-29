# Maculate Java - Prettier Java Plugin with Allman-style Braces

Maculate Java is a fork of prettier-plugin-java that adds support for Allman-style (next-line) brace formatting for Java code.

## Installation

```bash
npm install --save-dev maculate-java prettier
```

or with Yarn:

```bash
yarn add --dev maculate-java prettier
```

## Usage

Add the plugin to your Prettier configuration:

**.prettierrc**
```json
{
  "plugins": ["maculate-java"],
  "braceStyle": "next-line"
}
```

### Brace Style Options

- `"same-line"` (default) - K&R style with opening braces on the same line
- `"next-line"` - Allman style with opening braces on new lines

### Example

**Input (same-line style):**
```java
public class Example {
    public void method() {
        if (condition) {
            doSomething();
        }
    }
}
```

**Output (next-line style):**
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

## CLI Usage

```bash
prettier --write --plugin maculate-java "**/*.java"
```

## Editor Integration

Works with any editor that supports Prettier:
- VS Code with Prettier extension
- IntelliJ IDEA with Prettier plugin
- Sublime Text with JsPrettier
- Vim with vim-prettier
- Emacs with prettier-emacs

## License

Apache-2.0

## Credits

Based on [prettier-plugin-java](https://github.com/jhipster/prettier-java) by the JHipster team.