"use client";

import { useState } from 'react';
import { TrendingUp, TrendingDown, Award, BarChart3, Wallet, Activity } from 'lucide-react';

// Dados mock para o portfolio
const mockPortfolio = {
  totalValue: 125000,
  totalProfit: 15200,
  profitPercentage: 13.8,
  activeBets: 8,
  completedBets: 23,
  winRate: 67.4
};

const mockActiveBets = [
  {
    id: '1',
    marketTitle: 'Bitcoin atingirá $100k em 2024?',
    betType: 'Yes',
    amount: 50000,
    currentValue: 65000,
    profit: 15000,
    profitPercentage: 30,
    endDate: '2024-12-31',
    odds: 0.65
  },
  {
    id: '2',
    marketTitle: 'Ethereum ETF será aprovado em 2024?',
    betType: 'No',
    amount: 30000,
    currentValue: 33000,
    profit: 3000,
    profitPercentage: 10,
    endDate: '2024-12-31',
    odds: 0.55
  },
  {
    id: '3',
    marketTitle: 'Tesla entregará 2M+ veículos em 2024?',
    betType: 'Yes',
    amount: 25000,
    currentValue: 36000,
    profit: 11000,
    profitPercentage: 44,
    endDate: '2024-12-31',
    odds: 0.72
  }
];

const mockRecentTransactions = [
  {
    id: '1',
    type: 'bet',
    marketTitle: 'Bitcoin atingirá $100k em 2024?',
    amount: 50000,
    timestamp: '2024-01-15T10:30:00Z',
    status: 'confirmed'
  },
  {
    id: '2',
    type: 'withdrawal',
    marketTitle: 'Ethereum ETF será aprovado em 2024?',
    amount: -33000,
    timestamp: '2024-01-14T15:45:00Z',
    status: 'confirmed'
  },
  {
    id: '3',
    type: 'bet',
    marketTitle: 'Tesla entregará 2M+ veículos em 2024?',
    amount: 25000,
    timestamp: '2024-01-13T09:20:00Z',
    status: 'confirmed'
  }
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background/50 to-background/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meu <span className="text-neon">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Acompanhe suas apostas, performance e histórico de transações.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Wallet className="w-8 h-8 text-neon" />
              <div>
                <p className="text-sm text-gray-400">Valor Total</p>
                <p className="text-2xl font-bold">{formatCurrency(mockPortfolio.totalValue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-400">Lucro Total</p>
                <p className="text-2xl font-bold text-green-500">
                  +{formatCurrency(mockPortfolio.totalProfit)}
                </p>
                <p className="text-sm text-green-400">+{mockPortfolio.profitPercentage}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Apostas Ativas</p>
                <p className="text-2xl font-bold">{mockPortfolio.activeBets}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">Taxa de Acerto</p>
                <p className="text-2xl font-bold text-yellow-500">{mockPortfolio.winRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition ${
              activeTab === 'overview'
                ? 'bg-neon text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition ${
              activeTab === 'active'
                ? 'bg-neon text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Apostas Ativas
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition ${
              activeTab === 'history'
                ? 'bg-neon text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Histórico
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gráfico de Performance */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-neon" />
                Performance
              </h3>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 border-8 border-neon/20 rounded-full flex items-center justify-center mb-4">
                    <div className="text-2xl font-bold text-neon">+{mockPortfolio.profitPercentage}%</div>
                  </div>
                  <p className="text-gray-400">Retorno Total</p>
                </div>
              </div>
            </div>

            {/* Resumo de Apostas */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Resumo de Apostas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Apostas Ativas</span>
                  <span className="font-semibold">{mockPortfolio.activeBets}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Apostas Concluídas</span>
                  <span className="font-semibold">{mockPortfolio.completedBets}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Taxa de Acerto</span>
                  <span className="font-semibold text-green-500">{mockPortfolio.winRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Maior Aposta</span>
                  <span className="font-semibold">{formatCurrency(50000)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'active' && (
          <div className="space-y-6">
            {mockActiveBets.map((bet) => (
              <div key={bet.id} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{bet.marketTitle}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        bet.betType === 'Yes' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {bet.betType}
                      </span>
                      <span>Encerra em {formatDate(bet.endDate)}</span>
                      <span>Odds: {(bet.odds * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Valor Atual</p>
                      <p className="text-lg font-bold">{formatCurrency(bet.currentValue)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Lucro</p>
                      <p className={`text-lg font-bold ${bet.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {bet.profit >= 0 ? '+' : ''}{formatCurrency(bet.profit)}
                      </p>
                      <p className={`text-sm ${bet.profitPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {bet.profitPercentage >= 0 ? '+' : ''}{bet.profitPercentage}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {mockRecentTransactions.map((tx) => (
              <div key={tx.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'bet' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {tx.type === 'bet' ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{tx.marketTitle}</p>
                      <p className="text-sm text-gray-400">{formatDate(tx.timestamp)}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-bold ${tx.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {tx.amount >= 0 ? '+' : ''}{formatCurrency(tx.amount)}
                    </p>
                    <p className="text-sm text-gray-400 capitalize">{tx.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 