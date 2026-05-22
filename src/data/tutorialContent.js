// Vite-native raw import: bundles every markdown file under /tutorial-content
// at build time, so the lab works fully offline with no network calls.
const modules = import.meta.glob("/tutorial-content/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Map { slug -> markdown string }
const content = {};
for (const path in modules) {
  const slug = path.split("/").pop().replace(/\.md$/, "");
  content[slug] = modules[path];
}

export default content;
