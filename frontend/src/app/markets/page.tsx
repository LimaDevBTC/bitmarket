"use client";

import { useState } from 'react';
import MarketCard from '@/components/MarketCard';
import { Search, Filter, TrendingUp, Clock, Star } from 'lucide-react';

// Dados mock para mercados
const mockMarkets = [
  {
    id: '1',
    title: 'Bitcoin atingirá $100k em 2024?',
    description: 'Bitcoin alcançará o preço de $100,000 USD até 31 de dezembro de 2024',
    image: '/api/placeholder/400/200',
    odds: { yes: 0.65, no: 0.35 },
    price: 0.65,
    volume: 125000,
    endDate: '2024-12-31',
    category: 'Crypto',
    isTrending: true,
    isNew: false
  },
  {
    id: '2',
    title: 'Ethereum ETF será aprovado em 2024?',
    description: 'SEC aprovará pelo menos um ETF de Ethereum spot em 2024',
    image: '/api/placeholder/400/200',
    odds: { yes: 0.45, no: 0.55 },
    price: 0.45,
    volume: 89000,
    endDate: '2024-12-31',
    category: 'Crypto',
    isTrending: true,
    isNew: true
  },
  {
    id: '3',
    title: 'Biden será reeleito presidente?',
    description: 'Joe Biden será reeleito presidente dos Estados Unidos em 2024',
    image: '/api/placeholder/400/200',
    odds: { yes: 0.38, no: 0.62 },
    price: 0.38,
    volume: 210000,
    endDate: '2024-11-05',
    category: 'Politics',
    isTrending: false,
    isNew: false
  },
  {
    id: '4',
    title: 'Lakers ganharão o campeonato NBA?',
    description: 'Los Angeles Lakers vencerão o campeonato da NBA 2024-25',
    image: '/api/placeholder/400/200',
    odds: { yes: 0.22, no: 0.78 },
    price: 0.22,
    volume: 67000,
    endDate: '2025-06-30',
    category: 'Sports',
    isTrending: false,
    isNew: true
  },
  {
    id: '5',
    title: 'Tesla entregará 2M+ veículos em 2024?',
    description: 'Tesla entregará mais de 2 milhões de veículos em 2024',
    image: '/api/placeholder/400/200',
    odds: { yes: 0.72, no: 0.28 },
    price: 0.72,
    volume: 95000,
    endDate: '2024-12-31',
    category: 'Companies',
    isTrending: true,
    isNew: false
  },
  {
    id: '6',
    title: 'GPT-5 será lançado em 2024?',
    description: 'OpenAI lançará GPT-5 publicamente em 2024',
    image: '/api/placeholder/400/200',
    odds: { yes: 0.28, no: 0.72 },
    price: 0.28,
    volume: 78000,
    endDate: '2024-12-31',
    category: 'Tech & Science',
    isTrending: false,
    isNew: true
  }
];

const categories = ['Todos', 'Trending', 'Novos', 'Crypto', 'Politics', 'Sports', 'Companies', 'Tech & Science'];

export default function MarketsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('volume');

  // Filtrar mercados
  const filteredMarkets = mockMarkets.filter(market => {
    const matchesSearch = market.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todos' || 
                           (selectedCategory === 'Trending' && market.isTrending) ||
                           (selectedCategory === 'Novos' && market.isNew) ||
                           market.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Ordenar mercados
  const sortedMarkets = [...filteredMarkets].sort((a, b) => {
    switch (sortBy) {
      case 'volume':
        return b.volume - a.volume;
      case 'price':
        return b.price - a.price;
      case 'endDate':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Filtros e Busca */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Busca */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar mercados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-4">
            {/* Categorias */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon transition"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Ordenação */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon transition"
            >
              <option value="volume">Volume</option>
              <option value="price">Preço</option>
              <option value="endDate">Data Final</option>
            </select>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-neon" />
              <div>
                <p className="text-sm text-gray-400">Mercados Ativos</p>
                <p className="text-xl font-bold">{filteredMarkets.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-neon" />
              <div>
                <p className="text-sm text-gray-400">Volume Total</p>
                <p className="text-xl font-bold">$2.1M</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-neon" />
              <div>
                <p className="text-sm text-gray-400">Apostas Hoje</p>
                <p className="text-xl font-bold">1,247</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-neon" />
              <div>
                <p className="text-sm text-gray-400">Categorias</p>
                <p className="text-xl font-bold">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Mercados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMarkets.map(market => (
            <MarketCard 
              key={market.id}
              title={market.title}
              odds={market.price * 100}
              volume={market.volume}
              timeLeft={`Encerra em ${new Date(market.endDate).toLocaleDateString()}`}
              imageUrl={market.image}
              description={market.description}
            />
          ))}
        </div>

        {sortedMarkets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Nenhum mercado encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
} 