"use client";

import { Mail, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 text-lg">Get in touch with our team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  rows={6}
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              <button className="w-full bg-neon hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neon/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Email</h3>
                    <p className="text-gray-400">hello@bitmarket.bet</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neon/20 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Discord</h3>
                    <p className="text-gray-400">Join our community</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Quick Help</h2>
              <p className="text-gray-400 mb-4">Check our help center for common questions.</p>
              <a href="/help" className="text-neon hover:text-orange-400 transition">
                Visit Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 