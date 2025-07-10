"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowUpRight, TrendingUp } from "lucide-react";

interface Market {
  id: string;
  title: string;
  description: string;
  total_liquidity: string;
  total_volume: string;
  status: string;
  outcome_a: string;
  outcome_b: string;
}

export default function MarketListPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/markets');
      const data = await response.json();
      setMarkets(data);
    } catch (error) {
      console.error('Error fetching markets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMarket = () => {
    router.push('/create-market');
  };

  const handleViewMarket = (marketId: string) => {
    router.push(`/market/${marketId}`);
  };

  return (
    <div className="min-h-screen bg-premium">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">All Markets</h1>
            <p className="text-secondary">View all active and closed markets on the platform.</p>
          </div>
          <Button className="btn-primary" onClick={handleCreateMarket}>
            <Plus className="mr-2 h-5 w-5" />
            Create Market
          </Button>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-orange mx-auto"></div>
            <p className="mt-4 text-secondary">Loading markets...</p>
          </div>
        ) : markets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market, index) => (
              <motion.div
                key={market.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Card className="premium-card-hover cursor-pointer" onClick={() => handleViewMarket(market.id)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-primary">{market.title}</CardTitle>
                      <Badge 
                        className={market.status === 'active' 
                          ? 'badge-success' 
                          : 'badge-error'
                        }
                      >
                        {market.status === 'active' ? 'Active' : 'Closed'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary mb-4 line-clamp-2">
                      {market.description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">{market.outcome_a}:</span>
                        <span className="text-primary font-medium">50%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">{market.outcome_b}:</span>
                        <span className="text-primary font-medium">50%</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-glass-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">Liquidity:</span>
                        <span className="text-primary font-medium">${parseFloat(market.total_liquidity).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">Volume:</span>
                        <span className="text-primary font-medium">${parseFloat(market.total_volume).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="ghost" size="sm" className="text-accent-orange hover:text-accent-orange-hover">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        Trade
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="premium-card text-center py-12">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-tertiary" />
            <h3 className="text-lg font-medium text-primary mb-2">No markets found</h3>
            <p className="text-secondary mb-4">Be the first to create a prediction market!</p>
            <Button className="btn-primary" onClick={handleCreateMarket}>
              <Plus className="mr-2 h-4 w-4" />
              Create Market
            </Button>
          </Card>
        )}
      </main>
    </div>
  );
} 