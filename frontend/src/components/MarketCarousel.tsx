"use client";

import React, { useState } from 'react';
import MarketCard from './MarketCard';

interface Market {
  id: string;
  title: string;
  description: string;
  category: string;
  endDate: string;
  totalVolume: number;
  participants: number;
  odds: {
    yes: number;
    no: number;
  };
  status: "active" | "settled" | "pending";
  volume?: number;
  timeLeft?: string;
  imageUrl?: string;
}

const mockMarkets: Market[] = [
  {
    id: "1",
    title: "Bitcoin ETF Approval",
    description: "Will the SEC approve a Bitcoin ETF by end of 2024?",
    category: "Crypto",
    endDate: "2024-12-31",
    totalVolume: 1250000,
    participants: 342,
    odds: { yes: 0.65, no: 0.35 },
    status: "active",
    volume: 1250000,
    timeLeft: "12 months"
  },
  {
    id: "2",
    title: "Ethereum Merge Success",
    description: "Will Ethereum successfully complete the merge to Proof of Stake?",
    category: "Crypto",
    endDate: "2024-09-15",
    totalVolume: 890000,
    participants: 156,
    odds: { yes: 0.85, no: 0.15 },
    status: "settled",
    volume: 890000,
    timeLeft: "3 months"
  },
  {
    id: "3",
    title: "US Recession 2024",
    description: "Will the US enter a recession in 2024?",
    category: "Economy",
    endDate: "2024-12-31",
    totalVolume: 2100000,
    participants: 567,
    odds: { yes: 0.45, no: 0.55 },
    status: "active",
    volume: 2100000,
    timeLeft: "12 months"
  },
  {
    id: "4",
    title: "SpaceX Mars Mission",
    description: "Will SpaceX successfully land on Mars by 2025?",
    category: "Technology",
    endDate: "2025-12-31",
    totalVolume: 450000,
    participants: 89,
    odds: { yes: 0.25, no: 0.75 },
    status: "active",
    volume: 450000,
    timeLeft: "12 months"
  }
];

interface MarketCarouselProps {
  markets?: Market[];
}

export default function MarketCarousel({ markets }: MarketCarouselProps) {
  // Se não receber markets, usa mockMarkets
  const data = markets && markets.length > 0 ? markets : mockMarkets;
  const [current, setCurrent] = useState(0);
  const total = data.length;

  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const next = () => setCurrent((prev) => (prev + 1) % total);

  if (total === 0) return null;

  return (
    <div className="w-full px-2 md:px-8 lg:px-16 xl:px-32">
      <div className="relative w-full">
        <MarketCard
          {...data[current]}
          odds={typeof data[current].odds === 'number' ? data[current].odds : (data[current].odds?.yes ? Math.round(data[current].odds.yes * 100) : 50)}
          showArrows={total > 1}
          onPrev={prev}
          onNext={next}
          current={current}
          total={total}
        />
      </div>
    </div>
  );
} 