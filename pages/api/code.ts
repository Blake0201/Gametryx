import { NextApiRequest, NextApiResponse } from "next";
import SteamTotp from "steam-totp";

// 模拟数据库：Steam 用户名 和 对应的 shared_secret
const secrets: Record<string, string> = {
  "2ipujt": "AdaHc2xpQC4CV5AREPMRMrn7jOU=",
};

// 模拟数据库：Shopee 订单号和对应 Steam 用户名的绑定
const validOrders: Record<string, string> = {
  "230519XABCD123": "2ipujt", // 例子：订单编号 -> Steam 用户
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { steamUsername, shopeeId } = req.query;

  if (!steamUsername || typeof steamUsername !== "string") {
    return res.status(400).json({ error: "Missing steamUsername" });
  }

  if (!shopeeId || typeof shopeeId !== "string") {
    return res.status(400).json({ error: "Missing shopeeId" });
  }

  // 检查订单是否存在 + 是否和用户名匹配
  const expectedUser = validOrders[shopeeId];
  if (!expectedUser || expectedUser !== steamUsername) {
    return res.status(403).json({ error: "Invalid Shopee ID or mismatched Steam username" });
  }

  const sharedSecret = secrets[steamUsername];
  if (!sharedSecret) {
    return res.status(404).json({ error: "No shared_secret found for this username" });
  }

  try {
    const code = SteamTotp.generateAuthCode(sharedSecret);
    return res.status(200).json({ code });
  } catch (err) {
    return res.status(500).json({ error: "Failed to generate code" });
  }
}
