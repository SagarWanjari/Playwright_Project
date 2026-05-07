import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export function getAIClient() {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        console.warn("GROQ_API_KEY missing. AI analysis disabled.");
        return null;
    }

    return new OpenAI({
        apiKey,
        baseURL: "https://api.groq.com/openai/v1"
    });
}

export class AIClient {

    private client;

    constructor() {
        this.client = getAIClient();
    }

    async call(prompt: string): Promise<string> {

        if (!this.client) {
            return "AI analysis skipped because GROQ_API_KEY is missing.";
        }

        console.log("Prompt Sent to AI:\n", prompt);

        const response = await this.client.chat.completions.create({
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