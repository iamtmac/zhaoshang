/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ProjectManager } from './components/ProjectManager';
import { EnterpriseMining } from './components/EnterpriseMining';
import { TabType } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'projects': return <ProjectManager />;
      case 'mining': return <EnterpriseMining />;
      case 'ledger': return (
        <div className="flex flex-col items-center justify-center py-40">
          <div className="p-6 rounded-full bg-slate-900 mb-6">
            <span className="text-4xl">📁</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">客商台账管理</h2>
          <p className="text-slate-500">正在同步区县工商大数据，该模块即将上线</p>
        </div>
      );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans selection:bg-blue-600 selection:text-white flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 min-h-screen relative z-10 transition-all duration-300 ml-64 flex flex-col">
        {/* Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-slate-900">
              {activeTab === 'dashboard' && '工作台概览'}
              {activeTab === 'projects' && '项目管理'}
              {activeTab === 'mining' && '智能挖掘'}
              {activeTab === 'ledger' && '项目台账'}
            </h1>
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider">
              System Active
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-xs text-slate-500 font-medium">2024年10月24日 · 张建国</div>
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
              <span className="text-sm">🔔</span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

