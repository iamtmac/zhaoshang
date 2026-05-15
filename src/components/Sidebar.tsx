import React from 'react';
import { 
  BarChart3, 
  Search, 
  FileEdit, 
  Users, 
  LayoutDashboard, 
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { TabType } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: '首页驾驶舱', icon: LayoutDashboard },
    { id: 'projects', label: '项目全流程管理', icon: FileEdit },
    { id: 'mining', label: '企业智能挖掘', icon: Search },
    { id: 'ledger', label: '客商台账管理', icon: Users },
  ] as const;

  return (
    <div className="w-64 bg-[#0F172A] text-white flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-slate-700/50">
        <div className="text-xl font-bold tracking-tight text-blue-400">
          招商有道 <span className="text-white font-light">AI</span>
        </div>
        <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-mono">
          Smart Investment Workbench
        </div>
      </div>

      <nav className="flex-1 py-6 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-6 py-3.5 transition-all duration-200 group relative",
              activeTab === item.id 
                ? "bg-blue-600/10 text-white border-l-4 border-blue-500 shadow-inner" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <div className={cn(
              "w-4 h-4 transition-all",
              activeTab === item.id ? "bg-blue-500 rounded-sm" : "border border-slate-600 rounded-sm group-hover:border-slate-400"
            )} />
            <span className="text-sm font-medium">{item.label}</span>
            {activeTab === item.id && (
              <div className="absolute right-4 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-700/50">
        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-900/40">
            张
          </div>
          <div>
            <div className="text-xs font-semibold text-white">张建国</div>
            <div className="text-[10px] text-slate-400 font-medium">中心高级专员</div>
          </div>
        </div>
      </div>
    </div>
  );
};
