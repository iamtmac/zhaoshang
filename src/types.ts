export type TabType = 'dashboard' | 'projects' | 'mining' | 'ledger' | 'policy';

export interface Project {
  id: string;
  name: string;
  enterpriseName: string;
  industryChain: string;
  stage: 'filing' | 'followup' | 'record' | 'archive';
  investmentAmount: number;
  lastUpdate: string;
  status: 'active' | 'completed' | 'paused';
  // New fields for auto-fill
  registrationCapital?: string;
  establishDate?: string;
  industryCategory?: string;
  chainPosition?: string;
}

export interface EnterpriseReport {
  qualifications: {
    age: string;
    capital: string;
    patents: string[];
    techEdge: string;
  };
  strength: {
    revenue: string;
    taxStatus: string;
    stability: string;
    risks: string[];
  };
  matching: {
    chainFit: string;
    gapAnalysis: string;
    landUsage: string;
    investmentEst: string;
  };
  intent: {
    expansion: string;
    layoutIntent: string;
    sensitivity: string;
  };
  totalScore: number;
  recommendation: string;
}

export interface EnterpriseLead {
  id: string;
  name: string;
  industry: string;
  location: string;
  score: number;
  matchReason: string;
  tags: string[];
  intentLevel: 'high' | 'medium' | 'low';
  report?: EnterpriseReport;
}

export interface FollowUpRecord {
  id: string;
  projectId: string;
  date: string;
  content: string;
  nextStep: string;
  author: string;
}
