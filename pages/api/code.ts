import { NextApiRequest, NextApiResponse } from "next";
import SteamTotp from "steam-totp";

const secrets: Record<string, string> = {
  "2ipujt": "AdaHc2xpQC4CV5AREPMRMrn7jOU=",
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { steamUsername } = req.query;

  if (!steamUsername || typeof steamUsername !== "string") {
    return res.status(400).json({ error: "Missing steamUsername" });
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
