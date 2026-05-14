/**
 * Type definitions for Agent Orchestrator
 */

export interface AgentMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  toolCalls?: ToolCall[];
}

export interface ToolCall {
  id: string;
  name: string;
  input: Record<string, any>;
  result?: any;
  error?: string;
}

export interface AgentTool {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  execute: (input: Record<string, any>) => Promise<any>;
}

export interface AgentState {
  [key: string]: any;
}

export interface AgentConfig {
  name: string;
  role: string;
  tools: AgentTool[];
  temperature?: number;
  maxRetries?: number;
}

export interface ApplicationBuildRequest {
  userId: string;
  applicationId: string;
  description: string;
  requirements?: Record<string, any>;
  budget?: number;
  features?: string[];
}

export interface ApplicationBuildResult {
  applicationId: string;
  status: 'completed' | 'failed' | 'in_progress';
  agents: AgentResult[];
  generatedCode?: Record<string, string>;
  creditsUsed: number;
  error?: string;
}

export interface AgentResult {
  agentId: string;
  agentName: string;
  status: 'completed' | 'failed' | 'in_progress';
  output: any;
  creditsUsed: number;
  duration: number;
  error?: string;
}

export interface CodeGenerationContext {
  applicationId: string;
  requirements: Record<string, any>;
  architecture: Record<string, any>;
  templates: Record<string, string>;
  dependencies: Record<string, string>;
}

export interface DeploymentConfig {
  provider: 'vercel' | 'netlify' | 'railway' | 'render' | 'aws';
  environment: 'development' | 'staging' | 'production';
  domain?: string;
  customDomain?: boolean;
  environmentVariables?: Record<string, string>;
}
