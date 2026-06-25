import { AIModel } from '../types';

export const OPENAI_MODELS: AIModel[] = [
  {
    id: 'gpt-5-ultra',
    name: 'GPT-5 Ultra',
    provider: 'openai',
    description: 'Next-gen frontier flagship model with multi-modal reasoning and infinite-depth agent capabilities.',
    contextLength: '1,000,000 tokens',
    pricing: '$5.00 / M tokens',
    badge: 'Frontier Flagship'
  },
  {
    id: 'gpt-5-pro',
    name: 'GPT-5 Pro (Code-Core)',
    provider: 'openai',
    description: 'Advanced specialized developer variant of GPT-5 optimized for complex algorithms and multi-file codebases.',
    contextLength: '256k tokens',
    pricing: '$3.00 / M tokens',
    badge: 'Code Expert'
  },
  {
    id: 'gpt-5-mini',
    name: 'GPT-5 Mini',
    provider: 'openai',
    description: 'Ultra-fast, light-weight version of GPT-5. Highly affordable and perfect for real-time code generation.',
    contextLength: '128k tokens',
    pricing: '$0.15 / M tokens',
    badge: 'Fast & Smart'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    description: 'High-speed omni model. Master of multi-modal generation and general coding tasks.',
    contextLength: '128k tokens',
    pricing: '$2.50 / M tokens',
    badge: 'Omni Generalist'
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    description: 'Previous generation flagship. Deep reasoning and solid code generation capabilities.',
    contextLength: '128k tokens',
    pricing: '$10.00 / M tokens',
    badge: 'Stable'
  }
];

export const OPENROUTER_FREE_MODELS: AIModel[] = [
  {
    id: 'google/gemma-2-9b-it:free',
    name: 'Google: Gemma 2 9B (Free)',
    provider: 'openrouter',
    description: 'Powerful lightweight model from Google. Optimized for instructions following and code snippets.',
    contextLength: '8k tokens',
    pricing: 'FREE',
    badge: 'Highly Popular',
    isFree: true
  },
  {
    id: 'meta-llama/llama-3-8b-instruct:free',
    name: 'Meta: Llama 3 8B Instruct (Free)',
    provider: 'openrouter',
    description: 'Meta\'s highly capable open source model. Exceptional chat conversationalist and generalist.',
    contextLength: '8k tokens',
    pricing: 'FREE',
    badge: 'Industry Standard',
    isFree: true
  },
  {
    id: 'mistralai/mistral-7b-instruct:free',
    name: 'Mistral: Mistral 7B (Free)',
    provider: 'openrouter',
    description: 'A robust open weights model. Known for dense attention and stellar European localization.',
    contextLength: '32k tokens',
    pricing: 'FREE',
    badge: 'Versatile',
    isFree: true
  },
  {
    id: 'microsoft/phi-3-medium-128k-instruct:free',
    name: 'Microsoft: Phi-3 Medium (Free)',
    provider: 'openrouter',
    description: 'Microsoft\'s small language model with high-grade logic, scientific and mathematical reasoning.',
    contextLength: '128k tokens',
    pricing: 'FREE',
    badge: 'Long Context',
    isFree: true
  },
  {
    id: 'qwen/qwen-2-7b-instruct:free',
    name: 'Alibaba: Qwen 2 7B (Free)',
    provider: 'openrouter',
    description: 'Alibaba\'s powerhouse model. Top-tier capabilities in coding, math, and bilingual translation.',
    contextLength: '32k tokens',
    pricing: 'FREE',
    badge: 'Top Math/Code',
    isFree: true
  }
];

export const ZEN_AI_FREE_MODELS: AIModel[] = [
  {
    id: 'zen-ai/coder-v2:free',
    name: 'Zen AI: Coder-v2 (Free)',
    provider: 'zenai',
    description: 'Zen AI flagship developer model. Trained specifically on full-stack web and systems software engineering.',
    contextLength: '64k tokens',
    pricing: 'FREE',
    badge: 'Coding Specialized',
    isFree: true
  },
  {
    id: 'zen-ai/chat-pro:free',
    name: 'Zen AI: Chat Pro (Free)',
    provider: 'zenai',
    description: 'Advanced conversational agent. Master of brainstorming, documentation writing, and code explanation.',
    contextLength: '128k tokens',
    pricing: 'FREE',
    badge: 'Smart Assist',
    isFree: true
  },
  {
    id: 'zen-ai/agent-core:free',
    name: 'Zen AI: Agent Core (Free)',
    provider: 'zenai',
    description: 'Designed for autonomous code exploration, debugging, and multi-file workspace synchronization.',
    contextLength: '32k tokens',
    pricing: 'FREE',
    badge: 'Autonomous',
    isFree: true
  },
  {
    id: 'zen-ai/vision-lite:free',
    name: 'Zen AI: Vision Lite (Free)',
    provider: 'zenai',
    description: 'Multimodal vision capabilities. Paste mockup images and get perfect UI/UX styling layouts.',
    contextLength: '16k tokens',
    pricing: 'FREE',
    badge: 'UI Specialist',
    isFree: true
  }
];

export const ALL_MODELS = [...OPENAI_MODELS, ...OPENROUTER_FREE_MODELS, ...ZEN_AI_FREE_MODELS];
export const DEFAULT_OPENAI_KEY = '';
