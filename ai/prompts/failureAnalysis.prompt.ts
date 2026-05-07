export const failureAnalysisPrompt = (input: any) => `
Analyze this test failure:

Test: ${input.testName}
Error: ${input.error}
Logs: ${input.logs}

Give short reason.
`;