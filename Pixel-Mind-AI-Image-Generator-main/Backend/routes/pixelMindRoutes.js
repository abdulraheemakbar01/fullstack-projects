import express from "express";
import dotenv from "dotenv";
const API = process.env.API_KEY;

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.json({ error: "Prompt missing" });

    const response = await fetch(
      "https://photo-api.mraheem230408237.workers.dev/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) {
      return res.json({ error: await response.text() });
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const img64 = buffer.toString("base64");

    res.json({
      b64: img64,
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

export default router;
