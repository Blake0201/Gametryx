import { useState } from "react";

export default function Home() {
  const [shopeeId, setShopeeId] = useState("");
  const [steamUsername, setSteamUsername] = useState("");
  const [code, setCode] = useState("");

  const getCode = async () => {
    const res = await fetch(`/api/code?shopeeId=${shopeeId}&steamUsername=${steamUsername}`);
    const data = await res.json();
    setCode(data.code || data.error);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Steam Guard Code Generator</h1>
      <input
        placeholder="Shopee ID"
        value={shopeeId}
        onChange={(e) => setShopeeId(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />
      <input
        placeholder="Steam Username"
        value={steamUsername}
        onChange={(e) => setSteamUsername(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />
      <button onClick={getCode}>Get Code</button>
      <div style={{ marginTop: 20 }}>
        {code && <p>Result: {code}</p>}
      </div>
    </div>
  );
}
