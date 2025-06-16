import { NextApiRequest, NextApiResponse } from "next";
import SteamTotp from "steam-totp";

// 模拟数据库：Shopee 订单号 → Steam 帐号资料
const orders: Record<string, { username: string; password: string; shared_secret: string }> = {
  "231102HXRPY5DT": {
    username: "2ipujt",
    password: "&3Hx0D9sA",
    shared_secret: "AdaHc2xpQC4CV5AREPMRMrn7jOU=",
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shopeeOrderId } = req.query;

  if (!shopeeOrderId || typeof shopeeOrderId !== "string") {
    return res.status(400).json({ error: "Missing shopeeOrderId" });
  }

  const account = orders[shopeeOrderId];
  if (!account) {
    return res.status(404).json({ error: "Order not found" });
  }

  try {
    const code = SteamTotp.generateAuthCode(account.shared_secret);
    return res.status(200).json({
      username: account.username,
      password: account.password,
      code,
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to generate code" });
  }
}
