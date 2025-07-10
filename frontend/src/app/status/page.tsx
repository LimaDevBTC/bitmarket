"use client";

import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">System Status</h1>
          <p className="text-gray-400 text-lg">Real-time platform health and updates</p>
        </div>

        <div className="space-y-8">
          {/* Overall Status */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-semibold text-white">All Systems Operational</h2>
            </div>
            <p className="text-gray-300">All BitMarket.bet services are running normally.</p>
          </div>

          {/* Service Status */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Service Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Website</span>
                </div>
                <span className="text-green-400 text-sm">Operational</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">API</span>
                </div>
                <span className="text-green-400 text-sm">Operational</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Bitcoin Network</span>
                </div>
                <span className="text-green-400 text-sm">Operational</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Database</span>
                </div>
                <span className="text-green-400 text-sm">Operational</span>
              </div>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Recent Updates</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <h3 className="text-white font-medium">Platform Update</h3>
                  <p className="text-gray-400 text-sm">All systems running smoothly</p>
                  <p className="text-gray-500 text-xs">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <h3 className="text-white font-medium">Scheduled Maintenance</h3>
                  <p className="text-gray-400 text-sm">Database optimization completed</p>
                  <p className="text-gray-500 text-xs">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">99.9%</div>
                <div className="text-gray-400 text-sm">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">150ms</div>
                <div className="text-gray-400 text-sm">Average Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">1.2M</div>
                <div className="text-gray-400 text-sm">Transactions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 