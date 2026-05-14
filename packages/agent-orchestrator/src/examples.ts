import dotenv from 'dotenv';
import { RequirementsAgent } from './agents/requirements-agent.js';
import { ArchitectureAgent } from './agents/architecture-agent.js';

// Load environment variables
dotenv.config();

/**
 * Example: Running the RequirementsAgent
 */
async function exampleRequirementsAgent() {
  console.log('\n=== RequirementsAgent Example ===\n');

  const agent = new RequirementsAgent();

  const userDescription = `
    I want to build a collaborative task management application for remote teams.
    It should have real-time updates, team collaboration features, and integration
    with popular communication tools like Slack. Users should be able to create
    tasks, assign them to team members, and track progress.
  `;

  const result = await agent.analyzeRequirements(userDescription);

  console.log('Requirements Analysis:');
  console.log(JSON.stringify(result, null, 2));

  console.log('\n\nClarifying Questions:');
  result.questions.forEach((q, i) => console.log(`${i + 1}. ${q}`));
}

/**
 * Example: Running the ArchitectureAgent
 */
async function exampleArchitectureAgent() {
  console.log('\n\n=== ArchitectureAgent Example ===\n');

  const agent = new ArchitectureAgent();

  const requirements = {
    appType: 'web',
    name: 'TaskFlow',
    description: 'Collaborative task management for remote teams',
    complexity: 'medium',
    features: ['real-time-updates', 'team-collaboration', 'slack-integration'],
  };

  const result = await agent.designArchitecture(requirements);

  console.log('Architecture Design:');
  console.log(JSON.stringify(result, null, 2));
}

/**
 * Main execution
 */
async function main() {
  try {
    // Verify API key is set
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY environment variable not set');
    }

    // Run example agents
    await exampleRequirementsAgent();
    await exampleArchitectureAgent();

    console.log('\n\n=== Agents executed successfully ===\n');
  } catch (error) {
    console.error('Error running agents:', error);
    process.exit(1);
  }
}

main();
