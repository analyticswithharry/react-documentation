import SectionCard from "../components/SectionCard";
import EffectDemo from "../lessons/hooks/EffectDemo";
import RefDemo from "../lessons/hooks/RefDemo";
import ContextDemo from "../lessons/hooks/ContextDemo";
import ReducerDemo from "../lessons/hooks/ReducerDemo";
import { lessons } from "../data/tutorials.js";

const byId = Object.fromEntries(lessons.map((l) => [l.id, l]));

export default function HooksPage() {
  return (
    <div className="page-stack">
      <section className="hero small-hero">
        <p className="eyebrow">Level 2</p>
        <h2>Hooks playground</h2>
        <p>
          These examples show what each hook does and when you might use it.
        </p>
      </section>

      <SectionCard
        title="useEffect"
        description="Run side effects like API calls, timers, or syncing data after render."
        code={byId["effect"].code}
      >
        <EffectDemo />
      </SectionCard>

      <SectionCard
        title="useRef"
        description="Keep a value without causing a re-render, or access a DOM element."
        code={byId["ref"].code}
      >
        <RefDemo />
      </SectionCard>

      <SectionCard
        title="useContext"
        description="Share values like theme or user data without passing props everywhere."
        code={byId["context"].code}
      >
        <ContextDemo />
      </SectionCard>

      <SectionCard
        title="useReducer"
        description="Great when one piece of state has many actions."
        code={byId["reducer"].code}
      >
        <ReducerDemo />
      </SectionCard>
    </div>
  );
}
