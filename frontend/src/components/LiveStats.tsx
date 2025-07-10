"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Users, DollarSign, Clock } from "lucide-react";

interface Stat {
  id: string;
  label: string;
  value: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const mockStats: Stat[] = [
  {
    id: "1",
    label: "24h Volume",
    value: "$2.4M",
    change: 12.5,
    icon: DollarSign,
    color: "text-green-500"
  },
  {
    id: "2",
    label: "Active Markets",
    value: "156",
    change: -2.1,
    icon: Activity,
    color: "text-blue-500"
  },
  {
    id: "3",
    label: "Total Users",
    value: "1,247",
    change: 8.3,
    icon: Users,
    color: "text-purple-500"
  },
  {
    id: "4",
    label: "Avg. Resolution",
    value: "3.2 days",
    change: -5.7,
    icon: Clock,
    color: "text-orange-500"
  }
];

export function LiveStats() {
  const [stats, setStats] = useState<Stat[]>(mockStats);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          change: stat.change + (Math.random() - 0.5) * 2,
          value: stat.id === "1" 
            ? `$${(parseFloat(stat.value.replace(/[^0-9.]/g, '')) + (Math.random() - 0.5) * 0.1).toFixed(1)}M`
            : stat.value
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Live Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.id} className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 shadow-xl hover:border-orange-500/30 hover:shadow-orange-500/10 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-')}/10`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {stat.change > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.change > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change > 0 ? '+' : ''}{stat.change.toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 