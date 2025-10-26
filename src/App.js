import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://promptstore-backend.onrender.com";

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/prompts/`);
        setPrompts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load prompts. Please check backend connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  if (loading) return <h2 className="text-center mt-5">Loading prompts...</h2>;
  if (error) return <h2 className="text-center mt-5 text-red-500">{error}</h2>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
        🧠 PromptStore
      </h1>
      {prompts.length === 0 ? (
        <p className="text-center text-gray-500">No prompts found.</p>
      ) : (
        <ul className="space-y-4">
          {prompts.map((prompt) => (
            <li
              key={prompt.id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{prompt.title}</h2>
              <p className="text-gray-700">{prompt.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
