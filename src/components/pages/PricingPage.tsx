import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRICING_PLANS } from '../../data/mockData';
import {
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  CreditCard,
  QrCode,
  X,
  HelpCircle,
  Building2,
  Lock,
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { user, showToast, setActivePage } = useApp();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiIdInput, setUpiIdInput] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleSelectPlan = (plan: any) => {
    if (plan.id === 'free') {
      showToast('You are already on the Bharat Free plan!');
      return;
    }
    setSelectedPlanForCheckout(plan);
    setCheckoutModalOpen(true);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setCheckoutModalOpen(false);
      showToast(`Dhanyawaad! Your upgrade to ${selectedPlanForCheckout?.name} is activated in test mode.`);
    }, 1500);
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Transparent Pricing for India
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Simple, Fair Plans for Every Need
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Start free forever, or upgrade for uncapped conversational power, voice synthesis, document intelligence, and cross-device synchronization.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="flex items-center justify-center pt-2">
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-2xl text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500 text-slate-950">
                Save 25%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const effectivePrice =
            plan.priceINR === 0
              ? 0
              : billingCycle === 'annual'
              ? Math.round(plan.priceINR * 0.75)
              : plan.priceINR;

          return (
            <div
              key={plan.id}
              className={`p-8 rounded-3xl border flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-slate-900 border-amber-500 shadow-2xl shadow-amber-500/10 scale-105 z-10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                </div>

                <div className="py-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      ₹{effectivePrice}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {plan.priceINR === 0 ? 'Forever' : '/ month'}
                    </span>
                  </div>
                  {billingCycle === 'annual' && plan.priceINR > 0 && (
                    <span className="text-[11px] text-emerald-400 font-semibold block mt-1">
                      Billed annually (₹{(effectivePrice * 12).toLocaleString('en-IN')}/yr)
                    </span>
                  )}
                </div>

                <ul className="space-y-3 text-xs text-slate-300 pt-3 border-t border-slate-800">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 shadow-lg shadow-orange-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">End-to-End Privacy</h4>
            <p className="text-xs text-slate-400">Your data is never shared with third parties.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">UPI &amp; RuPay Accepted</h4>
            <p className="text-xs text-slate-400">Google Pay, PhonePe, Paytm, Cards &amp; Net Banking.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Cancel Anytime</h4>
            <p className="text-xs text-slate-400">Zero long-term lock-in or surprise fees.</p>
          </div>
        </div>
      </div>

      {/* Interactive Indian Checkout Modal */}
      {checkoutModalOpen && selectedPlanForCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Secure Indian Gateway Simulation
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  Sandbox Active
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                Upgrade to {selectedPlanForCheckout.name}
              </h3>
              <p className="text-xs text-slate-400">
                Amount payable: <strong>₹{billingCycle === 'annual' ? Math.round(selectedPlanForCheckout.priceINR * 0.75) : selectedPlanForCheckout.priceINR}</strong>
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('upi')}
                className={`py-2 rounded-lg font-semibold flex flex-col items-center gap-1 ${
                  selectedPaymentMethod === 'upi'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>UPI / QR</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('card')}
                className={`py-2 rounded-lg font-semibold flex flex-col items-center gap-1 ${
                  selectedPaymentMethod === 'card'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>RuPay / Card</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('netbanking')}
                className={`py-2 rounded-lg font-semibold flex flex-col items-center gap-1 ${
                  selectedPaymentMethod === 'netbanking'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Net Banking</span>
              </button>
            </div>

            <form onSubmit={handleSimulatePayment} className="space-y-4 text-xs">
              {selectedPaymentMethod === 'upi' ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
                    <QrCode className="w-24 h-24 text-amber-400" />
                    <p className="text-[11px] text-slate-400">
                      Scan using Google Pay, PhonePe, Paytm, or BHIM UPI
                    </p>
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">
                      Or Enter UPI ID (VPA)
                    </label>
                    <input
                      type="text"
                      value={upiIdInput}
                      onChange={(e) => setUpiIdInput(e.target.value)}
                      placeholder="e.g. mobile@upi or user@okaxis"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                </div>
              ) : selectedPaymentMethod === 'card' ? (
                <div className="space-y-2.5">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010 (RuPay/Visa)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={3}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Select Bank</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white">
                    <option>State Bank of India (SBI)</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Punjab National Bank (PNB)</option>
                  </select>
                </div>
              )}

              <p className="text-[11px] text-slate-500 leading-relaxed">
                *Compliance disclosure: Payment is currently simulated in demo sandbox mode. No real bank charges will be deducted until official payment gateway keys are activated.
              </p>

              <button
                type="submit"
                disabled={isProcessingPayment}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 cursor-pointer"
              >
                <span>{isProcessingPayment ? 'Verifying with NPCI...' : 'Complete Simulated Upgrade'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
