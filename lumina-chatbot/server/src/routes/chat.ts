import { Router, Request, Response } from "express";
import { getChatReply } from "../services/anthropic";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const reply = await getChatReply(messages);
    return res.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;