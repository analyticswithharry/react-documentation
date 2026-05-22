import { useReducer } from "react";

const initialState = { count: 0 };

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function ReducerDemo() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="demo-box">
      <h3>Reducer count: {state.count}</h3>
      <p>Reducer logic moves state changes into one function.</p>
      <div className="button-row">
        <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      </div>
    </div>
  );
}
