import { runProducerAgent } from "../agents/producerAgent";

export async function runProductionEngine(project) {
  const producerStrategy = await runProducerAgent(project);

  return {
    producerStrategy,
  };
}