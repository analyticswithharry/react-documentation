import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ContextDemo() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="demo-grid">
      <div className={`demo-box theme-box theme-${theme}`}>
        <h3>Current theme: {theme}</h3>
        <p>Context shares this value with any component that needs it.</p>
        <button onClick={toggleTheme}>Toggle theme</button>
      </div>
      <div className="demo-box">
        <h3>Why use context?</h3>
        <p>
          It helps when many components need the same data, like theme,
          language, or logged-in user.
        </p>
      </div>
    </div>
  );
}
