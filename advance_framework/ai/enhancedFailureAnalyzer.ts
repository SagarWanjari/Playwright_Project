export function buildEnhancedPrompt(input: any): string {

    return `
Analyze this Playwright test failure.

TEST TITLE:
${input.title}

FAILURE CATEGORY:
${input.category}

STATUS:
${input.status}

RETRY COUNT:
${input.retry}

TEST DURATION:
${input.duration}

ERROR:
${input.error}

STACK:
${input.stack}

FILE:
${input.file}

Give:
1. Root cause
2. Most likely reason
3. Suggested fix
4. Whether retry is useful or not
`;
}