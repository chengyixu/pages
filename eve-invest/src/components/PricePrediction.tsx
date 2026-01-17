import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { RefreshCw } from 'lucide-react';
import { useStrategy } from '../App';
import { PolygonService } from '../utils';

const PricePrediction: React.FC = () => {
  const { strategies } = useStrategy();
  const [predictionAnalysis, setPredictionAnalysis] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const predictionStrategies = strategies.filter(s => s.type === 'price_prediction');

  // Generate REAL prediction vs reality comparison data
  const fetchPredictionAnalysis = async () => {
    if (predictionStrategies.length === 0) {
      setPredictionAnalysis([]);
      return;
    }

    setIsRefreshing(true);
    const analysisResults = [];

    for (const strategy of predictionStrategies) {
      if (!strategy.predictions || strategy.predictions.length === 0) continue;

      for (const prediction of strategy.predictions) {
        try {
          // Get real market data from prediction start date to target date
          const predictionDate = new Date(strategy.createdAt);
          const targetDate = new Date(prediction.date);
          const today = new Date();
          
                     // Calculate days from prediction date to today
           const daysToTarget = Math.floor((targetDate.getTime() - predictionDate.getTime()) / (1000 * 60 * 60 * 24));
          
          // Get real market prices
          const fromDate = predictionDate.toISOString().split('T')[0];
          const toDate = Math.min(today.getTime(), targetDate.getTime()) > today.getTime() ? 
            today.toISOString().split('T')[0] : 
            targetDate.toISOString().split('T')[0];
          
          const marketData = await PolygonService.getAggregates(prediction.ticker, 'day', fromDate, toDate);
          
          if (!marketData.results || marketData.results.length === 0) continue;

          // Get current price and initial price
          const initialPrice = marketData.results[0].c;
          const currentPrice = marketData.results[marketData.results.length - 1].c;
          const predictedPrice = prediction.price;
          
          // Calculate accuracy if target date has passed
          let accuracy = null;
          if (today >= targetDate) {
                         // Get actual price on target date
             const targetPrice = marketData.results.find((r: any) => {
               const resultDate = new Date(r.t);
               return Math.abs(resultDate.getTime() - targetDate.getTime()) < 24 * 60 * 60 * 1000;
             })?.c || currentPrice;
            
            accuracy = ((1 - Math.abs(predictedPrice - targetPrice) / targetPrice) * 100);
          }

          // Create chart data showing prediction line vs actual prices
          const chartData = [];
          
          marketData.results.forEach((bar: any, index: number) => {
            const date = new Date(bar.t);
            const daysSincePrediction = Math.floor((date.getTime() - predictionDate.getTime()) / (1000 * 60 * 60 * 24));
            
            chartData.push({
              date: date.toISOString().split('T')[0],
              dateFormatted: date.toLocaleDateString('zh-CN'),
              daysSincePrediction,
              actualPrice: bar.c,
              predictedPrice: prediction.price, // Straight line at predicted price
              // Linear interpolation from initial to predicted price over time
              predictionLine: daysToTarget > 0 ? 
                initialPrice + (predictedPrice - initialPrice) * (daysSincePrediction / daysToTarget) :
                predictedPrice
            });
          });

          // Add future prediction line if target date hasn't passed
          if (today < targetDate) {
            const remainingDays = Math.floor((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            for (let i = 1; i <= remainingDays; i++) {
              const futureDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
              const daysSincePrediction = Math.floor((futureDate.getTime() - predictionDate.getTime()) / (1000 * 60 * 60 * 24));
              
              chartData.push({
                date: futureDate.toISOString().split('T')[0],
                dateFormatted: futureDate.toLocaleDateString('zh-CN'),
                daysSincePrediction,
                actualPrice: null, // No actual data for future
                predictedPrice: prediction.price,
                predictionLine: daysToTarget > 0 ? 
                  initialPrice + (predictedPrice - initialPrice) * (daysSincePrediction / daysToTarget) :
                  predictedPrice
              });
            }
          }

          analysisResults.push({
            strategy: strategy.name,
            ticker: prediction.ticker,
            predictedPrice: prediction.price,
            targetDate: prediction.date,
            currentPrice,
            initialPrice,
            accuracy,
            isActive: today >= targetDate,
            chartData,
            predictionDate: strategy.createdAt
          });

        } catch (error) {
          console.error('Error analyzing prediction:', prediction, error);
        }
      }
    }

    setPredictionAnalysis(analysisResults);
    setIsRefreshing(false);
  };

  // Auto-fetch on strategy changes
  useEffect(() => {
    fetchPredictionAnalysis();
  }, [strategies, fetchPredictionAnalysis]);

  // Manual refresh function
  const handleRefresh = () => {
    fetchPredictionAnalysis();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 chinese-text">价格预测</h1>
            <p className="text-gray-600 mt-1 chinese-text">真实预测 vs 市场价格对比分析</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${
              isRefreshing ? 'animate-pulse' : ''
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="chinese-text">{isRefreshing ? '分析中...' : '刷新分析'}</span>
          </button>
        </div>
      </div>

      {/* Prediction Analysis Results */}
      {predictionAnalysis.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {predictionAnalysis.map((analysis, index) => (
            <div key={index} className="chart-clean p-6">
              {/* Analysis Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 english-text">{analysis.strategy}</h3>
                  <p className="text-sm text-gray-600">
                    <span className="english-text">{analysis.ticker}</span>
                    <span className="chinese-text"> 预测价格: </span>
                    <span className="english-text font-bold">${analysis.predictedPrice}</span>
                    <span className="chinese-text"> 目标日期: </span>
                    <span className="english-text">{analysis.targetDate}</span>
                  </p>
                </div>
                <div className="text-right">
                  {analysis.accuracy !== null ? (
                    <div>
                      <span className={`text-2xl font-bold ${analysis.accuracy >= 80 ? 'text-green-600' : analysis.accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {analysis.accuracy.toFixed(1)}%
                      </span>
                      <p className="text-sm text-gray-600 chinese-text">预测准确率</p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-lg text-blue-600 chinese-text">进行中</span>
                      <p className="text-sm text-gray-600 chinese-text">预测未到期</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Information */}
              <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm text-gray-600 chinese-text">预测时价格</span>
                  <p className="text-lg font-bold text-gray-900 english-text">${analysis.initialPrice.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 chinese-text">预测价格</span>
                  <p className="text-lg font-bold text-blue-600 english-text">${analysis.predictedPrice}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 chinese-text">当前价格</span>
                  <p className="text-lg font-bold text-gray-900 english-text">${analysis.currentPrice.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 chinese-text">价格差异</span>
                  <p className={`text-lg font-bold ${analysis.currentPrice > analysis.predictedPrice ? 'text-green-600' : 'text-red-600'} english-text`}>
                    {analysis.currentPrice > analysis.predictedPrice ? '+' : ''}
                    ${(analysis.currentPrice - analysis.predictedPrice).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Prediction vs Reality Chart */}
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analysis.chartData}>
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
                      label={{ value: '价格 ($)', angle: -90, position: 'insideLeft' }}
                      domain={['dataMin - 5', 'dataMax + 5']}
                    />
                    <Tooltip 
                      formatter={(value: any, name: string) => {
                        if (value === null) return ['无数据', name];
                        return [`$${value.toFixed(2)}`, name];
                      }}
                      labelFormatter={(value) => `日期: ${value}`}
                    />
                    <Legend />
                    
                    {/* Actual Market Price Line */}
                    <Line 
                      type="monotone" 
                      dataKey="actualPrice"
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                      name="实际市场价格"
                      connectNulls={false}
                    />
                    
                    {/* Predicted Price Line (Straight Line) */}
                    <Line 
                      type="monotone" 
                      dataKey="predictedPrice"
                      stroke="#ef4444" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="预测价格 (目标)"
                    />
                    
                    {/* Prediction Trend Line */}
                    <Line 
                      type="monotone" 
                      dataKey="predictionLine"
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      strokeDasharray="3 3"
                      dot={false}
                      name="预测趋势线"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Analysis Summary */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium chinese-text">分析说明: </span>
                  <span className="chinese-text">绿色实线为真实市场价格，红色虚线为预测目标价格，蓝色虚线为预测趋势。</span>
                  {analysis.accuracy !== null && (
                    <span className="chinese-text"> 准确率基于目标日期实际价格与预测价格的差异计算。</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="chart-clean p-6 text-center">
          <p className="text-gray-500 chinese-text">
            {predictionStrategies.length === 0 
              ? '暂无价格预测策略，请在策略管理中添加价格预测策略。'
              : '正在加载预测分析数据...'
            }
          </p>
        </div>
      )}

      {/* Overall Accuracy Summary */}
      {predictionAnalysis.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Accuracy Distribution */}
          <div className="chart-clean p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 chinese-text">预测准确率分布</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={predictionAnalysis.filter(a => a.accuracy !== null).map((a, i) => ({
                  name: `${a.ticker}`,
                  accuracy: a.accuracy
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    axisLine={{ stroke: '#d1d5db' }}
                    label={{ value: '准确率 (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`${value.toFixed(1)}%`, '准确率']}
                  />
                  <Bar 
                    dataKey="accuracy" 
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Radar */}
          <div className="chart-clean p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 chinese-text">预测性能雷达图</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={[
                  { 
                    subject: '预测数量', 
                    value: Math.min(100, (predictionAnalysis.length / 10) * 100)
                  },
                  { 
                    subject: '平均准确率', 
                    value: predictionAnalysis.filter(a => a.accuracy !== null).length > 0 ?
                      predictionAnalysis.filter(a => a.accuracy !== null).reduce((sum, a) => sum + a.accuracy!, 0) / predictionAnalysis.filter(a => a.accuracy !== null).length :
                      0
                  },
                  { 
                    subject: '完成率', 
                    value: (predictionAnalysis.filter(a => a.accuracy !== null).length / predictionAnalysis.length) * 100
                  },
                  { 
                    subject: '多样性', 
                    value: Math.min(100, (new Set(predictionAnalysis.map(a => a.ticker)).size / 5) * 100)
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
                    name="预测性能"
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
      )}
    </div>
  );
};

export default PricePrediction; 