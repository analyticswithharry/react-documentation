import { useMemo, useReducer } from "react";

const starterProducts = [
  { id: 1, name: "React Notes", price: 12 },
  { id: 2, name: "Hooks Practice Pack", price: 18 },
  { id: 3, name: "Frontend Interview Kit", price: 25 },
];

function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "remove":
      return state.filter((item) => item.id !== action.payload);
    case "clear":
      return [];
    default:
      return state;
  }
}

export default function CartReducerDemo() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div className="demo-grid">
      <div className="form-card">
        <h3>Add items</h3>
        <div className="page-stack compact-stack">
          {starterProducts.map((product) => (
            <div key={product.id} className="todo-item">
              <div>
                <strong>{product.name}</strong>
                <p className="muted">${product.price}</p>
              </div>
              <button
                onClick={() => dispatch({ type: "add", payload: product })}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="demo-box">
        <h3>Cart summary</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="todo-list">
            {cart.map((item) => (
              <li key={item.id} className="todo-item">
                <div>
                  <strong>{item.name}</strong>
                  <p className="muted">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <button
                  className="danger-button"
                  onClick={() => dispatch({ type: "remove", payload: item.id })}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="top-gap">
          <strong>Total:</strong> ${total}
        </p>
        <div className="button-row">
          <button onClick={() => dispatch({ type: "clear" })}>
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
