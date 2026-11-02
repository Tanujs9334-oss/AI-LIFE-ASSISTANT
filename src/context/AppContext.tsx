import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Theme,
  Page,
  UserProfile,
  TaskItem,
  ExpenseItem,
  SavingsGoal,
  DocumentItem,
  ChatSession,
  ChatMessage,
  ClaudeConfig,
} from '../types';
import {
  INITIAL_TASKS,
  INITIAL_EXPENSES,
  INITIAL_SAVINGS_GOALS,
  INITIAL_DOCUMENTS,
} from '../data/mockData';

interface AppContextType {
  activePage: Page;
  setActivePage: (page: Page) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, 'id' | 'completed'>) => void;
  updateTask: (id: string, updates: Partial<TaskItem>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  expenses: ExpenseItem[];
  addExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  deleteExpense: (id: string) => void;
  savingsGoals: SavingsGoal[];
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void;
  updateSavingsGoal: (id: string, amount: number) => void;
  documents: DocumentItem[];
  addDocument: (doc: Omit<DocumentItem, 'id' | 'uploadDate'>) => void;
  deleteDocument: (id: string) => void;
  selectedDocId: string | null;
  setSelectedDocId: (id: string | null) => void;
  chatSessions: ChatSession[];
  activeSessionId: string;
  setActiveSessionId: (id: string) => void;
  createNewChat: () => void;
  addMessageToCurrentChat: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => Promise<void>;
  deleteChatSession: (id: string) => void;
  renameChatSession: (id: string, newTitle: string) => void;
  clearCurrentChat: () => void;
  androidSync: {
    synced: boolean;
    lastSyncedAt: string;
    deviceName: string;
    isSyncing: boolean;
    triggerSync: () => Promise<void>;
  };
  claudeConfig: ClaudeConfig;
  setClaudeConfig: React.Dispatch<React.SetStateAction<ClaudeConfig>>;
  activeModelProvider: 'gemini' | 'claude';
  setActiveModelProvider: (provider: 'gemini' | 'claude') => void;
  realtimeSearchEnabled: boolean;
  setRealtimeSearchEnabled: (enabled: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot') => void;
  checkoutModalOpen: boolean;
  setCheckoutModalOpen: (open: boolean) => void;
  selectedPlan: any;
  setSelectedPlan: (plan: any) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  exportAllUserData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: UserProfile = {
  id: 'usr-bharat-01',
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
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(INITIAL_SAVINGS_GOALS);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(INITIAL_DOCUMENTS[0].id);

  // Chat sessions
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: 'session-1',
      title: 'Welcome to Bharat AI',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      language: 'en',
      messages: [
        {
          id: 'msg-1',
          role: 'assistant',
          content: `**Namaste! I am Bharat AI.** 🙏\n\nYour unified intelligence platform designed for everyday Indian life.\n\nHere are a few things you can ask me:\n- *"Plan my day with 3 priority blocks and reminders"*\n- *"What documents do I need for Ayushman Bharat Card?"*\n- *"Log ₹450 spent on auto & coffee via UPI"*\n- *"Summarize this rental agreement in Hindi"*`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    },
  ]);
  const [activeSessionId, setActiveSessionId] = useState<string>('session-1');

  // Modals & UI States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Claude & Real-time AI Configuration
  const [claudeConfig, setClaudeConfig] = useState<ClaudeConfig>({
    enabled: true,
    apiKey: '',
    model: 'claude-3-5-sonnet-20241022',
    status: 'connected',
    lastChecked: 'Active (Real-time live feed enabled)',
  });
  const [activeModelProvider, setActiveModelProvider] = useState<'gemini' | 'claude'>('gemini');
  const [realtimeSearchEnabled, setRealtimeSearchEnabled] = useState<boolean>(true);

  // Android Cloud Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string>('Just now');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (user) {
      setUser({ ...user, language: lang });
    }
    showToast(`Language updated to ${lang === 'hi' ? 'हिन्दी (Hindi)' : lang === 'hinglish' ? 'Hinglish' : 'English'}`);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (user) {
      setUser({ ...user, theme: next });
    }
  };

  // Task operations
  const addTask = (newTask: Omit<TaskItem, 'id' | 'completed'>) => {
    const item: TaskItem = {
      ...newTask,
      id: `task-${Date.now()}`,
      completed: false,
    };
    setTasks((prev) => [item, ...prev]);
    showToast(`Task added: "${item.title.slice(0, 24)}..."`);
    triggerSync();
  };

  const updateTask = (id: string, updates: Partial<TaskItem>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    showToast('Task updated');
    triggerSync();
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('Task deleted');
    triggerSync();
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    triggerSync();
  };

  // Expense operations
  const addExpense = (newExp: Omit<ExpenseItem, 'id'>) => {
    const item: ExpenseItem = {
      ...newExp,
      id: `exp-${Date.now()}`,
    };
    setExpenses((prev) => [item, ...prev]);
    showToast(`Recorded ₹${item.amount.toLocaleString('en-IN')} in ${item.category}`);
    triggerSync();
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    showToast('Expense entry removed');
    triggerSync();
  };

  const addSavingsGoal = (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => {
    const item: SavingsGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
      currentAmount: 0,
    };
    setSavingsGoals((prev) => [...prev, item]);
    showToast(`Savings goal created: ${item.title}`);
  };

  const updateSavingsGoal = (id: string, amount: number) => {
    setSavingsGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g))
    );
    showToast('Savings updated');
  };

  // Document operations
  const addDocument = (newDoc: Omit<DocumentItem, 'id' | 'uploadDate'>) => {
    const item: DocumentItem = {
      ...newDoc,
      id: `doc-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
    };
    setDocuments((prev) => [item, ...prev]);
    setSelectedDocId(item.id);
    showToast(`Uploaded ${item.title}`);
    triggerSync();
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    if (selectedDocId === id) {
      setSelectedDocId(documents.find((d) => d.id !== id)?.id || null);
    }
    showToast('Document removed');
    triggerSync();
  };

  // Chat operations
  const createNewChat = () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      language,
      messages: [
        {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          content:
            language === 'hi'
              ? 'नमस्ते! मैं भारत एआई हूँ। मैं आपकी किस प्रकार सहायता कर सकता हूँ?'
              : language === 'hinglish'
              ? 'Namaste! Bharat AI here. Aaj main aapki kya help kar sakta hoon?'
              : 'Namaste! I am Bharat AI. How can I help you today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };
    setChatSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  const addMessageToCurrentChat = async (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const userMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const currentSession = chatSessions.find((s) => s.id === activeSessionId);
    const existingMessages = currentSession ? currentSession.messages : [];

    // Immediately push user message
    setChatSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          const isFirstUserMessage = s.messages.filter((m) => m.role === 'user').length === 0;
          const updatedTitle = isFirstUserMessage
            ? msg.content.slice(0, 28) + (msg.content.length > 28 ? '...' : '')
            : s.title;
          return {
            ...s,
            title: updatedTitle,
            updatedAt: new Date().toISOString(),
            messages: [...s.messages, userMsg],
          };
        }
        return s;
      })
    );

    // Call server Gemini API
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg.content,
          language,
          useRealTimeSearch: realtimeSearchEnabled,
          modelProvider: activeModelProvider,
          claudeApiKey: claudeConfig.apiKey,
          attachment: msg.attachment
            ? {
                mimeType: msg.attachment.type,
                data: msg.attachment.dataUrl?.split(',')[1] || '',
              }
            : undefined,
          history: existingMessages.slice(-6).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      let replyContent = data.reply || "I am currently processing your request. Please try again in a moment.";
      let routingAction: any = undefined;

      // Extract routing tags if present
      const routeMatch = replyContent.match(/<!--ROUTING_ACTION:(.*?)-->/);
      if (routeMatch && routeMatch[1]) {
        try {
          routingAction = JSON.parse(routeMatch[1]);
          replyContent = replyContent.replace(routeMatch[0], '').trim();
        } catch (e) {
          // ignore parsing error
        }
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        routingAction,
        sources: data.sources || [],
        provider: data.provider,
      };

      setChatSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? {
                ...s,
                messages: [...s.messages, assistantMsg],
                updatedAt: new Date().toISOString(),
              }
            : s
        )
      );
    } catch (err) {
      console.error('Error sending chat message:', err);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content:
          'Namaste! I had a brief connection issue communicating with our AI servers. Please ensure your connection is active or try sending your query once more.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatSessions((prev) =>
        prev.map((s) => (s.id === activeSessionId ? { ...s, messages: [...s.messages, errorMsg] } : s))
      );
    }
  };

  const deleteChatSession = (id: string) => {
    setChatSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      if (filtered.length === 0) {
        return [
          {
            id: `session-${Date.now()}`,
            title: 'New Conversation',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            language,
            messages: [],
          },
        ];
      }
      return filtered;
    });
    if (activeSessionId === id) {
      const remaining = chatSessions.filter((s) => s.id !== id);
      if (remaining.length > 0) {
        setActiveSessionId(remaining[0].id);
      }
    }
    showToast('Conversation deleted');
  };

  const renameChatSession = (id: string, newTitle: string) => {
    setChatSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title: newTitle } : s))
    );
  };

  const clearCurrentChat = () => {
    setChatSessions((prev) =>
      prev.map((s) => (s.id === activeSessionId ? { ...s, messages: [] } : s))
    );
    showToast('Chat history cleared');
  };

  // Cross-device synchronization with Android companion app
  const triggerSync = async () => {
    setIsSyncing(true);
    try {
      await fetch('/api/sync/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tasks',
          payload: tasks,
        }),
      });
      setLastSyncedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (e) {
      // Offline fallback
      setLastSyncedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } finally {
      setTimeout(() => {
        setIsSyncing(false);
      }, 600);
    }
  };

  // Export all user data as formatted JSON
  const exportAllUserData = () => {
    const exportBundle = {
      exportVersion: '1.0',
      exportedAt: new Date().toISOString(),
      user,
      tasks,
      expenses,
      savingsGoals,
      documentsSummary: documents.map((d) => ({
        id: d.id,
        title: d.title,
        folder: d.folder,
        uploadDate: d.uploadDate,
        summary: d.summary,
      })),
      chatSessions: chatSessions.map((s) => ({
        id: s.id,
        title: s.title,
        messageCount: s.messages.length,
      })),
    };

    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bharat_AI_Data_Export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Your complete Bharat AI data has been downloaded!');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        language,
        setLanguage,
        theme,
        toggleTheme,
        user,
        setUser,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        expenses,
        addExpense,
        deleteExpense,
        savingsGoals,
        addSavingsGoal,
        updateSavingsGoal,
        documents,
        addDocument,
        deleteDocument,
        selectedDocId,
        setSelectedDocId,
        chatSessions,
        activeSessionId,
        setActiveSessionId,
        createNewChat,
        addMessageToCurrentChat,
        deleteChatSession,
        renameChatSession,
        clearCurrentChat,
        androidSync: {
          synced: true,
          lastSyncedAt,
          deviceName: 'Pixel 8 Pro (Bharat AI Companion App)',
          isSyncing,
          triggerSync,
        },
        claudeConfig,
        setClaudeConfig,
        activeModelProvider,
        setActiveModelProvider,
        realtimeSearchEnabled,
        setRealtimeSearchEnabled,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        checkoutModalOpen,
        setCheckoutModalOpen,
        selectedPlan,
        setSelectedPlan,
        toastMessage,
        showToast,
        exportAllUserData,
      }}
    >
      <div className={theme === 'dark' ? 'dark' : ''}>{children}</div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
