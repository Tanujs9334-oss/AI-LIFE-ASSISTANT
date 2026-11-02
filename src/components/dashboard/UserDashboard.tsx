import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Sparkles,
  Mic,
  Calendar,
  Wallet,
  FileText,
  Landmark,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Smartphone,
  Plus,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const {
    user,
    tasks,
    expenses,
    documents,
    chatSessions,
    setActivePage,
    androidSync,
    showToast,
  } = useApp();

  const [quickPrompt, setQuickPrompt] = useState('');

  // Time based greeting
  const getIndianGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Shubh Prabhat (शुभ प्रभात)';
    if (hour < 17) return 'Shubh Dopahar (शुभ दोपहर)';
    return 'Shubh Sandhya (शुभ संध्या)';
  };

  const pendingTasks = tasks.filter((t) => !t.completed).slice(0, 3);
  const totalIncome = expenses
    .filter((e) => e.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalSpent = expenses
    .filter((e) => e.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleQuickChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPrompt.trim()) return;
    setActivePage('chat');
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-emerald-500/10 border border-amber-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {getIndianGreeting()}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Android App Synced
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Namaste, {user?.name || 'Tanuj'}! 🙏
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Here is your daily briefing: you have <strong>{pendingTasks.length} urgent tasks</strong> pending today and your monthly budget is comfortably on track.
          </p>
        </div>

        {/* Quick Voice / Chat Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActivePage('voice')}
            className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Mic className="w-4 h-4" />
            <span>Voice Assistant</span>
          </button>
          <button
            onClick={() => setActivePage('chat')}
            className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Open Chat</span>
          </button>
        </div>
      </div>

      {/* Quick Launchpad Action Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => setActivePage('chat')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80 transition-all text-left group"
        >
          <Sparkles className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white block">AI Chat</span>
          <span className="text-[10px] text-slate-400">Ask in 3 languages</span>
        </button>

        <button
          onClick={() => setActivePage('voice')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-800/80 transition-all text-left group"
        >
          <Mic className="w-5 h-5 text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white block">Voice Studio</span>
          <span className="text-[10px] text-slate-400">Hands-free commands</span>
        </button>

        <button
          onClick={() => setActivePage('document')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all text-left group"
        >
          <FileText className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white block">Document AI</span>
          <span className="text-[10px] text-slate-400">OCR bills & leases</span>
        </button>

        <button
          onClick={() => setActivePage('planner')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all text-left group"
        >
          <Calendar className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white block">Daily Planner</span>
          <span className="text-[10px] text-slate-400">{pendingTasks.length} pending today</span>
        </button>

        <button
          onClick={() => setActivePage('finance')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-800/80 transition-all text-left group"
        >
          <Wallet className="w-5 h-5 text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white block">Rupee Finance</span>
          <span className="text-[10px] text-slate-400">₹{totalSpent.toLocaleString('en-IN')} spent</span>
        </button>

        <button
          onClick={() => setActivePage('services')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/80 transition-all text-left group"
        >
          <Landmark className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white block">Bharat Services</span>
          <span className="text-[10px] text-slate-400">Verified schemes</span>
        </button>
      </div>

      {/* Main Grid: Left Column (Planner & Finances) + Right Column (Documents & Recent Chats) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Today's Planner Preview */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Today&apos;s Priority Schedule</span>
              </h2>
              <button
                onClick={() => setActivePage('planner')}
                className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Open Full Planner <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {pendingTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">{t.title}</span>
                    <span className="text-[10px] text-slate-400">
                      Due: {t.dueDate} {t.dueTime} • {t.category}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      t.priority === 'Urgent'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Finance Snapshot */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Wallet className="w-4 h-4 text-teal-400" />
                <span>Monthly Cashflow Overview</span>
              </h2>
              <button
                onClick={() => setActivePage('finance')}
                className="text-xs text-teal-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Track Expenses <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Income This Month</span>
                <span className="text-xl font-extrabold text-emerald-400">
                  ₹{totalIncome.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Expenses This Month</span>
                <span className="text-xl font-extrabold text-amber-400">
                  ₹{totalSpent.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Cross-Device Android Status */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Android Smartphone Companion</span>
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Paired with <strong>{androidSync.deviceName}</strong>. All tasks, expenses, and documents sync automatically across your phone and web app.
            </p>

            <button
              onClick={() => {
                androidSync.triggerSync();
                showToast('Synchronized with Pixel 8 Pro companion app');
              }}
              className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Sync Phone Now</span>
            </button>
          </div>

          {/* Recent Documents Vault */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Recent Documents</span>
              </h2>
              <button
                onClick={() => setActivePage('document')}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Doc Studio <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {documents.slice(0, 3).map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setActivePage('document')}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-center justify-between text-xs"
                >
                  <div className="truncate pr-2">
                    <span className="font-semibold text-white block truncate">{doc.title}</span>
                    <span className="text-[10px] text-slate-500">{doc.folder}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                    {doc.fileType.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Conversations */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Recent AI Chats</span>
              </h2>
              <button
                onClick={() => setActivePage('chat')}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Chat History <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {chatSessions.slice(0, 3).map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActivePage('chat')}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer text-xs"
                >
                  <span className="font-semibold text-white block truncate">{chat.title}</span>
                  <span className="text-[10px] text-slate-500">
                    {chat.messages.length} messages
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
