import React, { useState, useEffect } from 'react';
import { 
  PieChart as RechartsPieChart,
  Pie,
  Cell, 
  ResponsiveContainer, 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { RefreshCw } from 'lucide-react';
import { calculateStrategyMetrics, generateRealCombinedPerformanceData } from '../utils';
import { useStrategy } from '../App';

const StockSelection: React.FC = () => {
  const { strategies } = useStrategy();
  const [stockSelectionPerformanceData, setStockSelectionPerformanceData] = useState<any[]>([]);
  const [highlightedStrategy, setHighlightedStrategy] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [strategyMetrics, setStrategyMetrics] = useState<{[key: string]: any}>({});

  const stockSelectionStrategies = strategies.filter(s => s.type === 'stock_selection');

  // Fetch real stock selection performance data using Polygon API with proper date handling - ONLY stock selection strategies
  const fetchRealPerformanceData = async () => {
    const activeStockSelectionStrategies = strategies.filter(s => s.isActive && s.type === 'stock_selection');
    if (activeStockSelectionStrategies.length === 0) {
      setStockSelectionPerformanceData([]);
      return;
    }

    try {
      setIsRefreshing(true);
      // Use the new real combined performance data function that handles effective dates properly
      const data = await generateRealCombinedPerformanceData(activeStockSelectionStrategies);
      setStockSelectionPerformanceData(data);
    } catch (error) {
      console.error('Error fetching real performance data:', error);
      setStockSelectionPerformanceData([]);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-fetch on strategy changes
  useEffect(() => {
    fetchRealPerformanceData();
  }, [strategies, fetchRealPerformanceData]);

  // Calculate metrics for each strategy
  useEffect(() => {
    const calculateMetrics = async () => {
      const metrics: {[key: string]: any} = {};
      for (const strategy of stockSelectionStrategies) {
        try {
          metrics[strategy.id] = await calculateStrategyMetrics(strategy);
        } catch (error) {
          console.error('Error calculating metrics for strategy:', strategy.name, error);
        }
      }
      setStrategyMetrics(metrics);
    };
    
    calculateMetrics();
  }, [stockSelectionStrategies]);

  // Manual refresh function
  const handleRefresh = () => {
    fetchRealPerformanceData();
  };

  // Generate sector data based on actual strategy allocations
  const generateSectorData = () => {
    if (stockSelectionStrategies.length === 0) return [];
    
    const sectorMap: Record<string, number> = {};
    
    stockSelectionStrategies.forEach(strategy => {
      if (strategy.stockSelections) {
        strategy.stockSelections.forEach(selection => {
          // Map tickers to sectors (simplified mapping)
          const sectorMapping: Record<string, string> = {
            'AAPL': '科技', 'MSFT': '科技', 'GOOGL': '科技', 'NVDA': '科技', 'META': '科技', 'AMZN': '科技', 'NET': '科技',
            'JPM': '金融', 'BAC': '金融', 'WFC': '金融', 'GS': '金融',
            'JNJ': '医疗', 'PFE': '医疗', 'UNH': '医疗', 'ABBV': '医疗',
            'PG': '消费', 'KO': '消费', 'WMT': '消费', 'DIS': '消费',
            'XOM': '能源', 'CVX': '能源', 'COP': '能源'
          };
          
          const sector = sectorMapping[selection.ticker] || '其他';
          sectorMap[sector] = (sectorMap[sector] || 0) + 1; // Count occurrences
        });
      }
    });
    
    const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#6b7280'];
    return Object.entries(sectorMap).map(([name, value], index) => ({
      name,
      value: Math.round(value),
      color: colors[index % colors.length]
    }));
  };

  // Generate risk-return data based on actual strategies
  const generateRiskReturnData = () => {
    return stockSelectionStrategies.map(strategy => ({
      risk: strategy.performance.volatility,
      return: strategy.performance.sharpeRatio,
      name: strategy.name
    }));
  };

  const sectorData = generateSectorData();
  const riskReturnData = generateRiskReturnData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 chinese-text">选股策略</h1>
            <p className="text-gray-600 mt-1 chinese-text">智能股票选择和评估系统 - 实时Polygon数据</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${
              isRefreshing ? 'animate-pulse' : ''
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="chinese-text">{isRefreshing ? '刷新中...' : '刷新数据'}</span>
          </button>
        </div>
      </div>

      {/* Stock Selection Performance Line Chart */}
      {stockSelectionPerformanceData.length > 0 && (
        <div className="chart-clean p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 chinese-text">策略表现对比 - 累计收益率</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockSelectionPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="dateFormatted"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                  label={{ value: '累计收益率 (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    `${value.toFixed(2)}%`, 
                    name
                  ]}
                  labelFormatter={(value) => `日期: ${value}`}
                />
                <Legend 
                  onClick={(e) => {
                    const strategyName = e.dataKey as string;
                    setHighlightedStrategy(highlightedStrategy === strategyName ? null : strategyName);
                  }}
                  wrapperStyle={{ cursor: 'pointer' }}
                />
                {/* Real Strategy Lines */}
                {strategies.filter(s => s.isActive && s.type === 'stock_selection').slice(0, 4).map((strategy, index) => {
                  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];
                  return (
                    <Line 
                      key={strategy.id}
                      type="monotone" 
                      dataKey={strategy.name}
                      stroke={colors[index]}
                      strokeWidth={highlightedStrategy === strategy.name ? 4 : 2}
                      strokeOpacity={highlightedStrategy && highlightedStrategy !== strategy.name ? 0.3 : 1}
                      dot={false}
                      name={strategy.name}
                    />
                  );
                })}
                {/* Benchmark Lines */}
                {['S&P 500', 'NASDAQ', 'Dow Jones', 'Gold', 'Shanghai Composite', 'Hang Seng'].map((benchmark, index) => {
                  const colors = ['#6b7280', '#9ca3af', '#d1d5db', '#fbbf24', '#ef4444', '#06b6d4'];
                  return (
                    <Line 
                      key={benchmark}
                      type="monotone" 
                      dataKey={benchmark}
                      stroke={colors[index]}
                      strokeWidth={highlightedStrategy === benchmark ? 4 : 1}
                      strokeOpacity={highlightedStrategy && highlightedStrategy !== benchmark ? 0.3 : 0.7}
                      strokeDasharray="3 3"
                      dot={false}
                      name={benchmark}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xs text-gray-500 chinese-text">
            点击图例可突出显示对应策略或基准指数
          </div>
        </div>
      )}

      {/* Strategy Details with Individual Radar Charts and Line Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stockSelectionStrategies.map((strategy, index) => {
          const metrics = strategyMetrics[strategy.id];
          
          return (
            <div key={strategy.id} className="chart-clean p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 english-text">{strategy.name}</h4>
                  <span className="text-sm text-gray-600 chinese-text">{strategy.type}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900 english-text">
                    {strategy.performance.sharpeRatio.toFixed(2)}
                  </span>
                  <p className="text-sm text-gray-600 chinese-text">夏普比率</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 chinese-text">{strategy.description}</p>
              
              {/* Individual Radar Chart */}
              <div className="h-60 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={strategy.radarData}>
                    <PolarGrid gridType="polygon" stroke="#e5e7eb" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 10, fill: '#6b7280', fontFamily: 'MiSans-Light, Consolas, monospace' }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fontSize: 8, fill: '#9ca3af' }}
                    />
                    <Radar
                      name="Performance"
                      dataKey="value"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 chinese-text">至今收益: </span>
                  <span className="font-medium text-gray-900 english-text">
                    {metrics ? metrics.sinceInceptionReturnFormatted : '计算中...'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 chinese-text">月度收益: </span>
                  <span className="font-medium text-gray-900 english-text">
                    {metrics ? metrics.averageMonthlyReturnFormatted : '计算中...'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 chinese-text">周度收益: </span>
                  <span className="font-medium text-gray-900 english-text">
                    {metrics ? metrics.averageWeeklyReturnFormatted : '计算中...'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 chinese-text">波动率: </span>
                  <span className="font-medium text-gray-900 english-text">{strategy.performance.volatility.toFixed(2)}%</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {strategy.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="badge-clean english-text">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stock Selection Details */}
              {strategy.stockSelections && strategy.stockSelections.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h5 className="text-sm font-medium text-gray-900 chinese-text mb-2">选择股票</h5>
                  <div className="space-y-1">
                    {strategy.stockSelections.map((selection, selectionIndex) => (
                      <div key={selectionIndex} className="flex justify-between text-sm">
                        <span className="english-text">{selection.ticker}</span>
                        <span className="english-text">100%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sector Allocation */}
      {sectorData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="chart-clean p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 chinese-text">行业分布</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk-Return Scatter */}
          {riskReturnData.length > 0 && (
            <div className="chart-clean p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 chinese-text">风险收益分布</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      type="number" 
                      dataKey="risk" 
                      name="volatility"
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      label={{ value: '波动率 (%)', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="return" 
                      name="return"
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      label={{ value: '收益率 (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter 
                      name="策略分布" 
                      data={riskReturnData} 
                      fill="#3b82f6" 
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Show message when no stock selection strategies exist */}
      {stockSelectionStrategies.length === 0 && (
        <div className="chart-clean p-6 text-center">
          <p className="text-gray-500 chinese-text">暂无选股策略，请在策略列表中添加选股策略。</p>
        </div>
      )}
    </div>
  );
};

export default StockSelection; 