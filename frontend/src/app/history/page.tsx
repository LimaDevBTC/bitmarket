"use client";

import { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, Download, Search } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'bet' | 'withdrawal' | 'liquidity' | 'settlement';
  marketTitle: string;
  amount: number;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
  outcome?: 'yes' | 'no';
  profit?: number;
}

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'bet',
    marketTitle: 'Bitcoin atingirá $100k em 2024?',
    amount: 50000,
    timestamp: '2024-01-15T10:30:00Z',
    status: 'confirmed',
    outcome: 'yes',
    profit: 15000
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
    status: 'confirmed',
    outcome: 'yes',
    profit: 11000
  },
  {
    id: '4',
    type: 'liquidity',
    marketTitle: 'GPT-5 será lançado em 2024?',
    amount: 100000,
    timestamp: '2024-01-12T14:15:00Z',
    status: 'confirmed'
  },
  {
    id: '5',
    type: 'settlement',
    marketTitle: 'Biden será reeleito presidente?',
    amount: 45000,
    timestamp: '2024-01-11T11:30:00Z',
    status: 'confirmed',
    outcome: 'no',
    profit: -5000
  },
  {
    id: '6',
    type: 'bet',
    marketTitle: 'Lakers ganharão o campeonato NBA?',
    amount: 15000,
    timestamp: '2024-01-10T16:20:00Z',
    status: 'pending',
    outcome: 'yes'
  }
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'bet':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'withdrawal':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case 'liquidity':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'settlement':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <TrendingUp className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'bet':
        return 'Bet';
      case 'withdrawal':
        return 'Withdrawal';
      case 'liquidity':
        return 'Liquidity';
      case 'settlement':
        return 'Settlement';
      default:
        return type;
    }
  };

  // Filtrar transações
  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = tx.marketTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || tx.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || tx.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calcular estatísticas
  const totalVolume = filteredTransactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  const totalProfit = filteredTransactions.reduce((sum, tx) => sum + (tx.profit || 0), 0);
  const totalBets = filteredTransactions.filter(tx => tx.type === 'bet').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background/50 to-background/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transaction <span className="text-neon">History</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Track all your bets, withdrawals, and market activities.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-neon" />
              <div>
                <p className="text-sm text-gray-400">Total Volume</p>
                <p className="text-2xl font-bold">{formatCurrency(totalVolume)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-400">Total Profit</p>
                <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {totalProfit >= 0 ? '+' : ''}{formatCurrency(totalProfit)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Total Bets</p>
                <p className="text-2xl font-bold">{totalBets}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="flex gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon transition"
              >
                <option value="all">All Types</option>
                <option value="bet">Bets</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="liquidity">Liquidity</option>
                <option value="settlement">Settlements</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon transition"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon transition"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
                <option value="all">All time</option>
              </select>
            </div>

            {/* Botão Export */}
            <button className="flex items-center gap-2 px-4 py-3 bg-neon text-white rounded-lg hover:brightness-110 transition">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Lista de Transações */}
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No transactions found with the selected filters.</p>
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <div key={tx.id} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      {getTransactionIcon(tx.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{tx.marketTitle}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                          {tx.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{getTypeLabel(tx.type)}</span>
                        {tx.outcome && (
                          <span className={`px-2 py-1 rounded text-xs ${
                            tx.outcome === 'yes' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {tx.outcome.toUpperCase()}
                          </span>
                        )}
                        <span>{formatDate(tx.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-lg font-bold ${tx.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {tx.amount >= 0 ? '+' : ''}{formatCurrency(tx.amount)}
                    </p>
                    {tx.profit !== undefined && (
                      <p className={`text-sm ${tx.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.profit >= 0 ? '+' : ''}{formatCurrency(tx.profit)} profit
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 