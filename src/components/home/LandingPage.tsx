import React, { useState } from 'react';
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
  CheckCircle2,
  Play,
  Volume2,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  Zap,
  Globe2,
  Search,
  Lock,
  Layers,
  HelpCircle,
  ChevronDown,
  Building2,
  Users,
  Radio,
} from 'lucide-react';
import { BHARAT_SCHEMES, PRICING_PLANS, FAQS, LEARNING_TOPICS } from '../../data/mockData';

export const LandingPage: React.FC = () => {
  const { setActivePage, setAuthModalOpen, setAuthModalMode, showToast } = useApp();

  // Hero live interactive demo state
  const [heroPrompt, setHeroPrompt] = useState('');
  const [heroResponse, setHeroResponse] = useState<string | null>(null);
  const [heroLoading, setHeroLoading] = useState(false);

  // Voice AI demo state
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [activeVoiceSample, setActiveVoiceSample] = useState<'hindi' | 'hinglish' | 'english'>('hinglish');

  // FAQ open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quick suggestion chips for hero
  const quickChips = [
    { label: '🇮🇳 Ayushman Bharat eligibility check', prompt: 'Who is eligible for Ayushman Bharat PM-JAY and how do I download the card?' },
    { label: '💰 Plan ₹50,000 monthly salary budget', prompt: 'How should I divide a ₹50,000 monthly salary in India using the 50-30-20 rule and SIP?' },
    { label: '⚡ Summarize BSES power bill', prompt: 'Summarize key electricity charges and how to avoid late fees on Delhi BSES bill.' },
    { label: '📚 Explain Article 21 in simple Hinglish', prompt: 'Explain Article 21 of Indian Constitution in easy Hinglish with real life examples.' },
  ];

  const handleHeroSubmit = async (customText?: string) => {
    const query = customText || heroPrompt;
    if (!query.trim()) return;

    setHeroLoading(true);
    setHeroResponse(null);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, language: 'hinglish' }),
      });
      const data = await res.json();
      setHeroResponse(data.reply || 'Namaste! Bharat AI is ready to simplify your tasks.');
    } catch (e) {
      setHeroResponse(
        'Namaste! Bharat AI processed your request. You can launch the full AI Assistant workspace to enjoy multi-turn conversation and file uploads.'
      );
    } finally {
      setHeroLoading(false);
    }
  };

  const handlePlayVoiceDemo = (lang: 'hindi' | 'hinglish' | 'english') => {
    setActiveVoiceSample(lang);
    setVoicePlaying(true);

    let spokenText = '';
    if (lang === 'hindi') {
      spokenText = 'नमस्ते! आपका दैनिक कार्य योजना और ₹450 का ऑटो खर्च दर्ज कर दिया गया है। क्या मैं आपके लिए बिजली बिल का रिमाइंडर सेट करूँ?';
    } else if (lang === 'hinglish') {
      spokenText = 'Namaste! Aapka Daily Planner update ho gaya hai aur Ayushman Card eligibility check ready hai. Kuch aur help chahiye?';
    } else {
      spokenText = 'Namaste! Bharat AI here. Your morning schedule is optimized with 3 deep focus sessions and GST filing deadline.';
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = 1.0;
      utterance.onend = () => setVoicePlaying(false);
      utterance.onerror = () => setVoicePlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setVoicePlaying(false), 3000);
    }
  };

  return (
    <div className="w-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-orange-500/15 to-emerald-500/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-lg shadow-amber-500/10">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Made for India • One Unified AI Platform</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Your Entire Life.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400">
              One Intelligent AI.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Meet <strong className="text-white font-semibold">Bharat AI</strong> — your personal AI assistant for everyday life. Experience intelligent chat, voice commands, document OCR, smart daily planning, personal finance, and verified government services — natively in Hindi, Hinglish, and English.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('chat')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Start Using Bharat AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePage('news')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>Live News & Updates</span>
            </button>
            <button
              onClick={() => setActivePage('features')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Explore Features</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No App Download Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free Tier Included</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Syncs with Android App</span>
            </div>
          </div>
        </div>

        {/* 2. LIVE AI ASSISTANT PREVIEW ON HERO */}
        <div className="mt-12 max-w-4xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl p-4 sm:p-6 backdrop-blur-xl relative z-20">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-semibold text-slate-400 ml-2">
                Live Bharat AI Sandbox (Interactive)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Gemini 3.8 Flash Online
              </span>
            </div>
          </div>

          {/* Quick interactive prompts */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setHeroPrompt(chip.prompt);
                  handleHeroSubmit(chip.prompt);
                }}
                className="text-left px-3 py-1.5 rounded-lg text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/50 transition-all"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={heroPrompt}
              onChange={(e) => setHeroPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleHeroSubmit()}
              placeholder="Ask anything in English, हिन्दी, or Hinglish..."
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button
              onClick={() => handleHeroSubmit()}
              disabled={heroLoading || !heroPrompt.trim()}
              className="px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
            >
              {heroLoading ? (
                <span>Thinking...</span>
              ) : (
                <>
                  <span>Ask</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Response Box */}
          {heroResponse && (
            <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed animate-in fade-in space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Bharat AI Response
                </span>
                <button
                  onClick={() => setActivePage('chat')}
                  className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1"
                >
                  Continue in Full Workspace <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="whitespace-pre-line font-normal">{heroResponse}</div>
            </div>
          )}
        </div>
      </section>

      {/* 3. FEATURES OVERVIEW — THE 7 PILLARS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Comprehensive Capabilities
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Everything You Need, Intelligently Unified
          </h3>
          <p className="text-slate-400 text-sm sm:text-base">
            No more switching between separate chat tools, note apps, expense spreadsheets, and government search engines. Bharat AI manages it all with deep contextual intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: AI Chat Assistant */}
          <div
            onClick={() => setActivePage('chat')}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors flex items-center justify-between">
              <span>Multilingual AI Chat</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Speak or type in Hindi, Hinglish, or English. Bharat AI understands colloquial Indian idioms, tax concepts, festivals, and cultural context effortlessly.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-800">Hindi & Hinglish</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">File Attachments</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">History Sync</span>
            </div>
          </div>

          {/* Card 2: Voice AI */}
          <div
            onClick={() => setActivePage('voice')}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-900 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mic className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors flex items-center justify-between">
              <span>Voice AI Studio</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Real-time speech-to-text and conversational speech synthesis. Instruct Bharat AI with your voice while walking, driving, or cooking.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-800">Natural Accents</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">Voice Commands</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">Hands-free</span>
            </div>
          </div>

          {/* Card 3: Document AI */}
          <div
            onClick={() => setActivePage('document')}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Document Intelligence & OCR</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Upload rent agreements, electricity bills, marksheets, or legal papers. Extract amounts, dates, policy numbers, and get instant summaries.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-800">PDF & Image OCR</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">Hindi Translation</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">Split Preview</span>
            </div>
          </div>

          {/* Card 4: Daily Planner */}
          <div
            onClick={() => setActivePage('planner')}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Smart Daily Planner</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Prioritize urgent tasks, set recurring reminders, and receive an automated AI Morning Schedule Briefing optimized for your workday.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-800">AI Day Optimizer</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">Priority Tags</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">Calendar View</span>
            </div>
          </div>

          {/* Card 5: Finance Assistant */}
          <div
            onClick={() => setActivePage('finance')}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors flex items-center justify-between">
              <span>Rupee Personal Finance</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Log UPI expenses in plain English or voice. Track monthly savings targets, visualize category spending breakdowns, and export reports.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-800">INR Tracking</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">Savings Goals</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">50-30-20 Rule</span>
            </div>
          </div>

          {/* Card 6: Bharat Services */}
          <div
            onClick={() => setActivePage('services')}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-900 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors flex items-center justify-between">
              <span>Bharat Government Services</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Verified information on Aadhaar, DigiLocker, PM-KISAN, Ayushman Bharat, EPFO, and PAN with official eligibility checklists and direct links.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-800">Verified .gov.in</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">Eligibility Guide</span>
              <span className="px-2 py-0.5 rounded bg-slate-800">Hindi Audio</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VOICE AI DEMONSTRATION SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold">
              <Mic className="w-3.5 h-3.5" />
              <span>Voice AI Studio Demonstration</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Talk to Bharat AI Naturally. In Hindi, Hinglish, or English.
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              No need to type long paragraphs. Just speak naturally. Bharat AI detects intent, parses amounts, adds calendar reminders, and replies with fluid, natural voice playback.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-xs text-slate-300">
                  <em>&ldquo;Remind me to pay electricity bill tomorrow 6 PM&rdquo;</em> → Automatically added to Planner!
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="text-xs text-slate-300">
                  <em>&ldquo;Auto rickshaw 180 rupees and lunch 320 at Sagar Ratna&rdquo;</em> → Logged to Finance!
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span className="text-xs text-slate-300">
                  <em>&ldquo;Ayushman Bharat 70 saal ke buzurgon ke liye kaise apply karein?&rdquo;</em> → Official scheme guide!
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActivePage('voice')}
                className="px-6 py-3 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 text-slate-950 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Launch Voice AI Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Voice Player Mockup */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-2 mb-2">
                {(['hinglish', 'hindi', 'english'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handlePlayVoiceDemo(lang)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
                      activeVoiceSample === lang
                        ? 'bg-orange-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang} Demo
                  </button>
                ))}
              </div>

              {/* Animated Visualizer Sound Waves */}
              <div className="h-32 flex items-center justify-center gap-1.5 px-4 my-6">
                {[40, 65, 30, 85, 95, 45, 70, 90, 50, 80, 60, 100, 35, 75, 55, 90, 45, 60].map(
                  (height, i) => (
                    <div
                      key={i}
                      className={`w-1.5 rounded-full transition-all duration-300 ${
                        voicePlaying
                          ? 'bg-gradient-to-t from-orange-500 to-amber-300 animate-pulse'
                          : 'bg-slate-800'
                      }`}
                      style={{
                        height: voicePlaying ? `${Math.max(20, Math.round(height * Math.random()))}%` : '20%',
                      }}
                    ></div>
                  )
                )}
              </div>

              {/* Big Voice Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => handlePlayVoiceDemo(activeVoiceSample)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-xl cursor-pointer ${
                    voicePlaying
                      ? 'bg-rose-500 text-white animate-bounce'
                      : 'bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 hover:scale-105'
                  }`}
                >
                  {voicePlaying ? <Volume2 className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </button>
              </div>

              <p className="text-xs text-slate-400 pt-2 font-medium">
                {voicePlaying ? 'Playing speech synthesis...' : 'Click to hear Bharat AI speak in native accents'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DOCUMENT AI DEMONSTRATION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Doc visual mockup */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Rental_Agreement_Indiranagar.pdf</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                OCR Verified
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono text-slate-400 space-y-1">
              <p className="text-slate-300 font-bold">&gt;&gt; OCR Extracted Text:</p>
              <p>&quot;Monthly Rent: INR 22,000/- payable on or before 5th of every month.</p>
              <p>Refundable Security Deposit: INR 1,00,000/- held without interest.</p>
              <p>Lock-in Period: 11 months from date of execution.&quot;</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Monthly Rent</span>
                <span className="font-bold text-emerald-400 text-sm">₹22,000 / mo</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Security Deposit</span>
                <span className="font-bold text-amber-400 text-sm">₹1,00,000</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Lock-in Period</span>
                <span className="font-semibold text-slate-200">11 Months</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Hindi Translation</span>
                <span className="font-semibold text-slate-200">उपलब्ध (Ready)</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <FileText className="w-3.5 h-3.5" />
              <span>Document AI Workspace</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Understand Any Indian Document In Seconds.
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Don&apos;t get lost in complex legal jargon, rental clauses, insurance riders, or electricity calculations. Upload PDFs or photos of documents to get instant key dates, rupee values, summaries, and complete Hindi translations.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Extract names, bank accounts, and critical penalty deadlines</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Side-by-side split screen document preview and interactive Q&A</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Support for bills, tax returns, rent contracts, and academic marksheets</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => setActivePage('document')}
                className="px-6 py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Try Document Assistant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SMART DAILY PLANNER PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>Smart Daily Planner</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              An AI That Actually Schedules Your Day.
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Never miss a bill payment, client meeting, exam revision session, or doctor appointment. The Bharat AI Planner generates an optimized hourly schedule and morning briefing tailored to your energy levels.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setActivePage('planner')}
                className="px-6 py-3 rounded-xl text-xs font-bold bg-blue-500 hover:bg-blue-400 text-slate-950 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Open Planner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Planner Card Mockup */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Today&apos;s AI Optimized Schedule</span>
              </h4>
              <span className="text-[11px] text-amber-400 font-semibold">3 Tasks Pending</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-rose-500/30 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">Pay BSES Electricity Bill</span>
                  <span className="text-[10px] text-slate-400">Due today • 18:00 IST</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">
                  Urgent
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">File GSTR-3B Monthly Return</span>
                  <span className="text-[10px] text-slate-400">Finance • 15:00 IST</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                  High
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between opacity-60">
                <div className="line-through">
                  <span className="font-semibold text-slate-400 block">Download DigiLocker Driving License</span>
                  <span className="text-[10px] text-slate-500">Completed at 10:30 AM</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PERSONAL FINANCE ASSISTANT PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Finance dashboard mockup */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30">
                <span className="text-[10px] text-slate-400 block">Monthly Income</span>
                <span className="text-lg font-extrabold text-emerald-400">₹68,500</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Monthly Spent</span>
                <span className="text-lg font-extrabold text-amber-400">₹38,450</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Budget Consumed (50-30-20 Rule)</span>
                <span className="text-white font-semibold">56% of ₹45,000</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 w-[56%] rounded-full"></div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-amber-400 text-[11px] block">💡 Bharat AI Financial Tip:</span>
              <p>You have allocated ₹10,000 to monthly Index Fund SIP. Maintaining this for 5 years could accumulate approx ₹8.5 Lakhs at standard 12% CAGR.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
              <Wallet className="w-3.5 h-3.5" />
              <span>Personal Finance Assistant</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Master Your Money in Rupees.
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Track UPI spending, rent, groceries, and mutual fund SIPs without tedious spreadsheets. Simply speak or type your expenses, establish monthly targets, and let Bharat AI highlight smart ways to build your emergency fund.
            </p>
            <p className="text-[11px] text-slate-500 italic">
              *Educational & organizational assistant only. Not certified financial advice.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActivePage('finance')}
                className="px-6 py-3 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Launch Finance Assistant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BHARAT SERVICES ASSISTANT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400">
            Verified Indian Public Services
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Direct Access to Government Welfare & Portals
          </h3>
          <p className="text-slate-400 text-sm">
            Check official eligibility rules, required document checklists, and verified .gov.in links without scams, middlemen, or confusion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BHARAT_SCHEMES.slice(0, 3).map((scheme) => (
            <div
              key={scheme.id}
              onClick={() => setActivePage('services')}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {scheme.category}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Verified {scheme.lastVerifiedDate}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                  {scheme.name}
                </h4>
                <p className="text-xs text-amber-400/90 font-medium mb-3">
                  {scheme.nameHindi}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {scheme.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-purple-400 font-semibold group-hover:underline">
                  View Eligibility Checklist
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setActivePage('services')}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
          >
            Explore all 12+ verified schemes & portals →
          </button>
        </div>
      </section>

      {/* 9. AI LEARNING ASSISTANT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>AI Learning & Exam Tutor</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Master NCERT, UPSC, Coding & College Topics.
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Transform difficult textbooks into step-by-step notes, relatable analogies, and interactive practice quiz questions with instant feedback.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActivePage('learning')}
                className="px-6 py-3 rounded-xl text-xs font-bold bg-pink-500 hover:bg-pink-400 text-slate-950 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sample Quiz Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white">Sample Practice Question</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300">
                UPSC / Polity
              </span>
            </div>
            <p className="text-xs text-slate-200 font-medium">
              &ldquo;Which constitutional writ translates to &apos;We Command&apos; and is issued by high courts to enforce legal public duty?&rdquo;
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                A) Habeas Corpus
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold flex items-center justify-between">
                <span>B) Mandamus</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                C) Certiorari
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PRIVACY AND SECURITY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DPDP Act 2023 Aligned Architecture</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Built for Privacy. Zero Ads. Zero Telemetry Leaks.
          </h3>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Your personal financial transactions, private legal agreements, and daily plans belong exclusively to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Lock className="w-6 h-6 text-emerald-400" />
            <h4 className="text-base font-bold text-white">Private Cloud Vault</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Uploaded Aadhaar slips and contracts are encrypted with AES-256 and never used to train public models.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h4 className="text-base font-bold text-white">One-Click Complete Export</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export every task, expense, and chat log in standardized JSON at any moment. You have absolute data sovereignty.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Smartphone className="w-6 h-6 text-blue-400" />
            <h4 className="text-base font-bold text-white">Private Cross-Device Sync</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Encrypted handshake keeps your desktop browser and Android phone in instant sync without exposing passwords.
            </p>
          </div>
        </div>
      </section>

      {/* 11. PRICING PLANS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Simple Transparent Pricing
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Accessible for Every Citizen & Professional
          </h3>
          <p className="text-slate-400 text-sm">
            Pay easily with UPI, RuPay, or Cards. Free tier available for everyday personal needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-7 rounded-3xl border flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-slate-900 border-amber-500 shadow-2xl shadow-amber-500/10 scale-105 z-10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                </div>

                <div className="py-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      ₹{plan.priceINR}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/{plan.billingPeriod}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setActivePage('pricing')}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 shadow-lg shadow-orange-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. FAQ ACCORDION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Common Inquiries
          </h2>
          <h3 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between text-sm font-semibold text-slate-200 hover:text-white"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openFaqIndex === idx ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>
              {openFaqIndex === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 animate-in fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 13. CONTACT CTA BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border border-amber-500/30 p-8 sm:p-14 text-center space-y-6 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              One AI. Your Entire Life, Simplified.
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              Join thousands of Indian professionals, students, and families experiencing everyday intelligence without compromise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setActivePage('chat')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xl transition-all cursor-pointer"
              >
                Open Bharat AI Workspace
              </button>
              <button
                onClick={() => setActivePage('contact')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all"
              >
                Contact Support & Partnerships
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
