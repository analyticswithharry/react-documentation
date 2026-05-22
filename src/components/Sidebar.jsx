import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBookOpen,
  FiZap,
  FiPackage,
  FiLayers,
  FiFileText,
  FiSearch,
  FiCommand,
} from "react-icons/fi";
import { useSearch } from "../context/SearchContext.jsx";

const links = [
  { to: "/", label: "Start Here", icon: FiHome },
  { to: "/fundamentals", label: "React Fundamentals", icon: FiBookOpen },
  { to: "/hooks", label: "Hooks Playground", icon: FiZap },
  { to: "/projects", label: "Mini Projects", icon: FiPackage },
  { to: "/real-examples", label: "Real Examples", icon: FiLayers },
  { to: "/tutorials", label: "Tutorial Library", icon: FiFileText },
  { to: "/topics", label: "Topic Glossary", icon: FiBookOpen },
];

export default function Sidebar() {
  const { open: openSearch } = useSearch();
  return (
    <aside className="sidebar">
      <div>
        <p className="eyebrow">React Beginner Lab</p>
        <h1>Learn React by running code</h1>
        <p className="muted">
          Open a lesson, change the code, save the file, and watch the UI
          update.
        </p>
      </div>

      <button
        type="button"
        className="sidebar-search"
        onClick={openSearch}
        aria-label="Search the lab"
      >
        <FiSearch aria-hidden="true" />
        <span>Search…</span>
        <kbd>
          <FiCommand aria-hidden="true" />K
        </kbd>
      </button>

      <nav className="nav-links">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              <Icon className="nav-icon" aria-hidden="true" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="tip-box">
        <strong>Study rule</strong>
        <p>
          Learn one concept, then change one thing in the code. Tiny edits beat
          giant tutorials.
        </p>
      </div>
    </aside>
  );
}
