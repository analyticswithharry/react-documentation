import { useMemo } from "react";
import { marked } from "marked";
import { tokenize } from "./CodeBlock.jsx";

const ESC = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);

function highlight(code) {
  return tokenize(code)
    .map((t) => `<span class="tok-${t.type}">${escapeHtml(t.value)}</span>`)
    .join("");
}

// Wrap fenced code blocks in the same `.code-block` shell used by <CodeBlock />,
// so scraped tutorial markdown gets identical syntax highlighting + indentation.
const renderer = new marked.Renderer();
renderer.code = (codeArg, infostring) => {
  // marked v5+ passes an object { text, lang }; older versions pass (code, lang).
  const code =
    typeof codeArg === "object" && codeArg !== null ? codeArg.text : codeArg;
  const langRaw =
    typeof codeArg === "object" && codeArg !== null ? codeArg.lang : infostring;
  const lang = (langRaw || "").trim().split(/\s+/)[0] || "jsx";
  return `<pre class="code-block" data-lang="${escapeHtml(
    lang,
  )}"><code>${highlight(code || "")}</code></pre>`;
};
renderer.codespan = (textArg) => {
  const text =
    typeof textArg === "object" && textArg !== null ? textArg.text : textArg;
  return `<code class="inline-code">${escapeHtml(text || "")}</code>`;
};

marked.setOptions({ gfm: true, breaks: false, renderer });

export default function Markdown({ source }) {
  const html = useMemo(() => marked.parse(source || ""), [source]);
  return (
    <div
      className="markdown-body"
      // Content is bundled at build-time from our own scraped files, not user input.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
