import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Page } from '../../types';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Send,
  Heart,
  Globe2,
  Lock,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, showToast } = useApp();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    showToast('Dhanyawaad! You are subscribed to Bharat AI releases.');
    setEmailInput('');
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 p-[1.5px] shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-amber-400 text-sm">
                  भा
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                BHARAT <span className="text-amber-500">AI</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              **One AI. Your Entire Life, Simplified.**
              <br />
              India\'s trusted, everyday intelligent companion. Built natively for Hindi, Hinglish, and English across daily planning, rupee personal finance, official Bharat schemes, and document analysis.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> DPDP Act Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                <Lock className="w-3.5 h-3.5" /> End-to-End Private
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700 font-medium">
                🇮🇳 Proudly Made in India
              </span>
            </div>
          </div>

          {/* Column 1: AI Workspace */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              AI Workspace
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActivePage('chat')}
                  className="hover:text-amber-400 transition-colors"
                >
                  AI Assistant (Multilingual)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('voice')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Voice AI Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('document')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Document Intelligence & OCR
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('learning')}
                  className="hover:text-amber-400 transition-colors"
                >
                  AI Learning & Exam Tutor
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('features')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Full Feature Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Everyday Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Everyday Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActivePage('planner')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Smart Daily Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('finance')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Rupee Personal Finance
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('services')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Bharat Government Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('dashboard')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Unified User Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('pricing')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Pricing & UPI Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Trust & Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Bharat AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('faq')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('privacy')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Privacy Policy (DPDP)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('terms')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Sub-footer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md items-center gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Get product updates (email)..."
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-colors"
            >
              <span>Join</span>
              <Send className="w-3 h-3" />
            </button>
          </form>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-500">
            <p>© 2026 Bharat AI Technologies. All rights reserved.</p>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for 1.4 Billion citizens</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
