import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const geminiService = {
  /**
   * 智能抓取/预填企业工商及产业链基础信息
   */
  async fetchEnterpriseBasicInfo(name: string) {
    const prompt = `你是一个招商助手。请模拟从工商系统及产业链数据库中抓取“${name}”的信息。
    请返回JSON：
    {
      "enterpriseName": "完整企业全称",
      "registrationCapital": "注册资本（含货币类型）",
      "establishDate": "成立日期 YYYY-MM-DD",
      "industryCategory": "国民经济行业分类",
      "industryChain": "建议归属的产业链名称",
      "chainPosition": "在产业链中的定位（如：核心零部件供应商、系统集成商等）",
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
      console.error("Fetch basic info failed:", error);
      return null;
    }
  },

  /**
   * 生成四维度深度招商价值评估报告
   */
  async generateDetailedEvaluation(enterpriseName: string, industry: string) {
    const prompt = `评估企业：${enterpriseName}（行业：${industry}）。
    请基于以下四个维度生成深度的招商评估报告并输出JSON：
    1. qualifications (资质): 成立、资本、专利/高新、产业链技术。
    2. strength (经营): 营收、纳税、稳定、风险。
    3. matching (匹配): 产业契合、缺口适配、用地需求、投资规模。
    4. intent (意愿): 扩张动态、布局意向。
    
    JSON结构要求：
    {
      "qualifications": { "age": "...", "capital": "...", "patents": ["..."], "techEdge": "..." },
      "strength": { "revenue": "...", "taxStatus": "...", "stability": "...", "risks": ["..."] },
      "matching": { "chainFit": "...", "gapAnalysis": "...", "landUsage": "...", "investmentEst": "..." },
      "intent": { "expansion": "...", "layoutIntent": "...", "sensitivity": "..." },
      "totalScore": 85,
      "recommendation": "具体的专家建议"
    }`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Detailed evaluation failed:", error);
      return null;
    }
  },

  /**
   * 老版本兼容 (保持接口一致)
   */
  async generateEvaluation(enterpriseName: string, industry: string) {
    // 内部重定向到详细版
    return this.generateDetailedEvaluation(enterpriseName, industry);
  },

  /**
   * 产业链缺口分析
   */
  async analyzeChainGaps(chainName: string) {
    const prompt = `分析“${chainName}”产业链的现状，并指出目前区县一级招商中常见的“断链”或“弱链”环节。
    请列出3个建议重点招引的企业类型。`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      return response.text;
    } catch (error) {
      return "AI分析暂时不可用，请稍后重试。";
    }
  }
};

