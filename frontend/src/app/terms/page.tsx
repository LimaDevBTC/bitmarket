export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using BitMarket.bet, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please 
              do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p className="mb-4">
              BitMarket.bet is a decentralized prediction markets platform built on Bitcoin's base layer. 
              Users can create markets, place bets, and earn rewards based on the outcome of real-world events.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
            <p className="mb-4">As a user of BitMarket.bet, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate and truthful information</li>
              <li>Maintain the security of your wallet and private keys</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not engage in market manipulation or fraud</li>
              <li>Not create markets with illegal or harmful outcomes</li>
              <li>Respect the rights of other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Market Creation Rules</h2>
            <p className="mb-4">
              When creating prediction markets, you must ensure:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Markets have clear, objective resolution criteria</li>
              <li>Outcomes are verifiable and publicly accessible</li>
              <li>No markets involve illegal activities or harm to others</li>
              <li>Markets do not violate intellectual property rights</li>
              <li>Personal information of individuals is not exploited</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Financial Terms</h2>
            <p className="mb-4">
              All transactions on BitMarket.bet are conducted in Bitcoin (sats). Users acknowledge that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Cryptocurrency values are volatile and can fluctuate significantly</li>
              <li>Past performance does not guarantee future results</li>
              <li>You are responsible for your own investment decisions</li>
              <li>Platform fees are deducted from transactions</li>
              <li>Refunds are not available for completed transactions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Dispute Resolution</h2>
            <p className="mb-4">
              Market outcomes are determined by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Objective criteria specified in the market description</li>
              <li>Publicly available information and official sources</li>
              <li>Community consensus for ambiguous cases</li>
              <li>Administrative review for complex disputes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              BitMarket.bet is provided "as is" without warranties of any kind. We are not liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Loss of funds due to user error or wallet compromise</li>
              <li>Market outcomes or investment losses</li>
              <li>Technical issues or platform downtime</li>
              <li>Third-party actions or blockchain network issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Termination</h2>
            <p className="mb-4">
              We reserve the right to terminate or suspend access to our service immediately, 
              without prior notice, for any reason whatsoever, including without limitation 
              if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. We will notify users 
              of any material changes via the platform or email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-neon">Email: legal@bitmarket.bet</p>
              <p className="text-gray-400 text-sm mt-2">
                We will respond to your inquiry within 30 days.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 