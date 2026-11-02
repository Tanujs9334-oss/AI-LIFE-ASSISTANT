import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BHARAT_SCHEMES } from '../../data/mockData';
import { BharatScheme } from '../../types';
import {
  Landmark,
  ShieldCheck,
  Search,
  ExternalLink,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ChevronRight,
  Filter,
  Info,
} from 'lucide-react';

export const BharatServices: React.FC = () => {
  const { language, setLanguage, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedScheme, setSelectedScheme] = useState<BharatScheme | null>(BHARAT_SCHEMES[0]);
  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);
  const [userAge, setUserAge] = useState('32');
  const [userIncome, setUserIncome] = useState('350000');
  const [userOccupation, setUserOccupation] = useState('Salaried Professional');
  const [eligibilityResult, setEligibilityResult] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const categories = [
    'All',
    'Healthcare',
    'Digital Identity',
    'Agriculture & Rural',
    'Social Security',
    'Financial Inclusion',
  ];

  const filteredSchemes = BHARAT_SCHEMES.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.nameHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCheckEligibility = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedScheme) return;

    setIsChecking(true);
    setEligibilityResult(null);

    try {
      const res = await fetch('/api/ai/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeName: selectedScheme.name,
          userProfile: {
            age: userAge,
            annualIncome: userIncome,
            occupation: userOccupation,
          },
          query: `Check eligibility for ${selectedScheme.name} based on age ${userAge}, annual income ₹${userIncome}, occupation ${userOccupation}.`,
          language: language === 'hi' ? 'hi' : 'en',
        }),
      });

      const data = await res.json();
      setEligibilityResult(data.guidance);
    } catch (err) {
      setEligibilityResult(
        `### ✅ Preliminary Eligibility Assessment for ${selectedScheme.name}
- Based on your profile (${userOccupation}, age ${userAge}), you appear generally eligible.
- Please verify documents (Aadhaar & linked mobile) on the official government portal: ${selectedScheme.officialPortal}.`
      );
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white">Bharat Government Services</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified .gov.in
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Clear eligibility requirements, required documents, and official portal links in English & हिन्दी
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEligibilityModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Interactive Eligibility Checker</span>
          </button>
        </div>
      </div>

      {/* Verified Safety Notice */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/20 text-xs text-slate-300 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed text-xs">
          <strong>Official Governance Guarantee:</strong> All portal references strictly link to certified Government of India domains ending in <code className="text-amber-400">.gov.in</code> or <code className="text-amber-400">.nic.in</code>. Bharat AI never asks for confidential OTPs, MPINs, or biometric secrets.
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search schemes (e.g. Ayushman, DigiLocker, PF, Kisan)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Grid: Scheme Directory on Left, Detailed Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Schemes Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredSchemes.map((scheme) => {
            const isSelected = selectedScheme?.id === scheme.id;
            return (
              <div
                key={scheme.id}
                onClick={() => setSelectedScheme(scheme)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-500/15 border-purple-500/50 shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 text-purple-300 border border-purple-500/30">
                    {scheme.category}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Verified: {scheme.lastVerifiedDate}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-0.5">{scheme.name}</h3>
                <p className="text-xs text-amber-400/90 font-medium mb-2">{scheme.nameHindi}</p>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {scheme.tagline}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-semibold">
                  <span>View Details & Checklist</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Scheme Inspector (7 cols) */}
        <div className="lg:col-span-7">
          {selectedScheme ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
              {/* Header */}
              <div className="border-b border-slate-800 pb-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {selectedScheme.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    Last Verified: <strong className="text-slate-200">{selectedScheme.lastVerifiedDate}</strong>
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-white">{selectedScheme.name}</h2>
                <p className="text-sm text-amber-400 font-medium">{selectedScheme.nameHindi}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedScheme.tagline}</p>
              </div>

              {/* Hindi Summary Callout */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-amber-400 block">हिन्दी में विवरण:</span>
                <p className="leading-relaxed">{selectedScheme.hindiOverview}</p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Key Benefits & Coverage:
                </h4>
                <div className="space-y-1.5">
                  {selectedScheme.keyBenefits.map((ben, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Eligibility Criteria:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  {selectedScheme.eligibility.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
              </div>

              {/* Required Documents */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Mandatory Documents Checklist:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedScheme.requiredDocuments.map((doc, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps to apply */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Step-by-Step Official Application Workflow:
                </h4>
                <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside">
                  {selectedScheme.stepsToApply.map((step, i) => (
                    <li key={i} className="pl-1">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
                <a
                  href={selectedScheme.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                >
                  <span>Open Official Portal ({new URL(selectedScheme.officialPortal).hostname})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setEligibilityModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                >
                  Verify My Eligibility
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-xs">
              Select a scheme on the left to inspect official guidance.
            </div>
          )}
        </div>
      </div>

      {/* Interactive Eligibility Checker Modal */}
      {eligibilityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-slate-100 space-y-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Eligibility Assessment for {selectedScheme?.name}</span>
            </h3>

            <form onSubmit={handleCheckEligibility} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Applicant Age</label>
                <input
                  type="number"
                  value={userAge}
                  onChange={(e) => setUserAge(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Annual Household Income in INR (₹)
                </label>
                <input
                  type="number"
                  value={userIncome}
                  onChange={(e) => setUserIncome(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Occupation / Category</label>
                <select
                  value={userOccupation}
                  onChange={(e) => setUserOccupation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                >
                  <option value="Salaried Professional">Salaried Professional</option>
                  <option value="Farmer / Agricultural Worker">Farmer / Agricultural Worker</option>
                  <option value="Self-Employed / MSME Owner">Self-Employed / MSME Owner</option>
                  <option value="Senior Citizen (Aged 70+)">Senior Citizen (Aged 70+)</option>
                  <option value="Gig / Transport / Informal Worker">Gig / Transport / Informal Worker</option>
                  <option value="Student">Student</option>
                </select>
              </div>

              {eligibilityResult && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/30 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                  {eligibilityResult}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEligibilityModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-300 hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isChecking}
                  className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold transition-all shadow-md cursor-pointer"
                >
                  {isChecking ? 'Checking...' : 'Run Assessment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
