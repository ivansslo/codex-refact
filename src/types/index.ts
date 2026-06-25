export type ModelProvider = 'openai' | 'openrouter' | 'zenai';

export interface AIModel {
  id: string;
  name: string;
  provider: ModelProvider;
  description: string;
  contextLength: string;
  pricing: string;
  badge?: string;
  isFree?: boolean;
}

export interface CodeFile {
  name: string;
  language: string;
  content: string;
  icon?: string;
}

export interface ProjectFiles {
  'index.html': string;
  'styles.css': string;
  'app.js': string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  modelUsed?: string;
  latency?: number; // in milliseconds
  tokensUsed?: number;
}

export interface ModelComparisonResult {
  modelId: string;
  modelName: string;
  provider: ModelProvider;
  code: ProjectFiles;
  latency: number;
  tokens: number;
  rating: number;
  status: 'idle' | 'generating' | 'completed' | 'failed';
  error?: string;
  explanation: string;
}

export interface AppConfig {
  openaiKey: string;
  openrouterKey: string;
  zenaiKey: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  githubMcpUrl: string;
  githubRepoPath: string;
  githubBranch: string;
  githubToken: string;
  clawhubToken: string;
  clawhubActivePlugins: string[];
}
