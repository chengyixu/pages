import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { StrategyDetails } from '../types';

// 合并class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化数字为百分比
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(2)}%`;
}

// 格式化数字为货币
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

// 格式化日期
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    return format(new Date(date), 'yyyy-MM-dd');
  }
  return format(date, 'yyyy-MM-dd');
}

// Generate deterministic ID based on timestamp and counter
let idCounter = 0;
export function generateId(): string {
  idCounter++;
  const timestamp = Date.now().toString(36);
  const counter = idCounter.toString(36);
  return `${timestamp}_${counter}`;
}

// 获取策略类型的显示名称
export function getStrategyTypeName(type: string): string {
  switch (type) {
    case 'stock_selection':
      return '选股策略';
    case 'price_prediction':
      return '价格预测';
    case 'portfolio_allocation':
      return '配置策略';
    default:
      return type;
  }
}

// 计算收益率颜色
export function getReturnColor(value: number): string {
  if (value > 0) return 'text-green-600';
  if (value < 0) return 'text-red-600';
  return 'text-gray-600';
}

// 延迟函数
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Polygon API Configuration
const POLYGON_API_KEY = "pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43";
const POLYGON_BASE_URL = "https://api.polygon.io";

// Panor platform gateway keeps the Ark credential server-side.
const PLATFORM_AI_URL = '/api/platform/ai/chat';

// Polygon API Service
export class PolygonService {
  private static apiKey = POLYGON_API_KEY;
  private static baseUrl = POLYGON_BASE_URL;

  // Get stock quote
  static async getQuote(symbol: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/v2/last/trade/${symbol}?apiKey=${this.apiKey}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching quote:', error);
      throw error;
    }
  }

  // Get aggregated bars (OHLC data)
  static async getAggregates(symbol: string, timespan: string = 'day', from: string, to: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/v2/aggs/ticker/${symbol}/range/1/${timespan}/${from}/${to}?apiKey=${this.apiKey}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching aggregates:', error);
      throw error;
    }
  }

  // Get ticker details
  static async getTickerDetails(symbol: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/v3/reference/tickers/${symbol}?apiKey=${this.apiKey}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching ticker details:', error);
      throw error;
    }
  }

  // Get market snapshot
  static async getMarketSnapshot() {
    try {
      const response = await fetch(
        `${this.baseUrl}/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=${this.apiKey}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching market snapshot:', error);
      throw error;
    }
  }

  // Get dividends
  static async getDividends(symbol?: string) {
    const url = symbol 
      ? `${this.baseUrl}/v3/reference/dividends?ticker=${symbol}&apiKey=${this.apiKey}`
      : `${this.baseUrl}/v3/reference/dividends?apiKey=${this.apiKey}`;
    
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching dividends:', error);
      throw error;
    }
  }

  // Get previous close
  static async getPreviousClose(symbol: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/v2/aggs/ticker/${symbol}/prev?apiKey=${this.apiKey}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching previous close:', error);
      throw error;
    }
  }

  // Get technical indicators - SMA
  static async getSMA(symbol: string, window: number = 50) {
    try {
      const response = await fetch(
        `${this.baseUrl}/v1/indicators/sma/${symbol}?timestamp.gte=2023-01-01&timespan=day&adjusted=true&window=${window}&series_type=close&order=desc&limit=100&apiKey=${this.apiKey}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching SMA:', error);
      throw error;
    }
  }

  // Get technical indicators - RSI
  static async getRSI(symbol: string, window: number = 14) {
    try {
      const response = await fetch(
        `${this.baseUrl}/v1/indicators/rsi/${symbol}?timestamp.gte=2023-01-01&timespan=day&adjusted=true&window=${window}&series_type=close&order=desc&limit=100&apiKey=${this.apiKey}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching RSI:', error);
      throw error;
    }
  }

  // Get technical indicators - MACD
  static async getMACD(symbol: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/v1/indicators/macd/${symbol}?timestamp.gte=2023-01-01&timespan=day&adjusted=true&short_window=12&long_window=26&signal_window=9&series_type=close&order=desc&limit=100&apiKey=${this.apiKey}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching MACD:', error);
      throw error;
    }
  }

  // Search tickers
  static async searchTickers(search: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/v3/reference/tickers?search=${search}&active=true&limit=10&apiKey=${this.apiKey}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error searching tickers:', error);
      throw error;
    }
  }
}

