import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft, FiBookOpen } from "react-icons/fi";
import { sources } from "../data/tutorials.js";
import tutorialContent from "../data/tutorialContent.js";
import Markdown from "../components/Markdown.jsx";

export default function TutorialsPage() {
  const location = useLocation();
  const [activeSlug, setActiveSlug] = useState(() => {
    const hash = location.hash.replace("#", "");
    return hash && tutorialContent[hash] ? hash : sources[0].slug;
  });

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && tutorialContent[hash]) setActiveSlug(hash);
  }, [location.hash]);

  const active = sources.find((s) => s.slug === activeSlug) || sources[0];
  const body = tutorialContent[active.slug] || "_Content not found._";

  return (
    <div className="tutorials-page">
      <header className="tutorials-header">
        <Link to="/" className="back-link">
          <FiArrowLeft aria-hidden="true" /> Back to Lab home
        </Link>
        <h1>Bundled tutorials — full explanations</h1>
        <p className="muted">
          The complete text scraped from each source, rendered offline from
          <code className="inline-code"> /tutorial-content</code>. Pick a source
          on the left to read it.
        </p>
      </header>

      <div className="tutorials-layout">
        <aside className="tutorials-toc">
          <p className="sidebar-group-title">Sources</p>
          <ul>
            {sources.map((s) => (
              <li key={s.slug}>
                <button
                  type="button"
                  className={
                    s.slug === activeSlug
                      ? "toc-link toc-link-active"
                      : "toc-link"
                  }
                  onClick={() => {
                    setActiveSlug(s.slug);
                    window.history.replaceState(null, "", `#${s.slug}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <FiBookOpen aria-hidden="true" />
                  <span>{s.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <article className="tutorials-article">
          <p className="eyebrow">{active.summary}</p>
          <h2>{active.title}</h2>
          <p className="source-path">
            Source: <code>/tutorial-content/{active.slug}.md</code>
          </p>
          <Markdown source={body} />
        </article>
      </div>
    </div>
  );
}
