import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    setUser,
    showToast,
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const userProfile = {
        id: `usr-${Date.now()}`,
        name: name || (email.split('@')[0] ? email.split('@')[0] : 'Tanuj Sharma'),
        email: email || 'tanujs9334@gmail.com',
        language: 'en' as const,
        theme: 'dark' as const,
        plan: 'pro' as const,
        city: 'Bengaluru',
        state: 'Karnataka',
        androidSynced: true,
        syncedDeviceName: 'Pixel 8 Pro (Bharat AI Companion App)',
        lastSyncAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setUser(userProfile);
      setAuthModalOpen(false);
      showToast(
        authModalMode === 'login'
          ? `Welcome back, ${userProfile.name}!`
          : `Account created! Welcome to Bharat AI.`
      );
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setUser({
      id: 'usr-demo-01',
      name: 'Tanuj Sharma',
      email: 'tanujs9334@gmail.com',
      language: 'en',
      theme: 'dark',
      plan: 'pro',
      city: 'Bengaluru',
      state: 'Karnataka',
      androidSynced: true,
      syncedDeviceName: 'Pixel 8 Pro (Bharat AI Companion App)',
      lastSyncAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setAuthModalOpen(false);
    showToast('Signed in with Indian citizen demo profile!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 p-[1.5px] mx-auto shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-amber-400 text-base">
              भा
            </div>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            {authModalMode === 'login'
              ? 'Sign in to Bharat AI'
              : authModalMode === 'register'
              ? 'Create Your Bharat AI Account'
              : 'Reset Your Password'}
          </h2>
          <p className="text-xs text-slate-400">
            One account for Web and Android smartphone synchronization
          </p>
        </div>

        {/* 1-Click Demo Citizen Login */}
        <button
          type="button"
          onClick={handleQuickDemoLogin}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Instant One-Click Demo Login</span>
        </button>

        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-slate-800"></div>
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Or with credentials</span>
          <div className="flex-1 h-px bg-slate-800"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {authModalMode === 'register' && (
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Your Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tanuj Sharma"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-slate-400 font-semibold block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          {authModalMode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-400 font-semibold block">Password</label>
                {authModalMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthModalMode('forgot')}
                    className="text-[10px] text-amber-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all cursor-pointer"
          >
            <span>
              {authModalMode === 'login'
                ? 'Sign In to Workspace'
                : authModalMode === 'register'
                ? 'Create Free Account'
                : 'Send Password Reset Email'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch mode links */}
        <div className="text-center text-xs text-slate-400 pt-1">
          {authModalMode === 'login' ? (
            <p>
              Don&apos;t have an account?{' '}
              <button
                onClick={() => setAuthModalMode('register')}
                className="text-amber-400 font-bold hover:underline"
              >
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setAuthModalMode('login')}
                className="text-amber-400 font-bold hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
