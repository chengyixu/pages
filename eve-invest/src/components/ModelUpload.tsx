import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  PieChart, 
  Plus, 
  X, 
  Upload, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Loader,
  BarChart3
} from 'lucide-react';
import { QwenService, calculateRealStrategyPerformance, generateRadarData, calculateStrategyMetrics } from '../utils';
import { useStrategy } from '../App';
import type { 
  StockSelectionInput, 
  PricePredictionInput, 
  PortfolioAllocationInput,
  StrategyType,
  StrategyDetails
} from '../types';

type InputForm = 'stock_selection' | 'price_prediction' | 'portfolio_allocation' | null;
type ModelUploadTab = 'create' | 'manage';

interface SubmittedStrategy {
  id: string;
  title: string;
  type: StrategyType;
  data: any;
  tags: string[];
  status: 'processing' | 'completed' | 'error';
  submittedAt: Date;
}

const ModelUpload: React.FC = () => {
  const { strategies, addStrategy, updateStrategy, deleteStrategy } = useStrategy();
  const [activeTab, setActiveTab] = useState<ModelUploadTab>('create');
  const [activeForm, setActiveForm] = useState<InputForm>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedStrategies, setSubmittedStrategies] = useState<SubmittedStrategy[]>([]);
  const [editingStrategy, setEditingStrategy] = useState<StrategyDetails | null>(null);
  const [strategyMetrics, setStrategyMetrics] = useState<{[key: string]: any}>({});

  // 选股策略表单状态
  const [stockSelectionForm, setStockSelectionForm] = useState<StockSelectionInput>({
    title: '',
    tickers: [],
    effectiveDate: new Date().toISOString().split('T')[0]
  });

  // 价格预测表单状态
  const [pricePredictionForm, setPricePredictionForm] = useState<PricePredictionInput>({
    title: '',
    predictions: [],
    effectiveDate: new Date().toISOString().split('T')[0]
  });

  // 投资组合配置表单状态
  const [portfolioAllocationForm, setPortfolioAllocationForm] = useState<PortfolioAllocationInput>({
    title: '',
    allocations: [],
    effectiveDate: new Date().toISOString().split('T')[0]
  });

  // Calculate metrics for each strategy
  useEffect(() => {
    const calculateMetrics = async () => {
      const metrics: {[key: string]: any} = {};
      for (const strategy of strategies) {
        try {
          metrics[strategy.id] = await calculateStrategyMetrics(strategy);
        } catch (error) {
          console.error('Error calculating metrics for strategy:', strategy.name, error);
        }
      }
      setStrategyMetrics(metrics);
    };
    
    calculateMetrics();
  }, [strategies]);

  // 添加股票到选股策略
  const addStockSelection = () => {
    const tickerInput = document.getElementById('ticker-input') as HTMLInputElement;
    const ticker = tickerInput?.value.trim().toUpperCase();
    
    if (ticker && !stockSelectionForm.tickers.includes(ticker)) {
      setStockSelectionForm(prev => ({
        ...prev,
        tickers: [...prev.tickers, ticker]
      }));
      tickerInput.value = '';
    }
  };

  // 添加价格预测
  const addPricePrediction = () => {
    const tickerInput = document.getElementById('prediction-ticker-input') as HTMLInputElement;
    const priceInput = document.getElementById('prediction-price-input') as HTMLInputElement;
    const dateInput = document.getElementById('prediction-date-input') as HTMLInputElement;
    
    const ticker = tickerInput?.value.trim().toUpperCase();
    const price = parseFloat(priceInput?.value || '0');
    const date = dateInput?.value;
    
    if (ticker && price > 0 && date) {
      setPricePredictionForm(prev => ({
        ...prev,
        predictions: [...prev.predictions, { ticker, price, date }]
      }));
      tickerInput.value = '';
      priceInput.value = '';
      dateInput.value = '';
    }
  };

  // 添加投资组合配置
  const addPortfolioAllocation = () => {
    const tickerInput = document.getElementById('allocation-ticker-input') as HTMLInputElement;
    const weightInput = document.getElementById('allocation-weight-input') as HTMLInputElement;
    
    const ticker = tickerInput?.value.trim().toUpperCase();
    const weight = parseFloat(weightInput?.value || '0');
    
    if (ticker && weight > 0) {
      setPortfolioAllocationForm(prev => ({
        ...prev,
        allocations: [...prev.allocations, { ticker, weight }]
      }));
      tickerInput.value = '';
      weightInput.value = '';
    }
  };

  // 提交策略
  const handleSubmitStrategy = async (type: StrategyType) => {
    setIsSubmitting(true);
    
    try {
      let formData: any;
      let strategyData: any;
      
      switch (type) {
        case 'stock_selection':
          formData = stockSelectionForm;
          strategyData = {
            stockSelections: formData.tickers.map(ticker => ({ ticker }))
          };
          break;
        case 'price_prediction':
          formData = pricePredictionForm;
          strategyData = {
            predictions: formData.predictions
          };
          break;
        case 'portfolio_allocation':
          formData = portfolioAllocationForm;
          strategyData = {
            allocations: formData.allocations
          };
          break;
      }
      
      // 使用AI分析策略
      const analysisResult = await QwenService.analyzeStrategy({
        type,
        title: formData.title,
        data: strategyData
      });
      
      // 创建新策略
      const newStrategy: StrategyDetails = {
        id: `strategy_${Date.now()}`,
        name: formData.title,
        type,
        description: analysisResult.description || `AI驱动的${type === 'stock_selection' ? '选股' : type === 'price_prediction' ? '价格预测' : '投资组合'}策略`,
        createdAt: new Date(formData.effectiveDate),
        updatedAt: new Date(),
        effectiveDate: new Date(formData.effectiveDate),
        isActive: true,
        tags: analysisResult.tags || [],
        performance: {
          totalReturn: analysisResult.metrics?.totalReturn || 0,
          sharpeRatio: analysisResult.metrics?.sharpeRatio || 0,
          maxDrawdown: analysisResult.metrics?.maxDrawdown || 0,
          volatility: analysisResult.metrics?.volatility || 0,
          winRate: analysisResult.metrics?.winRate || 0,
          profitFactor: analysisResult.metrics?.profitFactor || 0
        },
        radarData: generateRadarData(
          analysisResult.metrics?.totalReturn || 0,
          analysisResult.metrics?.sharpeRatio || 0,
          analysisResult.metrics?.maxDrawdown || 0,
          analysisResult.metrics?.winRate || 0,
          analysisResult.metrics?.volatility || 0,
          analysisResult.metrics?.profitFactor || 0
        ),
        ...strategyData
      };
      
      addStrategy(newStrategy);
      
      // 重置表单
      resetForm(type);
      setActiveForm(null);
      
      // 添加到提交历史
      setSubmittedStrategies(prev => [...prev, {
        id: newStrategy.id,
        title: newStrategy.name,
        type: newStrategy.type,
        data: strategyData,
        tags: newStrategy.tags,
        status: 'completed',
        submittedAt: new Date()
      }]);
      
    } catch (error) {
      console.error('Error submitting strategy:', error);
      
      // 添加到提交历史（错误状态）
      setSubmittedStrategies(prev => [...prev, {
        id: `error_${Date.now()}`,
        title: type === 'stock_selection' ? stockSelectionForm.title : 
               type === 'price_prediction' ? pricePredictionForm.title : 
               portfolioAllocationForm.title,
        type,
        data: {},
        tags: [],
        status: 'error',
        submittedAt: new Date()
      }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 重置表单
  const resetForm = (type: StrategyType) => {
    switch (type) {
      case 'stock_selection':
        setStockSelectionForm({
          title: '',
          tickers: [],
          effectiveDate: new Date().toISOString().split('T')[0]
        });
        break;
      case 'price_prediction':
        setPricePredictionForm({
          title: '',
          predictions: [],
          effectiveDate: new Date().toISOString().split('T')[0]
        });
        break;
      case 'portfolio_allocation':
        setPortfolioAllocationForm({
          title: '',
          allocations: [],
          effectiveDate: new Date().toISOString().split('T')[0]
        });
        break;
    }
  };

  // 编辑策略
  const handleEditStrategy = (strategy: StrategyDetails) => {
    setEditingStrategy(strategy);
    
    switch (strategy.type) {
      case 'stock_selection':
        setStockSelectionForm({
          title: strategy.name,
          tickers: strategy.stockSelections?.map(s => s.ticker) || [],
          effectiveDate: strategy.effectiveDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]
        });
        setActiveForm('stock_selection');
        break;
      case 'price_prediction':
        setPricePredictionForm({
          title: strategy.name,
          predictions: strategy.predictions || [],
          effectiveDate: strategy.effectiveDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]
        });
        setActiveForm('price_prediction');
        break;
      case 'portfolio_allocation':
        setPortfolioAllocationForm({
          title: strategy.name,
          allocations: strategy.allocations || [],
          effectiveDate: strategy.effectiveDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]
        });
        setActiveForm('portfolio_allocation');
        break;
    }
  };

  // 保存编辑的策略
  const handleSaveEditedStrategy = async (type: StrategyType) => {
    if (!editingStrategy) return;
    
    setIsSubmitting(true);
    
    try {
      let formData: any;
      let strategyData: any;
      
      switch (type) {
        case 'stock_selection':
          formData = stockSelectionForm;
          strategyData = {
            stockSelections: formData.tickers.map(ticker => ({ ticker }))
          };
          break;
        case 'price_prediction':
          formData = pricePredictionForm;
          strategyData = {
            predictions: formData.predictions
          };
          break;
        case 'portfolio_allocation':
          formData = portfolioAllocationForm;
          strategyData = {
            allocations: formData.allocations
          };
          break;
      }
      
      // 使用AI分析策略
      const analysisResult = await QwenService.analyzeStrategy({
        type,
        title: formData.title,
        data: strategyData
      });
      
      // 更新策略
      const updatedStrategy: StrategyDetails = {
        ...editingStrategy,
        name: formData.title,
        description: analysisResult.description || editingStrategy.description,
        updatedAt: new Date(),
        effectiveDate: new Date(formData.effectiveDate),
        tags: analysisResult.tags || editingStrategy.tags,
        performance: {
          totalReturn: analysisResult.metrics?.totalReturn || editingStrategy.performance.totalReturn,
          sharpeRatio: analysisResult.metrics?.sharpeRatio || editingStrategy.performance.sharpeRatio,
          maxDrawdown: analysisResult.metrics?.maxDrawdown || editingStrategy.performance.maxDrawdown,
          volatility: analysisResult.metrics?.volatility || editingStrategy.performance.volatility,
          winRate: analysisResult.metrics?.winRate || editingStrategy.performance.winRate,
          profitFactor: analysisResult.metrics?.profitFactor || editingStrategy.performance.profitFactor
        },
        radarData: generateRadarData(
          analysisResult.metrics?.totalReturn || editingStrategy.performance.totalReturn,
          analysisResult.metrics?.sharpeRatio || editingStrategy.performance.sharpeRatio,
          analysisResult.metrics?.maxDrawdown || editingStrategy.performance.maxDrawdown,
          analysisResult.metrics?.winRate || editingStrategy.performance.winRate,
          analysisResult.metrics?.volatility || editingStrategy.performance.volatility,
          analysisResult.metrics?.profitFactor || editingStrategy.performance.profitFactor
        ),
        ...strategyData
      };
      
      updateStrategy(updatedStrategy);
      
      // 重置编辑状态
      setEditingStrategy(null);
      resetForm(type);
      setActiveForm(null);
      
    } catch (error) {
      console.error('Error updating strategy:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 删除策略
  const handleDeleteStrategy = (strategyId: string) => {
    if (confirm('确定要删除这个策略吗？')) {
      deleteStrategy(strategyId);
    }
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setEditingStrategy(null);
    setActiveForm(null);
    resetForm('stock_selection');
    resetForm('price_prediction');
    resetForm('portfolio_allocation');
  };

  // 移除项目
  const removeItem = (type: StrategyType, index: number) => {
    switch (type) {
      case 'stock_selection':
        setStockSelectionForm(prev => ({
          ...prev,
          tickers: prev.tickers.filter((_, i) => i !== index)
        }));
        break;
      case 'price_prediction':
        setPricePredictionForm(prev => ({
          ...prev,
          predictions: prev.predictions.filter((_, i) => i !== index)
        }));
        break;
      case 'portfolio_allocation':
        setPortfolioAllocationForm(prev => ({
          ...prev,
          allocations: prev.allocations.filter((_, i) => i !== index)
        }));
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 chinese-text">策略管理</h1>
        <p className="text-gray-600 mt-1 chinese-text">创建新策略或管理现有策略</p>
      </div>

      {/* Subtabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-0">
          <button
            onClick={() => {
              setActiveTab('create');
              if (editingStrategy) {
                handleCancelEdit();
              }
            }}
            className={`
              flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors
              ${
                activeTab === 'create'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <Plus className="h-4 w-4" />
            <span className="chinese-text">创建策略</span>
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`
              flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors
              ${
                activeTab === 'manage'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <List className="h-4 w-4" />
            <span className="chinese-text">策略列表</span>
          </button>
        </div>
      </div>

      {/* Create Strategy Tab */}
      {activeTab === 'create' && (
        <>
          {/* Strategy Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 选股策略 */}
        <div className="chart-clean p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 chinese-text">选股策略</h3>
            </div>
            <button
              onClick={() => setActiveForm('stock_selection')}
              className="btn-clean text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              添加
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4 chinese-text">输入: 策略标题, 股票代码列表</p>
          <div className="text-xs text-gray-500 chinese-text">
            示例: Selection strategy KKK; NVDA, AAPL, MSFT, NET
          </div>
        </div>

        {/* 价格预测 */}
        <div className="chart-clean p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Target className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900 chinese-text">价格预测</h3>
            </div>
            <button
              onClick={() => setActiveForm('price_prediction')}
              className="btn-clean text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              添加
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4 chinese-text">输入: 策略标题, 股票代码, 目标价格, 日期</p>
          <div className="text-xs text-gray-500 chinese-text">
            示例: Prediction Strategy XXX; NVDA, 300; AAPL, 300; MSFT, 300
          </div>
        </div>

        {/* 组合配置 */}
        <div className="chart-clean p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <PieChart className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900 chinese-text">组合配置</h3>
            </div>
            <button
              onClick={() => setActiveForm('portfolio_allocation')}
              className="btn-clean text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              添加
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4 chinese-text">输入: 策略标题, 股票代码, 权重比例</p>
          <div className="text-xs text-gray-500 chinese-text">
            示例: allocation strategy ZZW; NVDA 14%, AAPL 33%, NET 53%
          </div>
        </div>
      </div>

      {/* Input Forms */}
      {activeForm && (
        <div className="chart-clean p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 chinese-text">
              {activeForm === 'stock_selection' && '选股策略输入'}
              {activeForm === 'price_prediction' && '价格预测输入'}
              {activeForm === 'portfolio_allocation' && '组合配置输入'}
            </h3>
            <button
              onClick={() => setActiveForm(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* 选股策略表单 */}
          {activeForm === 'stock_selection' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 chinese-text">策略标题</label>
                  <input
                    type="text"
                    value={stockSelectionForm.title}
                    onChange={(e) => setStockSelectionForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="例如: Selection strategy KKK"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 chinese-text">生效日期</label>
                  <input
                    type="date"
                    value={stockSelectionForm.effectiveDate}
                    onChange={(e) => setStockSelectionForm(prev => ({ ...prev, effectiveDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 chinese-text">股票代码</label>
                <div className="flex space-x-2">
                  <input
                    id="ticker-input"
                    type="text"
                    placeholder="输入股票代码 (如: NVDA)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && addStockSelection()}
                  />
                  <button
                    onClick={addStockSelection}
                    className="btn-clean"
                  >
                    添加
                  </button>
                </div>
                
                {stockSelectionForm.tickers.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {stockSelectionForm.tickers.map((ticker, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {ticker}
                        <button
                          onClick={() => removeItem('stock_selection', index)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => editingStrategy ? handleSaveEditedStrategy('stock_selection') : handleSubmitStrategy('stock_selection')}
                  disabled={!stockSelectionForm.title || stockSelectionForm.tickers.length === 0 || isSubmitting}
                  className="flex-1 btn-clean disabled:opacity-50 disabled:cursor-not-allowed chinese-text"
                >
                  {isSubmitting ? '处理中...' : editingStrategy ? '保存修改' : '提交选股策略'}
                </button>
                {editingStrategy && (
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 chinese-text"
                  >
                    取消
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 价格预测表单 */}
          {activeForm === 'price_prediction' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 chinese-text">策略标题</label>
                  <input
                    type="text"
                    value={pricePredictionForm.title}
                    onChange={(e) => setPricePredictionForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="例如: Prediction Strategy XXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 chinese-text">生效日期</label>
                  <input
                    type="date"
                    value={pricePredictionForm.effectiveDate}
                    onChange={(e) => setPricePredictionForm(prev => ({ ...prev, effectiveDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 chinese-text">价格预测</label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <input
                    id="prediction-ticker-input"
                    type="text"
                    placeholder="股票代码"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    id="prediction-price-input"
                    type="number"
                    placeholder="目标价格"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    id="prediction-date-input"
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={addPricePrediction}
                    className="btn-clean chinese-text"
                  >
                    添加
                  </button>
                </div>
                
                {pricePredictionForm.predictions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {pricePredictionForm.predictions.map((pred, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-green-50 rounded-md"
                      >
                        <span className="text-sm english-text">
                          {pred.ticker}: ${pred.price} by {pred.date}
                        </span>
                        <button
                          onClick={() => removeItem('price_prediction', index)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => editingStrategy ? handleSaveEditedStrategy('price_prediction') : handleSubmitStrategy('price_prediction')}
                  disabled={!pricePredictionForm.title || pricePredictionForm.predictions.length === 0 || isSubmitting}
                  className="flex-1 btn-clean disabled:opacity-50 disabled:cursor-not-allowed chinese-text"
                >
                  {isSubmitting ? '处理中...' : editingStrategy ? '保存修改' : '提交价格预测'}
                </button>
                {editingStrategy && (
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 chinese-text"
                  >
                    取消
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 组合配置表单 */}
          {activeForm === 'portfolio_allocation' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 chinese-text">策略标题</label>
                  <input
                    type="text"
                    value={portfolioAllocationForm.title}
                    onChange={(e) => setPortfolioAllocationForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="例如: allocation strategy ZZW"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 chinese-text">生效日期</label>
                  <input
                    type="date"
                    value={portfolioAllocationForm.effectiveDate}
                    onChange={(e) => setPortfolioAllocationForm(prev => ({ ...prev, effectiveDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 chinese-text">组合配置</label>
                <div className="flex space-x-2">
                  <input
                    id="allocation-ticker-input"
                    type="text"
                    placeholder="股票代码"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    id="allocation-weight-input"
                    type="number"
                    placeholder="权重%"
                    min="0"
                    max="100"
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={addPortfolioAllocation}
                    className="btn-clean chinese-text"
                  >
                    添加
                  </button>
                </div>
                
                {portfolioAllocationForm.allocations.length > 0 && (
                  <div className="mt-3">
                    <div className="space-y-2">
                      {portfolioAllocationForm.allocations.map((alloc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-purple-50 rounded-md"
                        >
                          <span className="text-sm english-text">
                            {alloc.ticker}: {alloc.weight}%
                          </span>
                          <button
                            onClick={() => removeItem('portfolio_allocation', index)}
                            className="text-purple-600 hover:text-purple-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      总权重: {portfolioAllocationForm.allocations.reduce((sum, alloc) => sum + alloc.weight, 0)}%
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => editingStrategy ? handleSaveEditedStrategy('portfolio_allocation') : handleSubmitStrategy('portfolio_allocation')}
                  disabled={!portfolioAllocationForm.title || portfolioAllocationForm.allocations.length === 0 || isSubmitting}
                  className="flex-1 btn-clean disabled:opacity-50 disabled:cursor-not-allowed chinese-text"
                >
                  {isSubmitting ? '处理中...' : editingStrategy ? '保存修改' : '提交组合配置'}
                </button>
                {editingStrategy && (
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 chinese-text"
                  >
                    取消
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

          {/* Submitted Strategies */}
          {submittedStrategies.length > 0 && (
            <div className="chart-clean p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 chinese-text">已提交策略</h3>
              <div className="space-y-4">
                {submittedStrategies.map((strategy) => (
                  <div key={strategy.id} className="card-clean p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {strategy.type === 'stock_selection' && <TrendingUp className="h-5 w-5 text-blue-600" />}
                        {strategy.type === 'price_prediction' && <Target className="h-5 w-5 text-green-600" />}
                        {strategy.type === 'portfolio_allocation' && <PieChart className="h-5 w-5 text-purple-600" />}
                        <div>
                          <h4 className="font-medium text-gray-900 english-text">{strategy.title}</h4>
                          <p className="text-sm text-gray-600 chinese-text">
                            {strategy.type === 'stock_selection' && '选股策略'}
                            {strategy.type === 'price_prediction' && '价格预测'}
                            {strategy.type === 'portfolio_allocation' && '组合配置'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {strategy.status === 'processing' && (
                          <>
                            <Loader className="h-5 w-5 text-blue-500 animate-spin" />
                            <span className="text-sm text-blue-600 chinese-text">AI分析中...</span>
                          </>
                        )}
                        {strategy.status === 'completed' && (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-green-600 chinese-text">完成</span>
                          </>
                        )}
                        {strategy.status === 'error' && (
                          <>
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <span className="text-sm text-red-600 chinese-text">错误</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    {strategy.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {strategy.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Strategy Data Preview */}
                    <div className="mt-3 text-sm text-gray-600">
                      {strategy.type === 'stock_selection' && (
                        <span className="english-text">股票: {strategy.data.tickers?.join(', ')}</span>
                      )}
                      {strategy.type === 'price_prediction' && (
                        <span className="english-text">
                          预测: {strategy.data.predictions?.map((p: any) => `${p.ticker}@$${p.price}`).join(', ')}
                        </span>
                      )}
                      {strategy.type === 'portfolio_allocation' && (
                        <span className="english-text">
                          配置: {strategy.data.allocations?.map((a: any) => `${a.ticker}(${a.weight}%)`).join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Strategy Management Tab */}
      {activeTab === 'manage' && (
        <div className="space-y-6">
          <div className="chart-clean p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 chinese-text">策略列表</h3>
            <div className="space-y-4">
              {strategies.map((strategy) => (
                <div key={strategy.id} className="card-clean p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {strategy.type === 'stock_selection' && <TrendingUp className="h-5 w-5 text-blue-600" />}
                      {strategy.type === 'price_prediction' && <Target className="h-5 w-5 text-green-600" />}
                      {strategy.type === 'portfolio_allocation' && <PieChart className="h-5 w-5 text-purple-600" />}
                      <div>
                        <h4 className="font-medium text-gray-900 english-text">{strategy.name}</h4>
                        <p className="text-sm text-gray-600 chinese-text">
                          {strategy.type === 'stock_selection' && '选股策略'}
                          {strategy.type === 'price_prediction' && '价格预测'}
                          {strategy.type === 'portfolio_allocation' && '组合配置'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditStrategy(strategy)}
                        className="btn-clean text-sm"
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        编辑
                      </button>
                      <button
                        onClick={() => handleDeleteStrategy(strategy.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-gray-600 chinese-text">总收益: </span>
                      <span className="font-medium text-green-600 english-text">
                        {strategyMetrics[strategy.id]?.sinceInceptionReturnFormatted || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 chinese-text">夏普比率: </span>
                      <span className="font-medium text-gray-900 english-text">
                        {strategy.performance.sharpeRatio.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 chinese-text">最大回撤: </span>
                      <span className="font-medium text-red-600 english-text">
                        {strategy.performance.maxDrawdown.toFixed(1)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 chinese-text">胜率: </span>
                      <span className="font-medium text-gray-900 english-text">
                        {strategy.performance.winRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Strategy Data */}
                  <div className="mt-3 text-sm text-gray-600">
                    {strategy.type === 'stock_selection' && strategy.stockSelections && (
                      <div>
                        <span className="font-medium chinese-text">股票选择: </span>
                        <span className="english-text">
                          {strategy.stockSelections.map(s => s.ticker).join(', ')}
                        </span>
                      </div>
                    )}
                    {strategy.type === 'price_prediction' && strategy.predictions && (
                      <div>
                        <span className="font-medium chinese-text">价格预测: </span>
                        <span className="english-text">
                          {strategy.predictions.map(p => `${p.ticker}@$${p.price}(${p.date})`).join(', ')}
                        </span>
                      </div>
                    )}
                    {strategy.type === 'portfolio_allocation' && strategy.allocations && (
                      <div>
                        <span className="font-medium chinese-text">配置权重: </span>
                        <span className="english-text">
                          {strategy.allocations.map(a => `${a.ticker}(${a.weight}%)`).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {strategy.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {strategy.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                    <span>创建: {strategy.createdAt.toLocaleDateString('zh-CN')}</span>
                    <span>更新: {strategy.updatedAt.toLocaleDateString('zh-CN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelUpload; 