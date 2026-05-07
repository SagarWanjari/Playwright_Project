import { aiClient } from "../clients/AIClient";
import { failureAnalysisPrompt } from "../prompts/failureAnalysis.prompt";

export async function analyzeFailure(input: any) {
const prompt = failureAnalysisPrompt(input);
const response = await aiClient.call(prompt);

  return response;
}