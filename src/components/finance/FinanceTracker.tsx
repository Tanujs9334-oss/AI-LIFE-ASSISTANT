import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExpenseItem, SavingsGoal } from '../../types';
import {
  Wallet,
  Plus,
  TrendingDown,
  TrendingUp,
  Download,
  Sparkles,
  PieChart,
  Target,
  Trash2,
  Calendar,
  AlertCircle,
  CreditCard,
  IndianRupee,
  Mic,
} from 'lucide-react';

export const FinanceTracker: React.FC = () => {
  const {
    expenses,
    addExpense,
    deleteExpense,
    savingsGoals,
    addSavingsGoal,
    updateSavingsGoal,
    showToast,
    setActivePage,
  } = useApp();

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  // Form states
  const [newAmount, setNewAmount] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<ExpenseItem['category']>('Groceries & Food');
  const [newPaymentMethod, setNewPaymentMethod] = useState<ExpenseItem['paymentMethod']>('UPI');
  const [newType, setNewType] = useState<'expense' | 'income'>('expense');

  // New goal states
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTargetAmount, setGoalTargetAmount] = useState('');
  const [goalTargetDate, setGoalTargetDate] = useState('2026-12-31');

  const monthlyBudgetLimit = 45000;

  const totalIncome = expenses
    .filter((e) => e.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = expenses
    .filter((e) => e.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netSavings = totalIncome - totalExpenses;
  const budgetPercentage = Math.min(
    100,
    Math.round((totalExpenses / monthlyBudgetLimit) * 100)
  );

  // Categories breakdown
  const categoryTotals: Record<string, number> = {};
  expenses
    .filter((e) => e.type === 'expense')
    .forEach((e) => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

  const categoriesList = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(newAmount);
    if (!parsed || parsed <= 0 || !newDesc.trim()) return;

    addExpense({
      amount: parsed,
      category: newCategory,
      description: newDesc.trim(),
      date: new Date().toISOString().split('T')[0],
      paymentMethod: newPaymentMethod,
      type: newType,
    });

    setNewAmount('');
    setNewDesc('');
    setIsExpenseModalOpen(false);
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(goalTargetAmount);
    if (!parsed || !goalTitle.trim()) return;

    addSavingsGoal({
      title: goalTitle.trim(),
      targetAmount: parsed,
      targetDate: goalTargetDate,
      category: 'General',
    });

    setGoalTitle('');
    setGoalTargetAmount('');
    setIsGoalModalOpen(false);
  };

  // AI Financial Insights generator
  const handleGenerateAiInsight = async () => {
    setIsAiAnalyzing(true);
    setAiInsight(null);

    try {
      const res = await fetch('/api/ai/finance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expenses,
          income: totalIncome,
          budget: monthlyBudgetLimit,
          query: 'Assess my 50-30-20 budget and suggest high impact savings in India.',
        }),
      });
      const data = await res.json();
      setAiInsight(data.insight);
    } catch (err) {
      setAiInsight(
        '### 💡 Bharat AI Financial Insights\n- Your discretionary dining & grocery spend is healthy at ~10%.\n- Continue allocating ₹10,000 monthly to your index mutual fund.\n- Maintain 6 months of living expenses (₹1.5L) in high-yield liquid instruments.'
      );
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  // Export report to CSV
  const handleExportCSV = () => {
    let csv = 'ID,Date,Type,Category,Description,Amount (INR),Payment Method\n';
    expenses.forEach((e) => {
      csv += `"${e.id}","${e.date}","${e.type}","${e.category}","${e.description.replace(/"/g, '""')}",${e.amount},"${e.paymentMethod}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bharat_AI_Expenses_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Expense report CSV downloaded!');
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Personal Finance Workspace</h1>
            <p className="text-xs text-slate-400">
              Indian rupee (₹) cashflow tracking, UPI logging, budget progress, and savings goals
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateAiInsight}
            disabled={isAiAnalyzing}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${isAiAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAiAnalyzing ? 'Analyzing...' : 'AI Financial Audit'}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Download CSV Statement"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={() => setIsExpenseModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record Entry</span>
          </button>
        </div>
      </div>

      {/* Financial Health Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block">Total Income (This Month)</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-emerald-400">
              ₹{totalIncome.toLocaleString('en-IN')}
            </span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block">Total Expenses (This Month)</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-amber-400">
              ₹{totalExpenses.toLocaleString('en-IN')}
            </span>
            <TrendingDown className="w-5 h-5 text-amber-400" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block">Net Surplus / Savings</span>
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-extrabold ${netSavings >= 0 ? 'text-teal-400' : 'text-rose-400'}`}>
              ₹{netSavings.toLocaleString('en-IN')}
            </span>
            <IndianRupee className="w-5 h-5 text-teal-400" />
          </div>
        </div>
      </div>

      {/* Monthly Budget Progress Meter */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-white">Monthly Expense Budget Tracker</span>
            <p className="text-[11px] text-slate-400">
              Spent ₹{totalExpenses.toLocaleString('en-IN')} of ₹{monthlyBudgetLimit.toLocaleString('en-IN')} cap
            </p>
          </div>
          <span className={`font-bold text-sm ${budgetPercentage > 90 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {budgetPercentage}% Consumed
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              budgetPercentage > 85
                ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                : 'bg-gradient-to-r from-emerald-500 to-teal-400'
            }`}
            style={{ width: `${budgetPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* AI Financial Insight Box */}
      {aiInsight && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-amber-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Personal Finance Strategy
            </span>
            <button
              onClick={() => setAiInsight(null)}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Dismiss
            </button>
          </div>
          <div className="whitespace-pre-line font-normal">{aiInsight}</div>
        </div>
      )}

      {/* Split Grid: Category Breakdown on Left, Savings Goals on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-teal-400" />
            <span>Category Spending Breakdown</span>
          </h2>

          <div className="space-y-3">
            {categoriesList.map(([cat, amt]) => {
              const pct = totalExpenses > 0 ? Math.round((amt / totalExpenses) * 100) : 0;
              return (
                <div key={cat} className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>{cat}</span>
                    <span className="font-bold text-white">
                      ₹{amt.toLocaleString('en-IN')}{' '}
                      <span className="text-slate-500 font-normal">({pct}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Savings Goals */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Target Savings Goals</span>
            </h2>
            <button
              onClick={() => setIsGoalModalOpen(true)}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> Add Goal
            </button>
          </div>

          <div className="space-y-3">
            {savingsGoals.map((goal) => {
              const goalPct = Math.min(
                100,
                Math.round((goal.currentAmount / goal.targetAmount) * 100)
              );
              return (
                <div key={goal.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-bold text-white block">{goal.title}</span>
                      <span className="text-[10px] text-slate-500">Target: {goal.targetDate}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-emerald-400 text-sm">
                        ₹{goal.currentAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        of ₹{goal.targetAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${goalPct}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center pt-1 text-[11px]">
                    <span className="text-slate-400">{goalPct}% achieved</span>
                    <button
                      onClick={() => updateSavingsGoal(goal.id, 5000)}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold"
                    >
                      + Add ₹5,000
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-slate-400" />
          <span>Recent Rupee Transactions</span>
        </h2>

        <div className="space-y-2">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                    exp.type === 'income'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {exp.type === 'income' ? '+' : '-'}
                </div>
                <div>
                  <span className="font-bold text-white block">{exp.description}</span>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span>{exp.category}</span>
                    <span>• {exp.paymentMethod}</span>
                    <span>• {exp.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`font-black text-sm ${
                    exp.type === 'income' ? 'text-emerald-400' : 'text-slate-200'
                  }`}
                >
                  {exp.type === 'income' ? '+' : '-'}₹{exp.amount.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => deleteExpense(exp.id)}
                  className="p-1 rounded text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-500 flex items-center gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-500/70 shrink-0" />
        <span>
          <strong>Important Regulatory Disclaimer:</strong> Bharat AI Personal Finance is an educational budgeting and cashflow tracking software. It is not a SEBI-registered investment advisor and does not provide guaranteed financial returns or credit facilities.
        </span>
      </div>

      {/* Add Expense Modal */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-slate-100 space-y-4">
            <h3 className="font-bold text-base text-white">Record Transaction</h3>

            <form onSubmit={handleCreateExpense} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setNewType('expense')}
                  className={`py-1.5 rounded-lg font-semibold ${
                    newType === 'expense'
                      ? 'bg-rose-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setNewType('income')}
                  className={`py-1.5 rounded-lg font-semibold ${
                    newType === 'income'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Income
                </button>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Amount in Rupees (₹) *
                </label>
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="e.g. 450"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-teal-500 font-mono text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Description *</label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="e.g. Blinkit groceries or auto fare"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="Groceries & Food">Groceries & Food</option>
                    <option value="Housing & Rent">Housing & Rent</option>
                    <option value="Bills & Utilities">Bills & Utilities</option>
                    <option value="Transport & Fuel">Transport & Fuel</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Investments & Savings">Investments & Savings</option>
                    <option value="Shopping & Leisure">Shopping & Leisure</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Payment Method</label>
                  <select
                    value={newPaymentMethod}
                    onChange={(e) => setNewPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="UPI">UPI (GPay/PhonePe)</option>
                    <option value="Card">RuPay / Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsExpenseModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all shadow-md cursor-pointer"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-slate-100 space-y-4">
            <h3 className="font-bold text-base text-white">Create Savings Target</h3>

            <form onSubmit={handleCreateGoal} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Goal Name *</label>
                <input
                  type="text"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="e.g. Emergency Fund or Diwali Gift"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Target Amount in Rupees (₹) *
                </label>
                <input
                  type="number"
                  value={goalTargetAmount}
                  onChange={(e) => setGoalTargetAmount(e.target.value)}
                  placeholder="e.g. 100000"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Target Date</label>
                <input
                  type="date"
                  value={goalTargetDate}
                  onChange={(e) => setGoalTargetDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsGoalModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-md cursor-pointer"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
