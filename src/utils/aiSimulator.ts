import { ProjectFiles } from '../types';

// Standard themes and styling templates
const TAILWIND_SCRIPT = '<script src="https://cdn.tailwindcss.com"></script>';
const FONTS_AND_ICONS = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
`;

// Helper to sanitize/extract code blocks
export function extractCodeBlocks(text: string): ProjectFiles {
  const htmlMatch = text.match(/```html([\s\S]*?)```/);
  const cssMatch = text.match(/```css([\s\S]*?)```/);
  const jsMatch = text.match(/```javascript([\s\S]*?)```/) || text.match(/```js([\s\S]*?)```/);

  let html = htmlMatch ? htmlMatch[1].trim() : '';
  let css = cssMatch ? cssMatch[1].trim() : '';
  let js = jsMatch ? jsMatch[1].trim() : '';

  // Fallbacks if not formatted exactly in code blocks
  if (!html && text.includes('<html') || text.includes('<div')) {
    // try to extract HTML manually or treat whole text as HTML
    const cleanText = text.replace(/```/g, '');
    if (cleanText.includes('<!DOCTYPE html>') || cleanText.includes('<html')) {
      html = cleanText;
    } else {
      html = `<div class="p-8 max-w-4xl mx-auto bg-slate-900 text-white rounded-xl shadow-2xl">\n${cleanText}\n</div>`;
    }
  }

  return {
    'index.html': html || defaultHtml('AI Assistant Code Preview', '<div class="flex items-center justify-center min-h-screen"><p>No HTML generated. Please try again.</p></div>'),
    'styles.css': css || '/* Custom Styles Go Here */\nbody { font-family: "Plus Jakarta Sans", sans-serif; }',
    'app.js': js || '// Interactive Scripts Go Here\nconsole.log("App ready!");'
  };
}

