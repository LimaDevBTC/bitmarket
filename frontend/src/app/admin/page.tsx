"use client";

import { useState } from 'react';
import { Users, TrendingUp, DollarSign, Settings, Shield, BarChart3, Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalMarkets: number;
  totalVolume: number;
  activeMarkets: number;
  pendingMarkets: number;
  totalBets: number;
  platformFees: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
}

interface Market {
  id: string;
  title: string;
  creator: string;
  status: 'active' | 'pending' | 'resolved' | 'cancelled';
  volume: number;
  participants: number;
  endDate: string;
  createdAt: string;
}

interface User {
  id: string;
  address: string;
  username: string;
  totalBets: number;
  totalVolume: number;
  joinDate: string;
  status: 'active' | 'suspended' | 'banned';
}

// Mock data
const mockStats: AdminStats = {
  totalUsers: 1247,
  totalMarkets: 89,
  totalVolume: 2500000,
  activeMarkets: 67,
  pendingMarkets: 12,
  totalBets: 3456,
  platformFees: 125000,
  systemHealth: 'healthy'
};

const mockMarkets: Market[] = [
  {
    id: '1',
    title: 'Bitcoin atingirá $100k em 2024?',
    creator: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    status: 'active',
    volume: 1250000,
    participants: 1247,
    endDate: '2024-12-31T23:59:59Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Ethereum ETF será aprovado em 2024?',
    creator: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    status: 'pending',
    volume: 0,
    participants: 0,
    endDate: '2024-12-31T23:59:59Z',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    title: 'Tesla entregará 2M+ veículos em 2024?',
    creator: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    status: 'active',
    volume: 890000,
    participants: 567,
    endDate: '2024-12-31T23:59:59Z',
    createdAt: '2024-01-10T00:00:00Z'
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    username: 'crypto_trader',
    totalBets: 45,
    totalVolume: 125000,
    joinDate: '2024-01-01T00:00:00Z',
    status: 'active'
  },
  {
    id: '2',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    username: 'prediction_master',
    totalBets: 23,
    totalVolume: 89000,
    joinDate: '2024-01-05T00:00:00Z',
    status: 'active'
  },
  {
    id: '3',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    username: 'suspicious_user',
    totalBets: 5,
    totalVolume: 5000,
    joinDate: '2024-01-10T00:00:00Z',
    status: 'suspended'
  }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMarketStatus, setSelectedMarketStatus] = useState('all');
  const [selectedUserStatus, setSelectedUserStatus] = useState('all');

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
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'healthy':
        return 'text-green-500';
      case 'pending':
      case 'warning':
        return 'text-yellow-500';
      case 'suspended':
      case 'critical':
        return 'text-red-500';
      case 'resolved':
        return 'text-blue-500';
      case 'cancelled':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'suspended':
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'markets', label: 'Markets', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const filteredMarkets = mockMarkets.filter(market => 
    selectedMarketStatus === 'all' || market.status === selectedMarketStatus
  );

  const filteredUsers = mockUsers.filter(user => 
    selectedUserStatus === 'all' || user.status === selectedUserStatus
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background/50 to-background/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Admin <span className="text-neon">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Manage the platform, monitor performance, and oversee all activities.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                        activeTab === tab.id
                          ? 'bg-neon text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold mb-6">Platform Overview</h2>
                  
                  {/* Estatísticas Principais */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-400">Total Users</p>
                          <p className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-green-500" />
                        <div>
                          <p className="text-sm text-gray-400">Total Markets</p>
                          <p className="text-2xl font-bold">{mockStats.totalMarkets}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-neon" />
                        <div>
                          <p className="text-sm text-gray-400">Total Volume</p>
                          <p className="text-2xl font-bold">{formatCurrency(mockStats.totalVolume)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <div className="flex items-center gap-3">
                        <Activity className="w-8 h-8 text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-400">Total Bets</p>
                          <p className="text-2xl font-bold">{mockStats.totalBets.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status do Sistema */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">System Health</h3>
                      <div className="flex items-center gap-3">
                        {getStatusIcon(mockStats.systemHealth)}
                        <span className={`font-medium ${getStatusColor(mockStats.systemHealth)}`}>
                          {mockStats.systemHealth.charAt(0).toUpperCase() + mockStats.systemHealth.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        All systems operating normally
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Platform Fees</h3>
                      <p className="text-2xl font-bold text-neon">{formatCurrency(mockStats.platformFees)}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Total fees collected this month
                      </p>
                    </div>
                  </div>

                  {/* Mercados Ativos vs Pendentes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Market Status</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Active Markets</span>
                          <span className="font-semibold text-green-500">{mockStats.activeMarkets}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Pending Markets</span>
                          <span className="font-semibold text-yellow-500">{mockStats.pendingMarkets}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-400">• New market created: "Bitcoin price prediction"</p>
                        <p className="text-gray-400">• User registration: +15 new users</p>
                        <p className="text-gray-400">• High volume bet: $50,000 placed</p>
                        <p className="text-gray-400">• Market resolved: "Election outcome"</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Markets Tab */}
              {activeTab === 'markets' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Market Management</h2>
                    <select
                      value={selectedMarketStatus}
                      onChange={(e) => setSelectedMarketStatus(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neon transition"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    {filteredMarkets.map((market) => (
                      <div key={market.id} className="bg-white/5 border border-white/10 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{market.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(market.status)}`}>
                                {market.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span>Creator: {shortenAddress(market.creator)}</span>
                              <span>Volume: {formatCurrency(market.volume)}</span>
                              <span>Participants: {market.participants}</span>
                              <span>Ends: {formatDate(market.endDate)}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-neon text-white rounded text-sm hover:brightness-110 transition">
                              View
                            </button>
                            <button className="px-3 py-1 bg-white/10 border border-white/20 rounded text-sm hover:bg-white/20 transition">
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">User Management</h2>
                    <select
                      value={selectedUserStatus}
                      onChange={(e) => setSelectedUserStatus(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neon transition"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="banned">Banned</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="bg-white/5 border border-white/10 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{user.username}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span>Address: {shortenAddress(user.address)}</span>
                              <span>Total Bets: {user.totalBets}</span>
                              <span>Volume: {formatCurrency(user.totalVolume)}</span>
                              <span>Joined: {formatDate(user.joinDate)}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-neon text-white rounded text-sm hover:brightness-110 transition">
                              View
                            </button>
                            <button className="px-3 py-1 bg-white/10 border border-white/20 rounded text-sm hover:bg-white/20 transition">
                              {user.status === 'active' ? 'Suspend' : 'Activate'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Platform Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Platform Configuration</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Platform Fee Rate (%)
                          </label>
                          <input
                            type="number"
                            defaultValue="2.5"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Minimum Bet Amount (USD)
                          </label>
                          <input
                            type="number"
                            defaultValue="10"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-400">Require 2FA for admin access</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Market Approval Required</h4>
                            <p className="text-sm text-gray-400">All new markets require admin approval</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="px-6 py-3 bg-neon text-white rounded-lg hover:brightness-110 transition">
                        Save Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 