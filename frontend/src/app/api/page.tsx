export default function ApiPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">API Reference</h1>
          <p className="text-gray-400 text-lg">Developer documentation for BitMarket.bet API</p>
        </div>

        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Authentication</h2>
            <div className="space-y-4 text-gray-300">
              <p>All API requests require authentication using your API key.</p>
              <div className="bg-gray-800 rounded-lg p-4">
                <code className="text-green-400">Authorization: Bearer YOUR_API_KEY</code>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Endpoints</h2>
            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">GET /api/markets</h3>
                <p>Retrieve all available prediction markets</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">GET /api/markets/:id</h3>
                <p>Get details for a specific market</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">POST /api/markets</h3>
                <p>Create a new prediction market</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">POST /api/bets</h3>
                <p>Place a bet on a market</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Rate Limits</h2>
            <div className="space-y-4 text-gray-300">
              <p>API requests are limited to 100 requests per minute per API key.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Getting Started</h2>
            <div className="space-y-4 text-gray-300">
              <p>To get started with the API:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Generate an API key in your account settings</li>
                <li>Include the key in your request headers</li>
                <li>Start making API calls</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 