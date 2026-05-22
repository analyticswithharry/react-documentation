import SectionCard from "../components/SectionCard";
import TodoDemo from "../lessons/projects/TodoDemo";
import { lessons } from "../data/tutorials.js";

const byId = Object.fromEntries(lessons.map((l) => [l.id, l]));

export default function ProjectsPage() {
  return (
    <div className="page-stack">
      <section className="hero small-hero">
        <p className="eyebrow">Level 3</p>
        <h2>Mini projects</h2>
        <p>
          Projects are where React starts making sense. This todo app combines
          the basics.
        </p>
      </section>

      <SectionCard
        title="Todo app"
        description="This single project uses state, forms, lists, props thinking, and local storage."
        code={byId["immutability"].code}
      >
        <TodoDemo />
      </SectionCard>

      <SectionCard
        title="What to build next"
        description="After this todo, make these in order."
      >
        <ol className="number-list">
          <li>Counter app</li>
          <li>Weather app with fetch</li>
          <li>Notes app with local storage</li>
          <li>Movie search app</li>
          <li>Dashboard with routing</li>
        </ol>
      </SectionCard>
    </div>
  );
}
