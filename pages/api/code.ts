import { NextApiRequest, NextApiResponse } from "next";
import SteamTotp from "steam-totp";

// 模拟数据库：订单号 → Steam 帐号信息和游戏名
const orders: Record<string, { username: string; password: string; shared_secret: string; game: string }> = {
  "231102HXRPY5DT": {
    username: "2ipujt",
    password: "test12345",
    shared_secret: "AdaHc2xpQC4CV5AREPMRMrn7jOU=",
    game: "Cyberpunk 2077",
  },
  // 可添加更多订单
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shopeeOrderId } = req.query;

  if (!shopeeOrderId || typeof shopeeOrderId !== "string") {
    return res.status(400).json({ error: "Missing shopeeOrderId" });
  }

  const order = orders[shopeeOrderId];
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  try {
    const code = SteamTotp.generateAuthCode(order.shared_secret);
    return res.status(200).json({
      username: order.username,
      password: order.password,
      code,
      game: order.game,
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to generate code" });
  }
}
