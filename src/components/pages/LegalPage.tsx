import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const LegalPage: React.FC<{ initialTab?: 'privacy' | 'terms' }> = ({
  initialTab = 'privacy',
}) => {
  const [tab, setTab] = useState<'privacy' | 'terms'>(initialTab);

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
      {/* Tab Switcher */}
      <div className="flex items-center justify-center">
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1.5 rounded-2xl text-xs">
          <button
            onClick={() => setTab('privacy')}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
              tab === 'privacy'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Privacy Policy (DPDP 2023)
          </button>
          <button
            onClick={() => setTab('terms')}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
              tab === 'terms'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Terms of Service
          </button>
        </div>
      </div>

      {tab === 'privacy' ? (
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Compliance with Digital Personal Data Protection Act
            </span>
            <h1 className="text-2xl font-extrabold text-white">Bharat AI Privacy Policy</h1>
            <p className="text-xs text-slate-400">Last updated: October 2026</p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Our Core Privacy Philosophy</h2>
            <p>
              Bharat AI Technologies Private Limited (&ldquo;Bharat AI&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is built upon the foundational principle of citizen data sovereignty. We believe that your daily planner tasks, UPI financial logs, uploaded identity documents, and personal conversations belong solely to you.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. What Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong>Account Credentials:</strong> Name, verified email, and contact number for authentication.</li>
              <li><strong>User Content:</strong> Tasks, rupee expenses, and uploaded documents strictly stored in private encrypted vaults to serve your direct application requests.</li>
              <li><strong>Voice Transcripts:</strong> Ephemeral speech audio processed via secure APIs solely to execute user commands (e.g., adding a reminder). We do not record background conversations.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. What We Never Do</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>We NEVER sell your personal data to ad brokers.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>We NEVER use your private bills to train public models.</span>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Your Rights: One-Click Export &amp; Erasure</h2>
            <p>
              Under DPDP Act 2023, you hold the absolute right to download your complete data profile or initiate permanent account deletion directly from your Settings dashboard.
            </p>
          </section>
        </div>
      ) : (
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Legal Agreement
            </span>
            <h1 className="text-2xl font-extrabold text-white">Terms of Service</h1>
            <p className="text-xs text-slate-400">Effective: October 2026</p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Bharat AI, you agree to comply with these terms, the Information Technology Act 2000, and applicable laws of the Republic of India.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Permitted Use</h2>
            <p>
              Bharat AI is intended for everyday productivity, personal organization, document understanding, and educational inquiry. You agree not to use Bharat AI to generate hate speech, defame individuals, or bypass verified public authentication security.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Public Services &amp; Financial Disclaimers</h2>
            <p>
              Bharat AI presents public scheme guides based on verified government documentation. We are not an official arm of the Government of India, nor do we issue guaranteed identity or welfare approvals. Similarly, Personal Finance insights are organizational and educational, not certified investment advice.
            </p>
          </section>
        </div>
      )}
    </div>
  );
};