// Ark AI Service
export class ArkService {

  // Extract tags from strategy title using Ark AI
  static async extractTags(title: string, type: 'stock_selection' | 'price_prediction' | 'portfolio_allocation') {
    const systemPrompt = `You are a financial AI assistant specialized in quantitative trading strategies. Your task is to analyze strategy titles and extract relevant tags.

Based on the strategy title and type, generate 3-5 relevant tags from these categories:
- Technical indicators: momentum, mean-reversion, trend-following, volatility, RSI, MACD, Bollinger-bands, moving-average
- Market approach: high-frequency, swing-trading, day-trading, long-term, arbitrage, pairs-trading
- Risk management: low-risk, moderate-risk, high-risk, hedged, diversified
- Asset focus: large-cap, small-cap, growth, value, dividend, sector-rotation
- Strategy style: quantitative, algorithmic, ML-based, statistical, fundamental

Respond with only a JSON array of strings, no additional text.`;

    const userPrompt = `Strategy Type: ${type}
Strategy Title: ${title}

Extract 3-5 relevant tags:`;

    try {
      const response = await fetch(PLATFORM_AI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'eve-invest',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.3,
        }),
      });

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (content) {
        try {
          const parsed = JSON.parse(content);
          return parsed.tags || parsed;
        } catch (e) {
          // Fallback parsing if the response isn't perfect JSON
          const tags = content.match(/\[([^\]]+)\]/)?.[1]
            ?.split(',')
            ?.map((tag: string) => tag.trim().replace(/['"]/g, ''));
          return tags || ['quantitative', 'algorithmic'];
        }
      }
      
      return ['quantitative', 'algorithmic']; // Fallback tags
    } catch (error) {
      console.error('Error extracting tags with Ark:', error);
      // Return default tags based on type
      switch (type) {
        case 'stock_selection':
          return ['stock-selection', 'quantitative', 'screening'];
        case 'price_prediction':
          return ['price-prediction', 'forecasting', 'ML-based'];
        case 'portfolio_allocation':
          return ['portfolio-optimization', 'risk-management', 'diversified'];
        default:
          return ['quantitative', 'algorithmic'];
      }
    }
  }

  // Analyze strategy performance and provide insights
  static async analyzeStrategy(strategyData: any) {
    const systemPrompt = `You are a quantitative finance expert. Analyze the provided strategy data and provide insights about performance, risks, and recommendations. Focus on percentage-based metrics only, never mention absolute dollar amounts.`;

    const userPrompt = `Please analyze this strategy data and provide insights:
${JSON.stringify(strategyData, null, 2)}

Provide analysis in JSON format with these fields:
- overall_assessment: string
- strengths: string[]
- weaknesses: string[]
- risk_level: "low" | "moderate" | "high"`;

    try {
      const response = await fetch(PLATFORM_AI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'eve-invest',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.4,
        }),
      });

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (content) {
        return JSON.parse(content);
      }
      
      return {
        overall_assessment: "Strategy analysis unavailable",
        strengths: [],
        weaknesses: [],
        risk_level: "moderate"
      };
    } catch (error) {
      console.error('Error analyzing strategy with Ark:', error);
      return {
        overall_assessment: "Strategy analysis unavailable",
        strengths: [],
        weaknesses: [],
        risk_level: "moderate"
      };
    }
  }

  // Generate market insights
  static async generateMarketInsights(marketData: any) {
    const systemPrompt = `You are a financial market analyst. Provide concise market insights based on the provided data. Focus on trends, patterns, and actionable information for quantitative traders.`;

    try {
      const response = await fetch(PLATFORM_AI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'eve-invest',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Analyze this market data and provide insights: ${JSON.stringify(marketData)}` }
          ],
          temperature: 0.5,
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      return data.choices[0]?.message?.content || "Market insights unavailable";
    } catch (error) {
      console.error('Error generating market insights:', error);
      return "Market insights unavailable";
    }
  }
}

// Additional utility functions for data processing
export const formatNumber = (value: number, decimals: number = 2) => {
  return value.toFixed(decimals);
};

export const getDateRange = async (days: number) => {
  // Get the last trading day instead of using today
  let lastTradingDay: Date;
  try {
    // Use SPY to get the last trading day since it's a widely traded ETF
    const spyPreviousClose = await PolygonService.getPreviousClose('SPY');
    if (spyPreviousClose.results && spyPreviousClose.results.length > 0) {
      // The timestamp from the API is in milliseconds
      lastTradingDay = new Date(spyPreviousClose.results[0].t);
    } else {
      // Fallback to today if we can't get the last trading day
      lastTradingDay = new Date();
    }
  } catch (error) {
    console.warn('Could not get last trading day, using today as fallback:', error);
    lastTradingDay = new Date();
  }
  
  const end = lastTradingDay;
  const start = new Date(lastTradingDay.getTime() - days * 24 * 60 * 60 * 1000);
  
  return {
    from: start.toISOString().split('T')[0],
    to: end.toISOString().split('T')[0]
  };
};

// Calculate percentage change
export const calculatePercentageChange = (current: number, previous: number) => {
  return ((current - previous) / previous) * 100;
};

// Calculate strategy return metrics based on effective date
export const calculateStrategyMetrics = async (strategy: any) => {
  // Get the last trading day instead of using today
  let lastTradingDay: Date;
  try {
    // Use SPY to get the last trading day since it's a widely traded ETF
    const spyPreviousClose = await PolygonService.getPreviousClose('SPY');
    if (spyPreviousClose.results && spyPreviousClose.results.length > 0) {
      // The timestamp from the API is in milliseconds
      lastTradingDay = new Date(spyPreviousClose.results[0].t);
    } else {
      // Fallback to today if we can't get the last trading day
      lastTradingDay = new Date();
    }
  } catch (error) {
    console.warn('Could not get last trading day, using today as fallback:', error);
    lastTradingDay = new Date();
  }
  
  // Use effectiveDate if available, otherwise fall back to createdAt
  const effectiveDate = strategy.effectiveDate ? 
    new Date(strategy.effectiveDate) : 
    new Date(strategy.createdAt);
  const daysSinceInception = Math.floor((lastTradingDay.getTime() - effectiveDate.getTime()) / (1000 * 60 * 60 * 24));
  const weeksSinceInception = Math.floor(daysSinceInception / 7);
  const monthsSinceInception = Math.floor(daysSinceInception / 30);
  const yearsSinceInception = daysSinceInception / 365;

  // Use sharpe ratio as base for estimation since we removed annualizedReturn
  const sharpeRatio = strategy.performance.sharpeRatio || 0;
  const volatility = strategy.performance.volatility || 0;
  
  // Estimate returns based on sharpe ratio and volatility
  const estimatedAnnualReturn = sharpeRatio * volatility;
  
  // Calculate metrics - return raw numbers, not formatted strings
  const sinceInceptionReturn = yearsSinceInception > 0 
    ? (Math.pow(1 + estimatedAnnualReturn / 100, yearsSinceInception) - 1) * 100 
    : 0;
    
  const averageMonthlyReturn = monthsSinceInception >= 1 
    ? estimatedAnnualReturn / 12 
    : 0;
    
  const averageWeeklyReturn = weeksSinceInception >= 1 
    ? estimatedAnnualReturn / 52 
    : 0;

  return {
    sinceInceptionReturn: typeof sinceInceptionReturn === 'number' ? sinceInceptionReturn : 0,
    averageMonthlyReturn: typeof averageMonthlyReturn === 'number' ? averageMonthlyReturn : 0,
    averageWeeklyReturn: typeof averageWeeklyReturn === 'number' ? averageWeeklyReturn : 0,
    // Also return formatted versions for display
    sinceInceptionReturnFormatted: typeof sinceInceptionReturn === 'number' ? sinceInceptionReturn.toFixed(2) + '%' : "0.00%",
    averageMonthlyReturnFormatted: typeof averageMonthlyReturn === 'number' ? averageMonthlyReturn.toFixed(2) + '%' : "0.00%",
    averageWeeklyReturnFormatted: typeof averageWeeklyReturn === 'number' ? averageWeeklyReturn.toFixed(2) + '%' : "0.00%",
    daysSinceInception,
    weeksSinceInception,
    monthsSinceInception,
    yearsSinceInception
  };
};

// Stable pseudo-random number generator using strategy ID as seed
// REAL DATA ONLY - Generate combined performance data using real Polygon API
export async function generateRealCombinedPerformanceData(
  strategies: StrategyDetails[],
  benchmarks: string[] = ['S&P 500', 'NASDAQ', 'Dow Jones', 'Gold', 'Shanghai Composite', 'Hang Seng'],
  days: number = 90
): Promise<any[]> {
  if (strategies.length === 0) return [];
  
  try {
    const result: any[] = [];
    
    // Get the last trading day instead of using today
    let lastTradingDay: Date;
    try {
      // Use SPY to get the last trading day since it's a widely traded ETF
      const spyPreviousClose = await PolygonService.getPreviousClose('SPY');
      if (spyPreviousClose.results && spyPreviousClose.results.length > 0) {
        // The timestamp from the API is in milliseconds
        lastTradingDay = new Date(spyPreviousClose.results[0].t);
      } else {
        // Fallback to today if we can't get the last trading day
        lastTradingDay = new Date();
      }
    } catch (error) {
      console.warn('Could not get last trading day, using today as fallback:', error);
      lastTradingDay = new Date();
    }
    
    // Find the earliest effective date among strategies
    let earliestDate = lastTradingDay;
    
    for (const strategy of strategies.slice(0, 4)) {
      // Use strategy.createdAt if effectiveDate is not available
      const strategyDate = strategy.effectiveDate ? 
        new Date(strategy.effectiveDate) : 
        new Date(strategy.createdAt);
      
      if (strategyDate < earliestDate) {
        earliestDate = strategyDate;
      }
    }
    
    // FIXED: Always start from the earliest strategy date, but limit to reasonable range
    // Don't override with Math.max - respect the actual effective dates!
    const maxLookbackDays = 365; // Maximum 1 year lookback
    const maxLookbackDate = new Date(lastTradingDay.getTime() - maxLookbackDays * 24 * 60 * 60 * 1000);
    
    // Use the earliest strategy date, but don't go back more than 1 year for practical reasons
    const startDate = earliestDate < maxLookbackDate ? maxLookbackDate : earliestDate;
    
    const actualDays = Math.floor((lastTradingDay.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    
    // Initialize date array starting from actual strategy effective dates
    for (let i = 0; i <= actualDays; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      result.push({
        date: date.toISOString().split('T')[0],
        dateFormatted: date.toLocaleDateString('zh-CN')
      });
    }
    
    // Add real strategy data (limit to 4 for readability)
    for (const strategy of strategies.slice(0, 4)) {
      try {
        const ticker = strategy.stockSelections?.[0]?.ticker || 
                     strategy.allocations?.[0]?.ticker || 
                     strategy.predictions?.[0]?.ticker || 'SPY';
        
        // Get data from strategy's actual start date
        const strategyStartDate = strategy.effectiveDate ? 
          new Date(strategy.effectiveDate) : 
          new Date(strategy.createdAt);
        
        const strategyData = await getRealHistoricalData(ticker, actualDays);
        
        // Align data by date, but only show strategy data from its effective date
        strategyData.forEach((dayData, index) => {
          if (result[index]) {
            const currentDate = new Date(result[index].date);
            
            // Only include strategy data from its effective date onwards
            if (currentDate >= strategyStartDate) {
              result[index][strategy.name] = dayData.cumulativeReturn;
            } else {
              // Set to null for dates before strategy became effective
              result[index][strategy.name] = null;
            }
          }
        });
      } catch (error) {
        console.error('Error fetching strategy data:', strategy.name, error);
      }
    }
    
    // Add real benchmark data (benchmarks can start from beginning of date range)
    for (const benchmark of benchmarks) {
      try {
        const benchmarkData = await getRealBenchmarkData(benchmark, actualDays);
        
        // Align data by date
        benchmarkData.forEach((dayData, index) => {
          if (result[index]) {
            result[index][benchmark] = dayData.cumulativeReturn;
          }
        });
      } catch (error) {
        console.error('Error fetching benchmark data:', benchmark, error);
      }
    }
    
    return result;
  } catch (error) {
    console.error('Error generating real combined performance data:', error);
    return [];
  }
}

// Generate radar chart data for strategy performance
export function generateRadarData(
  totalReturn: number,
  sharpeRatio: number,
  maxDrawdown: number,
  winRate: number,
  volatility: number,
  profitFactor: number
) {
  return [
    { 
      subject: '总收益',
      value: Math.min(100, (Math.abs(totalReturn) / 25) * 100),
      fullMark: 100 
    },
    { 
      subject: '夏普比率', 
      value: Math.min(100, (Math.abs(sharpeRatio) / 2) * 100),
      fullMark: 100 
    },
    { 
      subject: '最大回撤', 
      value: Math.min(100, ((20 - Math.abs(maxDrawdown)) / 20) * 100),
      fullMark: 100 
    },
    { 
      subject: '胜率', 
      value: Math.min(100, winRate),
      fullMark: 100 
    },
    { 
      subject: '稳定性', 
      value: Math.min(100, ((30 - Math.abs(volatility)) / 30) * 100),
      fullMark: 100 
    },
    { 
      subject: '风险控制', 
      value: Math.min(100, (Math.abs(profitFactor) / 3) * 100),
      fullMark: 100 
    }
  ];
}

// Calculate real-time stock metrics using Polygon API
export async function calculateRealStockMetrics(ticker: string) {
  try {
    const { from, to } = await getDateRange(365); // 1 year of data
    const aggregates = await PolygonService.getAggregates(ticker, 'day', from, to);
    
    if (!aggregates.results || aggregates.results.length === 0) {
      console.warn('No data available for:', ticker);
      return null;
    }

    const prices = aggregates.results.map((bar: any) => bar.c); // closing prices
    
    // Calculate returns
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i-1]) / prices[i-1]);
    }
    
    // Calculate metrics
    const totalReturn = (prices[prices.length - 1] - prices[0]) / prices[0] * 100; // Total return over the period
    const volatility = calculateVolatility(returns);
    const maxDrawdown = calculateMaxDrawdown(prices);
    const sharpeRatio = totalReturn / volatility;
    const winRate = returns.filter(r => r > 0).length / returns.length * 100;
    const profitFactor = calculateProfitFactor(returns);
    
    return {
      totalReturn: totalReturn, // Replace annualizedReturn with totalReturn
      volatility: volatility * 100,
      maxDrawdown: maxDrawdown * 100,
      sharpeRatio: sharpeRatio,
      winRate: winRate,
      profitFactor: profitFactor
    };
  } catch (error) {
    console.error('Error calculating real stock metrics:', error);
    return null;
  }
}

// Helper functions for metric calculations
function calculateVolatility(returns: number[]): number {
  const mean = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
  return Math.sqrt(variance * 252); // Annualized volatility
}

function calculateMaxDrawdown(prices: number[]): number {
  let maxDrawdown = 0;
  let peak = prices[0];
  
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > peak) {
      peak = prices[i];
    }
    const drawdown = (peak - prices[i]) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }
  
  return maxDrawdown;
}

function calculateProfitFactor(returns: number[]): number {
  const profits = returns.filter(r => r > 0).reduce((sum, r) => sum + r, 0);
  const losses = Math.abs(returns.filter(r => r < 0).reduce((sum, r) => sum + r, 0));
  return losses === 0 ? profits : profits / losses;
}

// Get real historical data from Polygon API
export async function getRealHistoricalData(
  ticker: string,
  days: number = 90
): Promise<Array<{ date: string; dateFormatted: string; cumulativeReturn: number }>> {
  try {
    // FIXED: Get date range ending at LAST TRADING DAY, not random dates
    let lastTradingDay: Date;
    try {
      // Use SPY to get the last trading day since it's a widely traded ETF
      const spyPreviousClose = await PolygonService.getPreviousClose('SPY');
      if (spyPreviousClose.results && spyPreviousClose.results.length > 0) {
        // The timestamp from the API is in milliseconds
        lastTradingDay = new Date(spyPreviousClose.results[0].t);
      } else {
        // Fallback to today if we can't get the last trading day
        lastTradingDay = new Date();
      }
    } catch (error) {
      console.warn('Could not get last trading day, using today as fallback:', error);
      lastTradingDay = new Date();
    }
    
    const endDate = lastTradingDay;
    const startDate = new Date(lastTradingDay.getTime() - days * 24 * 60 * 60 * 1000);
    
    const from = startDate.toISOString().split('T')[0];
    const to = endDate.toISOString().split('T')[0];
    
    const aggregates = await PolygonService.getAggregates(ticker, 'day', from, to);
    
    if (!aggregates.results || aggregates.results.length === 0) {
      console.warn('No data available for:', ticker);
      return [];
    }

    const data: Array<{ date: string; dateFormatted: string; cumulativeReturn: number }> = [];
    const prices = aggregates.results.map((bar: any) => bar.c);
    const startPrice = prices[0];
    
    aggregates.results.forEach((bar: any, index: number) => {
      const date = new Date(bar.t);
      const cumulativeReturn = ((bar.c - startPrice) / startPrice) * 100;
      
      data.push({
        date: date.toISOString().split('T')[0],
        dateFormatted: date.toLocaleDateString('zh-CN'),
        cumulativeReturn: +cumulativeReturn.toFixed(2)
      });
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching real historical data:', error);
    return [];
  }
}

// Get real benchmark data (ETFs that track indices)
export async function getRealBenchmarkData(
  benchmarkName: string,
  days: number = 90
): Promise<Array<{ date: string; dateFormatted: string; cumulativeReturn: number }>> {
  // Map benchmark names to ETF tickers
  const benchmarkTickers: Record<string, string> = {
    'S&P 500': 'SPY',
    'NASDAQ': 'QQQ', 
    'Dow Jones': 'DIA',
    'Gold': 'GLD',
    'Shanghai Composite': 'ASHR', // China ETF
    'Hang Seng': 'EWH' // Hong Kong ETF
  };
  
  const ticker = benchmarkTickers[benchmarkName];
  if (!ticker) {
    console.warn('No ticker found for benchmark:', benchmarkName);
    return [];
  }
  
  return await getRealHistoricalData(ticker, days);
}

// Calculate real strategy performance based on holdings
export async function calculateRealStrategyPerformance(strategy: StrategyDetails): Promise<any> {
  try {
    let tickers: string[] = [];
    let weights: number[] = [];
    
    // Extract tickers and weights based on strategy type
    if (strategy.type === 'stock_selection' && strategy.stockSelections) {
      tickers = strategy.stockSelections.map(s => s.ticker);
      weights = new Array(tickers.length).fill(1 / tickers.length); // Equal weight
    } else if (strategy.type === 'portfolio_allocation' && strategy.allocations) {
      tickers = strategy.allocations.map(a => a.ticker);
      weights = strategy.allocations.map(a => a.weight / 100); // Convert percentage to decimal
    } else if (strategy.type === 'price_prediction' && strategy.predictions) {
      tickers = strategy.predictions.map(p => p.ticker);
      weights = new Array(tickers.length).fill(1 / tickers.length); // Equal weight
    } else {
      return null;
    }
    
    if (tickers.length === 0) return null;
    
    // Calculate portfolio metrics
    const portfolioMetrics = await calculatePortfolioMetrics(tickers, weights);
    
    return portfolioMetrics;
  } catch (error) {
    console.error('Error calculating real strategy performance:', error);
    return null;
  }
}

// Calculate portfolio metrics from multiple stocks
async function calculatePortfolioMetrics(tickers: string[], weights: number[]) {
  try {
    const allMetrics = [];
    
    // Get metrics for each stock
    for (const ticker of tickers) {
      const metrics = await calculateRealStockMetrics(ticker);
      if (metrics) {
        allMetrics.push(metrics);
      }
    }
    
    if (allMetrics.length === 0) return null;
    
    // Calculate weighted portfolio metrics
    const weightedReturn = allMetrics.reduce((sum, metrics, i) => 
      sum + (metrics.totalReturn * (weights[i] || 1/allMetrics.length)), 0);
    
    const weightedVolatility = Math.sqrt(allMetrics.reduce((sum, metrics, i) => 
      sum + Math.pow(metrics.volatility * (weights[i] || 1/allMetrics.length), 2), 0));
    
    const weightedMaxDrawdown = allMetrics.reduce((sum, metrics, i) => 
      sum + (metrics.maxDrawdown * (weights[i] || 1/allMetrics.length)), 0);
    
    const averageWinRate = allMetrics.reduce((sum, metrics) => sum + metrics.winRate, 0) / allMetrics.length;
    const averageProfitFactor = allMetrics.reduce((sum, metrics) => sum + metrics.profitFactor, 0) / allMetrics.length;
    
    return {
      totalReturn: weightedReturn,
      volatility: weightedVolatility,
      maxDrawdown: weightedMaxDrawdown,
      sharpeRatio: weightedReturn / weightedVolatility,
      winRate: averageWinRate,
      profitFactor: averageProfitFactor
    };
  } catch (error) {
    console.error('Error calculating portfolio metrics:', error);
    return null;
  }
} 