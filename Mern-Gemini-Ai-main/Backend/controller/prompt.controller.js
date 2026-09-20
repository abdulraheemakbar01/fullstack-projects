import { GoogleGenAI } from "@google/genai";
import Prompt from "../model/prompt.model.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const sendPrompt = async (req, res) => {
  const { content } = req.body;
  const userId = req.userId;

  if (!content || content.trim() === "") {
   return res.status(400).json({ Message: "Prompt content is required" });
  }
  try {
    const userPrompt = await Prompt.create({
      userId,
      role: "user",
      content,
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: content,
    });

    const AiContent =
      result.candidates?.[0]?.content?.parts?.[0]?.text || "No Answer Found !";

    const AiResponse = Prompt.create({
      userId,
      role: "assistant",
      content: AiContent,
    });

    res.json({ Message: AiContent });

    
  } catch (error) {
    console.log("Error in Prompt", error);
    res.status(400).json({ Error: "Something went wrong with Ai Response " });
  }
};


