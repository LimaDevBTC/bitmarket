export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              BitMarket.bet collects minimal personal information to provide our prediction markets platform. 
              We collect information you provide directly to us, such as when you create an account, 
              make transactions, or contact our support team.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Wallet addresses (for transaction processing)</li>
              <li>Transaction data (for market participation)</li>
              <li>Communication records (for customer support)</li>
              <li>Usage analytics (for platform improvement)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Process transactions and maintain market integrity</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our platform and user experience</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure platform security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              except in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who assist in platform operations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method 
              of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Blockchain Transparency</h2>
            <p className="mb-4">
              As an on-chain platform, all transactions are publicly visible on the Bitcoin blockchain. 
              This transparency is fundamental to our platform's integrity and cannot be disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-neon">Email: privacy@bitmarket.bet</p>
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