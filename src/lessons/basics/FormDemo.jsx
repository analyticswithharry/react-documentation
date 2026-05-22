import { useState } from "react";

export default function FormDemo() {
  const [form, setForm] = useState({ name: "", goal: "" });
  const [submittedMessage, setSubmittedMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedMessage(
      `Nice, ${form.name || "friend"}! Your goal is: ${form.goal || "keep learning React"}.`,
    );
  }

  return (
    <div className="demo-grid">
      <form onSubmit={handleSubmit} className="form-card">
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>

        <label>
          Learning goal
          <input
            name="goal"
            value={form.goal}
            onChange={handleChange}
            placeholder="Example: Build a todo app"
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      <div className="demo-box">
        <h3>Live preview</h3>
        <p>Name: {form.name || "..."}</p>
        <p>Goal: {form.goal || "..."}</p>
        <p>{submittedMessage || "Submit the form to see the message."}</p>
      </div>
    </div>
  );
}
