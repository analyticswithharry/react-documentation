import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { SearchProvider } from "./context/SearchContext.jsx";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import FundamentalsPage from "./pages/FundamentalsPage";
import HooksPage from "./pages/HooksPage";
import ProjectsPage from "./pages/ProjectsPage";
import RealExamplesPage from "./pages/RealExamplesPage";
import TutorialsPage from "./pages/TutorialsPage";
import TopicsPage from "./pages/TopicsPage.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="fundamentals" element={<FundamentalsPage />} />
            <Route path="hooks" element={<HooksPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="real-examples" element={<RealExamplesPage />} />
            <Route path="tutorials" element={<TutorialsPage />} />
            <Route path="topics" element={<TopicsPage />} />
          </Route>
        </Routes>
      </SearchProvider>
    </ThemeProvider>
  );
}
