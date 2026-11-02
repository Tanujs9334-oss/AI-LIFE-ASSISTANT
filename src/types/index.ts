export type Language = 'en' | 'hi' | 'hinglish';
export type Theme = 'dark' | 'light';

export type Page =
  | 'home'
  | 'chat'
  | 'voice'
  | 'document'
  | 'planner'
  | 'finance'
  | 'services'
  | 'learning'
  | 'news'
  | 'dashboard'
  | 'features'
  | 'pricing'
  | 'about'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'settings';

export interface NewsItem {
  id: string;
  title: string;
  titleHindi?: string;
  summary: string;
  category: 'Breaking' | 'Bharat Schemes' | 'Economy & Sensex' | 'Technology' | 'Sports' | 'Weather';
  publishedAt: string;
  source: string;
  url?: string;
  badge?: string;
}

export interface ClaudeConfig {
  enabled: boolean;
  apiKey: string;
  model: string;
  status: 'connected' | 'not_configured' | 'error';
  lastChecked?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  language: Language;
  theme: Theme;
  plan: 'free' | 'pro' | 'business';
  city?: string;
  state?: string;
  androidSynced: boolean;
  syncedDeviceName: string;
  lastSyncAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  language?: Language;
  sources?: { title: string; uri: string }[];
  provider?: string;
  attachment?: {
    name: string;
    type: string;
    dataUrl?: string;
  };
  routingAction?: {
    feature: 'planner' | 'finance' | 'services' | 'document' | 'learning' | 'news';
    label: string;
    suggestedAction: string;
  };
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  language: Language;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  category: 'Work' | 'Personal' | 'Health' | 'Finance' | 'Bharat Gov' | 'Study';
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  dueDate: string;
  dueTime?: string;
  completed: boolean;
  recurring?: 'none' | 'daily' | 'weekly' | 'monthly';
  reminderSet?: boolean;
}

export interface ExpenseItem {
  id: string;
  amount: number;
  category:
    | 'Groceries & Food'
    | 'Housing & Rent'
    | 'Bills & Utilities'
    | 'Transport & Fuel'
    | 'Healthcare'
    | 'Education'
    | 'Investments & Savings'
    | 'Shopping & Leisure';
  description: string;
  date: string;
  paymentMethod: 'UPI' | 'Card' | 'Cash' | 'Net Banking';
  type: 'expense' | 'income';
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  folder: 'Identity & Legal' | 'Bills & Utilities' | 'Financial & Tax' | 'Education & Career' | 'General';
  fileType: 'pdf' | 'docx' | 'image' | 'txt';
  uploadDate: string;
  size: string;
  previewText: string;
  summary?: string;
  extractedEntities?: {
    label: string;
    value: string;
  }[];
}

export interface BharatScheme {
  id: string;
  name: string;
  nameHindi: string;
  category: 'Digital Identity' | 'Agriculture & Rural' | 'Healthcare' | 'Financial Inclusion' | 'Tax & Business' | 'Social Security';
  tagline: string;
  officialPortal: string;
  lastVerifiedDate: string;
  eligibility: string[];
  requiredDocuments: string[];
  stepsToApply: string[];
  hindiOverview: string;
  keyBenefits: string[];
}

export interface LearningTopic {
  id: string;
  subject: string;
  title: string;
  titleHindi: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sampleQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}
