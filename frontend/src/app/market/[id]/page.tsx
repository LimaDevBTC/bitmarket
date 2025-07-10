"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { TrendingUp, TrendingDown, Users, DollarSign, BarChart3, Share2, Bookmark } from 'lucide-react';

interface Market {
  id: string;
  title: string;
  description: string;
  category: string;
  endDate: string;
  totalVolume: number;
  totalLiquidity: number;
  participants: number;
  currentPrice: number;
  priceHistory: Array<{ date: string; price: number }>;
  outcomes: {
    yes: { price: number; volume: number };
    no: { price: number; volume: number };
  };
}

// Mock data
const mockMarket: Market = {
  id: '1',
  title: 'Bitcoin atingirá $100k em 2024?',
  description: 'Bitcoin alcançará o preço de $100,000 USD até 31 de dezembro de 2024. O preço será verificado usando o preço de fechamento do Bitcoin em exchanges principais.',
  category: 'Crypto',
  endDate: '2024-12-31T23:59:59Z',
  totalVolume: 1250000,
  totalLiquidity: 890000,
  participants: 1247,
  currentPrice: 0.65,
  priceHistory: [
    { date: '2024-01-01', price: 0.45 },
    { date: '2024-01-15', price: 0.52 },
    { date: '2024-02-01', price: 0.58 },
    { date: '2024-03-01', price: 0.62 },
    { date: '2024-03-15', price: 0.65 },
  ],
  outcomes: {
    yes: { price: 0.65, volume: 850000 },
    no: { price: 0.35, volume: 400000 }
  }
};

export default function MarketPage() {
  const params = useParams();
  const [market, setMarket] = useState<Market | null>(null);
  const [betAmount, setBetAmount] = useState('');
  const [selectedOutcome, setSelectedOutcome] = useState<'yes' | 'no' | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setMarket(mockMarket);
    }, 500);
  }, [params.id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeLeft = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h left`;
  };

  const handleBet = (outcome: 'yes' | 'no') => {
    setSelectedOutcome(outcome);
  };

  const handleSubmitBet = () => {
    if (!betAmount || !selectedOutcome) return;
    
    // Aqui você implementaria a lógica de aposta
    console.log(`Betting ${betAmount} on ${selectedOutcome}`);
    alert('Bet placed successfully!');
  };

  if (!market) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon mx-auto mb-4"></div>
          <p className="text-gray-400">Loading market...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header do Mercado */}
      <div className="bg-gradient-to-b from-background/50 to-background/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-neon/20 text-neon rounded-full text-sm font-medium">
                  {market.category}
                </span>
                <span className="text-gray-400 text-sm">
                  {getTimeLeft(market.endDate)}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{market.title}</h1>
              <p className="text-gray-400 text-lg leading-relaxed">{market.description}</p>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition">
                <Bookmark className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-neon" />
              <div>
                <p className="text-sm text-gray-400">Total Volume</p>
                <p className="text-xl font-bold">{formatCurrency(market.totalVolume)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Participants</p>
                <p className="text-xl font-bold">{market.participants.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-sm text-gray-400">Yes Price</p>
                <p className="text-xl font-bold">{(market.outcomes.yes.price * 100).toFixed(0)}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-6 h-6 text-red-500" />
              <div>
                <p className="text-sm text-gray-400">No Price</p>
                <p className="text-xl font-bold">{(market.outcomes.no.price * 100).toFixed(0)}%</p>
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
            Overview
          </button>
          <button
            onClick={() => setActiveTab('chart')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition ${
              activeTab === 'chart'
                ? 'bg-neon text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Price Chart
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition ${
              activeTab === 'activity'
                ? 'bg-neon text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Activity
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Market Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">End Date</span>
                      <span>{formatDate(market.endDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Liquidity</span>
                      <span>{formatCurrency(market.totalLiquidity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Market Status</span>
                      <span className="text-green-500">Active</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Price History</h3>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Price chart will be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chart' && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Price Chart</h3>
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Interactive price chart will be implemented here</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-neon/20 rounded-full flex items-center justify-center">
                          <span className="text-neon text-sm font-bold">U</span>
                        </div>
                        <div>
                          <p className="font-medium">User {i}</p>
                          <p className="text-sm text-gray-400">Bet $1,000 on Yes</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">2h ago</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Sistema de Apostas */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-6">Place Your Bet</h3>
              
              <div className="space-y-4 mb-6">
                <button
                  onClick={() => handleBet('yes')}
                  className={`w-full p-4 rounded-lg border transition ${
                    selectedOutcome === 'yes'
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Yes</span>
                    <span className="text-2xl font-bold">{(market.outcomes.yes.price * 100).toFixed(0)}%</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Volume: {formatCurrency(market.outcomes.yes.volume)}
                  </p>
                </button>

                <button
                  onClick={() => handleBet('no')}
                  className={`w-full p-4 rounded-lg border transition ${
                    selectedOutcome === 'no'
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">No</span>
                    <span className="text-2xl font-bold">{(market.outcomes.no.price * 100).toFixed(0)}%</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Volume: {formatCurrency(market.outcomes.no.volume)}
                  </p>
                </button>
              </div>

              {selectedOutcome && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bet Amount (USD)
                    </label>
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                      placeholder="100"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
                    />
                  </div>

                  <button
                    onClick={handleSubmitBet}
                    disabled={!betAmount}
                    className={`w-full py-3 rounded-lg font-bold transition ${
                      betAmount
                        ? 'bg-neon text-white hover:brightness-110'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Place Bet
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
