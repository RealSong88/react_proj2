import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoin] = useState([]);
  const [selected, setSelected] = useState("");
  const [change, setChange] = useState();
  const onChange = (e) => {
    setSelected(e.target.value);
    console.log(e.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoin(json);
        setLoading(false);
        setSelected("BTC");
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading....</strong>
      ) : (
        <select onChange={onChange} value={selected}>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.symbol}>
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price.toFixed(2)}{" "}
              USD
            </option>
          ))}
        </select>
      )}
      <hr />
      <input type="text" placeholder="your dollor..." />
      <button>submit</button>
    </div>
  );
}

export default App;
