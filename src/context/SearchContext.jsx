import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import SearchPalette from "../components/SearchPalette.jsx";

const SearchContext = createContext({ open: () => {} });

export function SearchProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    function onKey(e) {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setIsOpen((v) => !v);
      } else if (e.key === "/" && !isOpen) {
        // Only trigger when not typing in an input/textarea
        const tag = (document.activeElement?.tagName || "").toLowerCase();
        if (
          tag !== "input" &&
          tag !== "textarea" &&
          !document.activeElement?.isContentEditable
        ) {
          e.preventDefault();
          setIsOpen(true);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <SearchContext.Provider value={{ open, close }}>
      {children}
      <SearchPalette open={isOpen} onClose={close} />
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
