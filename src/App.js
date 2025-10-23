import { useEffect, useState } from "react";

function App() {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/prompts/")
      .then(res => res.json())
      .then(data => setPrompts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🧠 Prompt Store</h1>
      {prompts.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p><b>${p.price}</b></p>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
            <input type="hidden" name="business" value="nilakapil1@gmail.com" />
            <input type="hidden" name="cmd" value="_xclick" />
            <input type="hidden" name="item_name" value={p.title} />
            <input type="hidden" name="amount" value={p.price} />
            <input type="hidden" name="currency_code" value="USD" />
            <button type="submit">Buy with PayPal</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default App;
