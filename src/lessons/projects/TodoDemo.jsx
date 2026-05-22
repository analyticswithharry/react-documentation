import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function TodoDemo() {
  const [todos, setTodos] = useLocalStorage("react-beginner-todos", [
    { id: 1, text: "Learn JSX", done: true },
    { id: 2, text: "Practice useState", done: false },
  ]);
  const [text, setText] = useState("");

  function addTodo(event) {
    event.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: Date.now(),
        text: trimmedText,
        done: false,
      },
    ]);
    setText("");
  }

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  const completedCount = todos.filter((todo) => todo.done).length;

  return (
    <div className="demo-grid">
      <div className="form-card">
        <h3>Add a todo</h3>
        <form onSubmit={addTodo}>
          <label>
            New task
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Example: Build a counter app"
            />
          </label>
          <button type="submit">Add task</button>
        </form>
        <p className="muted top-gap">
          Completed: {completedCount} / {todos.length}
        </p>
      </div>

      <div className="demo-box">
        <h3>Your tasks</h3>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={todo.done ? "todo-done" : ""}>
                  {todo.text}
                </span>
              </label>
              <button
                className="danger-button"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
