# Agent Orchestrator

Multi-agent coordination engine powered by Claude AI. This package implements the core orchestration logic for coordinating multiple specialized Claude agents to build full-stack applications.

## Overview

The Agent Orchestrator is the heart of Emergent AI. It coordinates 7 specialized Claude-powered agents that work together to transform natural language descriptions into complete, production-ready applications.

## Agents

### 1. Requirements Agent
- **Role**: Parse user input and gather requirements
- **Responsibilities**:
  - Extract requirements from natural language
  - Ask clarifying questions
  - Validate requirements completeness
  - Structure specifications for downstream agents

### 2. Architecture Agent
- **Role**: Design system architecture and select tech stack
- **Responsibilities**:
  - Design overall system architecture
  - Select appropriate technologies
  - Create implementation roadmap
  - Define technical constraints

### 3. Frontend Agent
- **Role**: Generate React/Vue/Svelte components
- **Responsibilities**:
  - Generate UI components
  - Create page templates
  - Configure styling and theming
  - Implement responsive design

### 4. Backend Agent
- **Role**: Generate REST/GraphQL APIs
- **Responsibilities**:
  - Generate API endpoints
  - Create data models
  - Implement middleware
  - Handle authentication and validation

### 5. Database Agent
- **Role**: Design database schemas
- **Responsibilities**:
  - Design database structure
  - Generate migrations
  - Create ORM models (Prisma)
  - Optimize queries

### 6. Testing Agent
- **Role**: Generate tests and perform QA
- **Responsibilities**:
  - Generate unit tests
  - Create integration tests
  - Perform code reviews
  - Identify and fix issues

### 7. Deployment Agent
- **Role**: Handle deployment and DevOps
- **Responsibilities**:
  - Generate Docker configuration
  - Create CI/CD pipelines
  - Orchestrate multi-cloud deployment
  - Manage environment configuration

## Architecture

### BaseAgent Class
The `BaseAgent` class implements the core agentic loop with Claude:

```typescript
const agent = new BaseAgent(config);
const result = await agent.process("user input");
```

**Features**:
- Multi-turn conversation management
- Tool use and function calling
- Automatic error recovery
- State management
- Metrics and logging

### Agent Communication
Agents communicate through:
1. **Sequential Pipeline**: Each agent passes results to the next
2. **Tool Use**: Claude can call tools to execute tasks
3. **State Sharing**: Shared context between agents
4. **Async Processing**: Non-blocking agent execution

## Usage

### Starting the Server

```bash
npm install
npm run dev
```

The server will start on port 3001.

### API Endpoints

#### Health Check
```bash
GET /health
```

#### Start a Build
```bash
POST /build
Content-Type: application/json

{
  "description": "Build a todo application with React and Node.js",
  "requirements": {
    "features": ["add todos", "delete todos", "mark complete"]
  }
}
```

Response:
```json
{
  "buildId": "uuid-here",
  "status": "in_progress",
  "message": "Build session started"
}
```

#### Get Build Status
```bash
GET /build/{buildId}
```

Response:
```json
{
  "id": "uuid-here",
  "status": "in_progress",
  "startedAt": "2026-05-15T10:00:00Z",
  "stages": [
    {
      "stage": "requirements",
      "status": "completed",
      "result": "...",
      "timestamp": "2026-05-15T10:00:05Z"
    }
  ]
}
```

#### List Active Builds
```bash
GET /builds
```

#### Process Input with Specific Agent
```bash
POST /agents/{agentName}/process
Content-Type: application/json

{
  "input": "Generate components for a todo app"
}
```

#### Get Agent Info
```bash
GET /agents/{agentName}
```

## Environment Variables

```env
ANTHROPIC_API_KEY=your-key-here
PORT=3001
LOG_LEVEL=debug
```

## Development

### Build
```bash
npm run build
```

### Type Check
```bash
npm run type-check
```

### Lint
```bash
npm run lint
npm run lint:fix
```

### Format
```bash
npm run format
```

### Clean
```bash
npm run clean
```

## Implementation Details

### Agentic Loop
The `think()` method implements the core loop:

1. **Build Message Context**: Compile conversation history
2. **Call Claude**: Send messages to Claude API with tools
3. **Process Response**: Handle Claude's response
4. **Execute Tools**: Run any requested tools
5. **Handle Results**: Process tool results
6. **Continue Loop**: Repeat until completion or max iterations

### Tool System
Tools are defined with:
- Name and description
- Input schema (JSON Schema)
- Execution function

Claude can request tool execution, and results are fed back into the conversation.

### Error Handling
- Automatic retries on failure
- Tool error recovery
- Conversation context preservation
- Detailed error logging

## Next Steps

1. Implement actual tool functions instead of mocks
2. Add database integration (PostgreSQL)
3. Implement code generation templates
4. Add deployment orchestration
5. Create web UI for build orchestration
6. Add real-time WebSocket updates
7. Implement credit/token tracking

## Related Packages

- `frontend`: Next.js UI for build orchestration
- `code-generator`: Code generation templates and engines
- `api-server`: Express backend with Prisma ORM
- `deployment-engine`: Multi-cloud deployment orchestration
