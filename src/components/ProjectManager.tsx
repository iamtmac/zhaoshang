import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  MoreHorizontal, 
  ArrowRight,
  Filter,
  Sparkles,
  Search,
  Database,
  Plus
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Project } from '../types';

const mockProjects: Project[] = [
  { id: '1', name: '智驾系统研发中心项目', enterpriseName: '某领军智驾企业', industryChain: '智能网联汽车', stage: 'followup', investmentAmount: 50000, lastUpdate: '2024-05-14', status: 'active' },
  { id: '2', name: '氢能燃料电池电堆扩产项目', enterpriseName: '国氢科技', industryChain: '新能源', stage: 'filing', investmentAmount: 120000, lastUpdate: '2024-05-12', status: 'active' },
  { id: '3', name: '5G基站核心PCB代工厂', enterpriseName: '深南电路', industryChain: '电子信息', stage: 'archive', investmentAmount: 85000, lastUpdate: '2024-04-20', status: 'completed' },
];

const stages = [
  { id: 'filing', label: '项目建档' },
  { id: 'followup', label: '走访洽谈' },
  { id: 'record', label: '备案审批' },
  { id: 'archive', label: '落地归档' },
];

import { ProjectForm } from './ProjectForm';

export const ProjectManager: React.FC = () => {
  const [activeStage, setActiveStage] = useState<string>('all');
  const [showNewModal, setShowNewModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">项目全流程管理</h2>
          <p className="text-slate-500 text-sm">覆盖“建档-跟进-备案-归档”全业务闭环</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowNewModal(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-100 flex items-center gap-2 hover:bg-blue-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            新建项目建档
          </button>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="搜索项目、企业..." 
              className="bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 transition-all w-64 shadow-sm"
            />
          </div>
        </div>
      </div>

      {showNewModal && <ProjectForm onClose={() => setShowNewModal(false)} />}

      {/* Stage Filter */}
      <div className="flex gap-2 p-1 bg-slate-100/80 rounded-lg border border-slate-200 w-fit">
        <button 
          onClick={() => setActiveStage('all')}
          className={cn(
            "px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all",
            activeStage === 'all' ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
          )}
        >
          全部
        </button>
        {stages.map(s => (
          <button 
            key={s.id}
            onClick={() => setActiveStage(s.id)}
            className={cn(
              "px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all",
              activeStage === s.id ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 gap-4">
        {mockProjects.filter(p => activeStage === 'all' || p.stage === activeStage).map((project) => (
          <div 
            key={project.id} 
            className="group bg-white border border-slate-200 rounded-lg p-5 hover:border-blue-500 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex gap-4 flex-1">
              <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 transition-all group-hover:text-white group-hover:border-blue-600">
                <Database className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-all">{project.name}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 capitalize font-medium">
                  <span className="flex items-center gap-1"><FileText className="w-3 h-3 text-slate-400" /> {project.enterpriseName}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-blue-600 underline decoration-blue-600/30 underline-offset-4 font-bold tracking-tight"># {project.industryChain}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-slate-400">¥{(project.investmentAmount / 10000).toFixed(1)}亿</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 min-w-[300px]">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    {stages.find(s => s.id === project.stage)?.label}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600">75%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-md text-xs font-bold hover:bg-slate-50 transition-colors uppercase tracking-widest">详情</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 uppercase tracking-widest">填报辅助</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {mockProjects.filter(p => activeStage === 'all' || p.stage === activeStage).length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-800">
          <Database className="w-12 h-12 text-slate-700 mb-4" />
          <p className="text-slate-500">该阶段暂无正在推进的项目</p>
        </div>
      )}
    </div>
  );
};
