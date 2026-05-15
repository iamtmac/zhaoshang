import React, { useState } from 'react';
import { 
  Search, 
  Cpu, 
  MapPin, 
  TrendingUp, 
  Star, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EnterpriseLead } from '../types';
import { geminiService } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

const mockLeads: EnterpriseLead[] = [
  { id: '1', name: '深思考人工智能', industry: '智能语音/语义识别', location: '北京-海淀', score: 92, matchReason: '与我区“数字丝路”产业高度契合', tags: ['独角兽', '高新企业', '行业龙头'], intentLevel: 'high' },
  { id: '2', name: '矩浪科技', industry: '工业级3D打印', location: '深圳-南山', score: 85, matchReason: '填补高端制造产业链下游缺口', tags: ['专精特新', '产值稳定'], intentLevel: 'medium' },
  { id: '3', name: '极智嘉Geek+', industry: '物流机器人', location: '苏州-工业园', score: 78, matchReason: '仓储自动化需求适配度高', tags: ['扩张意向', 'B轮融资'], intentLevel: 'high' },
];

export const EnterpriseMining: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [evaluatingId, setEvaluatingId] = useState<string | null>(null);
  const [reports, setReports] = useState<Record<string, any>>({});

  const handleEvaluate = async (lead: EnterpriseLead) => {
    if (reports[lead.id]) return;
    setEvaluatingId(lead.id);
    const result = await geminiService.generateDetailedEvaluation(lead.name, lead.industry);
    if (result) {
      setReports(prev => ({ ...prev, [lead.id]: result }));
    }
    setEvaluatingId(null);
  };

  return (
    <div className="space-y-6">
      {/* ... previous code ... */}
      <div className="p-8 bg-white rounded-lg border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2 font-sans tracking-tight">产业链智能挖掘</h2>
        <p className="text-slate-500 text-sm mb-8 font-medium">输入主导产业或缺口环节，AI 将为您在全球工商网络中精准定位配套企业</p>
        
        <div className="flex gap-4 p-1.5 bg-slate-50 rounded-xl border border-slate-200 shadow-inner">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="搜索：如“第三代半导体封装”、“人形机器人核心关节”" 
              className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-slate-700 outline-none placeholder:text-slate-400 text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-blue-100">
            <Zap className="w-4 h-4" /> 深度挖掘
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockLeads.map((lead) => (
          <div 
            key={lead.id} 
            className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-all flex flex-col h-full group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Briefcase className="w-7 h-7 text-slate-400 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{lead.name}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {lead.location}
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-slate-400">{lead.industry}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">AI 评估得分</p>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-2xl font-black text-blue-600 font-mono tracking-tighter leading-none">{reports[lead.id]?.totalScore || lead.score}</span>
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 mb-6 flex-1">
              <p className="text-[9px] text-slate-400 font-black mb-2 uppercase tracking-wide">产业链契合优势</p>
              <p className="text-slate-700 text-sm leading-relaxed font-medium">{lead.matchReason}</p>
            </div>

            {!reports[lead.id] ? (
              <div className="flex gap-3 mt-auto">
                <button 
                  onClick={() => handleEvaluate(lead)}
                  disabled={evaluatingId === lead.id}
                  className="flex-1 py-3 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  {evaluatingId === lead.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                  {evaluatingId === lead.id ? '分析中...' : '生成深度评估报告'}
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-6 animate-in slide-in-from-top-2 duration-300">
                {/* 1. Qualifications & Strength */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-1">
                      <ShieldCheck className="w-3 h-3 text-blue-500" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">资质实力</span>
                    </div>
                    <div className="text-[10px] space-y-1.5 text-slate-600">
                      <p><b>注册:</b> {reports[lead.id].qualifications.capital}</p>
                      <p><b>年限:</b> {reports[lead.id].qualifications.age}</p>
                      <p><b>技术:</b> {reports[lead.id].qualifications.techEdge}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-1">
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">经营稳定性</span>
                    </div>
                    <div className="text-[10px] space-y-1.5 text-slate-600">
                      <p><b>营收:</b> {reports[lead.id].strength.revenue}</p>
                      <p><b>纳税:</b> {reports[lead.id].strength.taxStatus}</p>
                      <p className="text-red-500"><b>风险:</b> {reports[lead.id].strength.risks[0]}</p>
                    </div>
                  </div>
                </div>

                {/* 2. Match & Intent */}
                <div className="p-4 bg-blue-600/5 rounded-lg border border-blue-600/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest">产业链适配研判</span>
                    <span className="text-[10px] font-bold text-blue-600">专家等级评分</span>
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed font-medium bg-white/50 p-3 rounded border border-white">
                    {reports[lead.id].matching.gapAnalysis}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="bg-white/80 p-2 rounded">
                      <p className="text-slate-400 font-bold mb-1">投资意愿</p>
                      <p className="text-slate-800 font-bold">{reports[lead.id].intent.expansion}</p>
                    </div>
                    <div className="bg-white/80 p-2 rounded">
                      <p className="text-slate-400 font-bold mb-1">用地需求</p>
                      <p className="text-slate-800 font-bold">{reports[lead.id].matching.landUsage}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 rounded-lg">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <p className="text-[10px] text-slate-300 font-bold leading-tight">{reports[lead.id].recommendation.substring(0, 50)}...</p>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100">
                纳入正式项目台账
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Report Dropdown (Removed duplicated logic) */}    </div>
  );
};
