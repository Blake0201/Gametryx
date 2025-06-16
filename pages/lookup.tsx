import { useState } from "react";

export default function LookupPage() {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    username: string;
    password: string;
    code: string;
    game: string;
  }>(null);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch(`/api/code?shopeeOrderId=${orderId}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unknown error");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h2>🛒 Shopee 订单 Steam Guard 查询</h2>
      <input
        type="text"
        placeholder="输入 Shopee 订单号"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />
      <button onClick={handleLookup} disabled={loading} style={{ padding: 10 }}>
        {loading ? "查询中..." : "查询"}
      </button>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {result && (
        <div style={{ marginTop: 20, border: "1px solid #ccc", padding: 10 }}>
          <p><strong>🎮 游戏：</strong>{result.game}</p>
          <p><strong>🎮 Steam 用户名：</strong>{result.username}</p>
          <p><strong>🔑 密码：</strong>{result.password}</p>
          <p><strong>✅ Steam Guard 验证码：</strong>{result.code}</p>
        </div>
      )}
    </div>
  );
}
