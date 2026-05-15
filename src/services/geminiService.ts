import { GoogleGenAI } from "@google/genai";

// 提示：汇报展示建议通过环境变量配置，若无则自动进入智能模拟模式
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'MOCK_MODE' });

export const geminiService = {
  /**
   * 智能抓取/预填企业工商及产业链基础信息
   */
  async fetchEnterpriseBasicInfo(name: string) {
    if (!process.env.GEMINI_API_KEY) {
      // 本地演示模拟延迟，增加真实感
      await new Promise(r => setTimeout(r, 1500));
      return {
        "enterpriseName": name.length > 4 ? name : `${name}智能科技股份公司`,
        "registrationCapital": "5,000万人民币",
        "establishDate": "2018-05-24",
        "industryCategory": "软件和信息技术服务业",
        "industryChain": "智能机器人与低空经济",
        "chainPosition": "核心感知模组与飞行控制系统 provider",
        "businessScope": "技术开发、技术咨询、技术交流、技术转让、技术推广；工业机器人制造；智能机器人的研发；专用设备制造..."
      };
    }

    const prompt = `你是一个招商助手。请模拟从工商系统及产业链数据库中抓取“${name}”的信息。
    请返回JSON：
    {
      "enterpriseName": "完整企业全称",
      "registrationCapital": "注册资本（含货币类型）",
      "establishDate": "成立日期 YYYY-MM-DD",
      "industryCategory": "国民经济行业分类",
      "industryChain": "建议归属的产业链名称",
      "chainPosition": "在产业链中的定位",
      "businessScope": "经营范围简述"
    }`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      return null;
    }
  },

  /**
   * 生成四维度深度招商价值评估报告
   */
  async generateDetailedEvaluation(enterpriseName: string, industry: string) {
    if (!process.env.GEMINI_API_KEY) {
      await new Promise(r => setTimeout(r, 2000));
      return {
        "qualifications": { 
          "age": "6年", 
          "capital": "5000万", 
          "patents": ["发明专利 12项", "实用新型 24项"], 
          "techEdge": "拥有业界领先的MEMS高精度感知算法" 
        },
        "strength": { 
          "revenue": "上年度 1.2亿元", 
          "taxStatus": "纳税 A 类", 
          "stability": "稳健增长（CAGR 35%）", 
          "risks": ["暂无重大法律风险"] 
        },
        "matching": { 
          "chainFit": "极高，属于我区主导产业链‘补链’关键环节", 
          "gapAnalysis": "该企业产品可替代进口，填补我区高端传感器制造空白", 
          "landUsage": "约 15-20 亩工业用地需求", 
          "investmentEst": "预计总投资 2.5 亿元" 
        },
        "intent": { 
          "expansion": "积极，正寻求在华东地区建立生产基地", 
          "layoutIntent": "高，已多次派员考察项目选址", 
          "sensitivity": "对人才政策支持较为敏感" 
        },
        "totalScore": 94,
        "recommendation": "建议立即启动‘一事一议’专项政策对接，抢占招引先机。"
      };
    }

    const prompt = `评估企业：${enterpriseName}（行业：${industry}）。
    请基于以下四个维度生成深度的招商评估报告并输出JSON...`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      return null;
    }
  },

  async generateEvaluation(enterpriseName: string, industry: string) {
    return this.generateDetailedEvaluation(enterpriseName, industry);
  },

  async analyzeChainGaps(chainName: string) {
    if (!process.env.GEMINI_API_KEY) {
      return `针对“${chainName}”产业链，分析显示目前中游封装环节存在关键缺口，建议重点引进具备高精密封装能力的标的企业。`;
    }
    const prompt = `分析“${chainName}”产业链的现状...`;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
      });
      return response.text;
    } catch (error) {
      return "AI分析暂时不可用。";
    }
  }
};

