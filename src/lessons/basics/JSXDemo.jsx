const skills = ["JSX", "Components", "Props", "State"];

export default function JSXDemo() {
  const learnerName = "JavaScript learner";
  const currentDay = new Date().toLocaleDateString();

  return (
    <div className="demo-grid">
      <div className="demo-box">
        <h3>Hello, {learnerName}</h3>
        <p>Today is {currentDay}.</p>
        <p>
          JSX lets you mix HTML-like tags with JavaScript values using{" "}
          <code>{"{ }"}</code>.
        </p>
      </div>

      <div className="demo-box">
        <h3>Rendered list</h3>
        <ul>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
