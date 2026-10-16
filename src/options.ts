import type { SupportOptions } from "prettier";

export default {
  arrowParens: {
    type: "choice",
    category: "Java",
    default: "always",
    choices: [
      { value: "always", description: "" },
      { value: "avoid", description: "" }
    ],
    description: "Include parentheses around a sole arrow function parameter."
  },
  trailingComma: {
    type: "choice",
    category: "Java",
    default: "all",
    choices: [
      { value: "all", description: "" },
      { value: "es5", description: "" },
      { value: "none", description: "" }
    ],
    description: "Print trailing commas wherever possible when multi-line."
  },
  experimentalOperatorPosition: {
    type: "choice",
    category: "Java",
    default: "end",
    choices: [
      { value: "start", description: "" },
      { value: "end", description: "" }
    ],
    description: "Where to print operators when binary expressions wrap lines."
  },
  braceStyle: {
    type: "choice",
    category: "Java",
    default: "next-line",
    choices: [
      {
        value: "same-line",
        description: "Put opening braces on same line (K&R style)"
      },
      {
        value: "next-line",
        description: "Put opening braces on new lines (Allman style)"
      }
    ],
    description: "Placement of opening braces."
  },
  arrayInitializerLayout: {
    type: "choice",
    category: "Java",
    default: "always-break",
    choices: [
      {
        value: "always-break",
        description: "Put each array element on its own line"
      },
      {
        value: "fit",
        description: "Keep array initializers on one line when they fit"
      }
    ],
    description: "Layout of array initializers when braceStyle is next-line."
  },
  closingBracket: {
    type: "choice",
    category: "Java",
    default: "next-line",
    choices: [
      {
        value: "next-line",
        description:
          "Put the closing parenthesis or angle bracket of a wrapped list on its own line"
      },
      {
        value: "same-line",
        description:
          "Keep the closing parenthesis or angle bracket on the last line of a wrapped list"
      }
    ],
    description:
      "Placement of the closing parenthesis or angle bracket when a list wraps."
  },
  importOrder: {
    type: "string",
    category: "Java",
    default: "",
    description:
      "Import groups in Spotless's format, such as `java,javax,,#java|#javax,#`. Module imports always come first. Empty puts static imports next, then all others."
  }
} satisfies SupportOptions;
