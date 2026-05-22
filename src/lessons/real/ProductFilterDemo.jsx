import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "React Course", category: "Course", price: 29 },
  { id: 2, name: "UI Kit", category: "Design", price: 19 },
  { id: 3, name: "API Starter", category: "Code", price: 39 },
  { id: 4, name: "Portfolio Template", category: "Design", price: 24 },
  { id: 5, name: "Dashboard Boilerplate", category: "Code", price: 49 },
];

export default function ProductFilterDemo() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "All" || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="page-stack compact-stack">
      <div className="demo-grid">
        <div className="form-card">
          <h3>Try filtering products</h3>
          <label>
            Search by name
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search a product"
            />
          </label>

          <label>
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="All">All</option>
              <option value="Course">Course</option>
              <option value="Design">Design</option>
              <option value="Code">Code</option>
            </select>
          </label>
        </div>

        <div className="demo-box">
          <h3>What to learn here</h3>
          <ul>
            <li>
              <code>useState</code> stores user input
            </li>
            <li>
              <code>filter()</code> creates a new list
            </li>
            <li>
              <code>useMemo</code> avoids recalculating on unrelated renders
            </li>
            <li>UI updates automatically when state changes</li>
          </ul>
        </div>
      </div>

      <div className="demo-grid">
        {filteredProducts.map((product) => (
          <article key={product.id} className="product-card">
            <span className="badge">{product.category}</span>
            <h3>{product.name}</h3>
            <p className="muted">${product.price}</p>
          </article>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="demo-box">
          <p>
            No products matched your search. Try changing the input or category.
          </p>
        </div>
      )}
    </div>
  );
}
