import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [orderId, setOrderId] = useState("");
  const [steamData, setSteamData] = useState<null | {
    username: string;
    password: string;
    game: string;
    code: string;
  }>(null);
  const [error, setError] = useState("");

  const fakeDatabase: Record<string, { username: string; password: string; game: string }> = {
    "231102HXRPY5DT": {
      username: "2ipujt",
      password: "&3Hx0D9sA",
      game: "Cyberpunk 2077",
    },
    // 你可以在这里添加更多订单ID
  };

  const handleSearch = async () => {
    setError("");
    const record = fakeDatabase[orderId];
    if (!record) {
      setSteamData(null);
      setError("找不到这个订单，请检查订单编号是否正确。");
      return;
    }

    try {
      const res = await axios.get(`/api/code?steamUsername=${record.username}`);
      const code = res.data.code;
      setSteamData({ ...record, code });
    } catch (err) {
      setError("验证码生成失败，请稍后再试。");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("已复制 Steam 用户名！");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">🎮 Steam Guard 自动提取系统</h1>
      <input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="请输入 Shopee 订单号"
        className="mb-4 p-2 text-black rounded w-full max-w-md"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded mb-6"
      >
        查找订单
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {steamData && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md space-y-3">
          <div className="flex items-center justify-between">
            <span><strong>Steam 用户名:</strong> {steamData.username}</span>
            <button
              onClick={() => copyToClipboard(steamData.username)}
              className="bg-green-600 px-2 py-1 rounded text-sm"
            >
              复制
            </button>
          </div>
          <p><strong>Steam 密码:</strong> {steamData.password}</p>
          <p><strong>游戏:</strong> {steamData.game}</p>
          <p><strong>验证码:</strong> {steamData.code}</p>
        </div>
      )}
    </div>
  );
}


