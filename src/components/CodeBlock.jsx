import { useMemo } from "react";

// Minimal JSX/JS tokenizer for light-theme syntax highlighting.
// Tokens: comment | string | keyword | jsx-tag | jsx-attr | number | builtin | punct | text
const KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "default",
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "new",
  "class",
  "extends",
  "super",
  "this",
  "true",
  "false",
  "null",
  "undefined",
  "typeof",
  "instanceof",
  "in",
  "of",
  "try",
  "catch",
  "finally",
  "throw",
  "async",
  "await",
  "yield",
  "as",
]);

const BUILTINS = new Set([
  "useState",
  "useEffect",
  "useRef",
  "useMemo",
  "useCallback",
  "useReducer",
  "useContext",
  "useLayoutEffect",
  "useId",
  "useTransition",
  "useDeferredValue",
  "createContext",
  "createRoot",
  "Fragment",
  "memo",
  "forwardRef",
  "Suspense",
  "console",
  "Math",
  "JSON",
  "Object",
  "Array",
  "Promise",
  "document",
  "window",
  "React",
]);

function tokenize(src) {
  const tokens = [];
  let i = 0;
  const n = src.length;
  const push = (type, value) => tokens.push({ type, value });

  while (i < n) {
    const c = src[i];
    const next = src[i + 1];

    // Line comment
    if (c === "/" && next === "/") {
      let j = i;
      while (j < n && src[j] !== "\n") j++;
      push("comment", src.slice(i, j));
      i = j;
      continue;
    }
    // Block comment
    if (c === "/" && next === "*") {
      let j = i + 2;
      while (j < n && !(src[j] === "*" && src[j + 1] === "/")) j++;
      j = Math.min(n, j + 2);
      push("comment", src.slice(i, j));
      i = j;
      continue;
    }
    // String literals: ', ", `
    if (c === '"' || c === "'" || c === "`") {
      const quote = c;
      let j = i + 1;
      while (j < n) {
        if (src[j] === "\\") {
          j += 2;
          continue;
        }
        if (src[j] === quote) {
          j++;
          break;
        }
        j++;
      }
      push("string", src.slice(i, j));
      i = j;
      continue;
    }
    // Number
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < n && /[0-9.]/.test(src[j])) j++;
      push("number", src.slice(i, j));
      i = j;
      continue;
    }
    // JSX-ish opening tag <Tag or </Tag or <tag
    if (c === "<" && /[A-Za-z/]/.test(next || "")) {
      // Heuristic: treat as JSX if followed by letter/slash and a tag-like name
      let j = i + 1;
      if (src[j] === "/") j++;
      const tagStart = j;
      while (j < n && /[A-Za-z0-9_.]/.test(src[j])) j++;
      if (j > tagStart) {
        push("jsx-tag", src.slice(i, j));
        i = j;
        continue;
      }
    }
    // Closing > or />
    if (c === "/" && next === ">") {
      push("jsx-tag", "/>");
      i += 2;
      continue;
    }
    if (c === ">") {
      // Only color > if preceded by jsx-tag-ish token recently — cheap approach: always tag
      push("jsx-tag", ">");
      i++;
      continue;
    }
    // Identifier / keyword
    if (/[A-Za-z_$]/.test(c)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_$]/.test(src[j])) j++;
      const word = src.slice(i, j);
      if (KEYWORDS.has(word)) push("keyword", word);
      else if (BUILTINS.has(word)) push("builtin", word);
      else push("ident", word);
      i = j;
      continue;
    }
    // Punctuation/whitespace
    push("text", c);
    i++;
  }
  return tokens;
}

export { tokenize };

export default function CodeBlock({ code, language = "jsx" }) {
  const tokens = useMemo(() => tokenize(code), [code]);
  return (
    <pre className="code-block" data-lang={language}>
      <code>
        {tokens.map((t, idx) => (
          <span key={idx} className={`tok-${t.type}`}>
            {t.value}
          </span>
        ))}
      </code>
    </pre>
  );
}
