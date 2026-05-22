import CodeBlock from "./CodeBlock.jsx";

export default function SectionCard({ title, description, code, children }) {
  return (
    <section className="section-card">
      <div className="section-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {code ? (
        <details className="section-code" open>
          <summary>View source</summary>
          <CodeBlock code={code} />
        </details>
      ) : null}
      <div className="section-demo">{children}</div>
    </section>
  );
}
