import { aiClient } from "../clients/AIClient";
import { generateTestCasesPrompt } from "../prompts/testCase.prompt";


export async function generateTestCases(input:any) {
    const prompt = generateTestCasesPrompt(input);
    const response = await aiClient.call(prompt);
    return JSON.parse(response);
    
}