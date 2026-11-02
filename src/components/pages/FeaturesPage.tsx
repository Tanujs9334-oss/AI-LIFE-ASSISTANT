import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Mic,
  FileText,
  Calendar,
  Wallet,
  Landmark,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Smartphone,
  Zap,
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const { setActivePage } = useApp();

  const featureDeepDives = [
    {
      id: 'chat',
      title: 'Multilingual AI Chat Workspace',
      badge: 'Core Intelligence',
      icon: Sparkles,
      color: 'amber',
      description:
        'State-of-the-art conversational engine equipped with Google Gemini 3.8 Flash. Communicates naturally in formal Hindi, everyday Hinglish, and polished English.',
      highlights: [
        'Nuanced understanding of Indian cultural idioms, festivals, and tax terminology',
        'Automatic intent routing to Planner, Finance, or Bharat Government services',
        'Multi-session management, rename, delete, and full chat export',
        'File attachment support for analyzing spreadsheets and photos',
      ],
      cta: 'Open AI Assistant',
    },
    {
      id: 'voice',
      title: 'Voice AI Studio',
      badge: 'Conversational Voice',
      icon: Mic,
      color: 'orange',
      description:
        'Hands-free speech-to-text and natural text-to-speech engineered for diverse Indian accents and multilingual speech patterns.',
      highlights: [
        'Direct voice execution: create tasks and log UPI expenses simply by speaking',
        'Animated soundwave visualizer with low-latency responsiveness',
        'Instant audio playback in clear Hindi or Indian English accents',
        'Zero forced permissions—requests microphone access only when activated',
      ],
      cta: 'Try Voice AI',
    },
    {
      id: 'document',
      title: 'Document Intelligence & OCR',
      badge: 'Vault & Extraction',
      icon: FileText,
      color: 'emerald',
      description:
        'Split-screen document workspace for scanning, analyzing, summarizing, and translating Indian bills, legal contracts, and academic marksheets.',
      highlights: [
        'Instant entity extraction for names, meter numbers, policy IDs, and rupee values',
        'Split-screen document preview beside an interactive AI Q&A panel',
        'Accurate translation of complex legal clauses into accessible Hindi',
        'Organized folder vaults for Identity, Utilities, Tax, and Education',
      ],
      cta: 'Launch Document AI',
    },
    {
      id: 'planner',
      title: 'Smart Daily Planner',
      badge: 'Productivity Engine',
      icon: Calendar,
      color: 'blue',
      description:
        'Intelligent scheduling that crafts a morning briefing and structured daily agenda based on your priorities and deadlines.',
      highlights: [
        'Urgent, High, Medium, and Low priority classification',
        'Daily, weekly, and monthly calendar views',
        'Automated AI daily schedule optimization with focus blocks',
        'Recurring task scheduling and celebratory milestone confetti',
      ],
      cta: 'Explore Daily Planner',
    },
    {
      id: 'finance',
      title: 'Rupee Personal Finance Assistant',
      badge: 'Financial Wellness',
      icon: Wallet,
      color: 'teal',
      description:
        'Track Indian rupee income, UPI spending, budget caps, and multi-year savings targets with smart AI audits.',
      highlights: [
        '50-30-20 rule budget tracking and category spend charts',
        'Quick natural language expense logging (e.g. "Auto 150 rs via UPI")',
        'Emergency fund and target goal progress meters',
        'Exportable CSV financial statements for personal budgeting',
      ],
      cta: 'View Finance Assistant',
    },
    {
      id: 'services',
      title: 'Bharat Government Services Navigator',
      badge: 'Citizen Welfare',
      icon: Landmark,
      color: 'purple',
      description:
        'Verified directory of Indian public schemes (Aadhaar, DigiLocker, PM-KISAN, Ayushman Bharat, EPFO, Voter ID, PAN).',
      highlights: [
        'Direct links to official .gov.in and .nic.in government portals',
        'Eligibility assessment based on age, income, and occupation',
        'Required documents checklist so you never arrive at a kiosk unprepared',
        'Clear Hindi and English step-by-step application walkthroughs',
      ],
      cta: 'Explore Government Services',
    },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Platform Architecture
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Every Feature Engineered for Everyday Life in India
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Bharat AI unifies artificial intelligence with tangible everyday workflows. Explore how each module is designed to save time, reduce stress, and empower citizens.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featureDeepDives.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950 border border-slate-800 text-slate-300">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  {feat.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActivePage(feat.id as any)}
                className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer"
              >
                <span>{feat.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
