"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, Book, Code, Activity } from 'lucide-react';

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I connect my wallet?",
        answer: "Click the 'Connect Wallet' button in the top right corner. We support Bitcoin wallets like Xverse, Unisat, and others. Make sure your wallet is connected to the Bitcoin network."
      },
      {
        question: "What is a prediction market?",
        answer: "A prediction market is a platform where users can bet on the outcome of real-world events. If your prediction is correct, you win Bitcoin. If not, you lose your bet."
      },
      {
        question: "How do I place my first bet?",
        answer: "Browse available markets, select one that interests you, choose 'Yes' or 'No', enter the amount you want to bet, and confirm the transaction with your wallet."
      }
    ]
  },
  {
    category: "Trading & Markets",
    questions: [
      {
        question: "How are market outcomes determined?",
        answer: "Market outcomes are determined by objective criteria specified in the market description. We use publicly available information and official sources to resolve outcomes."
      },
      {
        question: "Can I create my own market?",
        answer: "Yes! Click 'Create Market' in the navigation. You'll need to provide a clear question, outcome criteria, end date, and initial liquidity."
      },
      {
        question: "What happens if a market is ambiguous?",
        answer: "For ambiguous cases, we use community consensus and administrative review to determine the outcome fairly and transparently."
      }
    ]
  },
  {
    category: "Technical Issues",
    questions: [
      {
        question: "My transaction failed. What should I do?",
        answer: "Check your wallet balance, ensure you have enough Bitcoin for the transaction fee, and try again. If the problem persists, contact our support team."
      },
      {
        question: "How do I check my transaction history?",
        answer: "Go to your Portfolio page to see all your bets, wins, and losses. You can also view detailed transaction history in your wallet."
      },
      {
        question: "Is my wallet safe?",
        answer: "We never have access to your private keys. All transactions are signed locally by your wallet. Always use reputable wallet software and keep your private keys secure."
      }
    ]
  },
  {
    category: "Fees & Payments",
    questions: [
      {
        question: "What fees does BitMarket.bet charge?",
        answer: "We charge a small platform fee on each transaction (typically 1-2%). This helps maintain the platform and cover operational costs."
      },
      {
        question: "When do I receive my winnings?",
        answer: "Winnings are automatically distributed to your wallet once the market outcome is determined and resolved."
      },
      {
        question: "Can I withdraw my Bitcoin?",
        answer: "Your Bitcoin remains in your wallet at all times. You can transfer it to other addresses or exchanges as needed."
      }
    ]
  }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-gray-400 text-lg">
            Find answers to common questions and get support for BitMarket.bet
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <a href="/docs" className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition group">
            <Book className="w-8 h-8 text-neon mb-3 group-hover:scale-110 transition" />
            <h3 className="text-white font-semibold mb-2">Documentation</h3>
            <p className="text-gray-400 text-sm">Detailed guides and tutorials</p>
          </a>
          <a href="/api" className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition group">
            <Code className="w-8 h-8 text-neon mb-3 group-hover:scale-110 transition" />
            <h3 className="text-white font-semibold mb-2">API Reference</h3>
            <p className="text-gray-400 text-sm">Developer documentation</p>
          </a>
          <a href="/status" className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition group">
            <Activity className="w-8 h-8 text-neon mb-3 group-hover:scale-110 transition" />
            <h3 className="text-white font-semibold mb-2">System Status</h3>
            <p className="text-gray-400 text-sm">Platform health and updates</p>
          </a>
          <a href="/contact" className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition group">
            <MessageCircle className="w-8 h-8 text-neon mb-3 group-hover:scale-110 transition" />
            <h3 className="text-white font-semibold mb-2">Contact Support</h3>
            <p className="text-gray-400 text-sm">Get in touch with our team</p>
          </a>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {filteredFaqs.map((category, categoryIndex) => (
            <div key={category.category} className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isExpanded = expandedItems[key];
                  
                  return (
                    <div key={questionIndex} className="border border-white/10 rounded-lg">
                      <button
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition"
                      >
                        <span className="text-white font-medium">{item.question}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4">
                          <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Still Need Help?</h2>
            <p className="text-gray-400 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-neon hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Contact Support
              </a>
              <a
                href="mailto:support@bitmarket.bet"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 