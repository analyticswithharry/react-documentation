// Curated topic reference. Each topic has:
//   id        - URL slug used as `#hash` on /topics
//   label     - display name (matches the homepage checklist)
//   tagline   - one-line plain-English summary
//   brief     - 2-4 sentence explanation
//   code      - tiny illustrative snippet (kept short on purpose)
//   bullets   - key takeaways
//   related   - { to, label }[] links into the lab + tutorial library

export const topics = [
  {
    id: "components",
    label: "Components",
    tagline: "Reusable pieces of UI written as functions.",
    brief:
      "A component is a JavaScript function that returns JSX. You compose your UI by nesting smaller components inside bigger ones. Components let you reuse markup, behavior, and styles without copy-pasting.",
    code: `function Hello({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default function App() {
  return <Hello name="Ada" />;
}`,
    bullets: [
      "Always start component names with a capital letter.",
      "A component returns a single JSX tree (use a Fragment <>...</> for siblings).",
      "Keep components small and focused on one job.",
    ],
    related: [
      { to: "/fundamentals#jsx", label: "JSX lesson" },
      { to: "/tutorials#react-quickstart", label: "react.dev Quick Start" },
    ],
  },
  {
    id: "jsx",
    label: "JSX",
    tagline: "HTML-like syntax that compiles to JS function calls.",
    brief:
      "JSX lets you write markup inside JavaScript. It is not HTML — attributes are camelCase (className, onClick) and `{}` embeds JS expressions. Every JSX element is just sugar for React.createElement(...).",
    code: `const user = { name: "Ada", age: 36 };

const el = (
  <div className="card">
    <h2>{user.name}</h2>
    <p>Age: {user.age * 1}</p>
  </div>
);`,
    bullets: [
      "Use className instead of class, htmlFor instead of for.",
      "Expressions go in { }, not statements (no if/for inside JSX).",
      "Self-close tags that have no children: <img />, <br />.",
    ],
    related: [
      { to: "/fundamentals#jsx", label: "JSXDemo" },
      { to: "/tutorials#devhints-react", label: "JSX cheatsheet" },
    ],
  },
  {
    id: "props",
    label: "Props",
    tagline: "Inputs passed from parent to child component.",
    brief:
      "Props are read-only data a parent gives its child. The child cannot mutate them — it must ask the parent to change state. Destructure props in the function signature for clean code.",
    code: `function Badge({ color, children }) {
  return <span style={{ background: color }}>{children}</span>;
}

<Badge color="tomato">New</Badge>`,
    bullets: [
      "Props are read-only inside the receiving component.",
      "Pass functions as props to let children notify the parent.",
      "Use default values: function Foo({ size = 'md' }) {}",
    ],
    related: [{ to: "/fundamentals#props", label: "PropsDemo" }],
  },
  {
    id: "state",
    label: "State",
    tagline: "Component-owned data that triggers re-renders.",
    brief:
      "State is data a component remembers between renders. Call useState to declare it; call the setter to update. Each setter call schedules a re-render with the new value.",
    code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
    bullets: [
      "Never mutate state directly — always call the setter.",
      "State updates are batched and asynchronous.",
      "Use functional updates when the next state depends on the previous: setCount(c => c + 1).",
    ],
    related: [
      { to: "/fundamentals#counter", label: "CounterDemo" },
      { to: "/tutorials#react-state", label: "react.dev: State" },
    ],
  },
  {
    id: "events",
    label: "Events",
    tagline: "Respond to user input with handler props.",
    brief:
      "React wraps DOM events in a SyntheticEvent. Attach handlers via camelCase props (onClick, onChange, onSubmit). Handlers receive the event and can call setters to update state.",
    code: `function Toggle() {
  const [on, setOn] = useState(false);
  return (
    <button onClick={() => setOn(!on)}>
      {on ? "ON" : "OFF"}
    </button>
  );
}`,
    bullets: [
      "Use onClick, not onclick.",
      "Pass a function reference, not the result of calling it.",
      "Call event.preventDefault() in form submit handlers.",
    ],
    related: [{ to: "/fundamentals#counter", label: "CounterDemo" }],
  },
  {
    id: "conditional-rendering",
    label: "Conditional Rendering",
    tagline: "Show different UI based on a condition.",
    brief:
      "Use plain JS — ternary (?:), && short-circuit, or early return — to choose which JSX to render. Returning null hides the component entirely.",
    code: `function Status({ user }) {
  if (!user) return <p>Loading…</p>;
  return user.isAdmin
    ? <AdminPanel />
    : <UserPanel name={user.name} />;
}`,
    bullets: [
      "{cond && <X />} renders X only when cond is truthy.",
      "Beware {count && ...} — 0 will render as '0'. Use {count > 0 && ...}.",
      "Early return is the cleanest pattern for loading/error states.",
    ],
    related: [{ to: "/real-examples#fetch-users", label: "FetchUsersDemo" }],
  },
  {
    id: "lists-keys",
    label: "Lists + Keys",
    tagline: "Render arrays with stable identifiers.",
    brief:
      "Map an array to JSX with .map(). React needs a `key` prop per item to track identity across renders. Use a stable id, never the array index when the list can reorder.",
    code: `<ul>
  {todos.map((t) => (
    <li key={t.id}>{t.title}</li>
  ))}
</ul>`,
    bullets: [
      "Keys must be unique among siblings, not globally.",
      "Don't use Math.random() — keys must be stable.",
      "Index keys are OK only for static, never-reordered lists.",
    ],
    related: [{ to: "/projects#todo", label: "TodoDemo" }],
  },
  {
    id: "forms",
    label: "Forms",
    tagline: "Controlled inputs bound to state.",
    brief:
      "A controlled input has its value driven by state. You read with `value={state}` and write in onChange. This gives React full control of the form data.",
    code: `function NameForm() {
  const [name, setName] = useState("");
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}`,
    bullets: [
      "Always pair value + onChange (or use defaultValue for uncontrolled).",
      "Call event.preventDefault() inside onSubmit.",
      "For many fields, store state as an object and spread updates.",
    ],
    related: [{ to: "/fundamentals#form", label: "FormDemo" }],
  },
  {
    id: "lifting-state-up",
    label: "Lifting State Up",
    tagline: "Move shared state to the closest common parent.",
    brief:
      "When two siblings need the same data, move that data to their parent. The parent owns state and passes it down as props plus a setter callback. This is the canonical way to keep components in sync.",
    code: `function Parent() {
  const [text, setText] = useState("");
  return (
    <>
      <Input value={text} onChange={setText} />
      <Preview value={text} />
    </>
  );
}`,
    bullets: [
      "Shared state lives at the lowest common ancestor.",
      "Children become 'controlled' — they don't own the data.",
      "If lifting feels painful, consider Context.",
    ],
    related: [{ to: "/tutorials#react-thinking", label: "Thinking in React" }],
  },
  {
    id: "useeffect",
    label: "useEffect",
    tagline: "Synchronize with things outside React.",
    brief:
      "useEffect runs side effects (fetching, subscriptions, timers, DOM APIs) after render. Provide a dependency array so it only re-runs when those values change. Return a cleanup function for subscriptions and timers.",
    code: `useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id); // cleanup
}, []);`,
    bullets: [
      "Empty deps [] = run once after mount.",
      "Missing deps = stale closures (you'll read old state).",
      "Always clean up subscriptions, timers, and listeners.",
    ],
    related: [
      { to: "/hooks#effect", label: "EffectDemo" },
      { to: "/tutorials#react-effects", label: "react.dev: Effects" },
    ],
  },
  {
    id: "refs",
    label: "Refs",
    tagline: "Hold a mutable value that does not trigger re-render.",
    brief:
      "useRef gives you a `.current` box. Common uses: grabbing a DOM node (input focus, scroll), or stashing values that change without needing a re-render (previous value, interval id).",
    code: `const inputRef = useRef(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

return <input ref={inputRef} />;`,
    bullets: [
      "Reading/writing ref.current does NOT cause a re-render.",
      "Refs are perfect for imperative DOM actions.",
      "Don't use refs to avoid lifting state — that's an anti-pattern.",
    ],
    related: [{ to: "/hooks#ref", label: "RefDemo" }],
  },
  {
    id: "usereducer",
    label: "useReducer",
    tagline: "useState for complex or related state transitions.",
    brief:
      "useReducer takes a reducer function `(state, action) => newState` and an initial state. Components dispatch action objects instead of calling setters directly. Great when several state fields update together.",
    code: `function reducer(state, action) {
  switch (action.type) {
    case "inc": return { count: state.count + 1 };
    case "reset": return { count: 0 };
  }
}
const [state, dispatch] = useReducer(reducer, { count: 0 });`,
    bullets: [
      "Use it when next state depends on multiple values.",
      "Reducers must be pure — no fetch, no Math.random inside.",
      "Pairs well with Context for app-wide state.",
    ],
    related: [
      { to: "/hooks#reducer", label: "ReducerDemo" },
      { to: "/real-examples#cart-reducer", label: "CartReducerDemo" },
    ],
  },
  {
    id: "context",
    label: "Context",
    tagline: "Pass data deep without prop-drilling.",
    brief:
      "Context lets a Provider supply a value that any descendant can read via useContext. Use it for things many components need: theme, current user, locale. Don't reach for it for every prop.",
    code: `const ThemeCtx = createContext("light");

<ThemeCtx.Provider value="dark">
  <App />
</ThemeCtx.Provider>

function Button() {
  const theme = useContext(ThemeCtx);
}`,
    bullets: [
      "Every Provider value change re-renders all consumers.",
      "Split large contexts (state + dispatch) to limit re-renders.",
      "Combine with useReducer for app-level state.",
    ],
    related: [
      { to: "/hooks#context", label: "ContextDemo" },
      { to: "/tutorials#react-context", label: "react.dev: Context" },
    ],
  },
  {
    id: "memo-callback",
    label: "useMemo / useCallback",
    tagline: "Cache values and functions between renders.",
    brief:
      "useMemo caches the result of an expensive calculation; useCallback caches a function identity. Both take a dependency array. Use them only when you've measured a real performance issue or you need stable identity for memoized children.",
    code: `const filtered = useMemo(
  () => items.filter((i) => i.active),
  [items]
);

const onSelect = useCallback((id) => {
  setSelected(id);
}, []);`,
    bullets: [
      "Don't wrap everything — memoization isn't free.",
      "useCallback(fn, deps) ≡ useMemo(() => fn, deps).",
      "Stable callbacks matter when passed to React.memo children.",
    ],
    related: [
      { to: "/real-examples#product-filter", label: "ProductFilterDemo" },
    ],
  },
  {
    id: "custom-hooks",
    label: "Custom Hooks",
    tagline: "Extract reusable stateful logic into a function.",
    brief:
      "A custom hook is just a function whose name starts with `use` and which calls other hooks inside. Move repeated logic (form state, fetching, localStorage) into a hook and reuse it across components.",
    code: `function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return [on, toggle];
}`,
    bullets: [
      "Hook names MUST start with 'use' (lint rules depend on it).",
      "Each call to a custom hook owns its own state.",
      "Compose small hooks instead of one giant hook.",
    ],
    related: [{ to: "/hooks#effect", label: "useLocalStorage hook in source" }],
  },
  {
    id: "data-fetching",
    label: "Data Fetching",
    tagline: "Load remote data with effects (or a library).",
    brief:
      "The simplest approach is `useEffect` + `fetch`, tracking loading/error/data state. For production, prefer a library (TanStack Query, SWR, RTK Query) that handles caching, refetching, and stale data automatically.",
    code: `useEffect(() => {
  let cancelled = false;
  fetch("/api/users")
    .then((r) => r.json())
    .then((d) => !cancelled && setUsers(d));
  return () => { cancelled = true; };
}, []);`,
    bullets: [
      "Always handle loading and error states.",
      "Guard against setting state after unmount.",
      "Use AbortController to cancel in-flight fetches.",
    ],
    related: [{ to: "/real-examples#fetch-users", label: "FetchUsersDemo" }],
  },
  {
    id: "thinking-in-react",
    label: "Thinking in React",
    tagline: "A 5-step process for building any UI.",
    brief:
      "Break the design into a component tree, build a static version first, identify the minimum state, decide where that state lives, then wire up the inverse data flow (callbacks from children to parents).",
    code: `// 1. Mock     2. Tree     3. Static
// 4. State    5. Where lives    6. Inverse flow`,
    bullets: [
      "Find the minimal complete state — derive the rest.",
      "State lives at the lowest common ancestor that needs it.",
      "Inverse data flow = callbacks lifting changes upward.",
    ],
    related: [
      {
        to: "/tutorials#react-thinking",
        label: "react.dev: Thinking in React",
      },
    ],
  },
  {
    id: "routing",
    label: "Routing",
    tagline: "Map URLs to components with react-router.",
    brief:
      "react-router-dom defines <Routes>/<Route> pairs that render different components per URL. Use <Link> for navigation (no full page reload) and useParams / useNavigate inside components.",
    code: `<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users/:id" element={<User />} />
  </Routes>
</BrowserRouter>`,
    bullets: [
      'Use <Link to="..."> instead of <a href> for internal routes.',
      "Nested routes share layouts via <Outlet />.",
      "useParams gives URL params; useNavigate programmatic nav.",
    ],
    related: [
      { to: "/tutorials#devhints-react", label: "Routing in cheatsheet" },
    ],
  },
  {
    id: "immutability",
    label: "Immutability",
    tagline: "Treat state as read-only — always produce new objects.",
    brief:
      "React detects changes by reference equality. If you mutate an array or object in place, React often won't re-render. Always create new arrays/objects with spread syntax or array methods that return new arrays.",
    code: `// ❌ mutation
items.push(newItem);
setItems(items);

// ✅ new array
setItems([...items, newItem]);
setUser({ ...user, name: "Ada" });`,
    bullets: [
      "Use spread, .map, .filter, .slice — they return new arrays.",
      "For deep updates, spread at every level you change.",
      "Libraries like Immer let you 'mutate' a draft safely.",
    ],
    related: [{ to: "/real-examples#cart-reducer", label: "CartReducerDemo" }],
  },
  {
    id: "loading-error-ui",
    label: "Loading + Error UI",
    tagline: "Always render the three states: loading, error, data.",
    brief:
      "Every async operation has three outcomes. Track them as state (or with a library) and render a spinner/skeleton for loading, a friendly message for error, and the real content when data arrives.",
    code: `if (loading) return <Spinner />;
if (error)   return <p>Failed: {error.message}</p>;
return <List items={data} />;`,
    bullets: [
      "Never render undefined data — guard with loading checks.",
      "Show retry buttons on error states.",
      "Skeleton placeholders feel faster than spinners.",
    ],
    related: [{ to: "/real-examples#fetch-users", label: "FetchUsersDemo" }],
  },
];

export const topicById = Object.fromEntries(topics.map((t) => [t.id, t]));

// Map the exact homepage checklist labels → topic ids (for clickable list).
export const topicLabelToId = Object.fromEntries(
  topics.map((t) => [t.label, t.id]),
);