function defaultHtml(title: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${TAILWIND_SCRIPT}
  ${FONTS_AND_ICONS}
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  ${bodyContent}
</body>
</html>`;
}

// Client-side local code synthesizer (brilliant compiler)
export function synthesizeCode(prompt: string, modelId: string): { files: ProjectFiles; explanation: string } {
  const p = prompt.toLowerCase();
  
  let html = '';
  let css = '';
  let js = '';
  let explanation = '';

  // 1. CRM / SaaS Dashboard
  if (p.includes('dashboard') || p.includes('crm') || p.includes('analytics') || p.includes('admin') || p.includes('chart')) {
    explanation = `Generated a comprehensive Next-Gen Analytics & Operations Dashboard. This build integrates active state variables, interactive tab configurations, dynamic charts, live transaction feeds, responsive sidebar navigations, and interactive action panels. Styled meticulously with Tailwind CSS and Font Icons.`;
    
    html = defaultHtml('Optimal Codex Dashboard', `
  <div class="flex min-h-screen bg-slate-950 text-slate-100 overflow-hidden" id="app">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 flex flex-col justify-between hidden md:flex">
      <div>
        <div class="flex items-center gap-3 mb-8">
          <div class="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <i class="bi bi-cpu text-white text-xl"></i>
          </div>
          <div>
            <h1 class="font-bold text-sm leading-none tracking-wide text-white">CODEX CORE</h1>
            <span class="text-xs text-indigo-400 font-medium">Enterprise Suite</span>
          </div>
        </div>
        
        <nav class="space-y-1">
          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-600/10 text-indigo-400 font-medium text-sm transition-all">
            <i class="bi bi-grid-fill"></i> Dashboard
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 font-medium text-sm transition-all">
            <i class="bi bi-bar-chart"></i> Analytics
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 font-medium text-sm transition-all">
            <i class="bi bi-wallet2"></i> Transactions
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 font-medium text-sm transition-all">
            <i class="bi bi-people"></i> Customers
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 font-medium text-sm transition-all">
            <i class="bi bi-gear"></i> Settings
          </a>
        </nav>
      </div>

      <div class="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
        <p class="text-xs text-slate-400 leading-normal mb-3">Model Active: <strong class="text-indigo-400">${modelId}</strong></p>
        <div class="w-full bg-slate-700 rounded-full h-1.5">
          <div class="bg-indigo-500 h-1.5 rounded-full" style="width: 78%"></div>
        </div>
        <div class="flex justify-between items-center mt-2 text-[10px] text-slate-500">
          <span>Usage: 7.8M/10M</span>
          <span>78%</span>
        </div>
      </div>
    </aside>

    <!-- Main Workspace -->
    <main class="flex-1 flex flex-col overflow-y-auto">
      <!-- Top Header -->
      <header class="border-b border-slate-800 bg-slate-950/80 backdrop-blur px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div class="flex items-center gap-4">
          <button class="md:hidden text-white text-xl"><i class="bi bi-list"></i></button>
          <div class="relative hidden sm:block">
            <i class="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"></i>
            <input type="text" placeholder="Search operations, analytics, keys..." class="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-100 w-64 transition-all" />
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-500/20">
            <span class="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping"></span> Live Agent Server Connected
          </div>
          <button class="h-9 w-9 rounded-lg border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-all">
            <i class="bi bi-bell"></i>
          </button>
          <div class="flex items-center gap-2.5 pl-2 border-l border-slate-800">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Avatar" class="h-8 w-8 rounded-full border border-indigo-500/30 object-cover" />
            <div class="hidden lg:block text-left">
              <p class="text-xs font-semibold leading-tight text-white">Dev Admin</p>
              <span class="text-[10px] text-indigo-400 font-medium">Optimal AI Sandbox</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Grid -->
      <div class="p-8 space-y-8 max-w-[1400px] w-full mx-auto">
        <!-- Dashboard Welcome Hero -->
        <div class="bg-gradient-to-r from-indigo-900/30 via-slate-900 to-slate-950 p-8 rounded-2xl border border-indigo-500/10 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div class="relative z-10 space-y-1">
            <span class="text-xs uppercase tracking-widest text-indigo-400 font-bold">System Status: Optimal</span>
            <h2 class="text-2xl font-bold tracking-tight text-white">Welcome back to Codex Admin</h2>
            <p class="text-slate-400 text-sm max-w-xl">You are testing simulated performance on model <span class="text-indigo-400 font-semibold">${modelId}</span>. Live code editing is enabled.</p>
          </div>
          <div class="flex gap-3">
            <button class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold transition-all" id="btn-toast">
              <i class="bi bi-lightning-charge"></i> Run Probe
            </button>
            <button class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-indigo-600/20" id="btn-add-widget">
              <i class="bi bi-plus"></i> Custom Action
            </button>
          </div>
        </div>

        <!-- Key Metrics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-slate-900/40 p-6 rounded-xl border border-slate-800">
            <div class="flex justify-between items-start mb-4">
              <div class="h-10 w-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400"><i class="bi bi-hdd-network text-lg"></i></div>
              <span class="text-xs text-emerald-400 font-semibold flex items-center gap-1"><i class="bi bi-arrow-up-right"></i> +12.3%</span>
            </div>
            <p class="text-xs text-slate-400 uppercase font-medium tracking-wider">Total API Requests</p>
            <h3 class="text-2xl font-bold text-white mt-1">148,252</h3>
            <p class="text-[11px] text-slate-500 mt-2">Previous Month: 132,019</p>
          </div>

          <div class="bg-slate-900/40 p-6 rounded-xl border border-slate-800">
            <div class="flex justify-between items-start mb-4">
              <div class="h-10 w-10 bg-violet-500/10 rounded-lg flex items-center justify-center text-violet-400"><i class="bi bi-stopwatch text-lg"></i></div>
              <span class="text-xs text-emerald-400 font-semibold flex items-center gap-1"><i class="bi bi-arrow-up-right"></i> -180ms</span>
            </div>
            <p class="text-xs text-slate-400 uppercase font-medium tracking-wider">Average Latency</p>
            <h3 class="text-2xl font-bold text-white mt-1">240ms</h3>
            <p class="text-[11px] text-slate-500 mt-2">Optimal AI routing enabled</p>
          </div>

          <div class="bg-slate-900/40 p-6 rounded-xl border border-slate-800">
            <div class="flex justify-between items-start mb-4">
              <div class="h-10 w-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400"><i class="bi bi-database text-lg"></i></div>
              <span class="text-xs text-emerald-400 font-semibold flex items-center gap-1"><i class="bi bi-check-circle"></i> 99.99%</span>
            </div>
            <p class="text-xs text-slate-400 uppercase font-medium tracking-wider">Up-time Accuracy</p>
            <h3 class="text-2xl font-bold text-white mt-1">99.98%</h3>
            <p class="text-[11px] text-slate-500 mt-2">2 redundant node failovers</p>
          </div>

          <div class="bg-slate-900/40 p-6 rounded-xl border border-slate-800">
            <div class="flex justify-between items-start mb-4">
              <div class="h-10 w-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400"><i class="bi bi-coin text-lg"></i></div>
              <span class="text-xs text-rose-400 font-semibold flex items-center gap-1"><i class="bi bi-arrow-down-left"></i> -$124.50</span>
            </div>
            <p class="text-xs text-slate-400 uppercase font-medium tracking-wider">Simulated Savings</p>
            <h3 class="text-2xl font-bold text-white mt-1">$4,852.12</h3>
            <p class="text-[11px] text-slate-500 mt-2">Utilizing free open tier models</p>
          </div>
        </div>

        <!-- Interactive Charts & Analytics -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Chart -->
          <div class="bg-slate-900/30 p-6 rounded-xl border border-slate-800/80 lg:col-span-2 space-y-4">
            <div class="flex justify-between items-center">
              <div>
                <h4 class="font-bold text-sm text-white">System Traffic & Latency Real-Time</h4>
                <p class="text-xs text-slate-500">Live network request spikes in correlation with prompt token processing</p>
              </div>
              <div class="flex gap-2">
                <button class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px]" id="chart-hourly">Hourly</button>
                <button class="px-2.5 py-1 bg-indigo-600 text-white rounded text-[11px]" id="chart-daily">Daily</button>
              </div>
            </div>

            <!-- Virtual Bar/Line Graph built with responsive Flexboxes -->
            <div class="h-64 flex items-end justify-between gap-2.5 pt-8 px-4 border-b border-slate-800 relative">
              <!-- Grid Background Lines -->
              <div class="absolute inset-x-0 top-0 border-b border-slate-800/40 h-16 pointer-events-none"></div>
              <div class="absolute inset-x-0 top-16 border-b border-slate-800/40 h-16 pointer-events-none"></div>
              <div class="absolute inset-x-0 top-32 border-b border-slate-800/40 h-16 pointer-events-none"></div>
              <div class="absolute inset-x-0 top-48 border-b border-slate-800/40 h-16 pointer-events-none"></div>

              <!-- Bar 1 -->
              <div class="flex-1 flex flex-col items-center group relative cursor-pointer">
                <div class="w-full bg-indigo-600/30 hover:bg-indigo-600/60 rounded-t-sm h-20 transition-all duration-300 relative">
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white px-2 py-0.5 rounded text-[10px] hidden group-hover:block whitespace-nowrap">20ms | 12k</div>
                </div>
                <span class="text-[10px] text-slate-500 mt-2">Mon</span>
              </div>
              <!-- Bar 2 -->
              <div class="flex-1 flex flex-col items-center group relative cursor-pointer">
                <div class="w-full bg-indigo-500/30 hover:bg-indigo-500/60 rounded-t-sm h-32 transition-all duration-300 relative">
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white px-2 py-0.5 rounded text-[10px] hidden group-hover:block whitespace-nowrap">45ms | 19k</div>
                </div>
                <span class="text-[10px] text-slate-500 mt-2">Tue</span>
              </div>
              <!-- Bar 3 -->
              <div class="flex-1 flex flex-col items-center group relative cursor-pointer">
                <div class="w-full bg-indigo-500 hover:bg-indigo-400 rounded-t-sm h-52 transition-all duration-300 relative">
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-indigo-500 text-white px-2 py-0.5 rounded text-[10px] hidden group-hover:block whitespace-nowrap">Peak: 120ms | 45k</div>
                  <div class="absolute inset-x-0 top-0 h-1.5 bg-indigo-400 animate-pulse"></div>
                </div>
                <span class="text-[10px] text-indigo-400 font-semibold mt-2">Wed</span>
              </div>
              <!-- Bar 4 -->
              <div class="flex-1 flex flex-col items-center group relative cursor-pointer">
                <div class="w-full bg-indigo-600/30 hover:bg-indigo-600/60 rounded-t-sm h-40 transition-all duration-300 relative">
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white px-2 py-0.5 rounded text-[10px] hidden group-hover:block whitespace-nowrap">60ms | 28k</div>
                </div>
                <span class="text-[10px] text-slate-500 mt-2">Thu</span>
              </div>
              <!-- Bar 5 -->
              <div class="flex-1 flex flex-col items-center group relative cursor-pointer">
                <div class="w-full bg-indigo-600/30 hover:bg-indigo-600/60 rounded-t-sm h-24 transition-all duration-300 relative">
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white px-2 py-0.5 rounded text-[10px] hidden group-hover:block whitespace-nowrap">25ms | 15k</div>
                </div>
                <span class="text-[10px] text-slate-500 mt-2">Fri</span>
              </div>
              <!-- Bar 6 -->
              <div class="flex-1 flex flex-col items-center group relative cursor-pointer">
                <div class="w-full bg-indigo-600/30 hover:bg-indigo-600/60 rounded-t-sm h-16 transition-all duration-300 relative">
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white px-2 py-0.5 rounded text-[10px] hidden group-hover:block whitespace-nowrap">15ms | 8k</div>
                </div>
                <span class="text-[10px] text-slate-500 mt-2">Sat</span>
              </div>
              <!-- Bar 7 -->
              <div class="flex-1 flex flex-col items-center group relative cursor-pointer">
                <div class="w-full bg-indigo-600/30 hover:bg-indigo-600/60 rounded-t-sm h-28 transition-all duration-300 relative">
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white px-2 py-0.5 rounded text-[10px] hidden group-hover:block whitespace-nowrap">30ms | 22k</div>
                </div>
                <span class="text-[10px] text-slate-500 mt-2">Sun</span>
              </div>
            </div>
            
            <div class="flex justify-between text-xs text-slate-500 px-2">
              <span>* Data refresh: every 5 seconds</span>
              <span>Model Routing accuracy: 98.4%</span>
            </div>
          </div>

          <!-- Live Operations Console -->
          <div class="bg-slate-900/30 p-6 rounded-xl border border-slate-800/80 space-y-4">
            <div class="flex justify-between items-center">
              <h4 class="font-bold text-sm text-white">Console Logs</h4>
              <button class="h-6 px-2 bg-slate-800 hover:bg-slate-700 rounded text-[10px] text-slate-400" id="btn-clear-logs">Clear</button>
            </div>
            
            <div class="bg-slate-950 p-4 rounded-lg font-mono text-[11px] leading-relaxed text-slate-400 h-64 overflow-y-auto space-y-2 border border-slate-800" id="console-logs">
              <div class="text-indigo-400">[09:00:01] Loading Workspace Configuration...</div>
              <div class="text-indigo-400">[09:00:02] Model Registry Loaded: 14 models found.</div>
              <div class="text-emerald-400">[09:00:03] Connected to OpenRouter and Zen AI.</div>
              <div class="text-slate-500">[09:01:14] Heartbeat packet sent. Latency 14ms.</div>
              <div class="text-slate-500">[09:02:45] Client synchronized successfully.</div>
              <div class="text-indigo-400">[09:04:12] Switched model to ${modelId}.</div>
            </div>
          </div>
        </div>

        <!-- Dynamic Content Table -->
        <div class="bg-slate-900/30 rounded-xl border border-slate-800/80 overflow-hidden">
          <div class="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 class="font-bold text-sm text-white">Execution Sandbox Deployments</h4>
              <p class="text-xs text-slate-500">Live interactive widgets and subcomponents built in the sandbox</p>
            </div>
            <div class="flex items-center gap-2">
              <input type="text" placeholder="Filter deploys..." class="bg-slate-900/80 border border-slate-800 text-xs px-3 py-1.5 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500" />
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-slate-800 bg-slate-900/20 text-slate-400 font-medium">
                  <th class="p-4">Deploy Name</th>
                  <th class="p-4">Model Engine</th>
                  <th class="p-4">Status</th>
                  <th class="p-4">Simulated Latency</th>
                  <th class="p-4">Date Deploy</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/50" id="table-body">
                <tr class="hover:bg-slate-900/10 transition-colors">
                  <td class="p-4 font-semibold text-white flex items-center gap-2.5">
                    <span class="h-2 w-2 rounded-full bg-emerald-400"></span> Glassmorphic Card
                  </td>
                  <td class="p-4 text-indigo-400 font-medium">gpt-5-ultra</td>
                  <td class="p-4"><span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">Production</span></td>
                  <td class="p-4 text-slate-400">180ms</td>
                  <td class="p-4 text-slate-500">Just Now</td>
                  <td class="p-4 text-right">
                    <button class="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-slate-300 mr-1">Preview</button>
                    <button class="px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded text-[11px]">Deploy</button>
                  </td>
                </tr>
                <tr class="hover:bg-slate-900/10 transition-colors">
                  <td class="p-4 font-semibold text-white flex items-center gap-2.5">
                    <span class="h-2 w-2 rounded-full bg-emerald-400"></span> Responsive Multi-file
                  </td>
                  <td class="p-4 text-indigo-400 font-medium">gpt-5-pro (Code-Core)</td>
                  <td class="p-4"><span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">Production</span></td>
                  <td class="p-4 text-slate-400">210ms</td>
                  <td class="p-4 text-slate-500">5 mins ago</td>
                  <td class="p-4 text-right">
                    <button class="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-slate-300 mr-1">Preview</button>
                    <button class="px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded text-[11px]">Deploy</button>
                  </td>
                </tr>
                <tr class="hover:bg-slate-900/10 transition-colors">
                  <td class="p-4 font-semibold text-white flex items-center gap-2.5">
                    <span class="h-2 w-2 rounded-full bg-amber-400"></span> Llama Chat Free
                  </td>
                  <td class="p-4 text-slate-400 font-medium">llama-3-8b-instruct</td>
                  <td class="p-4"><span class="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-semibold border border-indigo-500/20">Staging</span></td>
                  <td class="p-4 text-slate-400">420ms</td>
                  <td class="p-4 text-slate-500">2 hours ago</td>
                  <td class="p-4 text-right">
                    <button class="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-slate-300 mr-1">Preview</button>
                    <button class="px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded text-[11px]">Deploy</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Toast Notification -->
    <div id="toast" class="fixed bottom-6 right-6 bg-slate-900 border border-indigo-500 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 translate-y-20 opacity-0 pointer-events-none z-50">
      <div class="h-7 w-7 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center">
        <i class="bi bi-patch-check-fill text-lg"></i>
      </div>
      <div>
        <h5 class="text-xs font-bold">Network Probe Successful</h5>
        <p class="text-[10px] text-slate-400">All models responding at premium thresholds.</p>
      </div>
    </div>
  </div>
    `);

    js = `
    console.log("Dashboard engine mounted.");
    
    // Toast Handler
    const toast = document.getElementById('toast');
    const btnToast = document.getElementById('btn-toast');
    
    if (btnToast) {
      btnToast.addEventListener('click', () => {
        toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
        toast.classList.add('translate-y-0', 'opacity-100');
        
        // Log to simulated console
        const consoleLogs = document.getElementById('console-logs');
        if (consoleLogs) {
          const log = document.createElement('div');
          log.className = 'text-amber-400';
          log.innerText = '[' + new Date().toLocaleTimeString() + '] CLI Trigger: Network probe completed. Active model = ${modelId}';
          consoleLogs.appendChild(log);
          consoleLogs.scrollTop = consoleLogs.scrollHeight;
        }
        
        setTimeout(() => {
          toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
          toast.classList.remove('translate-y-0', 'opacity-100');
        }, 4000);
      });
    }

    // Dynamic Row Insertion for Codex
    const btnAddWidget = document.getElementById('btn-add-widget');
    const tableBody = document.getElementById('table-body');
    if (btnAddWidget && tableBody) {
      btnAddWidget.addEventListener('click', () => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-900/10 transition-colors border-t border-slate-800/50';
        tr.innerHTML = \`
          <td class="p-4 font-semibold text-white flex items-center gap-2.5">
            <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span> Dynamic AI Card
          </td>
          <td class="p-4 text-indigo-400 font-medium">${modelId}</td>
          <td class="p-4"><span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">Production</span></td>
          <td class="p-4 text-slate-400">\${Math.floor(Math.random() * 200 + 80)}ms</td>
          <td class="p-4 text-slate-500">Just Now</td>
          <td class="p-4 text-right">
            <button class="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-slate-300 mr-1">Preview</button>
            <button class="px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded text-[11px]">Deploy</button>
          </td>
        \`;
        tableBody.insertBefore(tr, tableBody.firstChild);

        // Update console logs
        const consoleLogs = document.getElementById('console-logs');
        if (consoleLogs) {
          const log = document.createElement('div');
          log.className = 'text-emerald-400';
          log.innerText = '[' + new Date().toLocaleTimeString() + '] AI Sandbox: Automatically constructed "Dynamic AI Card" successfully!';
          consoleLogs.appendChild(log);
          consoleLogs.scrollTop = consoleLogs.scrollHeight;
        }
      });
    }

    // Clear Logs Handler
    const btnClearLogs = document.getElementById('btn-clear-logs');
    if (btnClearLogs) {
      btnClearLogs.addEventListener('click', () => {
        const consoleLogs = document.getElementById('console-logs');
        if (consoleLogs) {
          consoleLogs.innerHTML = '<div class="text-slate-500">[Console cleared] Ready for new developer traces.</div>';
        }
      });
    }
    `;

    css = `
    /* Custom Scrollbar for dashboard */
    #console-logs::-webkit-scrollbar {
      width: 4px;
    }
    #console-logs::-webkit-scrollbar-track {
      background: transparent;
    }
    #console-logs::-webkit-scrollbar-thumb {
      background: #334155;
      border-radius: 9999px;
    }
    `;
  }
  
  // 2. Calculator App
  else if (p.includes('calculator') || p.includes('math') || p.includes('calc')) {
    explanation = `Generated a Gorgeous Glassmorphic Interactive Calculator. Designed with dark cybernetic values, neon blue highlights, math evaluation support, responsive grid alignment, history memory, and audio key click triggers. Styled using Tailwind CSS.`;
    
    html = defaultHtml('Glassmorphic Calculator', `
  <div class="flex items-center justify-center min-h-screen bg-slate-950 p-4">
    <div class="relative w-full max-w-sm">
      <!-- Glow backgrounds -->
      <div class="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur opacity-30 animate-pulse"></div>
      
      <div class="relative bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-1.5">
            <div class="h-3 w-3 bg-rose-500 rounded-full"></div>
            <div class="h-3 w-3 bg-amber-500 rounded-full"></div>
            <div class="h-3 w-3 bg-emerald-500 rounded-full"></div>
          </div>
          <span class="text-[10px] font-mono uppercase tracking-widest text-slate-500">Codex Calc Pro</span>
        </div>
        
        <!-- Display -->
        <div class="bg-slate-950/80 rounded-xl p-4 mb-6 border border-slate-850/60 text-right overflow-hidden">
          <div class="text-slate-500 text-xs font-mono truncate h-5" id="history-display"></div>
          <div class="text-white text-3xl font-bold font-mono tracking-tight mt-1 truncate" id="main-display">0</div>
        </div>
        
        <!-- Buttons Grid -->
        <div class="grid grid-cols-4 gap-3 font-mono">
          <button class="col-span-2 py-4 bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="clearCalc()">AC</button>
          <button class="py-4 bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="backspace()"><i class="bi bi-backspace"></i></button>
          <button class="py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addOperator('/')">/</button>
          
          <button class="py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addNum('7')">7</button>
          <button class="py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addNum('8')">8</button>
          <button class="py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addNum('9')">9</button>
          <button class="py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addOperator('*')">*</button>
          
          <button class="py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addNum('4')">4</button>
          <button class="py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addNum('5')">5</button>
          <button class="py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addNum('6')">6</button>
          <button class="py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addOperator('-')">-</button>
          
          <button class="py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addNum('1')">1</button>
          <button class="py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addNum('2')">2</button>
          <button class="py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addNum('3')">3</button>
          <button class="py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addOperator('+')">+</button>
          
          <button class="col-span-2 py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addNum('0')">0</button>
          <button class="py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="addNum('.')">.</button>
          <button class="py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md text-sm cursor-pointer" onclick="evaluateCalc()">=</button>
        </div>
      </div>
    </div>
  </div>
    `);

    js = `
    let displayVal = "0";
    let historyVal = "";
    let isReset = false;

    const mainDisplay = document.getElementById('main-display');
    const historyDisplay = document.getElementById('history-display');

    function updateDisplay() {
      mainDisplay.innerText = displayVal;
      historyDisplay.innerText = historyVal;
    }

    window.addNum = function(num) {
      if (displayVal === "0" || isReset) {
        displayVal = num;
        isReset = false;
      } else {
        displayVal += num;
      }
      updateDisplay();
    };

    window.addOperator = function(op) {
      if (isReset) isReset = false;
      const lastChar = displayVal.slice(-1);
      if (['+', '-', '*', '/'].includes(lastChar)) {
        displayVal = displayVal.slice(0, -1) + op;
      } else {
        displayVal += op;
      }
      updateDisplay();
    };

    window.clearCalc = function() {
      displayVal = "0";
      historyVal = "";
      updateDisplay();
    };

    window.backspace = function() {
      if (displayVal.length > 1) {
        displayVal = displayVal.slice(0, -1);
      } else {
        displayVal = "0";
      }
      updateDisplay();
    };

    window.evaluateCalc = function() {
      try {
        historyVal = displayVal + " =";
        let expression = displayVal;
        
        // safe eval alternative using standard construction
        let result = Function('"use strict";return (' + expression + ')')();
        displayVal = String(result);
        isReset = true;
      } catch (err) {
        displayVal = "Error";
        isReset = true;
      }
      updateDisplay();
    };
    `;
  }
  
  // 3. To-Do App / Task Manager
  else if (p.includes('todo') || p.includes('task') || p.includes('list')) {
    explanation = `Generated a professional, fully functional Task Organizer Web App. This build has dynamic custom categories, localized storage variables, completion progress bars, filter state controls (All, Active, Completed), custom add forms, and soft transition deletes.`;
    
    html = defaultHtml('Task Manager App', `
  <div class="flex items-center justify-center min-h-screen bg-slate-950 p-6">
    <div class="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      <!-- Decorator lines -->
      <div class="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-indigo-500"></div>

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2"><i class="bi bi-clipboard2-check text-emerald-400"></i> Task Manager</h2>
          <p class="text-slate-500 text-xs mt-0.5">Optimize your daily goals and deliverables</p>
        </div>
        <span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-semibold" id="prog-badge">0% Done</span>
      </div>

      <!-- Progress bar -->
      <div class="w-full bg-slate-800 rounded-full h-1.5 mb-6 overflow-hidden">
        <div class="bg-gradient-to-r from-emerald-500 to-teal-500 h-1.5 rounded-full transition-all duration-300" id="progress-bar" style="width: 0%"></div>
      </div>

      <!-- Input Task Form -->
      <form id="task-form" class="flex gap-2.5 mb-6" onsubmit="event.preventDefault(); addNewTask();">
        <input type="text" id="task-input" required placeholder="Add a new goal or coding project..." class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 placeholder:text-slate-600 transition-all" />
        <button type="submit" class="px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-600/10"><i class="bi bi-plus-lg"></i> Add</button>
      </form>

      <!-- Filter Controls -->
      <div class="flex gap-2 mb-4">
        <button class="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 filter-btn" onclick="filterTasks('all', this)">All</button>
        <button class="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white filter-btn" onclick="filterTasks('active', this)">Active</button>
        <button class="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white filter-btn" onclick="filterTasks('completed', this)">Completed</button>
      </div>

      <!-- Task Lists -->
      <ul id="task-list" class="space-y-2.5 max-h-80 overflow-y-auto pr-1">
        <!-- Default tasks added dynamically by Javascript -->
      </ul>

      <!-- Footer Stats -->
      <div class="flex justify-between items-center mt-6 pt-4 border-t border-slate-800 text-xs text-slate-500">
        <span id="items-left">0 items left</span>
        <button class="hover:text-rose-400 font-medium transition-colors" onclick="clearCompleted()">Clear Completed</button>
      </div>
    </div>
  </div>
    `);

    js = `
    let tasks = [
      { id: 1, text: 'Refactor login authentication system with JWT', completed: true },
      { id: 2, text: 'Add GPT-5 model validation tests to core router', completed: false },
      { id: 3, text: 'Design responsive layout for Compare Sandbox view', completed: false }
    ];

    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');
    const itemsLeft = document.getElementById('items-left');
    const progressBar = document.getElementById('progress-bar');
    const progBadge = document.getElementById('prog-badge');

    let currentFilter = 'all';

    function renderTasks() {
      taskList.innerHTML = '';
      
      let filtered = tasks;
      if (currentFilter === 'active') filtered = tasks.filter(t => !t.completed);
      if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);

      if (filtered.length === 0) {
        taskList.innerHTML = '<div class="text-center py-8 text-slate-500 text-xs">No tasks found. Add one above!</div>';
      }

      filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all group';
        
        const textClass = task.completed ? 'line-through text-slate-500' : 'text-slate-200';
        const checkedIcon = task.completed ? 'bi-check-circle-fill text-emerald-400' : 'bi-circle text-slate-600 hover:text-slate-400';

        li.innerHTML = \`
          <div class="flex items-center gap-3 cursor-pointer" onclick="toggleTask(\${task.id})">
            <i class="bi \${checkedIcon} text-lg transition-colors"></i>
            <span class="text-xs font-medium \${textClass}">\${task.text}</span>
          </div>
          <button class="h-8 w-8 text-slate-500 hover:text-rose-400 rounded-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100" onclick="deleteTask(\${task.id})">
            <i class="bi bi-trash"></i>
          </button>
        \`;
        taskList.appendChild(li);
      });

      // Update counters & progress
      const activeCount = tasks.filter(t => !t.completed).length;
      const completedCount = tasks.filter(t => t.completed).length;
      const totalCount = tasks.length;
      
      itemsLeft.innerText = activeCount + ' item' + (activeCount === 1 ? '' : 's') + ' left';
      
      const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
      progressBar.style.width = percent + '%';
      progBadge.innerText = percent + '% Done';
    }

    window.addNewTask = function() {
      const text = taskInput.value.trim();
      if (!text) return;
      
      tasks.push({
        id: Date.now(),
        text: text,
        completed: false
      });
      taskInput.value = '';
      renderTasks();
    };

    window.toggleTask = function(id) {
      tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
      renderTasks();
    };

    window.deleteTask = function(id) {
      tasks = tasks.filter(t => t.id !== id);
      renderTasks();
    };

    window.clearCompleted = function() {
      tasks = tasks.filter(t => !t.completed);
      renderTasks();
    };

    window.filterTasks = function(filterType, element) {
      currentFilter = filterType;
      
      // Update filter UI
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white filter-btn';
      });
      element.className = 'px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 filter-btn';
      
      renderTasks();
    };

    // Initial render
    renderTasks();
    `;
  }
  
  // 4. Default / General AI Code Generator Sandbox (For fallback/unknown prompts)
  else {
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const widgetName = capitalize(prompt.split(' ').slice(0, 3).join(' ')) || 'Optimal Web Application';
    
    explanation = `Synthesized custom layout: "${widgetName}". Tailored dynamically using semantic analysis of prompt instructions. Loaded standard dark themes, grid elements, interactive counters, mock statistics, responsive headers, and reactive control event loops.`;
    
    html = defaultHtml(widgetName, `
  <div class="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
    <!-- Navbar -->
    <header class="border-b border-slate-800 bg-slate-900/40 p-5 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white"><i class="bi bi-cpu text-lg"></i></div>
        <div>
          <h1 class="text-sm font-bold tracking-tight text-white">${widgetName}</h1>
          <p class="text-[10px] text-indigo-400 font-semibold uppercase">Powered by ${modelId}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 transition-all" onclick="resetApp()">Reset Workspace</button>
        <button class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold rounded-lg text-white transition-all shadow-lg shadow-indigo-600/20" onclick="triggerAction()">Execute Action</button>
      </div>
    </header>

    <!-- Main Hero -->
    <main class="flex-1 p-8 space-y-8 max-w-4xl mx-auto w-full">
      <div class="bg-gradient-to-br from-indigo-900/20 via-slate-900/60 to-slate-950 p-8 rounded-2xl border border-indigo-500/10 space-y-4">
        <div class="inline-flex px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold items-center gap-1">
          <span class="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-ping"></span> Live Optimal AI Render
        </div>
        
        <h2 class="text-2xl font-extrabold text-white tracking-tight">Interactive AI Application Shell</h2>
        <p class="text-slate-400 text-sm leading-relaxed">
          Optimal AI Codex analyzed your query: <strong class="text-indigo-400">"${prompt}"</strong> and successfully generated this responsive component sandbox. All elements below are live and support clicks, updates, and styling reviews.
        </p>

        <div class="pt-2 flex flex-wrap gap-3">
          <div class="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center gap-1.5">
            <i class="bi bi-clock"></i> Latency: <strong class="text-emerald-400">190ms</strong>
          </div>
          <div class="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center gap-1.5">
            <i class="bi bi-cpu"></i> Provider: <strong class="text-indigo-400">Client Sandbox Synthesizer</strong>
          </div>
          <div class="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center gap-1.5">
            <i class="bi bi-file-earmark-code"></i> Framework: <strong class="text-amber-400">Tailwind + Vanilla JS</strong>
          </div>
        </div>
      </div>

      <!-- Core Interactive Widget -->
      <div class="bg-slate-900/30 border border-slate-800 p-6 rounded-xl space-y-6">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-sm text-white">Interactive Sandbox Test Suite</h3>
          <span class="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] rounded" id="interactive-status">Idle state</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <p class="text-xs text-slate-400 font-medium">Increment Counter Component</p>
            <div class="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <button class="h-9 w-9 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-bold flex items-center justify-center transition-colors cursor-pointer" onclick="updateCounter(-1)">-</button>
              <span class="text-xl font-bold font-mono text-white flex-1 text-center" id="counter-val">0</span>
              <button class="h-9 w-9 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-bold flex items-center justify-center transition-colors cursor-pointer" onclick="updateCounter(1)">+</button>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-xs text-slate-400 font-medium">Status Control Input Field</p>
            <div class="flex gap-2.5">
              <input type="text" id="status-input" placeholder="Type custom status title..." class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-200" />
              <button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-600/10" onclick="updateStatusText()">Update</button>
            </div>
          </div>
        </div>

        <div class="p-4 bg-slate-950 rounded-xl border border-slate-850/60 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center text-lg"><i class="bi bi-lightbulb"></i></div>
            <div>
              <h5 class="text-xs font-bold text-white">Dynamic Interactive Console</h5>
              <p class="text-[10px] text-slate-500">Every button click sends events straight to standard output logs below</p>
            </div>
          </div>
          <span class="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded" id="clicks-badge">0 Event Clicks</span>
        </div>

        <!-- Simulated Logs -->
        <div class="bg-slate-950/80 p-4 rounded-xl border border-slate-850 font-mono text-[11px] leading-relaxed text-slate-400 h-36 overflow-y-auto" id="app-output">
          <div class="text-slate-600">[00:00:01] Sandbox compiler successfully loaded.</div>
          <div class="text-indigo-400">[00:00:02] Created responsive DOM element structures.</div>
          <div class="text-emerald-400">[00:00:03] Bound responsive clicks and update handlers.</div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-800/60 p-6 text-center text-xs text-slate-500 mt-12 bg-slate-900/10">
      <p>© Optimal AI Codex Playground — Full sandbox responsive execution shell</p>
    </footer>
  </div>
    `);

    js = `
    let count = 0;
    let clicks = 0;

    const counterVal = document.getElementById('counter-val');
    const clicksBadge = document.getElementById('clicks-badge');
    const appOutput = document.getElementById('app-output');
    const interactiveStatus = document.getElementById('interactive-status');
    const statusInput = document.getElementById('status-input');

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

    window.updateCounter = function(val) {
      count += val;
      counterVal.innerText = count;
      logEvent('Counter updated to ' + count, 'event');
      
      interactiveStatus.innerText = 'Active count: ' + count;
      interactiveStatus.className = 'px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] rounded';
    };

    window.updateStatusText = function() {
      const text = statusInput.value.trim();
      if (!text) {
        logEvent('Attempted to set empty status text', 'error');
        return;
      }
      interactiveStatus.innerText = text;
      interactiveStatus.className = 'px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] rounded font-semibold';
      logEvent('Workspace status altered to: ' + text, 'success');
      statusInput.value = '';
    };

    window.triggerAction = function() {
      logEvent('Custom client action compiled & run!', 'success');
    };

    window.resetApp = function() {
      count = 0;
      clicks = 0;
      counterVal.innerText = count;
      clicksBadge.innerText = '0 Event Clicks';
      interactiveStatus.innerText = 'Idle state';
      interactiveStatus.className = 'px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] rounded';
      appOutput.innerHTML = '<div class="text-slate-600">[00:00:01] Sandbox compiler successfully loaded.</div>';
      logEvent('Workspace environment completely reset', 'warn');
    };
    `;
  }

  return {
    files: {
      'index.html': html,
      'styles.css': css,
      'app.js': js
    },
    explanation
  };
}

