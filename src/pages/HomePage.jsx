import { Link } from "react-router-dom";
import { FiArrowRight, FiCommand, FiSearch } from "react-icons/fi";
import CodeBlock from "../components/CodeBlock.jsx";
import { lessons, sections, sources } from "../data/tutorials.js";
import { topicLabelToId } from "../data/topics.js";
import { useSearch } from "../context/SearchContext.jsx";

const labRoutes = [
  { name: "Fundamentals", to: "/fundamentals" },
  { name: "Hooks Playground", to: "/hooks" },
  { name: "Mini Projects", to: "/projects" },
  { name: "Real Examples", to: "/real-examples" },
];

const powerTopics = [
  "Components",
  "JSX",
  "Props",
  "State",
  "Events",
  "Conditional Rendering",
  "Lists + Keys",
  "Forms",
  "Lifting State Up",
  "useEffect",
  "Refs",
  "useReducer",
  "Context",
  "useMemo / useCallback",
  "Custom Hooks",
  "Data Fetching",
  "Thinking in React",
  "Routing",
  "Immutability",
  "Loading + Error UI",
];

export default function HomePage() {
  const lessonsBySection = sections.map((s) => ({
    ...s,
    items: lessons.filter((l) => l.section === s.id),
  }));
  const { open: openSearch } = useSearch();

  return (
    <div className="learn-dashboard bright-theme">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div className="dashboard-brand">React Tutorial Lab</div>
          <button
            type="button"
            className="dashboard-command"
            onClick={openSearch}
            aria-label="Open search"
          >
            <FiSearch aria-hidden="true" />
            <span>Search lessons, hooks, patterns…</span>
            <kbd>
              <FiCommand aria-hidden="true" />K
            </kbd>
          </button>
          <nav className="dashboard-menu" aria-label="Learning paths">
            <Link to="/fundamentals">Fundamentals</Link>
            <Link to="/hooks">Hooks</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/real-examples">Real Examples</Link>
          </nav>
        </header>

        <div className="dashboard-grid">
          <aside className="dashboard-sidebar">
            <p className="sidebar-title">Lesson Index</p>
            {lessonsBySection.map((sec) =>
              sec.items.length === 0 ? null : (
                <div key={sec.id} className="sidebar-group">
                  <p className="sidebar-group-title">{sec.label}</p>
                  <ul>
                    {sec.items.map((l) => (
                      <li key={l.id}>
                        <a href={`#${l.id}`}>
                          {l.chapter}. {l.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </aside>

          <main className="dashboard-main">
            <section className="dash-hero-card">
              <p className="eyebrow">Read • Copy code • Run in your own lab</p>
              <h1>
                A complete React tutorial — built from offline-scraped docs.
              </h1>
              <p>
                Every lesson below was generated from material we downloaded
                with a local Python script into{" "}
                <code className="inline-code">/tutorial-content</code>. No
                external links, no network calls at runtime — everything ships
                with the app.
              </p>
              <div className="hero-cta-row">
                <Link to="/fundamentals" className="hero-cta hero-cta-primary">
                  Open Lab
                </Link>
                <a href="#components" className="hero-cta hero-cta-secondary">
                  Jump to Chapter 1
                </a>
              </div>
            </section>

            <section className="dash-section">
              <div className="dash-section-head">
                <h2>Tutorial — Core React, chapter by chapter</h2>
              </div>
              <div className="lesson-list">
                {lessons.map((lesson) => (
                  <article
                    key={lesson.id}
                    id={lesson.id}
                    className="lesson-card"
                  >
                    <header className="lesson-head">
                      <span className="lesson-chapter">
                        Chapter {lesson.chapter} · {lesson.section}
                      </span>
                      <h3>{lesson.title}</h3>
                      <p className="lesson-summary">{lesson.summary}</p>
                    </header>

                    <CodeBlock code={lesson.code} />

                    <ul className="lesson-points">
                      {lesson.keyPoints.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>

                    <footer className="lesson-foot">
                      <span className="lesson-source">
                        Synthesized from local tutorial-content sources
                      </span>
                      <Link to="/fundamentals" className="card-action">
                        Try it in the lab <FiArrowRight aria-hidden="true" />
                      </Link>
                    </footer>
                  </article>
                ))}
              </div>
            </section>

            <section className="dash-section">
              <div className="dash-section-head">
                <h2>Practice inside your lab</h2>
              </div>
              <div className="lab-links">
                {labRoutes.map((route) => (
                  <Link key={route.to} to={route.to} className="lab-link">
                    {route.name}
                  </Link>
                ))}
              </div>
            </section>

            <section className="dash-section">
              <div className="dash-section-head">
                <h2>Bundled sources (offline)</h2>
                <Link to="/tutorials" className="card-action">
                  Read all tutorials <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
              <p className="muted dash-section-sub">
                Each card opens the full scraped explanation — the same content
                a tutorial website would show — rendered locally from{" "}
                <code className="inline-code">/tutorial-content</code>.
              </p>
              <div className="ref-grid">
                {sources.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/tutorials#${s.slug}`}
                    className="ref-card ref-card-link"
                  >
                    <h3>{s.title}</h3>
                    <p>{s.summary}</p>
                    <span className="ref-url">
                      /tutorial-content/{s.slug}.md
                    </span>
                    <span className="ref-cta">
                      Read full explanation <FiArrowRight aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </main>

          <aside className="dashboard-right">
            <div className="topic-card">
              <h3>Topic coverage</h3>
              <p>Checklist to track what you complete.</p>
              <ul className="topic-list">
                {powerTopics.map((topic) => {
                  const id = topicLabelToId[topic];
                  return (
                    <li key={topic}>
                      {id ? (
                        <Link to={`/topics#${id}`} className="topic-list-link">
                          {topic}
                          <FiArrowRight aria-hidden="true" />
                        </Link>
                      ) : (
                        topic
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
