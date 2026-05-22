// Build a lightweight in-memory full-text index at module load time.
// No server, no Elasticsearch — everything is bundled with Vite and
// searched locally with simple token scoring.

import { lessons, sources } from "../data/tutorials.js";
import tutorialContent from "../data/tutorialContent.js";

const SECTION_ROUTE = {
  Fundamentals: "/fundamentals",
  Hooks: "/hooks",
  Performance: "/real-examples",
  Patterns: "/real-examples",
  Design: "/real-examples",
  "Real-world": "/real-examples",
  Projects: "/projects",
};

function tokenize(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[^a-z0-9+#./\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function makeRecord({ kind, id, title, subtitle, body, to, badge }) {
  return {
    kind, // "lesson" | "source" | "section"
    id,
    title,
    subtitle: subtitle || "",
    body: body || "",
    to,
    badge: badge || "",
    haystack: `${title} ${subtitle || ""} ${body || ""}`.toLowerCase(),
    titleTokens: new Set(tokenize(title)),
  };
}

// 1) Lessons
const lessonRecords = lessons.map((l) =>
  makeRecord({
    kind: "lesson",
    id: `lesson-${l.id}`,
    title: `${l.chapter}. ${l.title}`,
    subtitle: l.section,
    body: l.summary,
    to: `${SECTION_ROUTE[l.section] || "/"}#${l.id}`,
    badge: l.section,
  }),
);

// 2) Tutorial sources (whole-document hits)
const sourceRecords = sources.map((s) =>
  makeRecord({
    kind: "source",
    id: `source-${s.slug}`,
    title: s.title,
    subtitle: "Tutorial",
    body: `${s.summary} ${(tutorialContent[s.slug] || "").slice(0, 4000)}`,
    to: `/tutorials#${s.slug}`,
    badge: "Tutorial",
  }),
);

// 3) Tutorial sub-sections: split each markdown by h2/h3 headings so a
//    search for e.g. "useEffect cleanup" jumps to the heading’s document.
const sectionRecords = [];
for (const s of sources) {
  const md = tutorialContent[s.slug];
  if (!md) continue;
  const headingRe = /^(#{2,3})\s+(.+)$/gm;
  let match;
  const positions = [];
  while ((match = headingRe.exec(md)) !== null) {
    positions.push({ index: match.index, title: match[2].trim() });
  }
  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].index;
    const end = i + 1 < positions.length ? positions[i + 1].index : md.length;
    const body = md.slice(start, end).replace(/[#`*_>]/g, " ");
    sectionRecords.push(
      makeRecord({
        kind: "section",
        id: `sec-${s.slug}-${i}`,
        title: positions[i].title,
        subtitle: s.title,
        body: body.slice(0, 1200),
        to: `/tutorials#${s.slug}`,
        badge: "Section",
      }),
    );
  }
}

export const INDEX = [...lessonRecords, ...sourceRecords, ...sectionRecords];

export function search(query, limit = 20) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = tokenize(q);
  if (terms.length === 0) return [];

  const phrase = q;
  const scored = [];

  for (const rec of INDEX) {
    let score = 0;
    let matchedTerms = 0;
    for (const t of terms) {
      const inTitle = rec.title.toLowerCase().includes(t);
      const inSubtitle = rec.subtitle.toLowerCase().includes(t);
      const inBody = rec.body.toLowerCase().includes(t);
      if (inTitle) score += 8;
      if (rec.titleTokens.has(t)) score += 4; // whole-word title boost
      if (inSubtitle) score += 3;
      if (inBody) score += 1;
      if (inTitle || inSubtitle || inBody) matchedTerms++;
    }
    if (matchedTerms < terms.length) continue; // require all terms (AND)

    // Phrase / prefix boosts
    if (rec.title.toLowerCase().includes(phrase)) score += 10;
    if (rec.title.toLowerCase().startsWith(phrase)) score += 5;

    // Kind weighting: lessons first, then sections, then whole sources
    if (rec.kind === "lesson") score += 2;
    else if (rec.kind === "section") score += 1;

    scored.push({ rec, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ rec, score }) => ({ ...rec, score }));
}

// Build a short snippet around the first match for display.
export function snippet(rec, query, max = 140) {
  const q = query.trim().toLowerCase();
  if (!q || !rec.body) return rec.body.slice(0, max);
  const idx = rec.body.toLowerCase().indexOf(q.split(/\s+/)[0]);
  if (idx === -1) return rec.body.slice(0, max);
  const start = Math.max(0, idx - 40);
  const end = Math.min(rec.body.length, idx + max - 40);
  return (
    (start > 0 ? "… " : "") +
    rec.body.slice(start, end).replace(/\s+/g, " ").trim() +
    (end < rec.body.length ? " …" : "")
  );
}
