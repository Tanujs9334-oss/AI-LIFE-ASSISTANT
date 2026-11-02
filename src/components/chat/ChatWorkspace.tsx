import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Send,
  Paperclip,
  Mic,
  MicOff,
  Copy,
  RotateCcw,
  Trash2,
  Edit2,
  Plus,
  Check,
  Calendar,
  Wallet,
  Landmark,
  FileText,
  GraduationCap,
  ArrowRight,
  Globe,
  X,
  Bot,
  User,
  Radio,
  Cpu,
  ExternalLink,
} from 'lucide-react';

export const ChatWorkspace: React.FC = () => {
  const {
    chatSessions,
    activeSessionId,
    setActiveSessionId,
    createNewChat,
    addMessageToCurrentChat,
    deleteChatSession,
    renameChatSession,
    clearCurrentChat,
    language,
    setLanguage,
    setActivePage,
    activeModelProvider,
    setActiveModelProvider,
    realtimeSearchEnabled,
    setRealtimeSearchEnabled,
    claudeConfig,
    showToast,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [attachment, setAttachment] = useState<{
    name: string;
    type: string;
    dataUrl: string;
  } | null>(null);

  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [newTitleText, setNewTitleText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const currentSession =
    chatSessions.find((s) => s.id === activeSessionId) || chatSessions[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages, isSubmitting]);

  // Handle Speech Recognition for voice dictation
  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang =
        language === 'hi' ? 'hi-IN' : language === 'hinglish' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        showToast('Listening in Indian English/Hindi...');
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = (e: any) => {
        console.error('Speech error', e);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  // Handle file attachment
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('File size must be under 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      setAttachment({
        name: file.name,
        type: file.type || 'application/octet-stream',
        dataUrl: result,
      });
      showToast(`Attached ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  // Send message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!inputText.trim() && !attachment) || isSubmitting) return;

    const messageContent = inputText.trim();
    const attachedFile = attachment;

    setInputText('');
    setAttachment(null);
    setIsSubmitting(true);

    try {
      await addMessageToCurrentChat({
        role: 'user',
        content: messageContent,
        attachment: attachedFile
          ? {
              name: attachedFile.name,
              type: attachedFile.type,
              dataUrl: attachedFile.dataUrl,
            }
          : undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy message text
  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Regenerate last response
  const handleRegenerate = async () => {
    const msgs = currentSession?.messages || [];
    const lastUserMsg = [...msgs].reverse().find((m) => m.role === 'user');
    if (!lastUserMsg) return;

    setIsSubmitting(true);
    try {
      await addMessageToCurrentChat({
        role: 'user',
        content: `Regenerate response: ${lastUserMsg.content}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartRename = (sessionId: string, currentTitle: string) => {
    setEditingSessionId(sessionId);
    setNewTitleText(currentTitle);
  };

  const handleSaveRename = (sessionId: string) => {
    if (newTitleText.trim()) {
      renameChatSession(sessionId, newTitleText.trim());
    }
    setEditingSessionId(null);
  };

  // Routing icon helper
  const getRoutingIcon = (feature: string) => {
    switch (feature) {
      case 'planner':
        return Calendar;
      case 'finance':
        return Wallet;
      case 'services':
        return Landmark;
      case 'document':
        return FileText;
      case 'learning':
        return GraduationCap;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-4rem)]">
      {/* SIDEBAR: Conversation History */}
      <aside className="w-full lg:w-72 flex flex-col shrink-0 rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-xl h-auto lg:h-[750px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Conversations</span>
          </h2>
          <button
            onClick={createNewChat}
            className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-sm"
            title="Start New Conversation"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
          {chatSessions.map((session) => {
            const isActive = session.id === activeSessionId;
            const isEditing = editingSessionId === session.id;

            return (
              <div
                key={session.id}
                onClick={() => !isEditing && setActiveSessionId(session.id)}
                className={`group flex items-center justify-between p-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                {isEditing ? (
                  <div
                    className="flex items-center gap-1 w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      value={newTitleText}
                      onChange={(e) => setNewTitleText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(session.id)}
                      className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveRename(session.id)}
                      className="p-1 text-emerald-400 hover:text-emerald-300"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="truncate flex-1 pr-2">{session.title}</span>
                    <div className="hidden group-hover:flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartRename(session.id, session.title);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-amber-400"
                        title="Rename Chat"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChatSession(session.id);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-rose-400"
                        title="Delete Chat"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Language Toggle inside Sidebar */}
        <div className="pt-4 border-t border-slate-800 mt-3 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Assistant Language Mode
          </span>
          <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
            {(['en', 'hi', 'hinglish'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`py-1 rounded-lg font-semibold uppercase transition-all ${
                  language === l
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden h-[750px]">
        {/* Workspace Header */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="truncate max-w-xs sm:max-w-md">{currentSession.title}</span>
            </h1>
            <p className="text-[11px] text-slate-400">
              {activeModelProvider === 'claude'
                ? 'Anthropic Claude 3.5 Sonnet Connected • Multilingual Reasoning'
                : 'Google Gemini 3.8 Flash • Live Google Search Grounding Active'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {/* Live Search Toggle */}
            <button
              onClick={() => {
                setRealtimeSearchEnabled(!realtimeSearchEnabled);
                showToast(
                  !realtimeSearchEnabled
                    ? 'Live Real-time Search Grounding Enabled'
                    : 'Live Real-time Search Grounding Disabled'
                );
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-medium border transition-all ${
                realtimeSearchEnabled
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
              title="Toggle Live Web Search Grounding for real-time news & facts"
            >
              <Radio className={`w-3.5 h-3.5 ${realtimeSearchEnabled ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
              <span className="text-[10px] font-semibold">Live Web: {realtimeSearchEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* Provider Switcher */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setActiveModelProvider('gemini');
                  showToast('Switched to Gemini 3.8 Flash with Search Grounding');
                }}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                  activeModelProvider === 'gemini'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Gemini
              </button>
              <button
                onClick={() => {
                  setActiveModelProvider('claude');
                  showToast('Switched to Claude 3.5 Sonnet');
                }}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                  activeModelProvider === 'claude'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Claude
              </button>
            </div>

            <button
              onClick={handleRegenerate}
              disabled={isSubmitting || currentSession.messages.length === 0}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 disabled:opacity-30 transition-colors"
              title="Regenerate last response"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={clearCurrentChat}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Clear all messages in this chat"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {currentSession.messages.map((message) => {
            const isUser = message.role === 'user';
            const RoutingIcon = message.routingAction
              ? getRoutingIcon(message.routingAction.feature)
              : Sparkles;

            return (
              <div
                key={message.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold shadow-md ${
                    isUser
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-600 text-white'
                      : 'bg-slate-800 border border-slate-700 text-amber-400'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed max-w-[85%] ${
                    isUser
                      ? 'bg-amber-500 text-slate-950 font-medium'
                      : 'bg-slate-950 border border-slate-800 text-slate-200'
                  }`}
                >
                  {/* Attached file thumbnail if any */}
                  {message.attachment && (
                    <div className="mb-2 p-2 rounded-lg bg-black/20 border border-black/10 flex items-center gap-2 text-xs">
                      <Paperclip className="w-3.5 h-3.5" />
                      <span className="truncate font-semibold">{message.attachment.name}</span>
                    </div>
                  )}

                  {/* Message Content */}
                  {!isUser && message.provider && (
                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mb-1.5 pb-1 border-b border-slate-800/60">
                      <Cpu className="w-3 h-3 text-amber-400" />
                      <span>{message.provider}</span>
                    </div>
                  )}

                  <div className="whitespace-pre-line select-text">{message.content}</div>

                  {/* Real-Time Grounding Sources / Citations */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1.5">
                        <Globe className="w-3 h-3" />
                        <span>Verified Real-Time Sources ({message.sources.length})</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {message.sources.map((src, i) => (
                          <a
                            key={i}
                            href={src.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-amber-300 hover:text-amber-200 transition-colors"
                          >
                            <ExternalLink className="w-2.5 h-2.5 shrink-0 text-slate-400" />
                            <span className="truncate max-w-[200px]">{src.title || src.uri}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Smart Request Routing Action Card */}
                  {message.routingAction && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                          <RoutingIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-white block">
                            {message.routingAction.label}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {message.routingAction.suggestedAction}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setActivePage(message.routingAction!.feature as any)}
                        className="px-3 py-1.5 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1 transition-all shrink-0 cursor-pointer"
                      >
                        <span>Open</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Actions & Timestamp */}
                  <div className="mt-2 pt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{message.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopyMessage(message.id, message.content)}
                        className="hover:text-amber-400 transition-colors p-1"
                        title="Copy message"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isSubmitting && (
            <div className="flex gap-3 max-w-md">
              <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>Bharat AI is analyzing with Indian context...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar & Controls */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 space-y-2">
          {/* Attachment Preview Chip */}
          {attachment && (
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 text-xs text-amber-300 w-fit">
              <div className="flex items-center gap-2">
                <Paperclip className="w-3.5 h-3.5" />
                <span className="truncate max-w-xs">{attachment.name}</span>
              </div>
              <button
                onClick={() => setAttachment(null)}
                className="ml-2 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            {/* File Upload Trigger */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg,.txt,.doc,.docx"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition-colors"
              title="Attach document or bill for OCR analysis"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Voice Dictation Trigger */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`p-3 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border-slate-800'
              }`}
              title="Voice typing in Hindi or English"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'भारत एआई से कुछ भी पूछें (उदा. बिजली बिल, आयुष्मान कार्ड, अध्ययन)...'
                  : language === 'hinglish'
                  ? 'Kuch bhi poochiye in Hinglish (e.g. UPI spend, daily plan, GST)...'
                  : 'Ask Bharat AI anything (daily plans, Indian schemes, taxes, documents)...'
              }
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={(!inputText.trim() && !attachment) || isSubmitting}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-slate-400">
            <span className="text-slate-500 font-semibold self-center mr-1">Suggestions:</span>
            <button
              onClick={() => setInputText('Organize my day with 3 key priority work blocks')}
              className="px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
            >
              📅 Plan My Day
            </button>
            <button
              onClick={() => setInputText('How to link Aadhaar with EPFO UAN online?')}
              className="px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
            >
              🏛️ EPFO Aadhaar Link
            </button>
            <button
              onClick={() => setInputText('Log ₹350 auto rickshaw expense in my finance tracker')}
              className="px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
            >
              💸 Log ₹350 Auto Expense
            </button>
            <button
              onClick={() => setInputText('Explain Section 80C tax deductions in simple terms')}
              className="px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
            >
              🧾 80C Tax Slabs
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
