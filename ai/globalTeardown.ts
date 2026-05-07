import { runAIBatchAnalysis } from './hooks/aiCollector';

export default async function globalTeardown() {
  console.log("\nGLOBAL TEARDOWN STARTED\n");

  await runAIBatchAnalysis();

  console.log("\nAI ANALYSIS COMPLETE\n");
}