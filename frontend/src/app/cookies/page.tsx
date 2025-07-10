export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Cookie Policy</h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies</h2>
            <p className="mb-4">
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences 
              and analyzing how you use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">
              BitMarket.bet uses cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our site</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Security Cookies:</strong> Help protect against fraud and ensure platform security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Types of Cookies We Use</h2>
            
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Essential Cookies</h3>
                <p className="text-sm mb-2">These cookies are necessary for the website to function properly.</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Session management</li>
                  <li>• Security authentication</li>
                  <li>• Basic platform functionality</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Analytics Cookies</h3>
                <p className="text-sm mb-2">Help us understand how visitors use our platform.</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Page views and navigation patterns</li>
                  <li>• Feature usage statistics</li>
                  <li>• Performance monitoring</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Preference Cookies</h3>
                <p className="text-sm mb-2">Remember your settings and preferences.</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Language preferences</li>
                  <li>• Theme settings</li>
                  <li>• Display preferences</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Cookies</h2>
            <p className="mb-4">
              We may use third-party services that also place cookies on your device:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Analytics Services:</strong> Google Analytics for website usage analysis</li>
              <li><strong>Security Services:</strong> Cloudflare for DDoS protection and security</li>
              <li><strong>Performance Monitoring:</strong> Error tracking and performance optimization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Managing Your Cookie Preferences</h2>
            <p className="mb-4">
              You can control and manage cookies in several ways:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies</li>
              <li><strong>Cookie Consent:</strong> Use our cookie consent banner to manage preferences</li>
              <li><strong>Third-Party Opt-Out:</strong> Use opt-out tools provided by third-party services</li>
            </ul>
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-4">
              <h3 className="text-lg font-semibold text-white mb-2">Browser Instructions</h3>
              <div className="text-sm space-y-2">
                <p><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</p>
                <p><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</p>
                <p><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</p>
                <p><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Impact of Disabling Cookies</h2>
            <p className="mb-4">
              If you choose to disable cookies, some features of BitMarket.bet may not function properly:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You may need to log in repeatedly</li>
              <li>Some preferences may not be saved</li>
              <li>Performance monitoring may be limited</li>
              <li>Security features may be affected</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Updates to This Policy</h2>
            <p className="mb-4">
              We may update this Cookie Policy from time to time. We will notify you of any 
              material changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
            <p className="mb-4">
              If you have questions about our use of cookies, please contact us at:
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