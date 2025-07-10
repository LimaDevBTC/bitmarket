"use client";

import { useState } from "react";

export default function ProposeMarketPage() {
  const [title, setTitle] = useState("");

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Propose a Market</h1>
        
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Market Idea</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Market Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
                placeholder="e.g., Will Bitcoin reach $100k by end of 2024?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition resize-none"
                placeholder="Describe the market in detail. What event are we predicting?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-neon transition">
                <option value="Crypto">Crypto</option>
                <option value="Politics">Politics</option>
                <option value="Sports">Sports</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            
            <div className="pt-4">
              <button className="bg-neon hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition">
                Submit Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 