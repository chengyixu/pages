// 策略类型
export type StrategyType = 'stock_selection' | 'price_prediction' | 'portfolio_allocation';

// 时间周期
export type TimePeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

// 策略基础接口
export interface Strategy {
  id: string;
  name: string;
  type: StrategyType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  isActive: boolean;
}

// 策略性能指标
export interface PerformanceMetrics {
  totalReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
  volatility: number;
  winRate: number;
  profitFactor: number;
}

// 策略详细信息
export interface StrategyDetails extends Strategy {
  performance: PerformanceMetrics;
  historicalData: HistoricalDataPoint[];
  bestTechniques: {
    [key in TimePeriod]?: string[];
  };
  radarData: RadarChartData[];
  effectiveDate?: Date; // Date when strategy became effective/started
  // 选股策略特定数据
  stockSelections?: {
    ticker: string;
  }[];
  // 价格预测特定数据
  predictions?: {
    ticker: string;
    price: number;
    date: string;
  }[];
  // 组合配置特定数据
  allocations?: {
    ticker: string;
    weight: number;
  }[];
}

// 历史数据点
export interface HistoricalDataPoint {
  date: string;
  value: number;
  benchmark?: number;
}

// 六维图数据
export interface RadarChartData {
  subject: string;
  value: number;
  fullMark: number;
}

// 股票选择策略结果
export interface StockSelectionResult {
  symbol: string;
  companyName: string;
  score: number;
  targetPrice?: number;
  currentPrice: number;
  expectedReturn: number;
}

// 价格预测结果
export interface PricePredictionResult {
  symbol: string;
  currentPrice: number;
  predictedPrice: number;
  targetDate: string;
  confidence: number;
  accuracy?: number;
}

// 投资组合配置
export interface PortfolioAllocation {
  symbol: string;
  weight: number;
  sector: string;
  expectedReturn: number;
  risk: number;
}

// 模型上传数据
export interface ModelUpload {
  id: string;
  name: string;
  type: StrategyType;
  file: File;
  description: string;
  uploadedAt: Date;
  results: any;
  extractedTags: string[];
}

// 看板数据
export interface DashboardData {
  topStrategies: {
    [key in TimePeriod]: StrategyDetails[];
  };
  overallMetrics: PerformanceMetrics;
  radarData: RadarChartData[];
  recentUpdates: {
    timestamp: Date;
    message: string;
  }[];
}

// 手动输入的策略数据
export interface ManualStrategyInput {
  title: string;
  type: StrategyType;
  tickers: string[];
  // 选股策略特定字段
  // 价格预测特定字段
  prices?: { ticker: string; price: number }[];
  targetDate?: string;
  // 组合配置特定字段
  weights?: { ticker: string; weight: number }[];
}

// 选股策略输入
export interface StockSelectionInput {
  title: string;
  tickers: string[];
  effectiveDate: string;
}

// 价格预测策略输入
export interface PricePredictionInput {
  title: string;
  predictions: {
    ticker: string;
    price: number;
    date: string;
  }[];
  effectiveDate: string;
}

// 组合配置策略输入
export interface PortfolioAllocationInput {
  title: string;
  allocations: {
    ticker: string;
    weight: number;
  }[];
  effectiveDate: string;
}

// AI分析结果
export interface AIAnalysisResult {
  overall_assessment: string;
  strengths: string[];
  weaknesses: string[];
  risk_level: 'low' | 'moderate' | 'high';
}

// Polygon API响应类型
export interface PolygonQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: number;
}

export interface PolygonAggregateBar {
  c: number; // close
  h: number; // high
  l: number; // low
  o: number; // open
  t: number; // timestamp
  v: number; // volume
}

export interface PolygonAggregatesResponse {
  ticker: string;
  status: string;
  adjusted: boolean;
  results: PolygonAggregateBar[];
  resultsCount: number;
}

export interface PolygonTickerDetails {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_name: string;
  market_cap?: number;
  share_class_shares_outstanding?: number;
  weighted_shares_outstanding?: number;
}

// 策略列表项
export interface StrategyListItem {
  id: string;
  title: string;
  type: StrategyType;
  tickers: string[];
  tags: string[];
  createdAt: Date;
  performance?: {
    return: number;
    sharpe: number;
    maxDrawdown: number;
  };
  // 选股策略特定数据
  stockSelections?: {
    ticker: string;
  }[];
  // 价格预测特定数据
  predictions?: {
    ticker: string;
    price: number;
    date: string;
  }[];
  // 组合配置特定数据
  allocations?: {
    ticker: string;
    weight: number;
  }[];
}

// 线性图表数据
export interface LineChartData {
  date: string;
  value: number;
  ticker?: string;
  name?: string;
}

// 多线性图表数据
export interface MultiLineChartData {
  [key: string]: LineChartData[];
}

// 策略编辑表单数据
export interface StrategyEditForm {
  title: string;
  type: StrategyType;
  tickers: string;
  prices?: string;
  dates?: string;
  weights?: string;
  notes?: string;
} 