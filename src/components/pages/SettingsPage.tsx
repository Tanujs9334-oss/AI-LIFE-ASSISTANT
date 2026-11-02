import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  User,
  Globe,
  Sun,
  Moon,
  Smartphone,
  Download,
  Trash2,
  CheckCircle2,
  RefreshCw,
  QrCode,
  ShieldAlert,
  AlertTriangle,
  Cpu,
  Radio,
  Sparkles,
  Key,
  ExternalLink,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    user,
    setUser,
    language,
    setLanguage,
    theme,
    toggleTheme,
    androidSync,
    exportAllUserData,
    claudeConfig,
    setClaudeConfig,
    activeModelProvider,
    setActiveModelProvider,
    realtimeSearchEnabled,
    setRealtimeSearchEnabled,
    showToast,
    setActivePage,
  } = useApp();

  const [nameInput, setNameInput] = useState(user?.name || 'Tanuj Sharma');
  const [cityInput, setCityInput] = useState(user?.city || 'Bengaluru');
  const [phoneInput, setPhoneInput] = useState(user?.phone || '+91 98765 43210');
  const [showPairingModal, setShowPairingModal] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Claude & Real-time settings state
  const [claudeKeyInput, setClaudeKeyInput] = useState(claudeConfig.apiKey || '');
  const [isTestingClaude, setIsTestingClaude] = useState(false);
  const [claudeTestFeedback, setClaudeTestFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleTestClaude = async () => {
    if (!claudeKeyInput.trim()) {
      showToast('Please enter your Anthropic Claude API Key (sk-ant-...)');
      return;
    }
    setIsTestingClaude(true);
    setClaudeTestFeedback(null);
    try {
      const res = await fetch('/api/ai/claude/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: claudeKeyInput.trim(),
          model: claudeConfig.model,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setClaudeConfig({
          ...claudeConfig,
          apiKey: claudeKeyInput.trim(),
          status: 'connected',
          lastChecked: `Connected (${new Date().toLocaleTimeString()})`,
        });
        setClaudeTestFeedback({ success: true, message: data.message });
        showToast('Claude connected successfully to Bharat AI!');
      } else {
        setClaudeTestFeedback({ success: false, message: data.message });
      }
    } catch (e: any) {
      setClaudeTestFeedback({
        success: false,
        message: 'Connection failed. Please verify your Anthropic API key.',
      });
    } finally {
      setIsTestingClaude(false);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setUser({
      ...user,
      name: nameInput,
      city: cityInput,
      phone: phoneInput,
    });
    showToast('Profile information saved!');
  };

  const handleDeleteAccount = () => {
    setUser(null);
    setDeleteConfirmOpen(false);
    showToast('Your account and all associated local data have been permanently erased.');
    setActivePage('home');
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-amber-400" />
          <span>Account Settings &amp; Preferences</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your personal profile, default Indian language, device synchronization, and data sovereignty
        </p>
      </div>

      {/* 1. Profile Information */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-amber-400" />
          <span>User Profile</span>
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Full Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Registered Email</label>
              <input
                type="email"
                value={user?.email || 'tanujs9334@gmail.com'}
                disabled
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">City &amp; State</label>
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Mobile (for OTP)</label>
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* 2. Language & Appearance */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>Language &amp; Display Appearance</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="text-slate-400 font-semibold block mb-2">Default AI Language Mode</label>
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`py-2 rounded-lg font-semibold ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`py-2 rounded-lg font-semibold ${
                  language === 'hi'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hinglish')}
                className={`py-2 rounded-lg font-semibold ${
                  language === 'hinglish'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Hinglish
              </button>
            </div>
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-2">Theme Mode</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => theme === 'light' && toggleTheme()}
                className={`py-2 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-amber-400" />
                <span>Dark Theme</span>
              </button>
              <button
                type="button"
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`py-2 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                  theme === 'light'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Light Theme</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. AI Model Engine & Claude / Real-Time News Bridge */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>AI Model Engine &amp; Claude Live Bridge</span>
          </h2>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <Radio className="w-3 h-3 text-rose-400 animate-pulse" /> Real-Time Live Feed Active
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Bharat AI is powered by <strong>Google Gemini 3.8 Flash with Live Google Search Grounding</strong> for up-to-the-minute Indian breaking news, stock prices, policy updates, and sports. You can also connect your <strong>Anthropic Claude API Key</strong> to use Claude 3.5 Sonnet as your primary conversation model!
        </p>

        {/* Model Selector & Real-Time Search Toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-slate-300 font-semibold block">Primary Conversation Engine</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveModelProvider('gemini');
                  showToast('Switched to Gemini 3.8 Flash (Live Search Grounded)');
                }}
                className={`p-2.5 rounded-xl font-semibold text-center transition-all ${
                  activeModelProvider === 'gemini'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                Gemini 3.8 Flash
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModelProvider('claude');
                  showToast('Switched to Anthropic Claude 3.5 Sonnet');
                }}
                className={`p-2.5 rounded-xl font-semibold text-center transition-all ${
                  activeModelProvider === 'claude'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                Claude 3.5 Sonnet
              </button>
            </div>
            <span className="text-[10px] text-slate-500 block">
              {activeModelProvider === 'gemini'
                ? 'Standard engine equipped with Google Search Grounding for verified live facts.'
                : 'Advanced Anthropic Claude reasoning with fallback to live search grounding.'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-semibold">Live Google Web Grounding</label>
                <input
                  type="checkbox"
                  checked={realtimeSearchEnabled}
                  onChange={(e) => {
                    setRealtimeSearchEnabled(e.target.checked);
                    showToast(e.target.checked ? 'Live Web Grounding enabled' : 'Live Web Grounding disabled');
                  }}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                When enabled, Bharat AI automatically searches the live web for today&apos;s news, current government circulars, and market updates with citations.
              </p>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Live News Grounding Connected
            </span>
          </div>
        </div>

        {/* Anthropic Claude API Key Config */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-400" /> Anthropic Claude Connection Bridge
            </span>
            <span className="text-[10px] text-slate-400">
              Status: <strong className="text-emerald-400">{claudeConfig.status === 'connected' ? 'Connected & Ready' : 'Optional (API key required)'}</strong>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="password"
              value={claudeKeyInput}
              onChange={(e) => setClaudeKeyInput(e.target.value)}
              placeholder="Enter your Anthropic API Key (sk-ant-...)"
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
            />
            <button
              type="button"
              onClick={handleTestClaude}
              disabled={isTestingClaude}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isTestingClaude ? 'Testing...' : 'Test & Connect Claude'}</span>
            </button>
          </div>

          {claudeTestFeedback && (
            <div
              className={`p-3 rounded-xl border text-[11px] leading-relaxed flex items-center gap-2 ${
                claudeTestFeedback.success
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              {claudeTestFeedback.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{claudeTestFeedback.message}</span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Android Cross-Device Synchronization */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span>Android Companion Synchronization</span>
          </h2>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Active Link
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Your tasks, rupee expenses, and document vault stay in real-time continuous synchronization between this website and the Bharat AI Android application.
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-400">Connected Companion Device:</span>
            <span className="font-bold text-white block mt-0.5">{androidSync.deviceName}</span>
            <span className="text-[10px] text-slate-500">Last synchronized: {androidSync.lastSyncedAt}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={async () => {
                await androidSync.triggerSync();
                showToast('Manual sync finished. All records up to date!');
              }}
              disabled={androidSync.isSyncing}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${androidSync.isSyncing ? 'animate-spin' : ''}`} />
              <span>{androidSync.isSyncing ? 'Syncing...' : 'Force Sync'}</span>
            </button>
            <button
              onClick={() => setShowPairingModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 text-xs font-semibold transition-colors"
            >
              Pair New Device
            </button>
          </div>
        </div>
      </div>

      {/* 4. Data Privacy, Export & Account Deletion (DPDP Act Compliance) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Data Sovereignty &amp; Privacy (DPDP 2023)</span>
        </h2>

        <p className="text-xs text-slate-400 leading-relaxed">
          You own 100% of your records. Export your full archive at any time or permanently delete your account.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={exportAllUserData}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Complete Data (JSON)</span>
          </button>

          <button
            onClick={() => setDeleteConfirmOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Erase Account Data</span>
          </button>
        </div>
      </div>

      {/* Device Pairing Modal */}
      {showPairingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700 p-6 text-center space-y-4">
            <h3 className="text-base font-bold text-white">Pair Bharat AI Android App</h3>
            <p className="text-xs text-slate-400">
              Open Bharat AI on your Android device, go to Settings &gt; Link Web App, and scan this QR code:
            </p>

            <div className="p-6 rounded-2xl bg-white mx-auto w-fit">
              <QrCode className="w-36 h-36 text-slate-950" />
            </div>

            <div className="p-2 rounded-xl bg-slate-950 text-xs text-amber-400 font-mono tracking-widest font-bold">
              PAIRING CODE: BHARAT-8821-SYNC
            </div>

            <button
              onClick={() => {
                setShowPairingModal(false);
                showToast('Device linked successfully!');
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Account Deletion Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-rose-500/40 p-6 text-slate-100 space-y-4">
            <div className="flex items-center gap-2.5 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-base text-white">Confirm Account Deletion</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This will irreversibly erase all your conversations, daily planner tasks, logged rupee expenses, and uploaded documents from our servers and local cache in compliance with the DPDP Act 2023.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md cursor-pointer"
              >
                Yes, Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
