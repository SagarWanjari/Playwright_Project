import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export class AIClient {
  async call(prompt: string): Promise<string> {
    console.log("Prompt Sent to AI:\n", prompt);

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a senior QA automation engineer. Give precise debugging analysis."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2
    });

    return response.choices[0].message.content || "";
  }
}

export const aiClient = new AIClient();