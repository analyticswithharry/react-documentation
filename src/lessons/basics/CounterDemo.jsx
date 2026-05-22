import { useState } from "react";

export default function CounterDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="demo-box">
      <h3>Count: {count}</h3>
      <p>Click the buttons to see how state changes the UI.</p>
      <div className="button-row">
        <button onClick={() => setCount((current) => current - 1)}>
          Decrease
        </button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount((current) => current + 1)}>
          Increase
        </button>
      </div>
    </div>
  );
}
