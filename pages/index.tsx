<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Steam Guard Code | Cyberpunk</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Orbitron', sans-serif;
      background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .container {
      background: rgba(0, 0, 0, 0.5);
      border: 2px solid #00f0ff;
      border-radius: 20px;
      padding: 30px 40px;
      box-shadow: 0 0 20px #00f0ff;
      max-width: 400px;
      text-align: center;
    }

    h1 {
      margin-bottom: 10px;
      font-size: 28px;
    }

    .field {
      margin: 15px 0;
    }

    .field label {
      display: block;
      font-size: 14px;
      margin-bottom: 5px;
      color: #aaa;
    }

    .field span {
      font-size: 18px;
      background: #111;
      padding: 6px 12px;
      border-radius: 8px;
      display: inline-block;
    }

    .copy-button {
      margin-left: 10px;
      background: #00f0ff;
      color: #000;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.2s;
    }

    .copy-button:hover {
      background: #00bcd4;
    }

    .game-title {
      font-size: 16px;
      margin-top: 10px;
      color: #77e;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Steam Guard Info</h1>

    <div class="field">
      <label>用户名</label>
      <span id="username">2ipujt</span>
      <button class="copy-button" onclick="copyUsername()">复制</button>
    </div>

    <div class="field">
      <label>密码</label>
      <span>&3Hx0D9sA</span>
    </div>

    <div class="field">
      <label>Steam Guard 验证码</label>
      <span id="code">加载中...</span>
    </div>

    <div class="game-title">🎮 Cyberpunk 2077</div>
  </div>

  <script>
    function copyUsername() {
      const username = document.getElementById("username").textContent;
      navigator.clipboard.writeText(username).then(() => {
        alert("用户名已复制！");
      });
    }

    // 动态获取验证码
    async function fetchCode() {
      try {
        const res = await fetch("/api/code?steamUsername=2ipujt");
        const data = await res.json();
        document.getElementById("code").textContent = data.code || "获取失败";
      } catch (e) {
        document.getElementById("code").textContent = "错误";
      }
    }

    fetchCode();
    setInterval(fetchCode, 30000); // 每30秒自动刷新一次
  </script>
</body>
</html>
