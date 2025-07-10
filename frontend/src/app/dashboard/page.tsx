"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { LiveStats } from "@/components/LiveStats";
import { MarketCarousel } from "@/components/MarketCarousel";
import { 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Users,
  ArrowUpRight,
  DollarSign
} from "lucide-react";

interface Market {
  id: string;
  title: string;
  description: string;
  total_liquidity: string;
  total_volume: string;
  status: string;
  outcome_a: string;
  outcome_b: string;
  created_at: string;
}

interface Bet {
  id: string;
  market_id: string;
  outcome: string;
  amount: string;
  odds: number;
  created_at: string;
  market_title: string;
}

export default function DashboardPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [marketsResponse, betsResponse] = await Promise.all([
        fetch('http://localhost:3001/api/markets'),
        fetch('http://localhost:3001/api/bets')
      ]);
      
      const marketsData = await marketsResponse.json();
      const betsData = await betsResponse.json();
      
      setMarkets(marketsData);
      setBets(betsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarketSelect = (marketId: string) => {
    window.location.href = `/market/${marketId}`;
  };

  const timeframes = [
    { value: '1h', label: '1H' },
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' }
  ];

  const totalVolume = markets.reduce((sum, market) => sum + parseFloat(market.total_volume || '0'), 0);
  const totalLiquidity = markets.reduce((sum, market) => sum + parseFloat(market.total_liquidity || '0'), 0);
  const activeMarkets = markets.filter(m => m.status === 'active').length;
  const totalBets = bets.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-premium">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="loading-skeleton w-16 h-16 mx-auto mb-4"></div>
            <p className="text-secondary">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-premium">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">Dashboard</h1>
              <p className="text-secondary">Monitor your prediction market activity</p>
            </div>
            
            {/* Timeframe Selector */}
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe.value}
                  onClick={() => setSelectedTimeframe(timeframe.value)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedTimeframe === timeframe.value
                      ? 'bg-accent-orange text-black'
                      : 'btn-ghost'
                  }`}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <LiveStats markets={markets} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Markets */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="card-modern p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Featured Markets</h2>
                <button className="btn-ghost flex items-center space-x-2">
                  <span>View All</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
              
              {markets.length > 0 ? (
                <MarketCarousel markets={markets} onMarketSelect={handleMarketSelect} />
              ) : (
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-tertiary" />
                  <p className="text-secondary">No markets available</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="card-modern p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                {bets.slice(0, 5).map((bet, index) => (
                  <motion.div
                    key={bet.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="glass p-4 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-primary line-clamp-1">
                          {bet.market_title}
                        </div>
                        <div className="text-xs text-secondary">
                          Bet on: {bet.outcome}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-accent-orange">
                          ${parseFloat(bet.amount).toFixed(2)}
                        </div>
                        <div className="text-xs text-secondary">
                          {(typeof bet.odds === 'number' ? bet.odds : parseFloat(bet.odds) || 0).toFixed(2)}x
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-tertiary">
                      <span>Bet #{bet.id.slice(-6)}</span>
                      <span>{new Date(bet.created_at).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {bets.length === 0 && (
                <div className="text-center py-8">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-tertiary" />
                  <p className="text-secondary text-sm">No recent activity</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card-modern p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-orange to-accent-orange-hover rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-black" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                ${totalVolume.toLocaleString()}
              </div>
              <div className="text-sm text-secondary">Total Volume</div>
            </div>
            
            <div className="card-modern p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-success to-green-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-black" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                ${totalLiquidity.toLocaleString()}
              </div>
              <div className="text-sm text-secondary">Total Liquidity</div>
            </div>
            
            <div className="card-modern p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-warning to-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-black" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {activeMarkets}
              </div>
              <div className="text-sm text-secondary">Active Markets</div>
            </div>
            
            <div className="card-modern p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-black" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {totalBets}
              </div>
              <div className="text-sm text-secondary">Total Bets</div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 