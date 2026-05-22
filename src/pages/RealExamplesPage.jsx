import SectionCard from "../components/SectionCard";
import ProductFilterDemo from "../lessons/real/ProductFilterDemo";
import FetchUsersDemo from "../lessons/real/FetchUsersDemo";
import CartReducerDemo from "../lessons/real/CartReducerDemo";
import { lessons } from "../data/tutorials.js";

const byId = Object.fromEntries(lessons.map((l) => [l.id, l]));

export default function RealExamplesPage() {
  return (
    <div className="page-stack">
      <section className="hero small-hero">
        <p className="eyebrow">Level 4</p>
        <h2>Real examples</h2>
        <p>
          These examples feel closer to real apps: searching, filtering,
          fetching data, and managing cart state.
        </p>
      </section>

      <SectionCard
        title="Product search + filter"
        description="A very common UI pattern in real apps: input, derived data, filtering, and list rendering."
        code={byId["lists"].code}
      >
        <ProductFilterDemo />
      </SectionCard>

      <SectionCard
        title="Fetching users from an API"
        description="This example shows loading, error, success, and retry state with useEffect and fetch."
        code={byId["fetching"].code}
      >
        <FetchUsersDemo />
      </SectionCard>

      <SectionCard
        title="Cart with useReducer"
        description="A practical useReducer example that feels like e-commerce or dashboard state."
        code={byId["reducer"].code}
      >
        <CartReducerDemo />
      </SectionCard>
    </div>
  );
}
