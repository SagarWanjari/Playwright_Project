import { failureAnalysisPrompt } from "../prompts/failureAnalysis.prompt";
import { aiClient } from "../clients/AIClient";

export async function analyzeFailure(input: any) {

    if (!process.env.GROQ_API_KEY) {
        console.log("AI analysis skipped - GROQ_API_KEY missing");
        return "AI analysis skipped";
    }

    try {

        const prompt = failureAnalysisPrompt(input);

        const response = await aiClient.call(prompt);

        return response;

    } catch (error: any) {

        console.log("AI analysis failed:", error.message);

        return "AI analysis failed";
    }
}