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
  };

  const handleSearch = async () => {
    setError("");
    const record = fakeDatabase[orderId.trim()];
    if (!record) {
      setSteamData(null);
      setError("❌ Order not found. Please check your Shopee ID.");
      return;
    }

    try {
      const res = await axios.get(`/api/code?steamUsername=${record.username}`);
      const code = res.data.code;
      setSteamData({ ...record, code });
    } catch (err) {
      setError("⚠️ Failed to generate Steam Guard code.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-[#0f172a] to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-cyan-400 drop-shadow-lg text-center">
        🎮 Gametryx Steam Code Generator
      </h1>

      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter your Shopee Order ID"
          className="w-full p-3 rounded-lg text-black placeholder-gray-600 shadow-md"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 px-4 rounded-lg transition-all"
        >
          🚀 Get Steam Info
        </button>
      </div>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {steamData && (
        <div className="bg-white/10 backdrop-blur-md p-6 mt-8 rounded-xl shadow-xl text-left w-full max-w-md space-y-3 border border-cyan-500">
          <p><strong>👤 Username:</strong> {steamData.username}</p>
          <p><strong>🔑 Password:</strong> {steamData.password}</p>
          <p><strong>🕹️ Game:</strong> {steamData.game}</p>
          <p><strong>🛡️ Guard Code:</strong> {steamData.code}</p>
        </div>
      )}
    </div>
  );
}