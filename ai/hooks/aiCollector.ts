import fs from 'fs';
import path from 'path';
import { analyzeFailure } from '../services/failureAnalyzer.service';

const failureFile = path.join(process.cwd(), 'ai-failures.jsonl');

export function collectFailure(testInfo: any) {
  const data = {
    title: testInfo.title,
    error: testInfo.error?.message || '',
    stack: testInfo.error?.stack || '',
    file: testInfo.file,
    status: testInfo.status
  };

  fs.appendFileSync(
    failureFile,
    JSON.stringify(data) + '\n',
    'utf-8'
  );

  console.log("FAILURE WRITTEN TO FILE");
}

export async function runAIBatchAnalysis() {
  console.log("\nAI BATCH ANALYSIS STARTED\n");

  if (!fs.existsSync(failureFile)) {
    console.log("No failures found");
    return;
  }

  const raw = fs.readFileSync(failureFile, 'utf-8');

  const failures = raw
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => JSON.parse(line));

  console.log("AI Failures:", failures);

  for (const f of failures) {
    const result = await analyzeFailure({
      testName: f.title,
      error: f.error,
      logs: f.stack
    });

    console.log("\nAI RESULT:\n", result);
  }

  fs.writeFileSync(failureFile, '', 'utf-8');

}