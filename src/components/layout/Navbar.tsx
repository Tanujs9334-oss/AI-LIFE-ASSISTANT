import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Page, Language } from '../../types';
import {
  Sparkles,
  Mic,
  FileText,
  Calendar,
  Wallet,
  Landmark,
  GraduationCap,
  LayoutDashboard,
  Smartphone,
  Globe,
  Sun,
  Moon,
  User,
  Menu,
  X,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Settings,
  ShieldCheck,
  ChevronDown,
  Radio,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    language,
    setLanguage,
    theme,
    toggleTheme,
    user,
    setUser,
    androidSync,
    setAuthModalOpen,
    setAuthModalMode,
    showToast,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);

  const navLinks: { id: Page; label: string; labelHi: string; icon: any }[] = [
    { id: 'chat', label: 'AI Assistant', labelHi: 'एआई सहायक', icon: Sparkles },
    { id: 'voice', label: 'Voice AI', labelHi: 'आवाज़ सहायक', icon: Mic },
    { id: 'news', label: 'Live News', labelHi: 'लाइव न्यूज़', icon: Radio },
    { id: 'document', label: 'Document AI', labelHi: 'दस्तावेज़', icon: FileText },
    { id: 'planner', label: 'Planner', labelHi: 'दैनिक योजना', icon: Calendar },
    { id: 'finance', label: 'Finance', labelHi: 'पर्सनल वित्त', icon: Wallet },
    { id: 'services', label: 'Bharat Services', labelHi: 'भारत सेवाएं', icon: Landmark },
    { id: 'learning', label: 'Learning Hub', labelHi: 'शिक्षा व परीक्षा', icon: GraduationCap },
  ];

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setUserDropdownOpen(false);
    showToast('Signed out successfully');
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-colors duration-200 bg-slate-950/80 border-slate-800/80 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 p-[1.5px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400 text-lg tracking-wider">
                  भा
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  BHARAT <span className="text-amber-500 font-black">AI</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  INDIA
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
                One AI. Your Entire Life.
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : link.id === 'news' ? 'text-rose-400' : 'text-slate-400'}`} />
                <span>{language === 'hi' ? link.labelHi : link.label}</span>
                {link.id === 'news' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dashboard Shortcut */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activePage === 'dashboard'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dashboard</span>
          </button>

          {/* Android Companion Sync Pill */}
          <button
            onClick={() => setSyncModalOpen(true)}
            title="Cross-device sync active with Bharat AI Android app"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-900 border border-slate-700/80 hover:border-emerald-500/50 text-slate-300 hover:text-white transition-all group"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${androidSync.isSyncing ? 'bg-amber-400' : 'bg-emerald-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${androidSync.isSyncing ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
            </span>
            <Smartphone className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            <span className="hidden lg:inline text-[10px]">App Synced</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase text-[11px] font-semibold">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-1.5 z-50 text-xs"
                onMouseLeave={() => setLangDropdownOpen(false)}
              >
                <button
                  onClick={() => {
                    setLanguage('en');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    language === 'en' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-slate-300'
                  }`}
                >
                  <span>English</span>
                  {language === 'en' && <CheckCircle2 className="w-3 h-3 text-amber-400" />}
                </button>
                <button
                  onClick={() => {
                    setLanguage('hi');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    language === 'hi' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-slate-300'
                  }`}
                >
                  <span>हिन्दी (Hindi)</span>
                  {language === 'hi' && <CheckCircle2 className="w-3 h-3 text-amber-400" />}
                </button>
                <button
                  onClick={() => {
                    setLanguage('hinglish');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    language === 'hinglish' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-slate-300'
                  }`}
                >
                  <span>Hinglish</span>
                  {language === 'hinglish' && <CheckCircle2 className="w-3 h-3 text-amber-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
            title="Toggle Dark / Light theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Account / Auth */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full bg-slate-900 border border-slate-700 hover:border-amber-500 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  {user.name.charAt(0)}
                </div>
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {user.plan} Plan
                      </span>
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Synced
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActivePage('dashboard');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      setActivePage('settings');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Settings & Android Sync</span>
                  </button>

                  <button
                    onClick={() => {
                      setActivePage('pricing');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-amber-400 hover:bg-amber-500/10 rounded-lg flex items-center gap-2 font-semibold"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Upgrade Plan</span>
                  </button>

                  <div className="border-t border-slate-800 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setAuthModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 shadow-md shadow-orange-500/20 transition-all"
              >
                Get Started
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex-1 py-2 px-3 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold text-center"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="flex-1 py-2 px-3 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold text-center"
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="flex-1 py-2 px-3 rounded-lg bg-slate-800 text-slate-200 font-semibold text-center"
            >
              Features
            </button>
          </div>
        </div>
      )}

      {/* Cross-Device Android Sync Modal */}
      {syncModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setSyncModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-950 font-bold">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Cross-Device Synchronization</h3>
                <p className="text-xs text-slate-400">Bharat AI Web & Android Unified Backend</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5 text-xs mb-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Connected Device:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Pixel 8 Pro
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Cloud Sync Status:</span>
                <span className="text-slate-200">Continuous 2-Way Sync</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Last Synced:</span>
                <span className="text-amber-400">{androidSync.lastSyncedAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Synced Data:</span>
                <span className="text-slate-300">Tasks, Expenses, Documents, Chats</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-5">
              Any action taken here—such as creating a task, tracking an expense, or analyzing a document—is instantaneously reflected in your Bharat AI Android App.
            </p>

            <div className="flex gap-2">
              <button
                onClick={async () => {
                  await androidSync.triggerSync();
                  showToast('Cloud database synchronized with Android app');
                }}
                disabled={androidSync.isSyncing}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${androidSync.isSyncing ? 'animate-spin' : ''}`} />
                <span>{androidSync.isSyncing ? 'Syncing...' : 'Sync Now'}</span>
              </button>
              <button
                onClick={() => {
                  setSyncModalOpen(false);
                  setActivePage('settings');
                }}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
