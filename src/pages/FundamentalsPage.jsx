import SectionCard from "../components/SectionCard";
import JSXDemo from "../lessons/basics/JSXDemo";
import PropsDemo from "../lessons/basics/PropsDemo";
import CounterDemo from "../lessons/basics/CounterDemo";
import FormDemo from "../lessons/basics/FormDemo";
import { lessons } from "../data/tutorials.js";

const byId = Object.fromEntries(lessons.map((l) => [l.id, l]));

export default function FundamentalsPage() {
  return (
    <div className="page-stack">
      <section className="hero small-hero">
        <p className="eyebrow">Level 1</p>
        <h2>React fundamentals</h2>
        <p>
          Master these first: JSX, components, props, events, state, lists, and
          forms.
        </p>
      </section>

      <SectionCard
        title="JSX + rendering"
        description="JSX looks like HTML, but it lives inside JavaScript."
        code={byId["jsx-rules"].code}
      >
        <JSXDemo />
      </SectionCard>

      <SectionCard
        title="Props + reusable components"
        description="Props let a parent send data into a child component."
        code={byId["props"].code}
      >
        <PropsDemo />
      </SectionCard>

      <SectionCard
        title="State + events"
        description="useState stores changing values and event handlers update them."
        code={byId["state"].code}
      >
        <CounterDemo />
      </SectionCard>

      <SectionCard
        title="Forms"
        description="Controlled inputs are the most common beginner form pattern in React."
        code={byId["forms"].code}
      >
        <FormDemo />
      </SectionCard>
    </div>
  );
}
