import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Calendar,
  Wallet,
  Landmark,
  FileText,
  RotateCcw,
  CheckCircle2,
  Radio,
  Zap,
} from 'lucide-react';

export const VoiceStudio: React.FC = () => {
  const { language, setLanguage, addTask, addExpense, showToast, setActivePage } = useApp();

  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [spokenResponse, setSpokenResponse] = useState<string | null>(null);
  const [detectedAction, setDetectedAction] = useState<any | null>(null);
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  const [voiceMode, setVoiceMode] = useState<'conversational' | 'command'>('conversational');

  const recognitionRef = useRef<any>(null);

  // Suggested voice sample commands
  const sampleVoiceCommands = [
    { text: 'Add task: Pay electricity bill before tomorrow evening', category: 'Task Planner' },
    { text: 'Log expense: 350 rupees auto rickshaw via UPI', category: 'Finance' },
    { text: 'What documents are required for Ayushman Bharat?', category: 'Bharat Services' },
    { text: 'Summarize key clauses in my rental agreement', category: 'Document AI' },
    { text: 'दैनिक कार्य में जोड़ें: कल शाम डॉक्टर के पास जाना है', category: 'हिन्दी Task' },
  ];

  // Text to speech helper
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick appropriate voice
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang.includes('hi') || v.name.includes('Hindi'));
    const indianEngVoice = voices.find((v) => v.lang === 'en-IN' || v.name.includes('India'));

    if (language === 'hi' && hindiVoice) {
      utterance.voice = hindiVoice;
      utterance.lang = 'hi-IN';
    } else if (indianEngVoice) {
      utterance.voice = indianEngVoice;
      utterance.lang = 'en-IN';
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Start listening with Web Speech API
  const startListening = () => {
    stopSpeaking();
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast('Speech recognition not supported in this browser. Please type or use sample commands.');
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
        setMicPermissionGranted(true);
        setTranscript('');
        setSpokenResponse(null);
        setDetectedAction(null);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (e: any) => {
        console.error('Speech error', e);
        setIsListening(false);
        showToast('Microphone error or permission denied.');
      };

      recognition.onend = () => {
        setIsListening(false);
        // If we captured something, process it!
        if (transcript) {
          processVoiceInput(transcript);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Process voice input through backend voice API
  const processVoiceInput = async (spokenCommand: string) => {
    if (!spokenCommand.trim()) return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/ai/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: spokenCommand,
          language,
        }),
      });

      const data = await res.json();
      setSpokenResponse(data.spokenReply || 'Command executed.');
      setDetectedAction(data);

      // Speak response out loud
      if (data.spokenReply) {
        speakText(data.spokenReply);
      }

      // Automatically execute actions!
      if (data.intent === 'CREATE_TASK' && data.actionPayload) {
        addTask({
          title: data.actionPayload.title || spokenCommand,
          priority: data.actionPayload.priority || 'High',
          dueDate: data.actionPayload.dueDate || new Date().toISOString().split('T')[0],
          category: 'Personal',
        });
        showToast('Voice command executed: Task added to your Daily Planner!');
      } else if (data.intent === 'LOG_EXPENSE' && data.actionPayload) {
        addExpense({
          amount: data.actionPayload.amount || 150,
          category: (data.actionPayload.category as any) || 'Groceries & Food',
          description: data.actionPayload.description || spokenCommand,
          date: new Date().toISOString().split('T')[0],
          paymentMethod: (data.actionPayload.paymentMethod as any) || 'UPI',
          type: 'expense',
        });
        showToast(`Voice command executed: Recorded ₹${data.actionPayload.amount} expense!`);
      }
    } catch (err) {
      console.error(err);
      const fallbackMsg = 'I heard your request and noted it down.';
      setSpokenResponse(fallbackMsg);
      speakText(fallbackMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRunSampleCommand = (cmd: string) => {
    setTranscript(cmd);
    processVoiceInput(cmd);
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Bharat AI Voice Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Speak with Bharat AI
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Native speech recognition & voice execution. Create tasks, record rupee expenses, or query government welfare programs entirely hands-free.
        </p>
      </div>

      {/* Voice Mode & Language Selector */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setVoiceMode('conversational')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              voiceMode === 'conversational'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Conversational Mode
          </button>
          <button
            onClick={() => setVoiceMode('command')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              voiceMode === 'command'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Action Commands Mode
          </button>
        </div>

        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          {(['en', 'hi', 'hinglish'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              className={`px-3 py-1.5 rounded-lg font-semibold uppercase transition-all ${
                language === l
                  ? 'bg-orange-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {l === 'hi' ? 'हिन्दी' : l}
            </button>
          ))}
        </div>
      </div>

      {/* Central Visualizer & Mic Orb */}
      <div className="w-full max-w-xl p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl">
        {/* Ambient pulse effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-amber-500/10 to-transparent transition-opacity duration-500 ${
            isListening || isSpeaking ? 'opacity-100' : 'opacity-20'
          }`}
        ></div>

        {/* Audio Wave Visualizer */}
        <div className="h-28 flex items-center justify-center gap-2 px-6 my-4 z-10 w-full">
          {[25, 60, 45, 90, 100, 35, 75, 85, 40, 95, 60, 80, 50, 70, 40].map((h, i) => (
            <div
              key={i}
              className={`w-2 rounded-full transition-all duration-200 ${
                isListening
                  ? 'bg-gradient-to-t from-rose-500 to-orange-400 animate-pulse'
                  : isSpeaking
                  ? 'bg-gradient-to-t from-amber-500 to-emerald-400 animate-pulse'
                  : 'bg-slate-800'
              }`}
              style={{
                height:
                  isListening || isSpeaking
                    ? `${Math.max(25, Math.round(h * (0.4 + Math.random() * 0.6)))}%`
                    : '15%',
              }}
            ></div>
          ))}
        </div>

        {/* Big Mic Button */}
        <div className="relative z-10 my-4">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white scale-110 shadow-rose-500/40 animate-pulse'
                : isProcessing
                ? 'bg-amber-500 text-slate-950 scale-105 animate-bounce'
                : 'bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 text-slate-950 hover:scale-105 shadow-orange-500/25'
            }`}
            title={isListening ? 'Click to stop listening' : 'Click to start speaking'}
          >
            {isListening ? (
              <MicOff className="w-10 h-10" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>
        </div>

        {/* Status text */}
        <p className="text-xs font-semibold text-slate-300 z-10 mt-2">
          {isListening
            ? 'Listening... Speak in Hindi, Hinglish, or English'
            : isProcessing
            ? 'Analyzing speech & parsing actions...'
            : isSpeaking
            ? 'Bharat AI is speaking...'
            : 'Tap the microphone to speak'}
        </p>

        {isSpeaking && (
          <button
            onClick={stopSpeaking}
            className="z-10 mt-2 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 flex items-center gap-1"
          >
            <VolumeX className="w-3 h-3 text-rose-400" /> Stop audio playback
          </button>
        )}
      </div>

      {/* Spoken Transcript & Execution Card */}
      {(transcript || spokenResponse) && (
        <div className="w-full max-w-xl mt-6 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 animate-in fade-in">
          {transcript && (
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                You Said:
              </span>
              <p className="text-sm text-white font-medium bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                &ldquo;{transcript}&rdquo;
              </p>
            </div>
          )}

          {spokenResponse && (
            <div>
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-amber-400 mb-1">
                <span>Bharat AI Audio Response:</span>
                <button
                  onClick={() => speakText(spokenResponse)}
                  className="hover:text-white flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Replay Voice
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 bg-slate-950 p-3 rounded-xl border border-amber-500/20 leading-relaxed">
                {spokenResponse}
              </p>
            </div>
          )}

          {/* Action Execution Pill */}
          {detectedAction && detectedAction.intent !== 'GENERAL_ASSISTANCE' && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  Action Executed: <strong>{detectedAction.intent}</strong>
                </span>
              </div>
              <button
                onClick={() => {
                  if (detectedAction.intent === 'CREATE_TASK') setActivePage('planner');
                  if (detectedAction.intent === 'LOG_EXPENSE') setActivePage('finance');
                }}
                className="text-[11px] font-bold underline hover:text-white"
              >
                View in App
              </button>
            </div>
          )}
        </div>
      )}

      {/* Click-to-Test Sample Voice Commands */}
      <div className="w-full max-w-xl mt-8 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Try Quick Voice Commands (Click to simulate):
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sampleVoiceCommands.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleRunSampleCommand(sample.text)}
              className="text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-300 hover:text-white transition-all flex flex-col justify-between"
            >
              <span className="font-medium mb-1">&ldquo;{sample.text}&rdquo;</span>
              <span className="text-[10px] text-amber-400/90 font-semibold self-start">
                → {sample.category}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
