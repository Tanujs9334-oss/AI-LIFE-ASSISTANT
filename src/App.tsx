import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/home/LandingPage';
import { ChatWorkspace } from './components/chat/ChatWorkspace';
import { VoiceStudio } from './components/voice/VoiceStudio';
import { DocumentWorkspace } from './components/document/DocumentWorkspace';
import { DailyPlanner } from './components/planner/DailyPlanner';
import { FinanceTracker } from './components/finance/FinanceTracker';
import { BharatServices } from './components/services/BharatServices';
import { LearningHub } from './components/learning/LearningHub';
import { LiveNewsHub } from './components/news/LiveNewsHub';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { FeaturesPage } from './components/pages/FeaturesPage';
import { PricingPage } from './components/pages/PricingPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { LegalPage } from './components/pages/LegalPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { AuthModal } from './components/auth/AuthModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activePage, toastMessage } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <LandingPage />;
      case 'chat':
        return <ChatWorkspace />;
      case 'voice':
        return <VoiceStudio />;
      case 'document':
        return <DocumentWorkspace />;
      case 'planner':
        return <DailyPlanner />;
      case 'finance':
        return <FinanceTracker />;
      case 'services':
        return <BharatServices />;
      case 'learning':
        return <LearningHub />;
      case 'news':
        return <LiveNewsHub />;
      case 'dashboard':
        return <UserDashboard />;
      case 'features':
        return <FeaturesPage />;
      case 'pricing':
        return <PricingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <LandingPage />;
      case 'privacy':
        return <LegalPage initialTab="privacy" />;
      case 'terms':
        return <LegalPage initialTab="terms" />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />

      <main className="flex-1 flex flex-col">{renderPage()}</main>

      <Footer />
      <AuthModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 border border-amber-500/40 text-slate-100 text-xs shadow-2xl shadow-black/80 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
