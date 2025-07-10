"use client";

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Clock, MessageSquare, Plus } from 'lucide-react';

interface Proposal {
  id: string;
  title: string;
  description: string;
  category: string;
  creator: string;
  votes: number;
  comments: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  endDate: string;
  outcomeA: string;
  outcomeB: string;
}

// Mock data
const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Will Solana reach $200 by end of 2024?',
    description: 'Solana (SOL) will reach or exceed $200 USD by December 31, 2024, based on CoinGecko closing price.',
    category: 'Crypto',
    creator: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    votes: 45,
    comments: 12,
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
    endDate: '2024-12-31T23:59:59Z',
    outcomeA: 'Yes',
    outcomeB: 'No'
  },
  {
    id: '2',
    title: 'Will Apple release a foldable iPhone in 2024?',
    description: 'Apple will officially announce and release a foldable iPhone device in 2024.',
    category: 'Technology',
    creator: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    votes: 23,
    comments: 8,
    status: 'pending',
    createdAt: '2024-01-14T15:45:00Z',
    endDate: '2024-12-31T23:59:59Z',
    outcomeA: 'Yes',
    outcomeB: 'No'
  },
  {
    id: '3',
    title: 'Will SpaceX successfully land on Mars in 2024?',
    description: 'SpaceX will successfully land a spacecraft on Mars surface in 2024.',
    category: 'Science',
    creator: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    votes: 67,
    comments: 15,
    status: 'approved',
    createdAt: '2024-01-13T09:20:00Z',
    endDate: '2024-12-31T23:59:59Z',
    outcomeA: 'Yes',
    outcomeB: 'No'
  }
];

const categories = [
  'Crypto',
  'Politics',
  'Sports',
  'Technology',
  'Entertainment',
  'Finance',
  'Science',
  'Other'
];

export default function ProposePage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    endDate: '',
    outcomeA: 'Yes',
    outcomeB: 'No'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular submissão
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    alert('Proposal submitted successfully!');
    setShowForm(false);
    setFormData({
      title: '',
      description: '',
      category: '',
      endDate: '',
      outcomeA: 'Yes',
      outcomeB: 'No'
    });
  };

  const handleVote = (proposalId: string, vote: 'up' | 'down') => {
    // Aqui você implementaria a lógica de votação
    console.log(`Voting ${vote} on proposal ${proposalId}`);
  };

  const filteredProposals = mockProposals.filter(proposal => 
    selectedStatus === 'all' || proposal.status === selectedStatus
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background/50 to-background/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Propose <span className="text-neon">Markets</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Suggest new prediction markets and vote on community proposals.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header com Botão */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Market Proposals</h2>
            <p className="text-gray-400">Vote on proposed markets and suggest new ones</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-neon text-white rounded-lg hover:brightness-110 transition"
          >
            <Plus className="w-4 h-4" />
            Propose Market
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <div className="flex gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon transition"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Lista de Propostas */}
        <div className="space-y-6">
          {filteredProposals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No proposals found with the selected filters.</p>
            </div>
          ) : (
            filteredProposals.map((proposal) => (
              <div key={proposal.id} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{proposal.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                        {proposal.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 mb-4">{proposal.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                      <span>Category: {proposal.category}</span>
                      <span>Creator: {shortenAddress(proposal.creator)}</span>
                      <span>Ends: {formatDate(proposal.endDate)}</span>
                      <span>Outcomes: {proposal.outcomeA} vs {proposal.outcomeB}</span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{proposal.votes} votes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{proposal.comments} comments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Created {formatDate(proposal.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-6">
                    {proposal.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleVote(proposal.id, 'up')}
                          className="flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          Vote Up
                        </button>
                        <button
                          onClick={() => handleVote(proposal.id, 'down')}
                          className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition"
                        >
                          <ThumbsDown className="w-3 h-3" />
                          Vote Down
                        </button>
                      </>
                    )}
                    <button className="px-3 py-1 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background border border-white/10 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Propose New Market</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Market Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Will Bitcoin reach $100k in 2024?"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide a clear description of what this market is predicting..."
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon transition"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon transition"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Outcome A *
                  </label>
                  <input
                    type="text"
                    value={formData.outcomeA}
                    onChange={(e) => setFormData(prev => ({ ...prev, outcomeA: e.target.value }))}
                    placeholder="e.g., Yes"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Outcome B *
                  </label>
                  <input
                    type="text"
                    value={formData.outcomeB}
                    onChange={(e) => setFormData(prev => ({ ...prev, outcomeB: e.target.value }))}
                    placeholder="e.g., No"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
                    required
                  />
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-500 mb-2">Submission Guidelines</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Proposals must be clear and verifiable</li>
                  <li>• Resolution source must be objective and accessible</li>
                  <li>• Community will vote on your proposal</li>
                  <li>• Approved proposals will be created as markets</li>
                </ul>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-neon text-white rounded-lg hover:brightness-110 transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 