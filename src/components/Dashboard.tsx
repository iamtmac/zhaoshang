import React from 'react';
import { 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight, 
  Target, 
  Activity,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';

const data = [
  { name: '高端制造', projects: 12, value: 45 },
  { name: '数字经济', projects: 18, value: 62 },
  { name: '生物医药', projects: 8, value: 38 },
  { name: '现代物流', projects: 15, value: 29 },
  { name: '智能算力', projects: 10, value: 55 },
];

const trendData = [
  { month: '1月', count: 12 },
  { month: '2月', count: 15 },
  { month: '3月', count: 25 },
  { month: '4月', count: 20 },
  { month: '5月', count: 32 },
];

import { useState } from 'react';
import { ProjectForm } from './ProjectForm';

export const Dashboard: React.FC = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {showProjectForm && <ProjectForm onClose={() => setShowProjectForm(false)} />}
      
      {/* Top Action Bar */}
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">今日招商看板</h2>
          <p className="text-slate-500 text-sm font-medium">AI 驱动的产业链精准识别系统已就绪</p>
        </div>
        <button 
          onClick={() => setShowProjectForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-100"
        >
          <Plus className="w-4 h-4" />
          启动新项目建档
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '待跟进企业线索', val: '142', trend: '+12%', sub: '月增量', color: 'text-blue-600' },
          { label: 'AI辅助填报中', val: '28', trend: '待校验 5', sub: '项目进度', color: 'text-orange-600' },
          { label: '产业链缺口提醒', val: '06', trend: '高优先级', sub: '缺口环节', color: 'text-red-600' },
          { label: '本月引资总额', val: '12.5亿', trend: '达标 84%', sub: '项目总值', color: 'text-slate-900' },
        ].map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={i}
            className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-4">{item.label}</div>
            <div className="flex items-end justify-between">
              <span className={cn("text-3xl font-bold tracking-tight", item.color)}>{item.val}</span>
              <div className="text-right">
                <span className={cn("text-[10px] font-black uppercase", item.trend.includes('+') ? 'text-blue-600' : 'text-slate-400')}>
                  {item.trend}
                </span>
                <p className="text-[9px] text-slate-400 font-medium">{item.sub}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Business Logic Visualization */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 p-6 rounded-lg shadow-sm flex flex-col min-h-[420px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">辖区主导产业链招商图谱</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-[10px] bg-slate-50 border border-slate-200 text-slate-600 rounded font-bold hover:bg-slate-100 transition-colors uppercase">高端制造</button>
              <button className="px-3 py-1.5 text-[10px] bg-blue-600 text-white rounded font-bold uppercase shadow-lg shadow-blue-200">商贸物流</button>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-8 px-4">
            <div className="grid grid-cols-3 gap-6">
              {[
                { title: '上游：原材料', val: '链主 12 家', desc: '配套率 82%' },
                { title: '中游：核心环节', val: '缺口 5 个', desc: '急需补链', highlight: true },
                { title: '下游：终端应用', val: '市场覆盖 88%', desc: '产值稳定' },
              ].map((box, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "p-5 border rounded-lg text-center transition-all",
                    box.highlight 
                      ? "bg-blue-50 border-blue-200 ring-2 ring-blue-100" 
                      : "bg-slate-50 border-slate-100 hover:border-slate-200"
                  )}
                >
                  <p className={cn("text-[10px] font-bold uppercase mb-2", box.highlight ? "text-blue-600" : "text-slate-400")}>
                    {box.title}
                  </p>
                  <p className={cn("text-lg font-black tracking-tight", box.highlight ? "text-blue-900" : "text-slate-700")}>
                    {box.val}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">{box.desc}</p>
                </div>
              ))}
            </div>

            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#2563eb" fillOpacity={1} fill="url(#colorCount)" strokeWidth={2} dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Recommendations Column */}
        <div className="col-span-12 lg:col-span-4 bg-[#0F172A] p-6 rounded-lg shadow-xl text-white flex flex-col">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_#60a5fa]"></span> 
            AI 实时精准推荐
          </h3>
          <div className="space-y-4 flex-1 overflow-hidden">
            {[
              { name: '某智能机器人有限公司', score: '98', tag: '核心模组', status: '高匹配' },
              { name: 'XX半导体核心材料部', score: '92', tag: '补链环节', status: '紧迫' },
              { name: '智造动力科技研发部', score: '87', tag: '下游配套', status: '意向高' },
            ].map((rec, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                key={i} 
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-bold text-blue-100 font-sans tracking-tight">{rec.name}</div>
                  <span className="text-[9px] bg-blue-500 font-black px-1.5 py-0.5 rounded uppercase">
                    {rec.score}分
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mb-3 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded border border-slate-700 font-medium">{rec.tag}</span>
                  <span className="text-blue-400 font-bold uppercase tracking-wider">{rec.status}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-blue-600 text-[10px] font-bold rounded shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-colors">一键建档</button>
                  <button className="px-3 py-1.5 bg-white/10 text-[10px] rounded hover:bg-white/20 transition-colors">详情</button>
                </div>
              </motion.div>
            ))}
            <div className="py-2 text-[10px] text-slate-500 text-center font-medium italic animate-pulse">
              正在扫描全球公开专利库挖掘更多线索...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { cn } from '../lib/utils';
