export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-gray-400 text-lg">Learn how to use BitMarket.bet</p>
        </div>

        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Getting Started</h2>
            <div className="space-y-4 text-gray-300">
              <p>Welcome to BitMarket.bet! This guide will help you get started with prediction markets.</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Connect your Bitcoin wallet</li>
                <li>Browse available markets</li>
                <li>Place your first bet</li>
                <li>Create your own markets</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">How Prediction Markets Work</h2>
            <div className="space-y-4 text-gray-300">
              <p>Prediction markets allow you to bet on the outcome of real-world events using Bitcoin.</p>
              <p>When you bet "Yes" on an outcome, you're buying shares that will be worth 1 Bitcoin if the event happens, or 0 if it doesn't.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Creating Markets</h2>
            <div className="space-y-4 text-gray-300">
              <p>Learn how to create your own prediction markets and set up outcome criteria.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Advanced Features</h2>
            <div className="space-y-4 text-gray-300">
              <p>Explore advanced features like market liquidity, odds calculation, and portfolio management.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 