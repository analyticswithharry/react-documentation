import { Outlet } from "react-router-dom";
import { FiInstagram, FiBriefcase } from "react-icons/fi";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="content-wrapper">
        <main className="content-area">
          <Outlet />
        </main>
        <footer className="app-footer">
          <div className="app-footer-inner">
            <span className="app-footer-brand">
              React Beginner Lab &middot; Offline study companion
            </span>
            <div className="app-footer-credits">
              <a
                href="https://instagram.com/analyticswithharty"
                target="_blank"
                rel="noopener noreferrer"
                className="app-footer-link"
              >
                <FiInstagram aria-hidden="true" />
                <span>@analyticswithharty</span>
              </a>
              <span className="app-footer-sep">&bull;</span>
              <span className="app-footer-org">
                <FiBriefcase aria-hidden="true" />
                <span>Squid Consultancy Group Ltd</span>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