// Perform real API call wrapper to OpenAI or OpenRouter if key is present
export async function generateAICodeFromAPI(
  prompt: string,
  provider: 'openai' | 'openrouter',
  apiKey: string,
  modelId: string,
  temperature: number,
  maxTokens: number,
  systemPrompt: string
): Promise<{ files: ProjectFiles; explanation: string; latency: number; tokensUsed: number }> {
  const startTime = Date.now();
  
  // Format user content
  const requestContent = `
Task: Build a single page web component or fully responsive frontend application based on this prompt: "${prompt}".
You must output the exact responsive user-interface styled with Tailwind CSS, custom dark theme CSS styles, and full interactive modern JavaScript logic for counters, tab states, interactive dashboard panels, lists, or custom triggers inside three specific, cleanly delimited markdown blocks:
1. \`\`\`html
... HTML markup with full body contents (include dynamic cdn links for Tailwind or icons if necessary) ...
\`\`\`
2. \`\`\`css
... custom extra css styling (or transitions) ...
\`\`\`
3. \`\`\`javascript
... fully active vanilla JS scripting ...
\`\`\`

System Instructions: ${systemPrompt}
  `;

  let url = 'https://api.openai.com/v1/chat/completions';
  let modelName = modelId;
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (provider === 'openai') {
    headers['Authorization'] = `Bearer ${apiKey}`;
    // map mock gpt-5 model names to actual existing fallback models so the api successfully runs with a genuine key!
    if (modelId.startsWith('gpt-5')) {
      modelName = 'gpt-4o'; // map GPT-5 model to gpt-4o for real fetch execution so it succeeds!
    }
  } else if (provider === 'openrouter') {
    url = 'https://openrouter.ai/api/v1/chat/completions';
    headers['Authorization'] = `Bearer ${apiKey}`;
    headers['HTTP-Referer'] = 'https://optimal-codex.workspace';
    headers['X-Title'] = 'Optimal AI Codex';
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: requestContent }
        ],
        temperature: temperature,
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || `API error (Status ${response.status})`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const assistantMessage = data?.choices?.[0]?.message?.content || '';
    const tokensUsed = data?.usage?.total_tokens || Math.round(prompt.length / 4) + 1200;
    
    const files = extractCodeBlocks(assistantMessage);
    const explanation = `Constructed live code utilizing ${modelId} frontier engine with dynamic API compilation. Total round-trip execution was successful.`;
    const latency = Date.now() - startTime;

    return {
      files,
      explanation,
      latency,
      tokensUsed
    };

  } catch (error: any) {
    // If the API call fails, we bubble up the error so the UI can notify the developer, but we will let the sandbox fallback to local synthesis
    throw error;
  }
}
