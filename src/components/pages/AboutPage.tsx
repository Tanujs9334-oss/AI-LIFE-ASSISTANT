import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Globe2,
  Users,
  Building2,
  Cpu,
  ArrowRight,
  Compass,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          The Bharat AI Mission
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          One AI. Your Entire Life, Simplified.
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Bharat AI was founded on a simple conviction: artificial intelligence should not be a privileged tool for tech elites speaking only English. It must become an everyday utility for 1.4 Billion people across India.
        </p>
      </div>

      {/* Story & Philosophy */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-400" />
          <span>Why India Needed Its Own Everyday Intelligence</span>
        </h2>
        <p>
          Across our towns and metros, millions of students prepare for competitive civil service exams; shopkeepers and entrepreneurs file monthly GST returns; families navigate complex rental agreements and health insurance policies; and citizens seek access to welfare programs like Ayushman Bharat and PM-KISAN.
        </p>
        <p>
          Existing Western AI chatbots are disconnected from the fabric of Indian life. They do not understand the subtleties of Hinglish, the mechanics of UPI payments, or the significance of a DigiLocker acknowledgment slip.
        </p>
        <p className="font-semibold text-white">
          Bharat AI brings all of this together in one beautiful, reliable, and private web platform—accessible from any browser without requiring an app store download.
        </p>
      </div>

      {/* The 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Linguistic Inclusivity</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fluent across Hindi, Hinglish, and English with voice synthesis tuned to authentic Indian cadences.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Sovereignty &amp; Privacy</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aligned with the Digital Personal Data Protection (DPDP) Act 2023. No training on user contracts, zero telemetry monetization.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 w-fit">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Unified Action Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Not just an endless text prompt. It takes real action: organizes tasks, tracks rupee cashflow, and analyzes documents.
          </p>
        </div>
      </div>

      {/* Engineering & Office Presence */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Engineered in India 🇮🇳
          </span>
          <h3 className="text-xl font-bold text-white">Innovation Hubs in Bengaluru &amp; New Delhi</h3>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Our engineering teams bring together veterans from top Indian technology institutions and global AI research labs, dedicated to building world-class software for our country.
          </p>
        </div>

        <button
          onClick={() => setActivePage('contact')}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <span>Connect With Our Team</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
