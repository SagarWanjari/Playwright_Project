export const generateTestCasesPrompt = (input:any) => `
Generate test cases in JSON.
Feature:${input.feature}
Requirement:${input.description}

Return on JSOn array.
`