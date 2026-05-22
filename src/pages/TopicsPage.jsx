import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowRight, FiHash } from "react-icons/fi";
import CodeBlock from "../components/CodeBlock.jsx";
import { topics } from "../data/topics.js";

export default function TopicsPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const id = hash.replace("#", "");
    requestAnimationFrame(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [hash]);

  return (
    <div className="topics-page">
      <header className="topics-header">
        <p className="eyebrow">Topic glossary</p>
        <h1>Every React topic in one place</h1>
        <p className="muted">
          Click any topic from the home checklist (or the sidebar below) to jump
          straight to its summary, code sample, and links into the lab.
        </p>
      </header>

      <div className="topics-layout">
        <nav className="topics-toc" aria-label="Topics index">
          <p className="topics-toc-title">Topics</p>
          <ul>
            {topics.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`}>{t.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="topics-main">
          {topics.map((t) => (
            <article id={t.id} key={t.id} className="topic-entry">
              <header className="topic-entry-header">
                <a
                  href={`#${t.id}`}
                  className="topic-anchor"
                  aria-label={`Link to ${t.label}`}
                >
                  <FiHash aria-hidden="true" />
                </a>
                <h2>{t.label}</h2>
              </header>
              <p className="topic-tagline">{t.tagline}</p>
              <p className="topic-brief">{t.brief}</p>

              {t.code && (
                <CodeBlock language="jsx" code={t.code} />
              )}

              {t.bullets?.length > 0 && (
                <ul className="topic-bullets">
                  {t.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}

              {t.related?.length > 0 && (
                <div className="topic-related">
                  <span className="topic-related-label">See it in the lab:</span>
                  {t.related.map((r) => (
                    <Link key={r.to} to={r.to} className="topic-related-link">
                      {r.label} <FiArrowRight aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}
