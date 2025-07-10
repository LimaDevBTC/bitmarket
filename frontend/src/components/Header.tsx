"use client";

import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

const categories = [
  'Trending', 'New', 'Politics', 'Sports', 'Culture', 'Crypto', 'Economics', 'Mentions', 'Companies', 'Financials', 'Tech & Science', 'Health',
  'Elections', 'Weather', 'Energy', 'Commodities', 'Real Estate', 'Travel', 'Entertainment', 'Gaming', 'Education', 'Environment', 'Startups', 'AI',
  'NFTs', 'DeFi', 'Metaverse', 'Space', 'Science', 'World News', 'US News', 'Europe', 'Asia', 'Africa', 'Latin America', 'Oceania',
];
const tags = [
  'For you', 'NYC Mayor', 'Iran', 'Club World Cup', 'Pro-Basketball Draft', 'M3GAN 2.0', 'Benson Boone'
];

export default function Header() {
  // Estado global único para item selecionado (excluindo "Trending" e "For you" que são fixos)
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  // Refs para rolagem
  const catRef = useRef<HTMLDivElement>(null);

  // Funções de rolagem
  const scrollCategories = (dir: 'left' | 'right') => {
    if (!catRef.current) return;
    const scrollAmount = 120;
    catRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  // Função para verificar se uma categoria está ativa
  const isCategoryActive = (category: string) => {
    if (category === 'Trending') return true; // Sempre ativo
    return selectedItem === category;
  };

  // Função para verificar se uma tag está ativa
  const isTagActive = (tag: string) => {
    if (tag === 'For you') return true; // Sempre ativo
    return selectedItem === tag;
  };

  // Função para lidar com clique em categoria
  const handleCategoryClick = (category: string) => {
    if (category === 'Trending') return; // Não permite desselecionar "Trending"
    setSelectedItem(selectedItem === category ? null : category);
  };

  // Função para lidar com clique em tag
  const handleTagClick = (tag: string) => {
    if (tag === 'For you') return; // Não permite desselecionar "For you"
    setSelectedItem(selectedItem === tag ? null : tag);
  };

  return (
    <header className="w-full bg-background/80 text-white border-b border-gray-800 backdrop-blur-xl sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-3 items-center gap-4">
        {/* Logo à esquerda */}
        <div className="flex justify-start">
          <Link href="/" className="flex items-center gap-1 select-none">
            <span className="text-xl sm:text-2xl font-bold font-display text-white">bitmarket</span>
            <span className="text-xl sm:text-2xl font-bold font-display text-neon">.bet</span>
          </Link>
        </div>
        {/* Navegação centralizada */}
        <nav className="flex justify-center gap-8 text-lg font-medium">
          <Link href="/markets" className="text-white hover:text-neon transition-colors">Markets</Link>
          <Link href="/" className="text-white hover:text-neon transition-colors">Live</Link>
          <Link href="/propose-market" className="text-white hover:text-neon transition-colors">Ideas</Link>
        </nav>
        {/* Buscador + botão à direita */}
        <div className="flex justify-end items-center gap-4">
          <form className="hidden md:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar mercados ou perfis"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </form>
          <button className="bg-neon text-white font-bold px-4 py-2 rounded-lg shadow hover:brightness-110 transition font-display text-sm sm:text-base">
            Connect Wallet
          </button>
        </div>
      </div>
      {/* Sub-header: categorias e tags */}
      <div className="w-full bg-background/70 border-b border-white/10 px-2 md:px-0">
        <div className="max-w-6xl mx-auto flex flex-col gap-0 py-1 min-h-0">
          {/* Categorias com rolagem e setas */}
          <div className="relative flex items-center">
            <div className="relative w-full min-h-0">
              {/* Seta esquerda absoluta */}
              <button
                className="hidden md:flex items-center justify-center absolute left-[-32px] top-1/2 -translate-y-1/2 h-8 w-8 bg-background/80 hover:bg-white/10 rounded transition z-30"
                onClick={() => scrollCategories('left')}
                type="button"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              </button>
              <div className="flex items-center w-full pl-0 md:pl-0">
                {/* Trending fixo */}
                <div className="flex-shrink-0 mr-4">
                  <button
                    className="text-base font-bold text-neon whitespace-nowrap bg-transparent border-none outline-none focus:outline-none px-0 py-0"
                    style={{ background: 'none', boxShadow: 'none' }}
                    type="button"
                  >
                    Trending
                  </button>
                </div>
                {/* Categorias roláveis, sem barra de rolagem */}
                <div
                  ref={catRef}
                  className="flex gap-4 overflow-hidden"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {categories.slice(1).map((cat) => (
                    <button
                      key={cat}
                      className={`text-base font-medium whitespace-nowrap transition px-0 py-0 bg-transparent border-none outline-none focus:outline-none ${isCategoryActive(cat) ? 'text-neon font-bold' : 'text-gray-300 font-normal'}`}
                      style={{ background: 'none', boxShadow: 'none' }}
                      onClick={() => handleCategoryClick(cat)}
                      type="button"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              {/* Seta direita absoluta */}
              <button
                className="hidden md:flex items-center justify-center absolute right-[-32px] top-1/2 -translate-y-1/2 h-8 w-8 bg-background/80 hover:bg-white/10 rounded transition z-30"
                onClick={() => scrollCategories('right')}
                type="button"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          {/* Tags personalizadas, texto puro, alinhadas com as categorias */}
          <div className="flex gap-3 mt-0 pl-0 md:pl-0 text-sm md:text-base min-h-0">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`font-medium whitespace-nowrap bg-transparent border-none outline-none focus:outline-none px-0 py-0 ${isTagActive(tag) ? 'text-neon font-bold' : 'text-gray-400 font-normal'}`}
                style={{ background: 'none', boxShadow: 'none' }}
                onClick={() => handleTagClick(tag)}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
} 