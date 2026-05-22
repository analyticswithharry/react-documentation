import { useRef } from "react";

export default function RefDemo() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <div className="demo-grid">
      <div className="demo-box">
        <h3>Focus an input</h3>
        <input ref={inputRef} placeholder="Click the button to focus me" />
        <div className="button-row top-gap">
          <button onClick={focusInput}>Focus input</button>
        </div>
      </div>
      <div className="demo-box">
        <h3>What is happening?</h3>
        <p>
          <code>useRef</code> gives you access to the real DOM element without
          causing re-renders.
        </p>
      </div>
    </div>
  );
}
