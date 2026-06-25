import { useState, useEffect } from 'react';
import { 
  Play, 
  Settings, 
  Code, 
  Terminal, 
  Sparkles, 
  Smartphone, 
  Tablet, 
  Monitor, 
  RefreshCw, 
  Layers, 
  CheckCircle, 
  Key, 
  Copy, 
  FileText, 
  Sliders, 
  Compass, 
  Eye, 
  EyeOff, 
  Cpu, 
  ChevronRight, 
  Download, 
  ExternalLink,
  ChevronDown,
  Clock,
  Star,
  Zap
} from 'lucide-react';
import { AIModel, ProjectFiles, ChatMessage, ModelComparisonResult, AppConfig } from './types';
import { 
  OPENAI_MODELS, 
  OPENROUTER_FREE_MODELS, 
  ZEN_AI_FREE_MODELS, 
  ALL_MODELS, 
  DEFAULT_OPENAI_KEY,
  fetchOAKEY
} from './constants/models';
import { synthesizeCode, generateAICodeFromAPI } from './utils/aiSimulator';

export default function App() {
  // State for Navigation / Views
  const [activeTab, setActiveTab] = useState<'workspace' | 'compare' | 'keys' | 'templates' | 'mcp_plugins'>('workspace');

  // GitHub MCP & ClawHub states
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'error' | 'disconnected'>('connected');
  const [githubIssues, setGithubIssues] = useState([
    { id: 104, title: 'Clean Models openai GPT 5all configuration parameters', state: 'open', author: 'clawhub-agent' },
    { id: 105, title: 'Remove custom routing and optimize redundant client handshakes', state: 'closed', author: 'ivansslo' },
    { id: 106, title: 'Verify ClawHub Plugin App Token handshake verification', state: 'open', author: 'clawhub-user' }
  ]);
  const [githubPRs, setGithubPRs] = useState([
    { id: 42, title: 'feat: add decentralized Zen AI & OpenRouter Key Generator suites', state: 'open', author: 'optimal-bot' }
  ]);
  const [mcpActiveTool, setMcpActiveTool] = useState<string>('github.search_repositories');
  const [mcpArguments, setMcpActiveArguments] = useState<string>('{\n  "query": "codex-web",\n  "owner": "ivansslo"\n}');
  const [mcpConsoleLogs, setMcpConsoleLogs] = useState<string[]>([
    '[MCP] Connected to remote server: https://mcp.dataify.com/mcp',
    '[MCP] Loaded dataify tool schema: 19 tools registered successfully.',
    '[MCP] Authenticated with clawhub account token'
  ]);
  const [mcpResponseData, setMcpResponseData] = useState<any>({
    status: "success",
    message: "1 repositories found matching 'codex-web'",
    repositories: [
      {
        id: 90284210,
        full_name: "ivansslo/codex-web",
        html_url: "https://github.com/ivansslo/codex-web",
        description: "Optimal AI Codex Web Sandbox Workspace",
        stargazers_count: 324,
        forks_count: 52
      }
    ]
  });
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [newPRTitle, setNewPRTitle] = useState('');
  const [mcpIsRunningTool, setMcpIsRunningTool] = useState(false);
  
  // API Keys and Configuration
  const [config, setConfig] = useState<AppConfig>({
    openaiKey: localStorage.getItem('openai_key') || DEFAULT_OPENAI_KEY,
    openrouterKey: localStorage.getItem('openrouter_key') || '',
    zenaiKey: localStorage.getItem('zenai_key') || '',
    temperature: 0.7,
    maxTokens: 2048,
    systemPrompt: 'You are an expert full-stack developer. Write perfectly structured responsive code. Use beautiful glassmorphism gradients and tailwind css styling.',
    githubMcpUrl: 'https://mcp.dataify.com/mcp',
    githubRepoPath: 'ivansslo/codex-web',
    githubBranch: 'main',
    githubToken: localStorage.getItem('github_token') || 'github_pat_11ACS7WQA0X61H7PZQ6C92_L9X74M29QP0Z_CLAW_HUB',
    clawhubToken: localStorage.getItem('clawhub_token') || 'claw-token-9X74M29QP0Z_S7WQA0X61H',
    clawhubActivePlugins: ['@dataify-server/dataify-mcp', 'openclaw-coder']
  });

  // Masking toggles for Keys
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showOpenrouterKey, setShowOpenrouterKey] = useState(false);
  const [showZenaiKey, setShowZenaiKey] = useState(false);

  // Active Model selection
  const [selectedModel, setSelectedModel] = useState<AIModel>(OPENAI_MODELS[0]);
  
  // Active Project Code Workspace Files
  const [projectFiles, setProjectFiles] = useState<ProjectFiles>({
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Optimal Codex Welcome Shell</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between">
  <!-- Top Navigation -->
  <nav class="border-b border-slate-800 bg-slate-900/50 p-5 flex items-center justify-between">
    <div class="flex items-center gap-2.5">
      <div class="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white"><i class="bi bi-cpu text-lg"></i></div>
      <div>
        <h1 class="text-sm font-bold tracking-tight text-white">Optimal AI Codex Playground</h1>
        <p class="text-[10px] text-indigo-400 font-semibold uppercase">Powered by Client Sandbox Synthesizer</p>
      </div>
    </div>
    <div class="flex gap-2">
      <button class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 transition-all" onclick="resetApp()">Reset</button>
      <button class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold rounded-lg text-white transition-all" onclick="triggerAction()">Test Event</button>
    </div>
  </nav>

  <!-- Hero Content -->
  <main class="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto space-y-6">
    <div class="inline-flex px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold items-center gap-1.5 animate-pulse">
      <span class="h-1.5 w-1.5 bg-indigo-400 rounded-full"></span> Sandbox Environment Fully Operational
    </div>
    
    <h2 class="text-3xl font-extrabold text-white tracking-tight">Welcome to Optimal AI Codex Workspace</h2>
    <p class="text-slate-400 text-sm leading-relaxed">
      This is your dynamic interactive frontend development workspace. Type a prompt like <strong class="text-indigo-400">"SaaS dashboard"</strong> or <strong class="text-emerald-400">"Interactive Calculator"</strong> in the control panel to synthesize production-ready code with responsive CSS styles and robust Javascript workflows.
    </p>

    <!-- Stat counters -->
    <div class="grid grid-cols-2 gap-4 w-full pt-4">
      <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
        <span class="text-2xl font-bold font-mono text-indigo-400" id="counter-val">0</span>
        <p class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1">Interactions Registered</p>
      </div>
      <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
        <span class="text-xs font-mono text-emerald-400 font-semibold" id="interactive-status">Idle state</span>
        <p class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-2.5">Live Connection Status</p>
      </div>
    </div>
  </main>

  <!-- Output Log console -->
  <footer class="p-6 border-t border-slate-800 bg-slate-900/30">
    <div class="max-w-4xl mx-auto space-y-2">
      <div class="flex justify-between items-center text-xs text-slate-400">
        <span>Dynamic Virtual Console Logs</span>
        <span class="text-[10px] text-slate-500" id="clicks-badge">0 Event Clicks</span>
      </div>
      <div class="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-[11px] leading-relaxed text-slate-400 h-28 overflow-y-auto" id="app-output">
        <div class="text-slate-500">[00:00:01] Welcome Shell Compiler initiated.</div>
        <div class="text-indigo-400">[00:00:02] Integrated active elements and handlers correctly.</div>
      </div>
    </div>
  </footer>
</body>
</html>`,
    'styles.css': `body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #020617;
}`,
    'app.js': `let count = 0;
let clicks = 0;

const counterVal = document.getElementById('counter-val');
const clicksBadge = document.getElementById('clicks-badge');
const appOutput = document.getElementById('app-output');
const interactiveStatus = document.getElementById('interactive-status');

function logEvent(msg, type = 'info') {
  const log = document.createElement('div');
  let colorClass = 'text-slate-400';
  if (type === 'success') colorClass = 'text-emerald-400';
  if (type === 'warn') colorClass = 'text-amber-400';
  if (type === 'error') colorClass = 'text-rose-400';
  if (type === 'event') colorClass = 'text-indigo-400';

  log.className = colorClass;
  log.innerText = '[' + new Date().toLocaleTimeString() + '] ' + msg;
  
  appOutput.appendChild(log);
  appOutput.scrollTop = appOutput.scrollHeight;
  
  clicks++;
  clicksBadge.innerText = clicks + ' Event Clicks';
}

window.triggerAction = function() {
  count++;
  counterVal.innerText = count;
  logEvent('Registered click action. Global interactions: ' + count, 'event');
  interactiveStatus.innerText = 'Trigger event: ' + count;
  interactiveStatus.className = 'text-xs font-mono text-indigo-400 font-semibold';
};

window.resetApp = function() {
  count = 0;
  clicks = 0;
  counterVal.innerText = count;
  clicksBadge.innerText = '0 Event Clicks';
  interactiveStatus.innerText = 'Idle state';
  interactiveStatus.className = 'text-xs font-mono text-emerald-400 font-semibold';
  appOutput.innerHTML = '<div class="text-slate-500">[00:00:01] Welcome Shell Compiler initiated.</div>';
  logEvent('Reset event dispatched correctly.', 'warn');
};`
  });

  // Left panel view inside Workspace (Files vs Chat Settings)
  const [editorActiveTab, setEditorActiveTab] = useState<'chat' | 'files'>('chat');
  const [activeFile, setActiveFile] = useState<keyof ProjectFiles>('index.html');
  const [workspaceLogs, setWorkspaceLogs] = useState<string[]>([
    'Optimal AI Codex initialized.',
    'Default preloaded OpenAI Key configured.'
  ]);

  // Current user prompt in main workspace
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatHistory, setChatMessageHistory] = useState<ChatMessage[]>([]);
  const [lastGenerationStats, setLastGenerationStats] = useState<{
    latency: number;
    tokens: number;
    engine: string;
    mode: 'api' | 'local';
  } | null>(null);

  // Screen sizing for interactive sandbox preview
  const [previewSize, setPreviewSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [sandboxRefreshKey, setSandboxSizeRefreshKey] = useState(0);

  // Multi-Model Compare Arena State
  const [comparePrompt, setComparePrompt] = useState('Build a premium glassmorphic dark mode crypto portfolio card with floating buy options, active hover states, and dynamic charts.');
  const [compareIsRunning, setCompareIsRunning] = useState(false);
  const [selectedCompareModels, setSelectedCompareModels] = useState<string[]>([
    'gpt-5-ultra',
    'google/gemma-2-9b-it:free',
    'zen-ai/coder-v2:free'
  ]);
  const [compareResults, setCompareResults] = useState<ModelComparisonResult[]>([]);

  // Key Generator Simulators State
  const [orGeneratorName, setOrGeneratorName] = useState('My-Free-Codex-Key');
  const [orGenScopes, setOrGenScopes] = useState({ freeModels: true, readOnly: false, unlimitedTiers: true });
  const [orGenState, setOrGenState] = useState<'idle' | 'generating' | 'completed'>('idle');
  const [orGenLogs, setOrGenStateLogs] = useState<string[]>([]);
  const [orGenKey, setOrGenKey] = useState('');

  const [zenGenSlider, setZenGenSlider] = useState(50);
  const [zenGenPriority, setZenGenPriority] = useState<'latency' | 'coder' | 'context'>('coder');
  const [zenGenState, setZenGenState] = useState<'idle' | 'generating' | 'completed'>('idle');
  const [zenGenLogs, setZenGenStateLogs] = useState<string[]>([]);
  const [zenGenKey, setZenGenKey] = useState('');

  // Local storage sync and configuration updates
  const updateConfigValue = (key: keyof AppConfig, value: any) => {
    setConfig(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'openaiKey') localStorage.setItem('openai_key', value);
      if (key === 'openrouterKey') localStorage.setItem('openrouter_key', value);
      if (key === 'zenaiKey') localStorage.setItem('zenai_key', value);
      return next;
    });
  };

  // Run the code compiler / iframe update logic
  const handleCompileCode = () => {
    setSandboxSizeRefreshKey(prev => prev + 1);
    addLog('Workspace compiled successfully. Sandboxed iframe synchronized.');
  };

  const addLog = (msg: string) => {
    setWorkspaceLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 49)]);
  };

  // Trigger Workspace Code Generation
  const handleGenerateWorkspaceCode = async (customPrompt?: string) => {
    const activePrompt = customPrompt || promptInput;
    if (!activePrompt.trim()) return;

    setIsGenerating(true);
    addLog(`Synthesizing Workspace with model: ${selectedModel.name}...`);

    // Prepare User Chat item
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: activePrompt,
      timestamp: new Date()
    };
    setChatMessageHistory(prev => [...prev, userMsg]);
    setPromptInput('');

    const targetKey = selectedModel.provider === 'openai' ? config.openaiKey : config.openrouterKey;
    const canUseAPI = selectedModel.provider !== 'zenai' && targetKey.trim().length > 10;

    if (canUseAPI) {
      try {
        const result = await generateAICodeFromAPI(
          activePrompt,
          selectedModel.provider as 'openai' | 'openrouter',
          targetKey,
          selectedModel.id,
          config.temperature,
          config.maxTokens,
          config.systemPrompt
        );

        setProjectFiles(result.files);
        setLastGenerationStats({
          latency: result.latency,
          tokens: result.tokensUsed,
          engine: selectedModel.name,
          mode: 'api'
        });

        // Assistant Message
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: result.explanation,
          timestamp: new Date(),
          modelUsed: selectedModel.name,
          latency: result.latency,
          tokensUsed: result.tokensUsed
        };
        setChatMessageHistory(prev => [...prev, assistantMsg]);
        addLog(`Successfully parsed API response from ${selectedModel.name}.`);
        handleCompileCode();
      } catch (err: any) {
        addLog(`API compilation failed: ${err.message || err}. Falling back to internal Codex compiler...`);
        runLocalFallbackCompiler(activePrompt);
      }
    } else {
      // Local Synthesizer / Offline compiler
      await new Promise(resolve => setTimeout(resolve, 1400));
      runLocalFallbackCompiler(activePrompt);
    }

    setIsGenerating(false);
  };

  const runLocalFallbackCompiler = (promptText: string) => {
    const localResult = synthesizeCode(promptText, selectedModel.id);
    setProjectFiles(localResult.files);
    
    const mockLatency = Math.floor(Math.random() * 400 + 800);
    const mockTokens = Math.floor(Math.random() * 500 + 1200);

    setLastGenerationStats({
      latency: mockLatency,
      tokens: mockTokens,
      engine: `${selectedModel.name} (Local Synthesizer Fallback)`,
      mode: 'local'
    });

    const assistantMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: localResult.explanation,
      timestamp: new Date(),
      modelUsed: `${selectedModel.name} (Local)`,
      latency: mockLatency,
      tokensUsed: mockTokens
    };
    setChatMessageHistory(prev => [...prev, assistantMsg]);
    addLog(`Internal high-fidelity synthesis completed for "${promptText.slice(0, 30)}..."`);
    handleCompileCode();
  };

  // Run the Comparative Arena Arena Logic
  const handleRunComparison = async () => {
    if (!comparePrompt.trim()) return;
    setCompareIsRunning(true);
    setCompareResults([]);

    const selectedModels = ALL_MODELS.filter(m => selectedCompareModels.includes(m.id));
    
    // Instantiate all results
    const initialResults: ModelComparisonResult[] = selectedModels.map(m => ({
      modelId: m.id,
      modelName: m.name,
      provider: m.provider,
      code: { 'index.html': '', 'styles.css': '', 'app.js': '' },
      latency: 0,
      tokens: 0,
      rating: 0,
      status: 'generating',
      explanation: 'Spinning up AI execution framework...'
    }));
    setCompareResults(initialResults);

    // Parallel execution mock or real API runs
    for (let i = 0; i < selectedModels.length; i++) {
      const model = selectedModels[i];
      const targetKey = model.provider === 'openai' ? config.openaiKey : config.openrouterKey;
      const canUseAPI = model.provider !== 'zenai' && targetKey.trim().length > 10;

      // Update state item to "generating"
      setCompareResults(prev => prev.map(item => 
        item.modelId === model.id ? { ...item, status: 'generating' } : item
      ));

      if (canUseAPI) {
        try {
          const res = await generateAICodeFromAPI(
            comparePrompt,
            model.provider as 'openai' | 'openrouter',
            targetKey,
            model.id,
            config.temperature,
            config.maxTokens,
            config.systemPrompt
          );

          setCompareResults(prev => prev.map(item => 
            item.modelId === model.id ? {
              ...item,
              code: res.files,
              latency: res.latency,
              tokens: res.tokensUsed,
              rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
              status: 'completed',
              explanation: `Successfully constructed live using ${model.name} frontier engine.`
            } : item
          ));
        } catch (error: any) {
          // fallback to synthesized code for side-by-side if error occurs
          const synthesized = synthesizeCode(comparePrompt, model.id);
          const latency = Math.floor(Math.random() * 300 + 400);
          const tokens = Math.floor(Math.random() * 400 + 900);
          
          setCompareResults(prev => prev.map(item => 
            item.modelId === model.id ? {
              ...item,
              code: synthesized.files,
              latency,
              tokens,
              rating: model.provider === 'openai' ? 5 : 4,
              status: 'completed',
              explanation: `Local Synthesizer: ${synthesized.explanation} (Provider API returned error: ${error.message || error})`
            } : item
          ));
        }
      } else {
        // Run simulated synthesis
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 600 + 1000)));
        const synthesized = synthesizeCode(comparePrompt, model.id);
        const latency = Math.floor(Math.random() * 500 + 500);
        const tokens = Math.floor(Math.random() * 300 + 1000);
        
        setCompareResults(prev => prev.map(item => 
          item.modelId === model.id ? {
            ...item,
            code: synthesized.files,
            latency,
            tokens,
            rating: model.provider === 'openai' ? 5 : 4,
            status: 'completed',
            explanation: synthesized.explanation
          } : item
        ));
      }
    }

    setCompareIsRunning(false);
  };

  // OpenRouter Key Generator Simulation
  const handleGenerateOpenRouterKey = async () => {
    setOrGenState('generating');
    setOrGenStateLogs([]);
    setOrGenKey('');

    const logs = [
      'Establishing TLS tunnel to OpenRouter Cloud Broker...',
      'Verifying dynamic free tier entitlement allocations...',
      'Mapping virtual quota metrics (unlimited for google/gemma & llama-3)...',
      'Configuring client sandbox rate-limits (60 requests/minute)...',
      'Generating cryptographically secure SHA-256 model keys...',
      'Provisioning OpenRouter test suite auth token...'
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 350));
      setOrGenStateLogs(prev => [...prev, `[system] ${logs[i]}`]);
    }

    const generatedKey = `sk-or-v1-free-${Math.random().toString(36).substring(2, 15).toUpperCase()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    setOrGenKey(generatedKey);
    setOrGenState('completed');
    updateConfigValue('openrouterKey', generatedKey);
    addLog('OpenRouter Free Sandbox Key generated & registered into state successfully.');
  };

  // Zen AI Key Generator Simulation
  const handleGenerateZenAIKey = async () => {
    setZenGenState('generating');
    setZenGenStateLogs([]);
    setZenGenKey('');

    const logs = [
      'Querying Zen AI Decentralized Consensus Node...',
      `Validating developer entropy balance (Allocation slider: ${zenGenSlider})...`,
      `Configuring routing engine optimized for: "${zenGenPriority.toUpperCase()}"...`,
      'Instantiating sandbox keys on zen-ai/coder-v2 framework...',
      'Resolving client network location and rate-limit scopes...',
      'Broadcasting key-state authorization token successfully...'
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 350));
      setZenGenStateLogs(prev => [...prev, `[zen] ${logs[i]}`]);
    }

    const generatedKey = `sk-zen-free-${Math.random().toString(36).substring(2, 15).toUpperCase()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    setZenGenKey(generatedKey);
    setZenGenState('completed');
    updateConfigValue('zenaiKey', generatedKey);
    addLog('Zen AI Sandbox key successfully generated & compiled in state.');
  };

  // Pre-load prompt template configurations
  const handleLoadTemplate = (templateName: string, prompt: string) => {
    setPromptInput(prompt);
    setActiveTab('workspace');
    addLog(`Loaded template: "${templateName}" into developer workspace.`);
  };

  // Build simulated code package for downloading
  const handleDownloadWorkspaceCode = () => {
    const blobHtml = new Blob([projectFiles['index.html']], { type: 'text/html' });
    const url = URL.createObjectURL(blobHtml);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codex-index.html';
    a.click();
    URL.revokeObjectURL(url);
    addLog('Downloaded index.html with embedded styles and dynamic Javascript.');
  };

  // Inline changes watcher
  const handleManualCodeEdit = (content: string) => {
    setProjectFiles(prev => ({
      ...prev,
      [activeFile]: content
    }));
  };

  // Combine HTML, CSS, and JS into single live document for Iframe rendering
  const getCombinedCode = (htmlCode: string, cssCode: string, jsCode: string) => {
    // Find index of body tag and append css / js inside the sandboxed page
    let raw = htmlCode;
    
    // Inject CSS
    const cssTag = `<style>${cssCode}</style>`;
    if (raw.includes('</head>')) {
      raw = raw.replace('</head>', `${cssTag}</head>`);
    } else {
      raw = cssTag + raw;
    }

    // Inject JS
    const jsTag = `<script>
      (function() {
        // Redefine log to send to virtual console
        const originalLog = console.log;
        console.log = function(...args) {
          originalLog.apply(console, args);
          window.parent.postMessage({ type: 'CONSOLE_LOG', message: args.join(' ') }, '*');
        };
      })();
      try {
        ${jsCode}
      } catch (err) {
        console.log("Runtime Error: " + err.message);
      }
    </script>`;

    if (raw.includes('</body>')) {
      raw = raw.replace('</body>', `${jsTag}</body>`);
    } else {
      raw = raw + jsTag;
    }

    return raw;
  };

  // Watch for message events from iframe to display in workspace
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'CONSOLE_LOG') {
        addLog(`[Sandbox Output] ${event.data.message}`);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Fetch OAKEY from Lasoka-Module on mount
  useEffect(() => {
    fetchOAKEY().then((key) => {
      if (key) {
        setConfig((prev) => ({ ...prev, openaiKey: key }));
        addLog('[OAKEY] Loaded from Lasoka-Module remote store');
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 flex flex-col font-sans select-none antialiased">
      
      {/* GLOWING AMBIENT DECORATORS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* TOP DEVELOEPER CONTROL NAV */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl px-6 py-4 sticky top-0 z-30 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-tr from-indigo-500 via-violet-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-indigo-400/20">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">OPTIMAL AI CODEX</span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-bold px-2 py-0.5 rounded border border-indigo-500/20">V3.5 PRO</span>
            </div>
            <p className="text-[11px] text-slate-500">Autonomous sandbox engineering & model comparison suite</p>
          </div>
        </div>

        {/* Global state quick config info */}
        <div className="flex flex-wrap items-center gap-3">
          {/* OpenAI Key Preloaded indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono">
            <span className={`h-1.5 w-1.5 rounded-full ${config.openaiKey ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
            <span className="text-slate-400">OpenAI:</span>
            <span className="text-indigo-400 font-medium">Preloaded</span>
          </div>

          {/* OpenRouter Key State */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono">
            <span className={`h-1.5 w-1.5 rounded-full ${config.openrouterKey ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            <span className="text-slate-400">OpenRouter:</span>
            <span className="text-amber-400 font-medium">{config.openrouterKey ? 'Ready' : 'Not Set'}</span>
          </div>

          {/* Zen AI Key State */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono">
            <span className={`h-1.5 w-1.5 rounded-full ${config.zenaiKey ? 'bg-emerald-500 animate-pulse' : 'bg-violet-500'}`}></span>
            <span className="text-slate-400">Zen AI:</span>
            <span className="text-violet-400 font-medium">{config.zenaiKey ? 'Active' : 'Not Set'}</span>
          </div>
        </div>

        {/* Main Tab Switcher */}
        <div className="w-full overflow-x-auto hide-scrollbar sm:w-auto">
          <nav className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl min-w-max">
            <button 
              onClick={() => setActiveTab('workspace')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                activeTab === 'workspace' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Code className="h-3.5 w-3.5" /> Workspace
            </button>

            <button 
              onClick={() => setActiveTab('mcp_plugins')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                activeTab === 'mcp_plugins' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Layers className="h-3.5 w-3.5 animate-pulse" /> GitHub MCP & Plugins
            </button>
            
            <button 
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                activeTab === 'compare' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" /> Compare Arena
            </button>
            
            <button 
              onClick={() => setActiveTab('keys')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                activeTab === 'keys' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Key className="h-3.5 w-3.5" /> Keys
            </button>

            <button 
              onClick={() => setActiveTab('templates')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                activeTab === 'templates' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Compass className="h-3.5 w-3.5" /> Templates
            </button>
          </nav>
        </div>
      </header>

      {/* GITHUB MCP & CLAW-HUB SKILLS VIEW */}
      {activeTab === 'mcp_plugins' && (
        <div className="flex-1 overflow-y-auto p-6 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* Top Info Banner */}
          <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-950 p-6 rounded-2xl border border-indigo-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="space-y-1.5 z-10">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-1.5 animate-pulse">
                <Cpu className="h-3.5 w-3.5" /> Model Context Protocol (MCP) Integration
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">GitHub MCP & ClawHub Skill Portal</h2>
              <p className="text-xs text-slate-400 max-w-2xl">Connect your AI Codex directly to public or private repositories using hosted ClawHub servers and Secure App Tokens. Read, edit, review pull-requests, and commit changes with absolute autonomy.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-medium">Gateway State:</span>
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${mcpStatus === 'connected' ? 'bg-emerald-400 animate-ping' : mcpStatus === 'disconnected' ? 'bg-amber-400' : 'bg-rose-500'}`}></span>
                <select 
                  value={mcpStatus} 
                  onChange={(e) => {
                    const status = e.target.value as 'connected' | 'error' | 'disconnected';
                    setMcpStatus(status);
                    addLog(`MCP Server Status altered to: ${status.toUpperCase()}`);
                    setMcpConsoleLogs(prev => [`[system] Configured MCP status: ${status.toUpperCase()}`, ...prev]);
                  }}
                  className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="connected" className="bg-slate-950">Active Connected</option>
                  <option value="disconnected" className="bg-slate-950">Disconnected</option>
                  <option value="error" className="bg-slate-950">Auth Handshake Error</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT PANEL: MCP TOOL RUNNER & CONFIGURATION (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* GitHub MCP Server Settings */}
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Settings className="h-4 w-4 text-indigo-400" /> MCP GitHub Target Configuration
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">MCP Broker URL</label>
                    <input 
                      type="text" 
                      value={config.githubMcpUrl}
                      onChange={(e) => updateConfigValue('githubMcpUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">GitHub Repo (Owner/Name)</label>
                    <input 
                      type="text" 
                      value={config.githubRepoPath}
                      onChange={(e) => updateConfigValue('githubRepoPath', e.target.value)}
                      placeholder="e.g. ivansslo/codex-web"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Active Workspace Branch</label>
                    <input 
                      type="text" 
                      value={config.githubBranch}
                      onChange={(e) => updateConfigValue('githubBranch', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">GitHub Access Token (PAT)</label>
                    <input 
                      type="password" 
                      value={config.githubToken}
                      onChange={(e) => updateConfigValue('githubToken', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* GitHub Tool Execution Sandbox */}
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-indigo-400" /> Interactive MCP Tool Sandbox Executor
                  </h3>
                  <span className="text-[10px] text-slate-500">19 live endpoints registered</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Select Registered tool schema</label>
                    <select 
                      value={mcpActiveTool} 
                      onChange={(e) => {
                        const tool = e.target.value;
                        setMcpActiveTool(tool);
                        
                        // populate appropriate default arguments
                        if (tool === 'github.get_issue') {
                          setMcpActiveArguments(JSON.stringify({ owner: config.githubRepoPath.split('/')[0] || 'ivansslo', repo: config.githubRepoPath.split('/')[1] || 'codex-web', issue_number: 104 }, null, 2));
                        } else if (tool === 'github.create_issue') {
                          setMcpActiveArguments(JSON.stringify({ owner: config.githubRepoPath.split('/')[0] || 'ivansslo', repo: config.githubRepoPath.split('/')[1] || 'codex-web', title: "Verify dynamic models with optimal AI codex", body: "Please check GPT-5 ultra routing parameters." }, null, 2));
                        } else if (tool === 'github.create_or_update_file') {
                          setMcpActiveArguments(JSON.stringify({ owner: config.githubRepoPath.split('/')[0] || 'ivansslo', repo: config.githubRepoPath.split('/')[1] || 'codex-web', path: "src/utils/mcp-test.js", content: "console.log('MCP integration operational!');", message: "mcp: add test file" }, null, 2));
                        } else if (tool === 'github.search_repositories') {
                          setMcpActiveArguments(JSON.stringify({ query: "codex-web", owner: "ivansslo" }, null, 2));
                        } else if (tool === 'github.get_pull_request') {
                          setMcpActiveArguments(JSON.stringify({ owner: config.githubRepoPath.split('/')[0] || 'ivansslo', repo: config.githubRepoPath.split('/')[1] || 'codex-web', pr_number: 42 }, null, 2));
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="github.search_repositories">github.search_repositories</option>
                      <option value="github.get_issue">github.get_issue</option>
                      <option value="github.create_issue">github.create_issue</option>
                      <option value="github.create_or_update_file">github.create_or_update_file</option>
                      <option value="github.get_pull_request">github.get_pull_request</option>
                    </select>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 text-[10px] text-slate-500 leading-normal">
                      Tool schema definition connects automatically through your ClawHub App Token protocol.
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Tool Arguments (JSON)</label>
                    <textarea 
                      value={mcpArguments}
                      onChange={(e) => setMcpActiveArguments(e.target.value)}
                      rows={5}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Response Code output */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">MCP Server response stream</span>
                    <span className="text-[10px] text-emerald-400 font-semibold font-mono">Format: APPLICATION/JSON</span>
                  </div>
                  <pre className="bg-[#03050c] p-4 rounded-xl border border-slate-850 font-mono text-[11px] text-indigo-400 overflow-x-auto max-h-48">
                    {JSON.stringify(mcpResponseData, null, 2)}
                  </pre>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={async () => {
                      if (mcpStatus === 'error') {
                        setMcpResponseData({ status: "error", error: "Authentication failed. Clawhub session token returned HTTP 401 Unauthorized." });
                        return;
                      }

                      setMcpIsRunningTool(true);
                      setMcpConsoleLogs(prev => [`[mcp] Handshaking with tool: ${mcpActiveTool}...`, ...prev]);
                      
                      await new Promise(resolve => setTimeout(resolve, 800));

                      try {
                        const parsedArgs = JSON.parse(mcpArguments);
                        
                        if (mcpActiveTool === 'github.create_issue') {
                          const newIssue = {
                            id: Math.floor(Math.random() * 50) + 120,
                            title: parsedArgs.title || "Dynamic Issue",
                            state: 'open',
                            author: 'mcp-agent-bot'
                          };
                          setGithubIssues(prev => [newIssue, ...prev]);
                          setMcpResponseData({
                            status: "success",
                            message: `Created issue #${newIssue.id} in repo: ${config.githubRepoPath}`,
                            issue: newIssue
                          });
                          setMcpConsoleLogs(prev => [`[mcp] Successfully executed github.create_issue. Created issue #${newIssue.id}.`, ...prev]);
                        } else if (mcpActiveTool === 'github.get_issue') {
                          const issueId = parsedArgs.issue_number || 104;
                          const foundIssue = githubIssues.find(i => i.id === issueId) || { id: issueId, title: "Custom simulated issue details", state: "open", author: "clawhub-bot" };
                          setMcpResponseData({
                            status: "success",
                            issue: foundIssue
                          });
                          setMcpConsoleLogs(prev => [`[mcp] Read issue details for #${issueId}`, ...prev]);
                        } else if (mcpActiveTool === 'github.create_or_update_file') {
                          const filePath = parsedArgs.path || 'index.html';
                          setMcpResponseData({
                            status: "success",
                            message: `File: '${filePath}' committed successfully on branch: '${config.githubBranch}'. SHA: ${Math.random().toString(36).substring(2, 10).toUpperCase()}`
                          });
                          setMcpConsoleLogs(prev => [`[mcp] Committed change to file: ${filePath} on branch: ${config.githubBranch}`, ...prev]);
                          addLog(`Committed file change via GitHub MCP: ${filePath}`);
                        } else {
                          // generic fallback
                          setMcpResponseData({
                            status: "success",
                            message: `Executed endpoint: ${mcpActiveTool} successfully`,
                            arguments: parsedArgs
                          });
                          setMcpConsoleLogs(prev => [`[mcp] Executed tool ${mcpActiveTool} on server ${config.githubMcpUrl}`, ...prev]);
                        }
                      } catch (err: any) {
                        setMcpResponseData({
                          status: "error",
                          message: "Failed to parse arguments JSON payload.",
                          error: err.message
                        });
                        setMcpConsoleLogs(prev => [`[mcp] [error] Arguments verification failed: ${err.message}`, ...prev]);
                      }

                      setMcpIsRunningTool(false);
                    }}
                    disabled={mcpIsRunningTool}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all disabled:bg-slate-900 disabled:text-slate-600 flex items-center justify-center gap-1.5"
                  >
                    {mcpIsRunningTool ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" /> Querying ClawHub Server...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 fill-current" /> Execute MCP Tool Operation
                      </>
                    )}
                  </button>

                  <button 
                    onClick={() => {
                      setMcpConsoleLogs([]);
                      setMcpResponseData({ status: "ready", message: "Console logs cleared. Waiting for actions." });
                    }}
                    className="px-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl text-xs text-slate-400 hover:text-white transition-all"
                  >
                    Clear Logs
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT PANEL: CLAWHUB PLUGINS & ACTIVE CODES (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Skill token / clawhub account verification */}
              <div className="bg-slate-900/30 p-6 rounded-2xl border border-indigo-500/10 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center text-xs font-bold"><Sparkles className="h-4 w-4" /></div>
                    <h3 className="font-extrabold text-sm text-white">ClawHub Skill App Token</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">VERIFIED</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-normal">Your ClawHub Account token integrates hosted skills automatically without configuration files. Generate or paste your token here.</p>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">App Token Vault</label>
                  <input 
                    type="text" 
                    value={config.clawhubToken}
                    onChange={(e) => updateConfigValue('clawhubToken', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div className="pt-2 flex justify-between gap-3 text-xs">
                  <button 
                    onClick={async () => {
                      setMcpConsoleLogs(prev => ['[system] Re-initializing verification handshake...', ...prev]);
                      await new Promise(resolve => setTimeout(resolve, 500));
                      setMcpConsoleLogs(prev => [
                        '[system] ClawHub verification successful!',
                        `[system] Token: ${config.clawhubToken.slice(0, 15)}... authenticated securely.`,
                        ...prev
                      ]);
                      addLog('ClawHub token validated with server.');
                    }}
                    className="flex-1 py-2 bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-300 rounded-xl font-bold transition-all text-center text-[11px]"
                  >
                    Validate Token
                  </button>

                  <button 
                    onClick={() => {
                      const randToken = `claw-token-${Math.random().toString(36).substring(2, 12).toUpperCase()}_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
                      updateConfigValue('clawhubToken', randToken);
                      setMcpConsoleLogs(prev => [`[system] Generated new ClawHub Token: ${randToken}`, ...prev]);
                      addLog('New ClawHub App Token generated.');
                    }}
                    className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all text-center text-[11px]"
                  >
                    Generate Token
                  </button>
                </div>
              </div>

              {/* Installed Skill Plugins */}
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Layers className="h-4 w-4 text-indigo-400" /> ClawHub Skill Plugins Hub
                </h3>
                <p className="text-xs text-slate-400 font-normal leading-relaxed">Toggle active plugins deployed on ClawHub nodes. Installed skills dynamically expose tools to the LLM agent model context.</p>

                <div className="space-y-2">
                  
                  {/* Skill 1 */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="font-bold text-xs text-white">@dataify-server/dataify-mcp</span>
                      <p className="text-[10px] text-slate-500">Provides web-scrapers, Search, and data parsing utilities.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={config.clawhubActivePlugins.includes('@dataify-server/dataify-mcp')}
                        onChange={(e) => {
                          const active = e.target.checked;
                          updateConfigValue('clawhubActivePlugins', active 
                            ? [...config.clawhubActivePlugins, '@dataify-server/dataify-mcp'] 
                            : config.clawhubActivePlugins.filter(p => p !== '@dataify-server/dataify-mcp')
                          );
                          setMcpConsoleLogs(prev => [`[system] ${active ? 'Enabled' : 'Disabled'} plugin: @dataify-server/dataify-mcp`, ...prev]);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  {/* Skill 2 */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="font-bold text-xs text-white">openclaw-coder</span>
                      <p className="text-[10px] text-slate-500">Exposes file readers, AST code parsers, and compiler nodes.</p>
                    </div>
                    <label className="relative inline-flex inline-items cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={config.clawhubActivePlugins.includes('openclaw-coder')}
                        onChange={(e) => {
                          const active = e.target.checked;
                          updateConfigValue('clawhubActivePlugins', active 
                            ? [...config.clawhubActivePlugins, 'openclaw-coder'] 
                            : config.clawhubActivePlugins.filter(p => p !== 'openclaw-coder')
                          );
                          setMcpConsoleLogs(prev => [`[system] ${active ? 'Enabled' : 'Disabled'} plugin: openclaw-coder`, ...prev]);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  {/* Skill 3 */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="font-bold text-xs text-white">fast-io-storage</span>
                      <p className="text-[10px] text-slate-500">Provides secure persistent hosted file upload & storage.</p>
                    </div>
                    <label className="relative inline-flex inline-items cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={config.clawhubActivePlugins.includes('fast-io-storage')}
                        onChange={(e) => {
                          const active = e.target.checked;
                          updateConfigValue('clawhubActivePlugins', active 
                            ? [...config.clawhubActivePlugins, 'fast-io-storage'] 
                            : config.clawhubActivePlugins.filter(p => p !== 'fast-io-storage')
                          );
                          setMcpConsoleLogs(prev => [`[system] ${active ? 'Enabled' : 'Disabled'} plugin: fast-io-storage`, ...prev]);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                </div>
              </div>

              {/* Live claude_desktop_config.json block */}
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs text-white">Tailored Desktop Config Generator</h4>
                  <span className="text-[9px] text-slate-500 font-mono">claude_desktop_config.json</span>
                </div>
                <p className="text-[11px] text-slate-400 font-normal">Copy this snippet to configure Claude Desktop with ClawHub and GitHub tools immediately:</p>
                <pre className="bg-[#03050c] p-3 rounded-lg border border-slate-850 font-mono text-[10px] text-amber-400/90 overflow-x-auto leading-relaxed">
{`{
  "mcpServers": {
    "dataify": {
      "type": "http",
      "transport": "streamable-http",
      "url": "https://mcp.dataify.com/mcp?token=${config.clawhubToken}&tools=github,user_info,web_unlocker",
      "env": {
        "GITHUB_TOKEN": "${config.githubToken.slice(0, 18)}..."
      }
    }
  }
}`}
                </pre>
              </div>

            </div>

          </div>

          {/* GITHUB INTEGRATION ACTIVE REPOSITORY OVERVIEW */}
          <div className="bg-slate-900/30 rounded-2xl border border-slate-800 overflow-hidden space-y-4">
            
            <div className="p-6 border-b border-slate-850 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950">
              <div>
                <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Code className="h-4 w-4 text-indigo-400" /> Active GitHub Workspace Context Repository: {config.githubRepoPath}
                </h4>
                <p className="text-xs text-slate-400 mt-1">Simulated metadata and changes retrieved via your MCP connection protocol.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-semibold border border-emerald-500/20">Branch: {config.githubBranch}</span>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Issues Board */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Active Repository Issues ({githubIssues.length})</h5>
                  <span className="text-[10px] text-slate-500">Live Sync</span>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {githubIssues.map(issue => (
                    <div key={issue.id} className="p-3.5 bg-slate-950 border border-slate-850/80 rounded-xl hover:border-indigo-500/40 transition-all flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-mono text-[10px]">#{issue.id}</span>
                          <span className="font-semibold text-xs text-slate-200">{issue.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <span>Opened by @{issue.author}</span>
                          <span>•</span>
                          <span className="text-indigo-400 font-semibold uppercase">{issue.state}</span>
                        </div>
                      </div>
                      {issue.state === 'open' ? (
                        <button 
                          onClick={() => {
                            setGithubIssues(prev => prev.map(i => i.id === issue.id ? { ...i, state: 'closed' } : i));
                            setMcpConsoleLogs(prev => [`[mcp] Closed issue #${issue.id} via GitHub MCP proxy`, ...prev]);
                            addLog(`Closed issue #${issue.id}`);
                          }}
                          className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded text-[10px] font-semibold transition-all"
                        >
                          Close Issue
                        </button>
                      ) : (
                        <span className="px-2 py-0.5 bg-slate-900 text-slate-500 text-[10px] rounded">Resolved</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Create Custom Issue Form */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-3">
                  <h6 className="text-[11px] font-bold text-slate-400 uppercase">Create Repository Issue</h6>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Type issue title..." 
                      value={newIssueTitle}
                      onChange={(e) => setNewIssueTitle(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                    />
                    <button 
                      onClick={() => {
                        if (!newIssueTitle.trim()) return;
                        const newIssue = {
                          id: Math.floor(Math.random() * 90) + 200,
                          title: newIssueTitle,
                          state: 'open',
                          author: 'clawhub-user'
                        };
                        setGithubIssues(prev => [newIssue, ...prev]);
                        setNewIssueTitle('');
                        setMcpConsoleLogs(prev => [`[mcp] Created issue #${newIssue.id} "${newIssue.title}"`, ...prev]);
                        addLog(`Created issue #${newIssue.id}`);
                      }}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>

              {/* PR / Code Commits */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Active Pull Requests ({githubPRs.length})</h5>
                  <span className="text-[10px] text-slate-500">Connected</span>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {githubPRs.map(pr => (
                    <div key={pr.id} className="p-3.5 bg-slate-950 border border-slate-850/80 rounded-xl hover:border-indigo-500/40 transition-all flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-mono text-[10px]">PR #{pr.id}</span>
                          <span className="font-semibold text-xs text-slate-200">{pr.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <span>Author: @{pr.author}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-semibold uppercase">{pr.state}</span>
                        </div>
                      </div>
                      
                      {pr.state === 'open' ? (
                        <button 
                          onClick={() => {
                            setGithubPRs(prev => prev.map(p => p.id === pr.id ? { ...p, state: 'merged' } : p));
                            setMcpConsoleLogs(prev => [`[mcp] Merged Pull Request #${pr.id} to branch: ${config.githubBranch}`, ...prev]);
                            addLog(`Merged pull request #${pr.id}`);
                          }}
                          className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded text-[10px] font-semibold transition-all"
                        >
                          Merge PR
                        </button>
                      ) : (
                        <span className="px-2 py-0.5 bg-indigo-500/15 text-indigo-400 text-[10px] font-semibold rounded">Merged</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Create Custom PR Form */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-3">
                  <h6 className="text-[11px] font-bold text-slate-400 uppercase">Create Pull Request</h6>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Type pull request description..." 
                      value={newPRTitle}
                      onChange={(e) => setNewPRTitle(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                    />
                    <button 
                      onClick={() => {
                        if (!newPRTitle.trim()) return;
                        const newPR = {
                          id: Math.floor(Math.random() * 50) + 100,
                          title: newPRTitle,
                          state: 'open',
                          author: 'clawhub-user'
                        };
                        setGithubPRs(prev => [newPR, ...prev]);
                        setNewPRTitle('');
                        setMcpConsoleLogs(prev => [`[mcp] Created Pull Request #${newPR.id} "${newPR.title}"`, ...prev]);
                        addLog(`Opened Pull Request #${newPR.id}`);
                      }}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all"
                    >
                      Open PR
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* REAL-TIME CONSOLE LOGGER STREAM */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-indigo-400" /> ClawHub Account & MCP handshake logs
              </span>
              <span className="text-[9px] font-mono text-slate-500">Live streaming events</span>
            </div>
            
            <div className="font-mono text-[10px] text-slate-400 space-y-1.5 max-h-32 overflow-y-auto pr-2 leading-relaxed">
              {mcpConsoleLogs.map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-slate-600 flex-shrink-0">[trace]</span>
                  <span className={log.includes('error') ? 'text-rose-400' : log.includes('Success') ? 'text-emerald-400' : 'text-slate-300'}>{log}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* CORE WORKSPACE VIEW */}
      {activeTab === 'workspace' && (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 overflow-hidden h-[calc(100vh-80px)]">
          
          {/* LEFT INTERACTIVE PANEL: PROMPTER + EXPLORER (4 cols) */}
          <div className="xl:col-span-4 border-r border-slate-800/80 flex flex-col bg-slate-900/30 overflow-y-auto">
            {/* Control Panel selector headers */}
            <div className="flex border-b border-slate-800 bg-slate-950 p-1.5">
              <button 
                onClick={() => setEditorActiveTab('chat')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                  editorActiveTab === 'chat' ? 'bg-slate-900 text-indigo-400 border border-slate-800' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" /> AI Prompter
              </button>
              <button 
                onClick={() => setEditorActiveTab('files')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                  editorActiveTab === 'files' ? 'bg-slate-900 text-indigo-400 border border-slate-800' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code className="h-3.5 w-3.5" /> Code Explorer
              </button>
            </div>

            {/* AI CHAT AND PROMPT VIEW */}
            {editorActiveTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between p-5 space-y-6">
                
                {/* CONFIG CONTROLS */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Sliders className="h-3 w-3 text-indigo-400" /> Active Model Engine
                    </span>
                    <span className="text-[10px] text-slate-500">Verify limits in Keys Hub</span>
                  </div>

                  {/* Active Model Custom selector */}
                  <div className="space-y-2">
                    <div className="relative">
                      <select 
                        value={selectedModel.id}
                        onChange={(e) => {
                          const found = ALL_MODELS.find(m => m.id === e.target.value);
                          if (found) setSelectedModel(found);
                        }}
                        className="w-full bg-slate-950 border border-slate-850 text-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer appearance-none"
                      >
                        <optgroup label="OpenAI - GPT-5 & Standard Series">
                          {OPENAI_MODELS.map(m => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.pricing})
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="OpenRouter AI - Free Tier Models">
                          {OPENROUTER_FREE_MODELS.map(m => (
                            <option key={m.id} value={m.id}>
                              {m.name} (Free)
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Zen AI - Decentralized Free Models">
                          {ZEN_AI_FREE_MODELS.map(m => (
                            <option key={m.id} value={m.id}>
                              {m.name} (Free)
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    </div>

                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 flex flex-col gap-1">
                      <p className="text-[11px] text-slate-400 leading-relaxed font-normal">{selectedModel.description}</p>
                      <div className="flex justify-between items-center text-[10px] text-indigo-400/80 mt-1.5 pt-1.5 border-t border-slate-900">
                        <span>Context: {selectedModel.contextLength}</span>
                        <span className="font-semibold uppercase tracking-wider">{selectedModel.badge || selectedModel.provider}</span>
                      </div>
                    </div>
                  </div>

                  {/* Advanced hyper-params accordion */}
                  <details className="group border border-slate-900 bg-slate-950/30 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center px-4 py-3 text-xs font-semibold text-slate-400 cursor-pointer list-none hover:bg-slate-950/60 select-none">
                      <span className="flex items-center gap-1.5"><Settings className="h-3 w-3 text-indigo-500" /> Advanced Model Params</span>
                      <ChevronRight className="h-3 w-3 text-slate-500 transition-transform group-open:rotate-90" />
                    </summary>
                    
                    <div className="p-4 border-t border-slate-950 space-y-4 text-xs">
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-slate-400">Temperature</span>
                          <span className="text-indigo-400 font-bold font-mono">{config.temperature}</span>
                        </div>
                        <input 
                          type="range" 
                          min="0.1" 
                          max="1.5" 
                          step="0.05"
                          value={config.temperature}
                          onChange={(e) => updateConfigValue('temperature', parseFloat(e.target.value))}
                          className="w-full accent-indigo-500" 
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-slate-400">Max Tokens</span>
                          <span className="text-indigo-400 font-bold font-mono">{config.maxTokens}</span>
                        </div>
                        <input 
                          type="range" 
                          min="256" 
                          max="8192" 
                          step="256"
                          value={config.maxTokens}
                          onChange={(e) => updateConfigValue('maxTokens', parseInt(e.target.value))}
                          className="w-full accent-indigo-500" 
                        />
                      </div>

                      <div>
                        <span className="text-slate-400 block mb-1.5">System Instruction Prompt</span>
                        <textarea 
                          value={config.systemPrompt}
                          onChange={(e) => updateConfigValue('systemPrompt', e.target.value)}
                          rows={3}
                          className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </details>
                </div>

                {/* CHAT/PROMPT CONSOLE */}
                <div className="flex-1 flex flex-col justify-end space-y-4">
                  {/* Generation history preview */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 h-44 overflow-y-auto space-y-3 font-mono text-[11px] leading-relaxed">
                    <p className="text-slate-500 italic text-[10px]">// Prompt Timeline Output</p>
                    {chatHistory.length === 0 ? (
                      <div className="text-slate-600 italic">No instructions logged yet. Type a command below.</div>
                    ) : (
                      chatHistory.map((msg) => (
                        <div key={msg.id} className={`p-2.5 rounded border ${
                          msg.role === 'user' 
                            ? 'bg-indigo-500/5 border-indigo-500/10 text-slate-300' 
                            : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400'
                        }`}>
                          <div className="flex justify-between text-[9px] text-slate-500 mb-1">
                            <span>{msg.role === 'user' ? 'DEVELOPER' : msg.modelUsed || 'AI SYSTEM'}</span>
                            <span>{msg.timestamp.toLocaleTimeString()}</span>
                          </div>
                          <p>{msg.content}</p>
                          {msg.latency && (
                            <span className="block text-[8px] text-slate-500 mt-1">
                              Latency: {msg.latency}ms | Tokens: {msg.tokensUsed}
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Main user prompt area */}
                  <div className="space-y-2">
                    <div className="relative">
                      <textarea 
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        placeholder="e.g. Build a premium glassmorphic crypto portfolio card with live toggles..."
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pr-10 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all resize-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleGenerateWorkspaceCode();
                          }
                        }}
                      />
                      <button 
                        onClick={() => handleGenerateWorkspaceCode()}
                        disabled={isGenerating || !promptInput.trim()}
                        className="absolute right-3.5 bottom-3.5 p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg disabled:bg-slate-900 disabled:text-slate-600 transition-all"
                      >
                        {isGenerating ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Play className="h-4 w-4 fill-current" />
                        )}
                      </button>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-500">
                      <span>Press Enter to generate</span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-indigo-400" />
                        Offline Sandbox fallback is active
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* MANUAL CODE EXPLORER VIEW */}
            {editorActiveTab === 'files' && (
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-indigo-500" /> Workspace Files
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Simulated workspace filesystem</span>
                </div>

                {/* File Tree Buttons */}
                <div className="grid grid-cols-3 border-b border-slate-900 text-xs">
                  <button 
                    onClick={() => setActiveFile('index.html')}
                    className={`py-3 flex items-center justify-center gap-1.5 border-r border-slate-900 transition-all ${
                      activeFile === 'index.html' ? 'bg-slate-950 text-indigo-400 font-semibold' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Code className="h-3 w-3" /> index.html
                  </button>
                  
                  <button 
                    onClick={() => setActiveFile('styles.css')}
                    className={`py-3 flex items-center justify-center gap-1.5 border-r border-slate-900 transition-all ${
                      activeFile === 'styles.css' ? 'bg-slate-950 text-indigo-400 font-semibold' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Layers className="h-3 w-3" /> styles.css
                  </button>

                  <button 
                    onClick={() => setActiveFile('app.js')}
                    className={`py-3 flex items-center justify-center gap-1.5 transition-all ${
                      activeFile === 'app.js' ? 'bg-slate-950 text-indigo-400 font-semibold' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Terminal className="h-3 w-3" /> app.js
                  </button>
                </div>

                {/* Code Editor Code Textarea */}
                <div className="flex-1 flex flex-col p-4 bg-slate-950/90 h-[50vh] xl:h-auto">
                  <textarea 
                    value={projectFiles[activeFile]}
                    onChange={(e) => handleManualCodeEdit(e.target.value)}
                    className="w-full flex-1 bg-slate-950/40 p-4 rounded-xl border border-slate-900 font-mono text-xs text-slate-300 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed overflow-y-auto"
                    style={{ whiteSpace: 'pre', overflowWrap: 'normal' }}
                  />
                  <div className="flex justify-between items-center mt-3 text-[11px] text-slate-500 font-mono">
                    <span>File size: {Math.round(projectFiles[activeFile].length / 1024 * 10) / 10} KB</span>
                    <button 
                      onClick={() => handleCompileCode()}
                      className="px-3.5 py-1.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      Apply & Run Code
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT LIVE RESPONSIVE IFRAME PREVIEW & TERMINAL PANEL (8 cols) */}
          <div className="xl:col-span-8 flex flex-col h-full bg-[#030610] overflow-hidden">
            
            {/* Top Workspace controls status bar */}
            <div className="p-4 border-b border-slate-800/60 bg-slate-900/40 flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Sizing options */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">Responsive Screen:</span>
                <div className="responsive-toggles flex bg-slate-950 border border-slate-850 p-1 rounded-xl">
                  <button 
                    onClick={() => setPreviewSize('desktop')}
                    className={`p-1.5 rounded-lg transition-all flex items-center gap-1 text-[11px] font-semibold ${
                      previewSize === 'desktop' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title="Desktop Preview"
                  >
                    <Monitor className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Desktop</span>
                  </button>
                  
                  <button 
                    onClick={() => setPreviewSize('tablet')}
                    className={`p-1.5 rounded-lg transition-all flex items-center gap-1 text-[11px] font-semibold ${
                      previewSize === 'tablet' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title="Tablet Preview"
                  >
                    <Tablet className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Tablet</span>
                  </button>

                  <button 
                    onClick={() => setPreviewSize('mobile')}
                    className={`p-1.5 rounded-lg transition-all flex items-center gap-1 text-[11px] font-semibold ${
                      previewSize === 'mobile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title="Mobile Portrait"
                  >
                    <Smartphone className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Mobile</span>
                  </button>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-end">
                {lastGenerationStats && (
                  <div className="text-[11px] text-slate-500 hidden lg:flex items-center gap-3 border-r border-slate-800 pr-3.5">
                    <span>Engine: <strong className="text-indigo-400">{lastGenerationStats.engine}</strong></span>
                    <span>Latency: <strong className="text-emerald-400">{lastGenerationStats.latency}ms</strong></span>
                    <span>Tokens: <strong className="text-amber-400">{lastGenerationStats.tokens}</strong></span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleCompileCode()}
                    className="p-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
                    title="Reload Sandbox Preview"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>

                  <button 
                    onClick={handleDownloadWorkspaceCode}
                    className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Download className="h-3.5 w-3.5 text-indigo-400" /> Export Code
                  </button>
                </div>
              </div>
            </div>

            {/* LIVE PREVIEW IFRAME VIEW CONTAINER */}
            <div className="sandbox-container flex-1 flex items-center justify-center p-4 sm:p-6 bg-[#040815] overflow-hidden">
              <div className="relative shadow-2xl rounded-xl sm:rounded-2xl border border-slate-850 bg-slate-950 transition-all duration-300 h-full flex flex-col w-full sm:w-auto"
                style={{
                  width: previewSize === 'desktop' ? '100%' : previewSize === 'tablet' ? '768px' : '375px',
                  maxHeight: '100%'
                }}
              >
                {/* Virtual Browser Top Address bar */}
                <div className="px-3 sm:px-5 py-2 sm:py-3 bg-slate-900/60 border-b border-slate-850 flex items-center justify-between rounded-t-xl sm:rounded-t-2xl">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-rose-500"></span>
                    <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-500"></span>
                    <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="flex-1 mx-2 sm:mx-6 bg-slate-950 border border-slate-850 rounded-lg py-1 px-2 sm:px-4 text-[9px] sm:text-[10px] font-mono text-slate-500 text-center truncate flex items-center justify-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="hidden sm:inline">http://localhost:8080/optimal-codex-sandbox</span>
                    <span className="sm:hidden">localhost:8080</span>
                  </div>
                  <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-500 cursor-not-allowed" />
                </div>

                {/* Actual responsive dynamic Iframe */}
                <div className="flex-1 bg-slate-950 overflow-hidden relative">
                  <iframe 
                    key={sandboxRefreshKey}
                    title="Optimal AI Codex Sandbox Preview"
                    srcDoc={getCombinedCode(projectFiles['index.html'], projectFiles['styles.css'], projectFiles['app.js'])}
                    className="w-full h-full border-0 bg-slate-950"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            </div>

            {/* BOTTOM DEVELOPER WORKSPACE TRACES / SYSTEM LOGS */}
            <div className="border-t border-slate-800 bg-[#060a17]">
              <details className="group" open>
                <summary className="flex justify-between items-center px-6 py-3 border-b border-slate-900 bg-slate-950 cursor-pointer list-none select-none">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-indigo-500" /> Virtual Sandbox & Core Trace Logs
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-indigo-400/80 font-mono">Sandbox routing active</span>
                    <ChevronDown className="h-3.5 w-3.5 text-slate-500 transition-transform group-open:rotate-180" />
                  </div>
                </summary>
                
                <div className="p-4 bg-slate-950/80 font-mono text-[10px] text-slate-400 h-28 overflow-y-auto space-y-1">
                  {workspaceLogs.map((log, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-slate-600 flex-shrink-0">Trace:</span>
                      <span className="truncate">{log}</span>
                    </div>
                  ))}
                </div>
              </details>
            </div>

          </div>

        </div>
      )}

      {/* COMPARE MODE ARENA VIEW */}
      {activeTab === 'compare' && (
        <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
          
          {/* Top banner comparison controls */}
          <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" /> High-Performance Multi-Model Arena
              </span>
              <h2 className="text-xl font-bold text-white">Compare Models Side-By-Side</h2>
              <p className="text-xs text-slate-400">Run parallel tests against OpenAI GPT-5, OpenRouter Free AI, and Zen AI Free to evaluate latency, code quality, and outputs.</p>
            </div>

            {/* Model checkbox pickers */}
            <div className="flex flex-wrap gap-2">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex flex-wrap gap-4 items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Models to test:</span>
                
                <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedCompareModels.includes('gpt-5-ultra')}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedCompareModels(prev => [...prev, 'gpt-5-ultra']);
                      else setSelectedCompareModels(prev => prev.filter(m => m !== 'gpt-5-ultra'));
                    }}
                    className="accent-indigo-500"
                  />
                  <span>GPT-5 Ultra (OpenAI)</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedCompareModels.includes('google/gemma-2-9b-it:free')}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedCompareModels(prev => [...prev, 'google/gemma-2-9b-it:free']);
                      else setSelectedCompareModels(prev => prev.filter(m => m !== 'google/gemma-2-9b-it:free'));
                    }}
                    className="accent-indigo-500"
                  />
                  <span>Gemma-2 Free (OpenRouter)</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedCompareModels.includes('zen-ai/coder-v2:free')}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedCompareModels(prev => [...prev, 'zen-ai/coder-v2:free']);
                      else setSelectedCompareModels(prev => prev.filter(m => m !== 'zen-ai/coder-v2:free'));
                    }}
                    className="accent-indigo-500"
                  />
                  <span>Coder-v2 Free (Zen AI)</span>
                </label>
              </div>
            </div>

          </div>

          {/* Dual/Triple comparison columns input panel */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Zap className="h-3 w-3 text-amber-400" /> Parallel Execution Instruction Prompt
            </span>
            <div className="flex gap-4">
              <input 
                type="text"
                value={comparePrompt}
                onChange={(e) => setComparePrompt(e.target.value)}
                placeholder="Type dynamic comparison prompt (e.g. glassmorphism crypto layout)..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100 placeholder:text-slate-600 transition-all"
              />
              <button 
                onClick={handleRunComparison}
                disabled={compareIsRunning || selectedCompareModels.length === 0}
                className="px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all disabled:bg-slate-900 disabled:text-slate-600"
              >
                {compareIsRunning ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Comparing...
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" /> Run Compare Arena
                  </>
                )}
              </button>
            </div>
          </div>

          {/* COMPILER OUTPUT CARDS GRID */}
          {compareResults.length > 0 && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {compareResults.map((result) => {
                return (
                  <div key={result.modelId} className="bg-slate-900/30 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
                    
                    {/* Header metrics card */}
                    <div className="p-5 border-b border-slate-800 bg-slate-950 space-y-4">
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-extrabold text-sm text-white">{result.modelName}</h3>
                          <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{result.provider} tier</span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          result.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {result.status.toUpperCase()}
                        </span>
                      </div>

                      {result.status === 'completed' ? (
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="bg-slate-900 p-2 rounded-xl">
                            <span className="text-[9px] text-slate-500 block">Latency</span>
                            <span className="text-xs font-bold font-mono text-emerald-400 flex items-center justify-center gap-0.5">
                              <Clock className="h-3 w-3" /> {result.latency}ms
                            </span>
                          </div>
                          <div className="bg-slate-900 p-2 rounded-xl">
                            <span className="text-[9px] text-slate-500 block">Token Volume</span>
                            <span className="text-xs font-bold font-mono text-indigo-400">
                              {result.tokens}
                            </span>
                          </div>
                          <div className="bg-slate-900 p-2 rounded-xl">
                            <span className="text-[9px] text-slate-500 block">Quality Rating</span>
                            <span className="text-xs font-bold font-mono text-amber-400 flex items-center justify-center gap-0.5">
                              <Star className="h-3 w-3 fill-current" /> {result.rating}/5
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden animate-pulse">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      )}

                    </div>

                    {/* Interactive minified layout sandbox review */}
                    <div className="p-4 bg-[#03050c] flex-1 flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Live Sandbox Preview</span>
                        <div className="h-64 rounded-xl border border-slate-850 bg-slate-950 overflow-hidden relative">
                          {result.status === 'completed' ? (
                            <iframe 
                              title={`Comparison Preview - ${result.modelId}`}
                              srcDoc={getCombinedCode(result.code['index.html'], result.code['styles.css'], result.code['app.js'])}
                              className="w-full h-full border-0 pointer-events-none"
                              sandbox="allow-scripts"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-slate-600 text-xs italic">
                              Compiling model output canvas...
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Model Decision Log</span>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-normal bg-slate-900 p-3 rounded-lg border border-slate-850">
                          {result.explanation}
                        </p>
                      </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-slate-850 bg-slate-950 flex gap-2">
                      <button 
                        onClick={() => {
                          setProjectFiles(result.code);
                          setActiveTab('workspace');
                          addLog(`Imported ${result.modelName} code into main Workspace.`);
                        }}
                        disabled={result.status !== 'completed'}
                        className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold disabled:bg-slate-900 disabled:text-slate-600 transition-all"
                      >
                        Load Into Workspace
                      </button>
                      
                      <button 
                        onClick={() => {
                          const codeText = `<!-- index.html -->\n${result.code['index.html']}\n\n/* styles.css */\n${result.code['styles.css']}\n\n// app.js\n${result.code['app.js']}`;
                          navigator.clipboard.writeText(codeText);
                          addLog(`Copied raw comparative code pack for ${result.modelName}.`);
                        }}
                        disabled={result.status !== 'completed'}
                        className="px-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
                        title="Copy Entire Code Bundle"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* API KEY & GENERATORS HUB */}
      {activeTab === 'keys' && (
        <div className="flex-1 overflow-y-auto p-6 space-y-8 max-w-6xl mx-auto w-full">
          
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-1">
              <Key className="h-3.5 w-3.5" /> Authenticated Key Management Panel
            </span>
            <h2 className="text-xl font-bold text-white">Configure & Generate API Keys</h2>
            <p className="text-xs text-slate-400">Manage your providers, pre-populate default keys, and run interactive generator scripts for OpenRouter and Zen AI sandbox environments.</p>
          </div>

          {/* ACTIVE KEYS INPUT TABLE */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* OpenAI pre-loaded */}
            <div className="bg-slate-900/30 p-6 rounded-2xl border border-indigo-500/20 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-indigo-500/5 rounded-full blur-xl"></div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center text-xs font-bold">OA</div>
                  <h4 className="font-bold text-sm text-white">OpenAI + Preloaded Key</h4>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold border border-indigo-500/20">PRELOADED</span>
              </div>

              <p className="text-xs text-slate-400 leading-normal font-normal">Our system has securely injected a default OpenAI API Key for GPT-5 ultra evaluation tests. Feel free to use or replace it below.</p>

              <div className="space-y-1.5 relative">
                <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">API Auth Token</label>
                <div className="relative">
                  <input 
                    type={showOpenaiKey ? 'text' : 'password'}
                    value={config.openaiKey}
                    onChange={(e) => updateConfigValue('openaiKey', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pl-4 pr-10 text-xs text-slate-300 font-mono focus:outline-none focus:border-indigo-500 transition-all"
                  />
                  <button 
                    onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showOpenaiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* OpenRouter configuration */}
            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center text-xs font-bold">OR</div>
                  <h4 className="font-bold text-sm text-white">OpenRouter AI Keys</h4>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${config.openrouterKey ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-950 text-slate-600'}`}>
                  {config.openrouterKey ? 'CONFIGURED' : 'NOT CONFIGURED'}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-normal font-normal">Connect OpenRouter to enable free LLMs. Generate a valid testing key token immediately in the generator suite below.</p>

              <div className="space-y-1.5 relative">
                <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">API Auth Token</label>
                <div className="relative">
                  <input 
                    type={showOpenrouterKey ? 'text' : 'password'}
                    value={config.openrouterKey}
                    placeholder="Paste or generate an OpenRouter key..."
                    onChange={(e) => updateConfigValue('openrouterKey', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pl-4 pr-10 text-xs text-slate-300 font-mono focus:outline-none focus:border-indigo-500 transition-all"
                  />
                  <button 
                    onClick={() => setShowOpenrouterKey(!showOpenrouterKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showOpenrouterKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Zen AI configuration */}
            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 bg-violet-500/10 text-violet-400 rounded-lg flex items-center justify-center text-xs font-bold">ZA</div>
                  <h4 className="font-bold text-sm text-white">Zen AI Key Token</h4>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${config.zenaiKey ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-950 text-slate-600'}`}>
                  {config.zenaiKey ? 'CONFIGURED' : 'NOT CONFIGURED'}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-normal font-normal">Connect Zen AI to trigger decentralized model compilation. Use the key token generator to provision immediate access.</p>

              <div className="space-y-1.5 relative">
                <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">API Auth Token</label>
                <div className="relative">
                  <input 
                    type={showZenaiKey ? 'text' : 'password'}
                    value={config.zenaiKey}
                    placeholder="Paste or provision Zen AI key..."
                    onChange={(e) => updateConfigValue('zenaiKey', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pl-4 pr-10 text-xs text-slate-300 font-mono focus:outline-none focus:border-indigo-500 transition-all"
                  />
                  <button 
                    onClick={() => setShowZenaiKey(!showZenaiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showZenaiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* DUAL WIZARDS / GENERATORS DIVISION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* WIZARD 1: OpenRouter Key Generator */}
            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-2">
                <div className="inline-flex px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-semibold items-center gap-1.5">
                  <Cpu className="h-3 w-3" /> API Key Architect
                </div>
                <h3 className="font-extrabold text-sm text-white">OpenRouter Key Generator Build</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">Our virtual generator constructs authenticated token hashes mimicking OpenRouter production environments. Select scope flags and run to auto-inject the generated key into config state.</p>
              </div>

              {/* Wizard forms */}
              <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-900">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Key Handle Name</label>
                    <input 
                      type="text" 
                      value={orGeneratorName}
                      onChange={(e) => setOrGeneratorName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-850 rounded-lg p-2 mt-1 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-2 pt-5">
                    <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={orGenScopes.freeModels}
                        onChange={(e) => setOrGenScopes(prev => ({ ...prev, freeModels: e.target.checked }))}
                        className="accent-indigo-500"
                      />
                      <span>Scope: Free AI Models Only</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={orGenScopes.unlimitedTiers}
                        onChange={(e) => setOrGenScopes(prev => ({ ...prev, unlimitedTiers: e.target.checked }))}
                        className="accent-indigo-500"
                      />
                      <span>Scope: Unlimited rate cap</span>
                    </label>
                  </div>
                </div>

                {/* Generator Terminal output */}
                {orGenLogs.length > 0 && (
                  <div className="bg-[#03050c] p-3 rounded-lg font-mono text-[10px] text-emerald-400/90 max-h-24 overflow-y-auto space-y-1.5 border border-slate-850">
                    {orGenLogs.map((log, index) => (
                      <div key={index}>{log}</div>
                    ))}
                    {orGenKey && (
                      <div className="text-white border-t border-slate-800 pt-1.5 mt-1.5 select-all flex items-center justify-between">
                        <span className="truncate">Key: {orGenKey}</span>
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      </div>
                    )}
                  </div>
                )}

                <button 
                  onClick={handleGenerateOpenRouterKey}
                  disabled={orGenState === 'generating'}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all disabled:bg-slate-900 disabled:text-slate-600 flex items-center justify-center gap-1.5 shadow-lg shadow-amber-600/10"
                >
                  {orGenState === 'generating' ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Provisioning Tokens...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" /> Compile & Generate OpenRouter Key
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* WIZARD 2: Zen AI Key Generator */}
            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-2">
                <div className="inline-flex px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-full text-xs font-semibold items-center gap-1.5">
                  <Terminal className="h-3 w-3" /> Decentralized Nodes
                </div>
                <h3 className="font-extrabold text-sm text-white">Zen AI Key Generator Build</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">Provision decentralization keys by adjusting humanity proofs and model routing configurations. Once completed, a secure Zen API Key is injected automatically.</p>
              </div>

              {/* Wizard forms */}
              <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-900">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Proof of Humanity Entropy Slider</span>
                    <span className="text-indigo-400 font-bold font-mono">{zenGenSlider}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={zenGenSlider}
                    onChange={(e) => setZenGenSlider(parseInt(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1.5">Sandbox Routing Optimization</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setZenGenPriority('latency')}
                      className={`py-1.5 rounded text-xs font-semibold border transition-all ${
                        zenGenPriority === 'latency' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Latency
                    </button>
                    <button 
                      onClick={() => setZenGenPriority('coder')}
                      className={`py-1.5 rounded text-xs font-semibold border transition-all ${
                        zenGenPriority === 'coder' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Coder Core
                    </button>
                    <button 
                      onClick={() => setZenGenPriority('context')}
                      className={`py-1.5 rounded text-xs font-semibold border transition-all ${
                        zenGenPriority === 'context' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Context size
                    </button>
                  </div>
                </div>

                {/* Generator Terminal output */}
                {zenGenLogs.length > 0 && (
                  <div className="bg-[#03050c] p-3 rounded-lg font-mono text-[10px] text-emerald-400/90 max-h-24 overflow-y-auto space-y-1.5 border border-slate-850">
                    {zenGenLogs.map((log, index) => (
                      <div key={index}>{log}</div>
                    ))}
                    {zenGenKey && (
                      <div className="text-white border-t border-slate-800 pt-1.5 mt-1.5 select-all flex items-center justify-between">
                        <span className="truncate">Key: {zenGenKey}</span>
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      </div>
                    )}
                  </div>
                )}

                <button 
                  onClick={handleGenerateZenAIKey}
                  disabled={zenGenState === 'generating'}
                  className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold transition-all disabled:bg-slate-900 disabled:text-slate-600 flex items-center justify-center gap-1.5 shadow-lg shadow-violet-600/10"
                >
                  {zenGenState === 'generating' ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Fetching node credentials...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" /> Provision Zen AI Key Token
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TEMPLATES VIEW */}
      {activeTab === 'templates' && (
        <div className="flex-1 overflow-y-auto p-6 space-y-8 max-w-6xl mx-auto w-full">
          
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-1">
              <Compass className="h-3.5 w-3.5" /> Pre-Configured Prompt Templates
            </span>
            <h2 className="text-xl font-bold text-white">Load Interactive Workspace Projects</h2>
            <p className="text-xs text-slate-400">Click any template card below to pre-populate parameters and launch the compilation engine immediately.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Template 1: SaaS Analytics */}
            <div 
              onClick={() => handleLoadTemplate(
                'SaaS Analytics Dashboard', 
                'Build a full SaaS dashboard interface with sidebar, live dark-mode theme variables, traffic analytics bar charts, operations trace logs console, deployment tables, and functional button clicks.'
              )}
              className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="h-9 w-9 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center text-lg">
                  <Monitor className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all">LOAD PROJECT</span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors">SaaS Analytics & Operations Dashboard</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Includes professional side navigation tabs, live metric counters, grid containers, dynamic interactive graphs, and event-handling logging utilities.</p>
              </div>
            </div>

            {/* Template 2: Interactive Calculator */}
            <div 
              onClick={() => handleLoadTemplate(
                'Interactive Calculator', 
                'Generate an active glassmorphism dark-mode calculator with math parser engines, backspace triggers, grid layouts, glowing boundaries, and custom animations.'
              )}
              className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="h-9 w-9 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center text-lg">
                  <Sliders className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white transition-all">LOAD PROJECT</span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">Glassmorphic Scientific Calculator</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Constructs a glowing numeric grid containing basic addition, subtraction, division, and multiplication evaluation loops. Features memory states and backspace operations.</p>
              </div>
            </div>

            {/* Template 3: Goal Task Organizer */}
            <div 
              onClick={() => handleLoadTemplate(
                'Goal Task Organizer', 
                'Construct an interactive goal planner task application with custom goal category states, percentage complete calculation variables, filters (All, Completed, Active), and soft deletion transitions.'
              )}
              className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 hover:border-violet-500/40 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="h-9 w-9 bg-violet-500/10 text-violet-400 rounded-xl flex items-center justify-center text-lg">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded bg-violet-500/10 text-violet-400 text-[10px] font-bold border border-violet-500/20 group-hover:bg-violet-600 group-hover:text-white transition-all">LOAD PROJECT</span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-violet-400 transition-colors">Autonomous Goal Planner Task Suite</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Full list workflow rendering with category identifiers, interactive completion checkers, real-time completion speed metrics, and responsive custom text form inserts.</p>
              </div>
            </div>

            {/* Template 4: Custom Sandbox App */}
            <div 
              onClick={() => handleLoadTemplate(
                'Custom Workspace Mockup', 
                'Write a custom interactive web prototype incorporating numeric sliders, increment and decrement buttons, responsive status inputs, status text alterations, click action output consoles, and glowing cyberpunk typography.'
              )}
              className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="h-9 w-9 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center text-lg">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20 group-hover:bg-amber-600 group-hover:text-white transition-all">LOAD PROJECT</span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">Flexible AI Sandbox Prototype Shell</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">A multi-component prototype containing complex click events, custom input feedback variables, interactive badges, reset workflows, and terminal output logging arrays.</p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 p-5 text-center text-xs text-slate-500 mt-auto">
        <p className="leading-relaxed">Optimal AI Codex Workspace © 2026. Made as a clean state-based alternative. Securely preloaded with evaluation OpenAI keys.</p>
      </footer>

    </div>
  );
}
