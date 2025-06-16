// pages/index.tsx
import { useEffect, useState } from "react";

export default function Home() {
  const [code, setCode] = useState("加载中...");
  const [username] = useState("2ipujt");

  const fetchCode = async () => {
    try {
      const res = await fetch(`/api/code?steamUsername=${username}`);
      const data = await res.json();
      setCode(data.code || "获取失败");
    } catch {
      setCode("错误");
    }
  };

  const copyUsername = () => {
    navigator.clipboard.writeText(username).then(() => {
      alert("用户名已复制！");
    });
  };

  useEffect(() => {
    fetchCode();
    const interval = setInterval(fetchCode, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>Steam Guard Info</h1>

        <div style={styles.field}>
          <label style={styles.label}>用户名</label>
          <span style={styles.text}>{username}</span>
          <button style={styles.button} onClick={copyUsername}>复制</button>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>密码</label>
          <span style={styles.text}>&3Hx0D9sA</span>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Steam Guard 验证码</label>
          <span style={styles.text}>{code}</span>
        </div>

        <div style={styles.gameTitle}>🎮 Cyberpunk 2077</div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "'Orbitron', sans-serif",
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    padding: 0,
  },
  container: {
    background: "rgba(0, 0, 0, 0.5)",
    border: "2px solid #00f0ff",
    borderRadius: 20,
    padding: "30px 40px",
    boxShadow: "0 0 20px #00f0ff",
    maxWidth: 400,
    textAlign: "center" as const,
  },
  title: {
    marginBottom: 10,
    fontSize: 28,
  },
  field: {
    margin: "15px 0",
  },
  label: {
    display: "block",
    fontSize: 14,
    marginBottom: 5,
    color: "#aaa",
  },
  text: {
    fontSize: 18,
    background: "#111",
    padding: "6px 12px",
    borderRadius: 8,
    display: "inline-block",
  },
  button: {
    marginLeft: 10,
    background: "#00f0ff",
    color: "#000",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  },
  gameTitle: {
    fontSize: 16,
    marginTop: 10,
    color: "#77e",
  },
};

