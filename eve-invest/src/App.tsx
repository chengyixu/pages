import React, { useState, createContext, useContext, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Upload,
  Activity,
  Gauge,
  RefreshCw
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import StockSelection from './components/StockSelection';
import PricePrediction from './components/PricePrediction';
import PortfolioAllocation from './components/PortfolioAllocation';
import ModelUpload from './components/ModelUpload';
import type { StrategyDetails } from './types';

// Strategy Context
interface StrategyContextType {
  strategies: StrategyDetails[];
  setStrategies: (strategies: StrategyDetails[] | ((prev: StrategyDetails[]) => StrategyDetails[])) => void;
  refreshData: () => void;
  isRefreshing: boolean;
}

const StrategyContext = createContext<StrategyContextType | undefined>(undefined);

export const useStrategy = () => {
  const context = useContext(StrategyContext);
  if (!context) {
    throw new Error('useStrategy must be used within a StrategyProvider');
  }
  return context;
};

// Helper functions for localStorage
const saveStrategiesToStorage = (strategies: StrategyDetails[]) => {
  try {
    localStorage.setItem('eve-quant-strategies', JSON.stringify(strategies));
  } catch (error) {
    console.error('Failed to save strategies to localStorage:', error);
  }
};

const loadStrategiesFromStorage = (): StrategyDetails[] => {
  try {
    const saved = localStorage.getItem('eve-quant-strategies');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      return parsed.map((strategy: any) => ({
        ...strategy,
        createdAt: new Date(strategy.createdAt),
        updatedAt: new Date(strategy.updatedAt)
      }));
    }
  } catch (error) {
    console.error('Failed to load strategies from localStorage:', error);
  }
  return [];
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [strategies, setStrategiesState] = useState<StrategyDetails[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load strategies from localStorage on app initialization
  useEffect(() => {
    const savedStrategies = loadStrategiesFromStorage();
    setStrategiesState(savedStrategies);
  }, []);

  // Enhanced setStrategies that also saves to localStorage
  const setStrategies = (strategiesOrUpdater: StrategyDetails[] | ((prev: StrategyDetails[]) => StrategyDetails[])) => {
    setStrategiesState(prev => {
      const newStrategies = typeof strategiesOrUpdater === 'function' 
        ? strategiesOrUpdater(prev) 
        : strategiesOrUpdater;
      
      // Save to localStorage
      saveStrategiesToStorage(newStrategies);
      
      return newStrategies;
    });
  };

  const tabs = [
    { id: 'dashboard', name: '策略看板', icon: BarChart3 },
    { id: 'stock-selection', name: '选股策略', icon: TrendingUp },
    { id: 'price-prediction', name: '价格预测', icon: Activity },
    { id: 'portfolio-allocation', name: '组合配置', icon: PieChart },
    { id: 'model-upload', name: '策略列表', icon: Upload },
  ];

  // Global refresh function that fetches fresh data from Polygon API
  const refreshData = async () => {
    setIsRefreshing(true);
    
    try {
      // Update all strategies with fresh Polygon data
      const updatedStrategies = await Promise.all(
        strategies.map(async (strategy) => {
          try {
            // Import required functions dynamically to avoid circular dependency
            const { calculateRealStrategyPerformance, generateRadarData } = await import('./utils');
            
            const realPerformance = await calculateRealStrategyPerformance(strategy);
            if (realPerformance) {
              return {
                ...strategy,
                performance: realPerformance,
                radarData: generateRadarData(
                  realPerformance.totalReturn,
                  realPerformance.sharpeRatio,
                  realPerformance.maxDrawdown,
                  realPerformance.winRate,
                  realPerformance.volatility,
                  realPerformance.profitFactor
                ),
                updatedAt: new Date()
              };
            }
            return strategy;
          } catch (error) {
            console.error('Failed to refresh strategy:', strategy.id, error);
            return strategy;
          }
        })
      );
      
      // Update strategies with fresh data
      setStrategies(updatedStrategies);
      
    } catch (error) {
      console.error('Error refreshing data:', error);
      // Fallback: just trigger a re-render
      setStrategies(prev => [...prev]);
    } finally {
      setIsRefreshing(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'stock-selection':
        return <StockSelection />;
      case 'price-prediction':
        return <PricePrediction />;
      case 'portfolio-allocation':
        return <PortfolioAllocation />;
      case 'model-upload':
        return <ModelUpload />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <StrategyContext.Provider value={{ strategies, setStrategies, refreshData, isRefreshing }}>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="nav-clean sticky top-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <Gauge className="h-8 w-8 text-gray-900" />
                  <h1 className="text-2xl font-bold text-gray-900">
                    EVE Quant w/ AI
                  </h1>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                {/* Global Refresh Button */}
                <button
                  onClick={refreshData}
                  disabled={isRefreshing}
                  className="btn-clean text-sm"
                >
                  <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? '刷新中...' : '刷新数据'}
                </button>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>系统正常</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="border-b border-gray-200 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex space-x-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors
                      ${
                        activeTab === tab.id
                          ? 'border-gray-900 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-6">
          {renderTabContent()}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-gray-50 py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  © 2024 EVE Quant w/ AI
                </p>
                <p className="text-xs text-gray-500">
                  高性能量化投资策略评估平台
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="badge-clean">v2.1.0</span>
                <span className="badge-clean">Beta</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </StrategyContext.Provider>
  );
}

export default App; 