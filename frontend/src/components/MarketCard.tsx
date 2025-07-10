// src/components/MarketCard.tsx
"use client";

import React from 'react';

interface MarketCardProps {
  title: string;
  odds: number;
  volume?: number;
  timeLeft?: string;
  imageUrl?: string;
  description?: string;
  onPrev?: () => void;
  onNext?: () => void;
  showArrows?: boolean;
  current?: number;
  total?: number;
}

export default function MarketCard({
  title,
  odds,
  volume,
  timeLeft,
  imageUrl,
  description,
  onPrev,
  onNext,
  showArrows = false,
  current = 0,
  total = 1,
}: MarketCardProps) {
  return (
    <div
      className="w-full max-w-[1200px] mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-0 flex flex-col md:flex-row overflow-hidden min-h-[420px] md:min-h-[520px] relative"
    >
      {/* Coluna esquerda */}
      <div className="flex-[1.5] flex flex-col gap-3 p-6 md:p-12 justify-between min-w-[320px] md:min-w-[420px]">
        {/* Imagem, título, subtítulo */}
        <div className="flex items-start gap-4 mb-2">
          <div className="w-20 h-20 rounded-xl bg-gray-800/60 flex items-center justify-center overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt="Market" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-600 text-xs">Imagem</span>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="font-bold font-display text-white text-xl md:text-3xl line-clamp-2 mb-1">{title}</h2>
            <span className="text-xs text-gray-400">Prediction Market</span>
            {timeLeft && <span className="text-xs text-gray-500 mt-1">{timeLeft}</span>}
          </div>
        </div>
        {/* Botões Yes/No + Odds/Preço */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 flex flex-col items-center">
            <button className="w-full bg-white/10 border border-white/20 text-white font-bold py-3 rounded-lg hover:bg-neon hover:text-background transition text-lg md:text-2xl mb-1">Yes</button>
            <span className="text-xs text-gray-300">$100 → <span className="text-neon font-bold">${(odds * 2).toFixed(0)}</span></span>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <button className="w-full bg-background border border-neon text-neon font-bold py-3 rounded-lg hover:bg-neon hover:text-white transition text-lg md:text-2xl mb-1">No</button>
            <span className="text-xs text-gray-300">$100 → <span className="text-neon font-bold">${(100 - odds * 2).toFixed(0)}</span></span>
          </div>
        </div>
        {/* Descrição/notícia */}
        <div className="text-xs text-gray-300 mt-4 mb-2">
          <span className="font-bold text-white">News</span> · {description || 'Notícia ou descrição do mercado...'}
        </div>
        {/* Volume/participação */}
        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
          <span>Vol: <span className="text-white font-bold">{volume !== undefined ? volume : '0'}</span></span>
          <span className="text-xs text-gray-500">Powered by BitMarket.bet</span>
        </div>
      </div>
      {/* Coluna direita: Odds grande + Gráfico */}
      <div className="w-full md:w-[420px] flex flex-col items-center justify-center bg-white/5 border-l border-white/10 p-6 md:p-12 min-h-[320px]">
        <div className="flex items-center gap-2 mb-2 mt-2 md:mt-0">
          <span className="text-4xl md:text-6xl font-bold text-white">{odds}%</span>
          <span className="text-lg text-gray-400">chance</span>
        </div>
        {/* Placeholder gráfico */}
        <div className="w-full h-28 md:h-40 flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 300 80">
            <polyline
              fill="none"
              stroke="#fa5b1c"
              strokeWidth="4"
              points="0,60 40,40 80,55 120,30 160,35 200,15 240,40 280,20 300,60"
              opacity="0.8"
            />
          </svg>
        </div>
        <div className="flex items-center gap-1 mt-4 select-none">
          <span className="text-lg font-bold font-display text-white">bitmarket</span>
          <span className="text-lg font-bold font-display text-neon">.bet</span>
        </div>
      </div>
      {/* Setas de navegação nas bordas inferiores do card */}
      {showArrows && (
        <>
          <button
            onClick={onPrev}
            className="absolute bottom-1 left-1 z-20 bg-gray-800/80 hover:bg-neon/80 text-white rounded-full p-3 shadow-lg focus:outline-none"
            style={{ minWidth: 48, minHeight: 48 }}
            aria-label="Anterior"
          >
            &#8592;
          </button>
          <button
            onClick={onNext}
            className="absolute bottom-1 right-1 z-20 bg-gray-800/80 hover:bg-neon/80 text-white rounded-full p-3 shadow-lg focus:outline-none"
            style={{ minWidth: 48, minHeight: 48 }}
            aria-label="Próximo"
          >
            &#8594;
          </button>
        </>
      )}
      {/* Dots de navegação */}
      {total > 1 && (
        <div className="flex justify-center gap-2 absolute left-0 right-0 bottom-2 z-10">
          {Array.from({ length: total }).map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full inline-block ${idx === current ? 'bg-neon' : 'bg-gray-700'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 