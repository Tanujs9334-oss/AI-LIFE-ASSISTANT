import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TaskItem } from '../../types';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  Clock,
  Sparkles,
  Filter,
  Mic,
  CalendarDays,
  Tag,
  AlertTriangle,
  Flame,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const DailyPlanner: React.FC = () => {
  const { tasks, addTask, deleteTask, toggleTask, showToast, setActivePage } = useApp();

  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isAiPlanning, setIsAiPlanning] = useState(false);
  const [aiBriefing, setAiBriefing] = useState<string | null>(null);

  // Modal for new task
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<TaskItem['category']>('Work');
  const [newPriority, setNewPriority] = useState<TaskItem['priority']>('High');
  const [newDueDate, setNewDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [newDueTime, setNewDueTime] = useState('18:00');
  const [newRecurring, setNewRecurring] = useState<TaskItem['recurring']>('none');

  const categories = ['All', 'Work', 'Personal', 'Health', 'Finance', 'Bharat Gov', 'Study'];

  const filteredTasks = tasks.filter((t) => {
    if (filterCategory === 'All') return true;
    return t.category === filterCategory;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;
  const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Handle task completion with confetti
  const handleToggle = (id: string, currentlyCompleted: boolean) => {
    toggleTask(id);
    if (!currentlyCompleted) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
      showToast('Task marked as complete! Great work.');
    }
  };

  // Create Task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask({
      title: newTitle.trim(),
      description: newDescription.trim() || undefined,
      category: newCategory,
      priority: newPriority,
      dueDate: newDueDate,
      dueTime: newDueTime,
      recurring: newRecurring,
      reminderSet: true,
    });

    setNewTitle('');
    setNewDescription('');
    setIsModalOpen(false);
  };

  // Generate AI Daily Schedule Briefing
  const handleAiOptimizeDay = async () => {
    setIsAiPlanning(true);
    setAiBriefing(null);

    try {
      const res = await fetch('/api/ai/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tasks: tasks.filter((t) => !t.completed),
          userGoal: 'High focus and balanced Indian workday with priority deadlines.',
        }),
      });

      const data = await res.json();
      setAiBriefing(data.plan);
    } catch (err) {
      setAiBriefing(
        '### 🌅 Bharat AI Morning Briefing\n- **Priority Block 1**: Tackle urgent tax & utility deadlines before lunch.\n- **Focus Session**: 11:30 AM to 1:30 PM (Deep work).\n- **Evening Wrap-up**: Review pending items and clear emails.'
      );
    } finally {
      setIsAiPlanning(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* Top Header & Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Smart Daily Planner</h1>
              <p className="text-xs text-slate-400">
                Organize your goals, priorities, and daily routine with AI assistance
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAiOptimizeDay}
            disabled={isAiPlanning}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${isAiPlanning ? 'animate-spin' : ''}`} />
            <span>{isAiPlanning ? 'Planning Day...' : 'AI Plan My Day'}</span>
          </button>

          <button
            onClick={() => setActivePage('voice')}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Create task via voice command"
          >
            <Mic className="w-4 h-4 text-orange-400" />
            <span className="hidden sm:inline">Voice Add</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Productivity Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Pending Tasks</span>
            <span className="text-xl font-extrabold text-white">{pendingCount}</span>
          </div>
          <Clock className="w-6 h-6 text-amber-400" />
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Completed</span>
            <span className="text-xl font-extrabold text-emerald-400">{completedCount}</span>
          </div>
          <CheckCheck className="w-6 h-6 text-emerald-400" />
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Progress</span>
            <span className="text-xl font-extrabold text-blue-400">{completionPercentage}%</span>
          </div>
          <TrendingUp className="w-6 h-6 text-blue-400" />
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Focus Streak</span>
            <span className="text-xl font-extrabold text-orange-400">5 Days 🔥</span>
          </div>
          <Flame className="w-6 h-6 text-orange-400" />
        </div>
      </div>

      {/* AI Morning Briefing Card (if generated) */}
      {aiBriefing && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-xl space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-amber-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Bharat AI Optimized Schedule
            </span>
            <button
              onClick={() => setAiBriefing(null)}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Dismiss
            </button>
          </div>
          <div className="whitespace-pre-line font-normal">{aiBriefing}</div>
        </div>
      )}

      {/* Main View Filter & View Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
                filterCategory === cat
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          {(['daily', 'weekly', 'monthly'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded-lg font-medium capitalize transition-all ${
                viewMode === mode
                  ? 'bg-blue-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-xs">
            No tasks found for category &ldquo;{filterCategory}&rdquo;. Click &ldquo;Add Task&rdquo; to create one!
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.completed;
            const priorityColors = {
              Urgent: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
              High: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
              Medium: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
              Low: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
            };

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                  isCompleted
                    ? 'bg-slate-950/60 border-slate-800/80 opacity-60'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => handleToggle(task.id, isCompleted)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`font-semibold text-sm ${
                          isCompleted ? 'line-through text-slate-500' : 'text-white'
                        }`}
                      >
                        {task.title}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                          priorityColors[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400">
                        {task.category}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" /> Due: {task.dueDate} {task.dueTime}
                      </span>
                      {task.recurring !== 'none' && (
                        <span className="text-amber-400/80 capitalize">
                          • Repeats {task.recurring}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="Delete Task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-slate-100 space-y-4">
            <h3 className="font-bold text-base text-white">Create New Task</h3>

            <form onSubmit={handleCreateTask} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. File GSTR-3B Return or Pay BSES bill"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Add details, links, or notes..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
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
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Due Time (IST)</label>
                  <input
                    type="time"
                    value={newDueTime}
                    onChange={(e) => setNewDueTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold transition-all shadow-md cursor-pointer"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
