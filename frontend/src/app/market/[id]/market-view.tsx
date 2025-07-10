'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Market = {
    id: number;
    title: string;
    description: string;
    liquidity: number;
    volume: number;
    odds: { yes: number; no: number };
};

const BetButton = ({ outcome, percentage, selected, onClick }: { outcome: 'SIM' | 'NÃO', percentage: number, selected: boolean, onClick: () => void }) => {
  const bgColor = outcome === 'SIM' ? 'bg-teal-500/20 hover:bg-teal-500/30' : 'bg-red-500/20 hover:bg-red-500/30';
  const borderColor = outcome === 'SIM' ? 'border-teal-500/50' : 'border-red-500/50';
  const ringColor = outcome === 'SIM' ? 'ring-teal-400' : 'ring-red-400';

  return (
    <motion.button 
      type="button" 
      onClick={onClick} 
      className={`w-full p-6 rounded-xl text-center transition-all duration-300 border-2 ${selected ? `ring-2 ${ringColor} ${borderColor}` : `border-gray-700/80 ${bgColor}`}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
        <span className="font-bold text-lg text-white">Apostar {outcome}</span>
        <span className="block text-4xl font-bold mt-1" style={{ color: outcome === 'SIM' ? '#2dd4bf' : '#f87171' }}>{percentage}%</span>
    </motion.button>
  );
};


export function MarketView({ market }: { market: Market }) {
  const [betAmount, setBetAmount] = useState('');
  const [selectedOutcome, setSelectedOutcome] = useState<'yes' | 'no' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBetSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedOutcome || !betAmount || Number(betAmount) <= 0) {
      setError('Por favor, selecione um resultado e insira um valor de aposta válido.');
      return;
    }
    
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:3001/markets/${market.id}/bets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          outcome: selectedOutcome,
          quantity: Number(betAmount),
          asset: 'USDC-Rune', // Ativo fixo por enquanto
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Falha ao registrar a aposta.');
      }

      const result = await response.json();
      console.log('Aposta registrada:', result);
      alert(`Aposta de ${betAmount} USDC-Rune em '${selectedOutcome}' realizada com sucesso!`);
      
      setBetAmount('');
      setSelectedOutcome(null);

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div 
      className="container mx-auto p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">{market.title}</h1>
        <p className="text-md text-gray-400 mt-3 max-w-3xl mx-auto">{market.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Faça sua aposta</h2>
            
            <form onSubmit={handleBetSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                  <BetButton outcome="SIM" percentage={Math.round(market.odds.yes * 100)} selected={selectedOutcome === 'yes'} onClick={() => setSelectedOutcome('yes')} />
                  <BetButton outcome="NÃO" percentage={Math.round(market.odds.no * 100)} selected={selectedOutcome === 'no'} onClick={() => setSelectedOutcome('no')} />
              </div>

              <div className="mb-6">
                <label htmlFor="bet-amount" className="block text-gray-300 text-sm font-bold mb-2">Valor da Aposta (USDC-Rune)</label>
                <input
                  type="number"
                  id="bet-amount"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-black/20 border-2 border-gray-600/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 disabled:bg-gray-600/50 disabled:cursor-not-allowed shadow-blue-500/20 hover:shadow-blue-500/40 shadow-lg" disabled={!selectedOutcome || !betAmount || isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Confirmar Aposta'}
              </button>
              {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}
            </form>
          </div>
        </motion.div>

        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-lg space-y-6">
            <h2 className="text-2xl font-bold mb-2 text-center">Informações do Pool</h2>
            <div className="text-center">
              <span className="text-sm text-gray-400">Liquidez Total</span>
              <p className="text-3xl font-bold text-white">${market.liquidity.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-400">Volume (24h)</span>
              <p className="text-3xl font-bold text-white">${market.volume.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 