import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function FetchUsersDemo() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function loadUsers() {
    try {
      setStatus("loading");
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.slice(0, 6));
      setStatus("success");
    } catch (loadError) {
      setError(loadError.message);
      setStatus("error");
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="page-stack compact-stack">
      <div className="demo-box">
        <h3>Status: {status}</h3>
        <p>
          This is a real fetch example using <code>useEffect</code>, <code>fetch</code>, and
          loading/error handling.
        </p>
        <div className="button-row">
          <button onClick={loadUsers}>Refetch users</button>
        </div>
      </div>

      {status === "loading" && (
        <div className="demo-box">
          <p>Loading users...</p>
        </div>
      )}

      {status === "error" && (
        <div className="demo-box error-box">
          <p>Oops: {error}</p>
          <p>Press the button above to try again.</p>
        </div>
      )}

      {status === "success" && (
        <div className="demo-grid">
          {users.map((user) => (
            <article key={user.id} className="profile-card">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <small>{user.company.name}</small>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
