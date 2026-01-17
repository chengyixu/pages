import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw, Target, Award, TrendingDown } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { useStrategy } from '../App';
import { calculateStrategyMetrics } from '../utils';

const Dashboard: React.FC = () => {
  const { strategies } = useStrategy();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [calculatedMetrics, setCalculatedMetrics] = useState<any>(null);

     // Calculate ALL metrics from real strategy data
   const calculateRealDashboardMetrics = async () => {
     if (strategies.length === 0) return null;

     const activeStrategies = strategies.filter(s => s.isActive);
     if (activeStrategies.length === 0) return null;

     // Calculate REAL cumulative returns since inception for each strategy
     const strategiesWithCumulativeReturns = await Promise.all(activeStrategies.map(async strategy => {
       const metrics = await calculateStrategyMetrics(strategy);
       const effectiveDate = strategy.effectiveDate ? new Date(strategy.effectiveDate) : new Date(strategy.createdAt);
       const today = new Date();
       const daysSinceInception = Math.floor((today.getTime() - effectiveDate.getTime()) / (1000 * 60 * 60 * 24));
       
       // Calculate REAL cumulative return since inception (not annualized!)
       const cumulativeReturnSinceInception = metrics.sinceInceptionReturn || 0; // Use the numeric value directly
        
       // Calculate weekly and monthly returns based on actual performance
       const weeklyReturn = daysSinceInception > 7 ? (cumulativeReturnSinceInception / (daysSinceInception / 7)) : 0;
       const monthlyReturn = daysSinceInception > 30 ? (cumulativeReturnSinceInception / (daysSinceInception / 30)) : 0;
       
       return {
         ...strategy,
         cumulativeReturnSinceInception,
         weeklyReturn,
         monthlyReturn,
         volatility: strategy.performance.volatility,
         tags: (strategy as any).tags || []
       };
     }));

     // Sort by different metrics
     const sortedByInceptionReturn = [...strategiesWithCumulativeReturns].sort((a, b) => b.cumulativeReturnSinceInception - a.cumulativeReturnSinceInception);
     const sortedByWeeklyReturn = [...strategiesWithCumulativeReturns].sort((a, b) => b.weeklyReturn - a.weeklyReturn);
     const sortedByMonthlyReturn = [...strategiesWithCumulativeReturns].sort((a, b) => b.monthlyReturn - a.monthlyReturn);
     const sortedByVolatility = [...strategiesWithCumulativeReturns].sort((a, b) => a.volatility - b.volatility); // Lower is better

     // Get best performers
     const highestInceptionReturn = sortedByInceptionReturn[0]?.cumulativeReturnSinceInception || 0;
     const highestInceptionStrategy = sortedByInceptionReturn[0] || null;
     
     const highestWeeklyReturn = sortedByWeeklyReturn[0]?.weeklyReturn || 0;
     const highestWeeklyStrategy = sortedByWeeklyReturn[0] || null;
     
     const highestMonthlyReturn = sortedByMonthlyReturn[0]?.monthlyReturn || 0;
     const highestMonthlyStrategy = sortedByMonthlyReturn[0] || null;
     
     const lowestVolatility = sortedByVolatility[0]?.volatility || Infinity;
     const lowestVolatilityStrategy = sortedByVolatility[0] || null;

         // Calculate COMMON tags among top 5 performers for returns and stability
     const getCommonTags = (topStrategies: any[]) => {
       if (topStrategies.length === 0) return [];
       
       const tagCounts: { [key: string]: number } = {};
       topStrategies.forEach(strategy => {
         strategy.tags.forEach((tag: string) => {
           tagCounts[tag] = (tagCounts[tag] || 0) + 1;
         });
       });
       
       // Return tags that appear in multiple strategies, sorted by frequency
       return Object.entries(tagCounts)
         .filter(([tag, count]) => count > 1) // Only tags that appear in multiple strategies
         .sort((a, b) => b[1] - a[1]) // Sort by frequency
         .map(([tag]) => tag);
     };

     const top5Returns = sortedByInceptionReturn.slice(0, 5);
     const top5Stability = sortedByVolatility.slice(0, 5);
     
     const bestReturnTags = getCommonTags(top5Returns);
     const bestStabilityTags = getCommonTags(top5Stability);

     return {
       totalStrategies: activeStrategies.length,
       highestInceptionReturn: {
         value: highestInceptionReturn,
         strategy: highestInceptionStrategy,
         tags: bestReturnTags, // Common tags from top 5
         topStrategies: top5Returns
       },
       highestWeeklyReturn: {
         value: highestWeeklyReturn,
         strategy: highestWeeklyStrategy,
         tags: (highestWeeklyStrategy as any)?.tags || []
       },
       highestMonthlyReturn: {
         value: highestMonthlyReturn,
         strategy: highestMonthlyStrategy,
         tags: (highestMonthlyStrategy as any)?.tags || []
       },
       lowestVolatility: {
         value: lowestVolatility,
         strategy: lowestVolatilityStrategy,
         tags: bestStabilityTags, // Common tags from top 5 stable
         topStrategies: top5Stability
       }
     };
  };

  // Calculate metrics when strategies change
  useEffect(() => {
    const fetchMetrics = async () => {
      const metrics = await calculateRealDashboardMetrics();
      setCalculatedMetrics(metrics);
    };
    fetchMetrics();
  }, [strategies]);

  // Manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const metrics = await calculateRealDashboardMetrics();
      setCalculatedMetrics(metrics);
    } catch (error) {
      console.error('Error refreshing metrics:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!calculatedMetrics) {
    return (
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 chinese-text">策略看板</h1>
          <p className="text-gray-600 mt-1 chinese-text">暂无活跃策略数据</p>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      title: '策略生效至今最高收益',
      value: `${calculatedMetrics.highestInceptionReturn.value.toFixed(2)}%`,
      strategy: calculatedMetrics.highestInceptionReturn.strategy?.name || 'N/A',
      tags: calculatedMetrics.highestInceptionReturn.tags,
      icon: TrendingUp,
      isPositive: calculatedMetrics.highestInceptionReturn.value > 0,
      color: 'text-green-600'
    },
    {
      title: '最高周收益',
      value: `${calculatedMetrics.highestWeeklyReturn.value.toFixed(2)}%`,
      strategy: calculatedMetrics.highestWeeklyReturn.strategy?.name || 'N/A',
      tags: calculatedMetrics.highestWeeklyReturn.tags,
      icon: Award,
      isPositive: calculatedMetrics.highestWeeklyReturn.value > 0,
      color: 'text-blue-600'
    },
    {
      title: '最高月收益',
      value: `${calculatedMetrics.highestMonthlyReturn.value.toFixed(2)}%`,
      strategy: calculatedMetrics.highestMonthlyReturn.strategy?.name || 'N/A',
      tags: calculatedMetrics.highestMonthlyReturn.tags,
      icon: Target,
      isPositive: calculatedMetrics.highestMonthlyReturn.value > 0,
      color: 'text-purple-600'
    },
    {
      title: '最低波动',
      value: `${calculatedMetrics.lowestVolatility.value.toFixed(2)}%`,
      strategy: calculatedMetrics.lowestVolatility.strategy?.name || 'N/A',
      tags: calculatedMetrics.lowestVolatility.tags,
      icon: TrendingDown,
      isPositive: true, // Lower volatility is always good
      color: 'text-emerald-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 chinese-text">策略看板</h1>
            <p className="text-gray-600 mt-1 chinese-text">实时计算的策略性能指标</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${
              isRefreshing ? 'animate-pulse' : ''
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="chinese-text">{isRefreshing ? '计算中...' : '刷新指标'}</span>
          </button>
        </div>
      </div>

      {/* Calculated Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="chart-clean p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-8 w-8 ${metric.color}`} />
                <span className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 chinese-text mb-2">
                {metric.title}
              </h3>
              
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600 chinese-text">策略: </span>
                  <span className="text-sm font-medium text-gray-900 english-text">
                    {metric.strategy}
                  </span>
                </div>
                
                {metric.tags.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-600 chinese-text">标签: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {metric.tags.slice(0, 3).map((tag: any, tagIndex: number) => (
                        <span 
                          key={tagIndex} 
                          className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded english-text"
                        >
                          {tag}
                        </span>
                      ))}
                      {metric.tags.length > 3 && (
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                          +{metric.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Strategies Overview */}
        <div className="chart-clean p-6">
          <h3 className="text-lg font-semibold text-gray-900 chinese-text mb-4">策略概览</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 chinese-text">总策略数:</span>
              <span className="font-bold text-gray-900">{calculatedMetrics.totalStrategies}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 chinese-text">选股策略:</span>
              <span className="font-bold text-gray-900">
                {strategies.filter(s => s.isActive && s.type === 'stock_selection').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 chinese-text">价格预测:</span>
              <span className="font-bold text-gray-900">
                {strategies.filter(s => s.isActive && s.type === 'price_prediction').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 chinese-text">组合配置:</span>
              <span className="font-bold text-gray-900">
                {strategies.filter(s => s.isActive && s.type === 'portfolio_allocation').length}
              </span>
            </div>
          </div>
        </div>

        {/* Performance Radar */}
        <div className="chart-clean p-6">
          <h3 className="text-lg font-semibold text-gray-900 chinese-text mb-4">性能雷达图</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={[
                { 
                  subject: '最高收益', 
                  value: Math.min(100, Math.max(0, calculatedMetrics.highestInceptionReturn.value * 2))
                },
                { 
                  subject: '周收益', 
                  value: Math.min(100, Math.max(0, calculatedMetrics.highestWeeklyReturn.value * 10))
                },
                { 
                  subject: '月收益', 
                  value: Math.min(100, Math.max(0, calculatedMetrics.highestMonthlyReturn.value * 5))
                },
                { 
                  subject: '稳定性', 
                  value: Math.min(100, Math.max(0, (20 - calculatedMetrics.lowestVolatility.value) * 5))
                },
                { 
                  subject: '策略数量', 
                  value: Math.min(100, calculatedMetrics.totalStrategies * 20)
                }
              ]}>
                <PolarGrid gridType="polygon" stroke="#e5e7eb" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fontSize: 8, fill: '#9ca3af' }}
                />
                <Radar
                  name="策略性能"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Performing Tags Analysis */}
      <div className="chart-clean p-6">
        <h3 className="text-lg font-semibold text-gray-900 chinese-text mb-4">最佳性能标签分析</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {/* 最高收益的标签 - TOP 5 COMMON TAGS */}
           <div>
             <h4 className="text-md font-medium text-gray-900 chinese-text mb-3">
               最高收益策略共同标签 (TOP 5策略共有)
             </h4>
             <div className="flex flex-wrap gap-2 mb-3">
               {calculatedMetrics.highestInceptionReturn.tags.length > 0 ? 
                 calculatedMetrics.highestInceptionReturn.tags.map((tag: any, index: number) => (
                   <span 
                     key={index} 
                     className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full english-text"
                   >
                     {tag}
                   </span>
                 )) : 
                 <span className="text-sm text-gray-500 chinese-text">暂无共同标签</span>
               }
             </div>
             <div className="text-xs text-gray-600 chinese-text">
               <p>TOP 5收益策略:</p>
               {calculatedMetrics.highestInceptionReturn.topStrategies?.slice(0, 3).map((strategy: any, index: number) => (
                 <p key={index}>
                   {index + 1}. {strategy.name} ({strategy.cumulativeReturnSinceInception.toFixed(2)}%)
                 </p>
               ))}
             </div>
           </div>

           {/* 最低波动的标签 - TOP 5 COMMON TAGS */}
           <div>
             <h4 className="text-md font-medium text-gray-900 chinese-text mb-3">
               最稳定策略共同标签 (TOP 5策略共有)
             </h4>
             <div className="flex flex-wrap gap-2 mb-3">
               {calculatedMetrics.lowestVolatility.tags.length > 0 ? 
                 calculatedMetrics.lowestVolatility.tags.map((tag: any, index: number) => (
                   <span 
                     key={index} 
                     className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full english-text"
                   >
                     {tag}
                   </span>
                 )) : 
                 <span className="text-sm text-gray-500 chinese-text">暂无共同标签</span>
               }
             </div>
             <div className="text-xs text-gray-600 chinese-text">
               <p>TOP 5稳定策略:</p>
               {calculatedMetrics.lowestVolatility.topStrategies?.slice(0, 3).map((strategy: any, index: number) => (
                 <p key={index}>
                   {index + 1}. {strategy.name} ({strategy.volatility.toFixed(2)}% 波动)
                 </p>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 