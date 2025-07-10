"use client";

import { useWallet } from "@/context/WalletContext";
import { Wallet } from "lucide-react";

export function WalletBalance() {
  const { balance, isConnected } = useWallet();

  if (!isConnected) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-700/50">
      <Wallet className="w-4 h-4 text-orange-500" />
      <div className="flex flex-col">
        <span className="text-xs text-gray-400">Balance</span>
        <span className="text-sm font-medium text-white">
          {balance ? `${balance.toFixed(8)} BTC` : "0.00000000 BTC"}
        </span>
      </div>
    </div>
  );
} 