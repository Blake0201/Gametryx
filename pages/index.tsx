import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [orderId, setOrderId] = useState("");
  const [steamData, setSteamData] = useState<null | {
    game: string;
    username: string;
    password: string;
    code: string;
  }>(null);
  const [error, setError] = useState("");

  const fakeDatabase: Record<string, { username: string; password: string; game: string }> = {
    "231102HXRPY5DT": {
      username: "2ipujt",
      password: "&3Hx0D9sA",
      game: "Cyberpunk 2077",
    },
    "Khoo": {
      username: "2ipujt",
      password: "&3Hx0D9sA",
      game: "Cyberpunk 2077",
    }
  };

  const handleSearch = async () => {
    setError("");
    const record = fakeDatabase[orderId];
    if (!record) {
      setSteamData(null);
      setError("Order not found. Please check your order ID.");
      return;
    }

    try {
      const res = await axios.get(`/api/code?steamUsername=${record.username}`);
      const code = res.data.code;
      setSteamData({ ...record, code });
    } catch (err) {
      setError("Failed to generate Steam Guard code. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">🎮 Gametryx SteamAcc</h1>

      <input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Enter Shopee Order ID"
        className="mb-4 p-2 text-black rounded w-full max-w-md"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded mb-6"
      >
        Search Order
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {steamData && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md space-y-3">
          <p><strong>Steam Username:</strong> {steamData.username}</p>
          <p><strong>Steam Password:</strong> {steamData.password}</p>
          <p><strong>Game:</strong> {steamData.game}</p>
          <p><strong>Guard Code:</strong> {steamData.code}</p>
        </div>
      )}
    </div>
  );
}
