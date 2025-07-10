"use client";

import Link from 'next/link';
import { Twitter, Github, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background/80 border-t border-gray-800 backdrop-blur-xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main footer section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-bold font-display text-white">bitmarket</span>
              <span className="text-2xl font-bold font-display text-neon">.bet</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Fully on-chain prediction markets platform built on Bitcoin&apos;s base layer. 
              Bet on the future with transparency and decentralization.
            </p>
            {/* Social media */}
            <div className="flex gap-4 mt-6">
              <a 
                href="https://twitter.com/bitmarketbet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-neon/20 rounded-lg transition group"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-neon transition" />
              </a>
              <a 
                href="https://github.com/bitmarketbet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-neon/20 rounded-lg transition group"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-neon transition" />
              </a>
              <a 
                href="https://discord.gg/bitmarketbet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-neon/20 rounded-lg transition group"
              >
                <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-neon transition" />
              </a>
              <a 
                href="mailto:hello@bitmarket.bet" 
                className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-neon/20 rounded-lg transition group"
              >
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-neon transition" />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-neon transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/markets" className="text-gray-400 hover:text-neon transition text-sm">
                  Markets
                </Link>
              </li>
              <li>
                <Link href="/propose-market" className="text-gray-400 hover:text-neon transition text-sm">
                  Ideas
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-neon transition text-sm">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-gray-400 hover:text-neon transition text-sm">
                  History
                </Link>
              </li>
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-neon transition text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-neon transition text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-400 hover:text-neon transition text-sm">
                  API
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-gray-400 hover:text-neon transition text-sm">
                  System Status
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-neon transition text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider line */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright and legal links */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <span>© {currentYear} BitMarket.bet. All rights reserved.</span>
              <div className="flex gap-4">
                <Link href="/privacy" className="hover:text-neon transition">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-neon transition">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-neon transition">
                  Cookies
                </Link>
              </div>
            </div>

            {/* Badges and certifications */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400 text-xs font-medium">Bitcoin Signet</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-400 text-xs font-medium">On-Chain</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 