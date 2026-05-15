import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Loader2, 
  Building2, 
  FileCheck,
  Globe,
  Database
} from 'lucide-react';
import { cn } from '../lib/utils';
import { geminiService } from '../services/geminiService';

interface ProjectFormProps {
  onClose: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onClose }) => {
  const [enterpriseName, setEnterpriseName] = useState('');
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [formData, setFormData] = useState({
    registrationCapital: '',
    establishDate: '',
    industryCategory: '',
    industryChain: '',
    businessScope: '',
  });

  const handleAutoFill = async () => {
    if (!enterpriseName) return;
    setIsAutoFilling(true);
    const data = await geminiService.fetchEnterpriseBasicInfo(enterpriseName);
    if (data) {
      setFormData({
        registrationCapital: data.registrationCapital || '',
        establishDate: data.establishDate || '',
        industryCategory: data.industryCategory || '',
        industryChain: data.industryChain || '',
        businessScope: data.businessScope || '',
      });
      setEnterpriseName(data.enterpriseName || enterpriseName);
    }
    setIsAutoFilling(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold uppercase tracking-widest text-xs">新增招商项目</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Header Input with AI Button */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">企业名称 / 投资主体</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Building2 className="w-5 h-5 text-slate-300 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={enterpriseName}
                  onChange={(e) => setEnterpriseName(e.target.value)}
                  placeholder="请输入企业全称或关键词"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>
              <button 
                onClick={handleAutoFill}
                disabled={isAutoFilling || !enterpriseName}
                className={cn(
                  "px-6 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all",
                  isAutoFilling 
                    ? "bg-slate-100 text-slate-400 border border-slate-200" 
                    : "bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95"
                )}
              >
                {isAutoFilling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {isAutoFilling ? '抓取中' : 'AI 智能预填'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">注册资本</label>
              <div className="relative">
                <Database className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={formData.registrationCapital}
                  readOnly={isAutoFilling}
                  onChange={(e) => setFormData({...formData, registrationCapital: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">成立日期</label>
              <input 
                type="text" 
                value={formData.establishDate}
                readOnly={isAutoFilling}
                onChange={(e) => setFormData({...formData, establishDate: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2 col-span-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">产业分类 (AI)</label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={formData.industryCategory}
                  readOnly={isAutoFilling}
                  onChange={(e) => setFormData({...formData, industryCategory: e.target.value})}
                  className="w-full bg-blue-50/30 border border-blue-200/50 rounded-lg py-2.5 pl-10 pr-4 text-sm font-bold text-blue-600"
                />
              </div>
            </div>
            <div className="space-y-2 col-span-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">建议产业链归属</label>
              <input 
                type="text" 
                value={formData.industryChain}
                readOnly={isAutoFilling}
                onChange={(e) => setFormData({...formData, industryChain: e.target.value})}
                className="w-full bg-emerald-50/30 border border-emerald-200/50 rounded-lg py-2.5 px-4 text-sm font-bold text-emerald-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">经营范围 / AI 抓取</label>
            <textarea 
              rows={3}
              value={formData.businessScope}
              readOnly={isAutoFilling}
              onChange={(e) => setFormData({...formData, businessScope: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-medium resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex gap-4">
            <button className="flex-1 bg-blue-600 text-white rounded-xl py-3.5 font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
              确认建档 并开始流程
            </button>
            <button onClick={onClose} className="px-8 border border-slate-200 text-slate-500 rounded-xl py-3.5 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
