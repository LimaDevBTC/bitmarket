"use client";

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, AlertCircle, Download, Search, ExternalLink } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

interface Transaction {
  id: string;
  txid: string;
  type: 'incoming' | 'outgoing' | 'internal';
  amount: number;
  fee: number;
  confirmations: number;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
  address: string;
  blockHeight?: number;
}

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    txid: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
    type: 'incoming',
    amount: 0.005,
    fee: 0.0001,
    confirmations: 6,
    timestamp: '2024-01-15T10:30:00Z',
    status: 'confirmed',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    blockHeight: 825000
  },
  {
    id: '2',
    txid: 'b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678',
    type: 'outgoing',
    amount: -0.002,
    fee: 0.00005,
    confirmations: 0,
    timestamp: '2024-01-15T09:15:00Z',
    status: 'pending',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
  },
  {
    id: '3',
    txid: 'c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890',
    type: 'incoming',
    amount: 0.001,
    fee: 0.0001,
    confirmations: 12,
    timestamp: '2024-01-14T16:45:00Z',
    status: 'confirmed',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    blockHeight: 824950
  },
  {
    id: '4',
    txid: 'd4e5f6789012345678901234567890abcdef1234567890abcdef1234567890ab',
    type: 'outgoing',
    amount: -0.003,
    fee: 0.00008,
    confirmations: 24,
    timestamp: '2024-01-13T14:20:00Z',
    status: 'confirmed',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    blockHeight: 824800
  },
  {
    id: '5',
    txid: 'e5f6789012345678901234567890abcdef1234567890abcdef1234567890abcd',
    type: 'internal',
    amount: 0.001,
    fee: 0.00002,
    confirmations: 0,
    timestamp: '2024-01-12T11:30:00Z',
    status: 'failed',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
  }
];

export default function TransactionsPage() {
  const { paymentAddress } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    setLoading(true);
    // Simular carregamento de dados
    setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 1000);
  }, [paymentAddress]);

  const formatBTC = (amount: number) => {
    return `${amount.toFixed(8)} BTC`;
  };

  const formatUSD = (btcAmount: number) => {
    // Mock BTC price
    const btcPrice = 45000;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(btcAmount * btcPrice);
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
      case 'incoming':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'outgoing':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case 'internal':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
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
      case 'incoming':
        return 'Received';
      case 'outgoing':
        return 'Sent';
      case 'internal':
        return 'Internal';
      default:
        return type;
    }
  };

  const shortenTxid = (txid: string) => {
    return `${txid.slice(0, 8)}...${txid.slice(-8)}`;
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  // Filtrar transações
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.txid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || tx.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || tx.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calcular estatísticas
  const totalIncoming = filteredTransactions
    .filter(tx => tx.type === 'incoming' && tx.status === 'confirmed')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const totalOutgoing = filteredTransactions
    .filter(tx => tx.type === 'outgoing' && tx.status === 'confirmed')
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  
  const totalFees = filteredTransactions
    .filter(tx => tx.status === 'confirmed')
    .reduce((sum, tx) => sum + tx.fee, 0);

  const pendingTransactions = filteredTransactions.filter(tx => tx.status === 'pending').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon mx-auto mb-4"></div>
          <p className="text-gray-400">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background/50 to-background/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bitcoin <span className="text-neon">Transactions</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Track all your Bitcoin transactions, confirmations, and network activity.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-400">Total Received</p>
                <p className="text-2xl font-bold">{formatBTC(totalIncoming)}</p>
                <p className="text-sm text-gray-500">{formatUSD(totalIncoming)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-400">Total Sent</p>
                <p className="text-2xl font-bold">{formatBTC(totalOutgoing)}</p>
                <p className="text-sm text-gray-500">{formatUSD(totalOutgoing)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-neon" />
              <div>
                <p className="text-sm text-gray-400">Total Fees</p>
                <p className="text-2xl font-bold">{formatBTC(totalFees)}</p>
                <p className="text-sm text-gray-500">{formatUSD(totalFees)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-bold">{pendingTransactions}</p>
                <p className="text-sm text-gray-500">transactions</p>
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
                  placeholder="Search by TXID or address..."
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
                <option value="incoming">Incoming</option>
                <option value="outgoing">Outgoing</option>
                <option value="internal">Internal</option>
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
                        <h3 className="font-semibold">{getTypeLabel(tx.type)}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                          {tx.status}
                        </span>
                        {tx.confirmations > 0 && (
                          <span className="text-xs text-gray-400">
                            {tx.confirmations} confirmations
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>TXID: {shortenTxid(tx.txid)}</span>
                        <span>Address: {shortenAddress(tx.address)}</span>
                        <span>{formatDate(tx.timestamp)}</span>
                      </div>
                      {tx.blockHeight && (
                        <p className="text-xs text-gray-500 mt-1">
                          Block: {tx.blockHeight}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(tx.status)}
                      <p className={`text-lg font-bold ${tx.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {tx.amount >= 0 ? '+' : ''}{formatBTC(tx.amount)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400">
                      {formatUSD(Math.abs(tx.amount))}
                    </p>
                    <p className="text-xs text-gray-500">
                      Fee: {formatBTC(tx.fee)}
                    </p>
                  </div>
                </div>
                
                {/* Ações */}
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-white/10">
                  <button className="flex items-center gap-1 px-3 py-1 text-xs bg-white/10 rounded hover:bg-white/20 transition">
                    <ExternalLink className="w-3 h-3" />
                    View on Explorer
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 text-xs bg-white/10 rounded hover:bg-white/20 transition">
                    <Download className="w-3 h-3" />
                    Export
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 