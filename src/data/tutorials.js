// React tutorial lessons — content authored from locally scraped sources in
// /tutorial-content (react.dev/learn, devhints.io/react, react-tutorial.app,
// react-admin, react-native). No external links are used at runtime.

export const lessons = [
  {
    id: "components",
    chapter: "1",
    section: "Fundamentals",
    title: "Components & JSX",
    summary:
      "A React component is a JavaScript function whose name starts with a capital letter and returns JSX (a markup-like syntax compiled to function calls).",
    code: `function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}`,
    keyPoints: [
      "Component names must start with a capital letter: <MyButton />",
      "Return one parent element; group siblings with a fragment <>...</>",
      "JSX is JavaScript — every tag must be closed (<br />, <img />)",
      "Use className instead of class; use camelCase for event props",
    ],
  },
  {
    id: "jsx-rules",
    chapter: "2",
    section: "Fundamentals",
    title: "JSX Rules & Expressions",
    summary:
      "Embed any JavaScript expression inside JSX with curly braces. Use them for attributes, text, and inline styles.",
    code: `const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      />
    </>
  );
}`,
    keyPoints: [
      "{ } injects JS expressions inside JSX",
      "Inline styles use a JS object: style={{ color: 'red' }}",
      "Strings can use quotes; everything else needs braces",
    ],
  },
  {
    id: "props",
    chapter: "3",
    section: "Fundamentals",
    title: "Passing Props",
    summary:
      "Props let a parent component pass data down to a child. They are read-only — the child must never mutate them.",
    code: `function Greeting({ name, age }) {
  return <p>Hello {name}, age {age}</p>;
}

export default function App() {
  return (
    <>
      <Greeting name="Ada" age={36} />
      <Greeting name="Linus" age={54} />
    </>
  );
}`,
    keyPoints: [
      "Destructure props in the function signature",
      "Strings use quotes; JS values use braces: age={36}",
      "Pass callbacks as props for child-to-parent events",
      "children is a special prop holding nested JSX",
    ],
  },
  {
    id: "state",
    chapter: "4",
    section: "Hooks",
    title: "State with useState",
    summary:
      "useState gives a component memory. Calling the setter schedules a re-render with the new value.",
    code: `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}`,
    keyPoints: [
      "useState returns [value, setter]",
      "Never mutate state — always call the setter with a new value",
      "Each component instance has its own independent state",
      "Use the updater form when next state depends on previous: setCount(c => c + 1)",
    ],
  },
  {
    id: "events",
    chapter: "5",
    section: "Fundamentals",
    title: "Responding to Events",
    summary:
      "Attach event handlers by passing a function to JSX attributes like onClick, onChange, onSubmit.",
    code: `function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}`,
    keyPoints: [
      "onClick={handleClick} — pass the function, do not call it",
      "Inline arrow works too: onClick={() => doX()}",
      "The event object is passed automatically: (e) => e.target.value",
      "Use e.preventDefault() to stop default form/link behavior",
    ],
  },
  {
    id: "conditional",
    chapter: "6",
    section: "Fundamentals",
    title: "Conditional Rendering",
    summary:
      "Use plain JavaScript control flow: if/else statements, ternary expressions, or short-circuit && inside JSX.",
    code: `function Status({ isLoggedIn }) {
  if (isLoggedIn) {
    return <AdminPanel />;
  }
  return <LoginForm />;
}

function Header({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <Logout /> : <Login />}
      {isLoggedIn && <span>Welcome back</span>}
    </div>
  );
}`,
    keyPoints: [
      "Early-return for top-level alternatives",
      "Ternary for either/or inside JSX",
      "&& for show-or-nothing — beware of rendering 0 by accident",
    ],
  },
  {
    id: "lists",
    chapter: "7",
    section: "Fundamentals",
    title: "Rendering Lists with map() and key",
    summary:
      "Transform arrays into JSX with .map(). Every list item needs a stable, unique key prop so React can track it across renders.",
    code: `const products = [
  { id: 1, title: 'Cabbage', isFruit: false },
  { id: 2, title: 'Garlic',  isFruit: false },
  { id: 3, title: 'Apple',   isFruit: true  },
];

export default function ShoppingList() {
  return (
    <ul>
      {products.map((p) => (
        <li
          key={p.id}
          style={{ color: p.isFruit ? 'magenta' : 'darkgreen' }}
        >
          {p.title}
        </li>
      ))}
    </ul>
  );
}`,
    keyPoints: [
      "key must be unique among siblings and stable across renders",
      "Do not use array index as key when items can reorder",
      "Extract complex item markup into its own component",
    ],
  },
  {
    id: "forms",
    chapter: "8",
    section: "Fundamentals",
    title: "Controlled Forms",
    summary:
      "A controlled component owns its input value in state. Each keystroke updates state, which then renders the input.",
    code: `import { useState } from 'react';

export default function NameForm() {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert('Hello, ' + name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}`,
    keyPoints: [
      "value + onChange = a controlled input",
      "Always call e.preventDefault() in form onSubmit",
      "Group related fields into a single state object when convenient",
    ],
  },
  {
    id: "lifting",
    chapter: "9",
    section: "Fundamentals",
    title: "Lifting State Up",
    summary:
      "When sibling components need to share data, move the state into their closest common parent and pass it down via props.",
    code: `import { useState } from 'react';

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);

  return (
    <>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </>
  );
}`,
    keyPoints: [
      "State lives in the lowest common ancestor",
      "Pass data DOWN as props, send events UP via callbacks",
      "Avoid duplicate state — derive from a single source of truth",
    ],
  },
  {
    id: "effect",
    chapter: "10",
    section: "Hooks",
    title: "Side Effects with useEffect",
    summary:
      "useEffect runs after render and lets you synchronize React with external systems: the DOM, subscriptions, timers, network.",
    code: `import { useState, useEffect } from 'react';

export default function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Click me ({count})
    </button>
  );
}`,
    keyPoints: [
      "Dependency array controls when the effect re-runs",
      "Empty deps [] = run once after the first render",
      "Return a cleanup function for subscriptions, timers, sockets",
      "Don't put pure rendering logic inside useEffect",
    ],
  },
  {
    id: "ref",
    chapter: "11",
    section: "Hooks",
    title: "Refs for DOM access",
    summary:
      "useRef returns a mutable object whose .current persists across renders without causing re-renders. Use it to access DOM nodes or store values.",
    code: `import { useRef } from 'react';

export default function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  function focusInput() {
    inputEl.current.focus();
  }

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={focusInput}>Focus the input</button>
    </>
  );
}`,
    keyPoints: [
      "ref.current is mutable; changes do not trigger re-renders",
      "Pass <node ref={myRef} /> to grab a DOM element",
      "Refs are an escape hatch — prefer state for visible data",
    ],
  },
  {
    id: "reducer",
    chapter: "12",
    section: "Hooks",
    title: "useReducer for complex state",
    summary:
      "When state transitions are complex or involve multiple sub-values, consolidate logic into a reducer function and dispatch typed actions.",
    code: `import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>reset</button>
    </>
  );
}`,
    keyPoints: [
      "Reducer is a pure function: (state, action) => newState",
      "Treat state as immutable — return new objects/arrays",
      "Great fit for forms, undo/redo, or coordinated state machines",
    ],
  },
  {
    id: "context",
    chapter: "13",
    section: "Hooks",
    title: "Context for deep prop sharing",
    summary:
      "Context lets a parent supply a value to any descendant without passing props through every level. Use it for theme, current user, locale.",
    code: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <button className={\`btn-\${theme}\`}>Theme is {theme}</button>;
}

export default function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle
      </button>
    </ThemeContext.Provider>
  );
}`,
    keyPoints: [
      "createContext(defaultValue) returns a context object",
      "<Context.Provider value={...}> wraps the subtree",
      "useContext(Context) reads the nearest provider's value",
      "Combine with useReducer for app-wide state",
    ],
  },
  {
    id: "memo",
    chapter: "14",
    section: "Performance",
    title: "useMemo & useCallback",
    summary:
      "Memoize expensive computations with useMemo, and stabilize function references with useCallback so memoized children don't re-render needlessly.",
    code: `import { useMemo, useCallback, useState } from 'react';

export default function List({ items }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => items.filter((i) => i.includes(query)),
    [items, query]
  );

  const onChange = useCallback(
    (e) => setQuery(e.target.value),
    []
  );

  return (
    <>
      <input value={query} onChange={onChange} />
      <ul>
        {filtered.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </>
  );
}`,
    keyPoints: [
      "useMemo(fn, deps) caches the RESULT",
      "useCallback(fn, deps) caches the FUNCTION itself",
      "Don't over-memoize — only when profiler shows a real win",
    ],
  },
  {
    id: "custom-hook",
    chapter: "15",
    section: "Hooks",
    title: "Custom Hooks",
    summary:
      "A function whose name starts with 'use' that calls other hooks is a custom hook. Use them to share STATEFUL LOGIC (not state) across components.",
    code: `import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return width;
}

export default function App() {
  const width = useWindowWidth();
  return <p>Window is {width}px wide</p>;
}`,
    keyPoints: [
      "Name convention: useSomething",
      "Hooks call other hooks only at the top level (no loops/ifs)",
      "Custom hooks share LOGIC; each call has its own state",
    ],
  },
  {
    id: "fetching",
    chapter: "16",
    section: "Real-world",
    title: "Data Fetching with useEffect",
    summary:
      "Fetch on mount, store data + loading + error in state, cancel stale responses on unmount or query change.",
    code: `import { useEffect, useState } from 'react';

export default function Users() {
  const [data, setData]   = useState([]);
  const [loading, setLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoad(true);

    fetch('/api/users')
      .then((r) => r.json())
      .then((rows) => { if (!cancelled) setData(rows); })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoad(false); });

    return () => { cancelled = true; };
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error: {String(error)}</p>;
  return <ul>{data.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
    keyPoints: [
      "Track loading, error, and data as separate state",
      "Cancel stale responses via a cancelled flag or AbortController",
      "For production apps, prefer a library (TanStack Query, SWR)",
    ],
  },
  {
    id: "thinking",
    chapter: "17",
    section: "Design",
    title: "Thinking in React",
    summary:
      "The recommended 5-step process for building UIs: break the design into components, build a static version, find minimum state, identify where it lives, then add data flow.",
    code: `// Step 1: break the UI into a component hierarchy
//   FilterableProductTable
//     SearchBar
//     ProductTable
//       ProductCategoryRow
//       ProductRow

// Step 2: build a static version (no state, just props)
function ProductRow({ product }) {
  const name = product.stocked
    ? product.name
    : <span style={{ color: 'red' }}>{product.name}</span>;
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// Step 3: find the minimum state
//   - search text  (state)
//   - inStockOnly  (state)
//   - product list (props, comes from server)

// Step 4: state lives in FilterableProductTable (lowest common parent)
// Step 5: add inverse data flow with callbacks (onSearchChange, etc.)`,
    keyPoints: [
      "Break UI into a component tree before writing code",
      "Build static, then add state",
      "Keep state minimal — derive the rest",
      "Lift state to the closest common ancestor",
    ],
  },
  {
    id: "router",
    chapter: "18",
    section: "Real-world",
    title: "Client-side Routing",
    summary:
      "React Router maps URLs to components without a full page reload. Use <Link> instead of <a> to navigate within the SPA.",
    code: `import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

function Home()  { return <h1>Home</h1>; }
function About() { return <h1>About</h1>; }

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/"      element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`,
    keyPoints: [
      '<Link to="/x"> avoids a full page reload',
      "<Routes> picks the first <Route> that matches",
      "Nested routes share layouts via <Outlet />",
    ],
  },
  {
    id: "immutability",
    chapter: "19",
    section: "Patterns",
    title: "Immutable Updates",
    summary:
      "Never mutate state. Build new objects/arrays with spreads, map, filter, and concat so React detects the change.",
    code: `// BAD: mutates existing state
state.items.push(item);
setItems(state.items);

// GOOD: new array
setItems([...items, item]);

// GOOD: update one item
setItems(items.map((it) =>
  it.id === id ? { ...it, done: true } : it
));

// GOOD: remove one item
setItems(items.filter((it) => it.id !== id));

// GOOD: nested object
setUser({ ...user, address: { ...user.address, city: 'Berlin' } });`,
    keyPoints: [
      "Spread (...) creates a shallow copy",
      "Use map() to update, filter() to remove, concat/spread to add",
      "For deeply nested state, consider useReducer or Immer",
    ],
  },
  {
    id: "errors",
    chapter: "20",
    section: "Patterns",
    title: "Loading & Error UI",
    summary:
      "Always render three states: loading, error, and success. This is the foundation of every reliable data-driven UI.",
    code: `function ProductList({ products, loading, error }) {
  if (loading) return <Spinner />;
  if (error)   return <ErrorBanner message={error.message} />;
  if (products.length === 0) return <Empty />;

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}`,
    keyPoints: [
      "Loading, error, empty, and success — handle all four",
      "Render fallbacks early; keep the happy path flat",
      "Use Error Boundaries to catch render-time crashes",
    ],
  },
];

export const sections = [
  { id: "Fundamentals", label: "Fundamentals" },
  { id: "Hooks", label: "Hooks" },
  { id: "Performance", label: "Performance" },
  { id: "Patterns", label: "Patterns" },
  { id: "Design", label: "Design" },
  { id: "Real-world", label: "Real-world" },
];

export const sources = [
  {
    slug: "react-quickstart",
    title: "React.dev — Quick Start",
    summary: "Official 80% of daily React concepts.",
  },
  {
    slug: "devhints-react",
    title: "Devhints React Cheatsheet",
    summary: "Fast lookup for syntax and patterns.",
  },
  {
    slug: "react-thinking",
    title: "Thinking in React",
    summary: "5-step process for designing UIs.",
  },
  {
    slug: "react-state",
    title: "State: A Component's Memory",
    summary: "Deep dive into useState semantics.",
  },
  {
    slug: "react-effects",
    title: "Synchronizing with Effects",
    summary: "When and how to use useEffect.",
  },
  {
    slug: "react-reducer",
    title: "Extracting Logic into a Reducer",
    summary: "Patterns for complex state.",
  },
  {
    slug: "react-context",
    title: "Passing Data Deeply with Context",
    summary: "Avoiding prop drilling.",
  },
  {
    slug: "react-tutorial-app",
    title: "react-tutorial.app (React 19)",
    summary: "Interactive lessons + challenges.",
  },
  {
    slug: "react-admin",
    title: "React Admin Tutorial",
    summary: "Building a real admin app.",
  },
  {
    slug: "react-native",
    title: "React Native",
    summary: "Same React, native mobile UI.",
  },
];
