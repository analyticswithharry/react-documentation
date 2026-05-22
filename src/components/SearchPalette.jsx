import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiBookOpen,
  FiFileText,
  FiHash,
  FiCornerDownLeft,
  FiX,
} from "react-icons/fi";
import { search, snippet } from "../search/buildIndex.js";

const KIND_ICON = {
  lesson: FiBookOpen,
  source: FiFileText,
  section: FiHash,
};

export default function SearchPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => search(query, 25), [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // focus next tick so the modal mounts first
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [active, results.length]);

  if (!open) return null;

  function go(rec) {
    onClose();
    // react-router handles hash + path
    navigate(rec.to);
    // ensure browser scrolls to the hash target after nav
    requestAnimationFrame(() => {
      const hash = rec.to.split("#")[1];
      if (hash) {
        const target = document.getElementById(hash);
        if (target)
          target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0 });
      }
    });
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[active];
      if (hit) go(hit);
    }
  }

  return (
    <div className="search-overlay" role="dialog" aria-modal="true">
      <div className="search-backdrop" onClick={onClose} />
      <div className="search-modal" onKeyDown={onKeyDown}>
        <div className="search-input-row">
          <FiSearch aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, hooks, patterns, scraped tutorials…"
            aria-label="Search"
          />
          <button
            type="button"
            className="search-close"
            onClick={onClose}
            aria-label="Close search"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>

        <div className="search-results" ref={listRef}>
          {query.trim() === "" ? (
            <p className="search-hint">
              Type to search. Results come from lessons, scraped tutorials, and
              their section headings — all bundled offline.
            </p>
          ) : results.length === 0 ? (
            <p className="search-hint">No matches for “{query}”.</p>
          ) : (
            results.map((r, i) => {
              const Icon = KIND_ICON[r.kind] || FiSearch;
              return (
                <button
                  type="button"
                  key={r.id}
                  data-idx={i}
                  className={
                    "search-result" +
                    (i === active ? " search-result-active" : "")
                  }
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r)}
                >
                  <Icon aria-hidden="true" className="search-result-icon" />
                  <div className="search-result-body">
                    <div className="search-result-title-row">
                      <span className="search-result-title">{r.title}</span>
                      {r.badge && (
                        <span className="search-result-badge">{r.badge}</span>
                      )}
                    </div>
                    {r.subtitle && r.subtitle !== r.badge && (
                      <div className="search-result-sub">{r.subtitle}</div>
                    )}
                    <div className="search-result-snippet">
                      {snippet(r, query)}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="search-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>
              <FiCornerDownLeft aria-hidden="true" />
            </kbd>{" "}
            open
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
          <span className="search-footer-meta">
            {results.length
              ? `${results.length} result${results.length === 1 ? "" : "s"}`
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
