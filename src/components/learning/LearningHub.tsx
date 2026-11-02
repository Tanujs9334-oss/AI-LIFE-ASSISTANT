import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LEARNING_TOPICS } from '../../data/mockData';
import { LearningTopic } from '../../types';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Languages,
  Layers,
  FileCheck,
} from 'lucide-react';

export const LearningHub: React.FC = () => {
  const { language, setLanguage, showToast } = useApp();

  const [activeTopic, setActiveTopic] = useState<LearningTopic>(LEARNING_TOPICS[0]);
  const [learningMode, setLearningMode] = useState<
    'explain' | 'quiz' | 'study_plan' | 'mnemonics'
  >('explain');

  // Custom topic search or query
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  // Interactive Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const activeQuestion = activeTopic.sampleQuestions[currentQuestionIndex];

  // Request custom topic explanation from backend
  const handleExplainTopic = async (topicToExplain?: string) => {
    const topic = topicToExplain || customTopicInput || activeTopic.title;
    setIsGenerating(true);
    setAiExplanation(null);

    try {
      const res = await fetch('/api/ai/learning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          subject: activeTopic.subject,
          mode: learningMode,
          language: language === 'hi' ? 'hi' : language === 'hinglish' ? 'hinglish' : 'en',
        }),
      });

      const data = await res.json();
      setAiExplanation(data.content);
    } catch (err) {
      setAiExplanation(
        `### 📚 Concept Breakdown: ${topic}\n\n**Core Fundamentals**:\n${topic} is essential for competitive examinations and practical mastery.\n- **Definition**: Fundamental rule governing systemic operations.\n- **Real Life Analogy**: Think of it like traffic signals maintaining smooth vehicle flow in Indian cities.\n- **Exam Strategy**: Memorize the key legal articles, milestones, and exception clauses.`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectAnswer = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIndex(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIndex === null) return;
    setIsAnswerSubmitted(true);

    if (selectedAnswerIndex === activeQuestion.correctIndex) {
      setQuizScore((prev) => prev + 1);
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
      showToast('Correct answer! +10 Points');
    } else {
      showToast('Not quite! Check the explanation below.');
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    if (currentQuestionIndex + 1 < activeTopic.sampleQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
      showToast(`Quiz completed! You scored ${quizScore + (selectedAnswerIndex === activeQuestion.correctIndex ? 1 : 0)} points.`);
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">AI Learning & Exam Tutor</h1>
            <p className="text-xs text-slate-400">
              NCERT, CBSE, UPSC, SSC, engineering, and coding simplified with step-by-step notes and quizzes
            </p>
          </div>
        </div>

        {/* Custom Subject Search Bar */}
        <div className="flex items-center gap-2 max-w-md w-full md:w-auto">
          <input
            type="text"
            value={customTopicInput}
            onChange={(e) => setCustomTopicInput(e.target.value)}
            placeholder="Type any topic (e.g. GST Input Credit, Thermodynamics)..."
            className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500"
          />
          <button
            onClick={() => handleExplainTopic()}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explain</span>
          </button>
        </div>
      </div>

      {/* Preset Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {LEARNING_TOPICS.map((top) => {
          const isSelected = activeTopic.id === top.id;
          return (
            <button
              key={top.id}
              onClick={() => {
                setActiveTopic(top);
                setCurrentQuestionIndex(0);
                setSelectedAnswerIndex(null);
                setIsAnswerSubmitted(false);
                setAiExplanation(null);
              }}
              className={`text-left p-4 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-pink-500/15 border-pink-500/50 shadow-lg'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-slate-950 text-pink-300 border border-pink-500/30 mb-2 inline-block">
                {top.subject}
              </span>
              <h3 className="text-sm font-bold text-white mb-0.5">{top.title}</h3>
              <p className="text-xs text-amber-400 font-medium mb-1">{top.titleHindi}</p>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {top.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center bg-slate-900 border border-slate-800 p-1.5 rounded-2xl text-xs max-w-md">
        <button
          onClick={() => setLearningMode('explain')}
          className={`flex-1 py-2 rounded-xl font-semibold transition-all ${
            learningMode === 'explain'
              ? 'bg-pink-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Concept Deep Dive
        </button>
        <button
          onClick={() => setLearningMode('quiz')}
          className={`flex-1 py-2 rounded-xl font-semibold transition-all ${
            learningMode === 'quiz'
              ? 'bg-pink-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Practice Quiz
        </button>
        <button
          onClick={() => {
            setLearningMode('study_plan');
            handleExplainTopic();
          }}
          className={`flex-1 py-2 rounded-xl font-semibold transition-all ${
            learningMode === 'study_plan'
              ? 'bg-pink-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Revision Plan
        </button>
      </div>

      {/* Main Content Area */}
      {learningMode === 'quiz' ? (
        /* INTERACTIVE PRACTICE QUIZ */
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl max-w-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-400">
                Question {currentQuestionIndex + 1} of {activeTopic.sampleQuestions.length}
              </span>
              <h2 className="text-base font-bold text-white mt-1">
                {activeQuestion.question}
              </h2>
            </div>
            <div className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400">
              Score: {quizScore}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {activeQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswerIndex === idx;
              const isCorrect = idx === activeQuestion.correctIndex;

              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                }
              } else if (isSelected) {
                btnStyle = 'bg-pink-500/20 border-pink-500 text-pink-300 font-bold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>
                    <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
                  </span>
                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1 animate-in fade-in">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Explanation &amp; Core Takeaway:
              </span>
              <p>{activeQuestion.explanation}</p>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-2 flex justify-end gap-3">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswerIndex === null}
                className="px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* CONCEPT DEEP DIVE / STUDY NOTES */
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                {activeTopic.subject}
              </span>
              <h2 className="text-lg font-bold text-white mt-0.5">{activeTopic.title}</h2>
              <p className="text-xs text-amber-400/90">{activeTopic.titleHindi}</p>
            </div>

            <button
              onClick={() => handleExplainTopic()}
              disabled={isGenerating}
              className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGenerating ? 'Generating Notes...' : 'Generate New Notes'}</span>
            </button>
          </div>

          {/* Explanation Text */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal whitespace-pre-line min-h-[220px]">
            {isGenerating ? (
              <div className="h-44 flex flex-col items-center justify-center text-slate-400 gap-2">
                <Sparkles className="w-6 h-6 text-pink-400 animate-spin" />
                <span>Bharat AI Tutor is drafting comprehensive revision notes...</span>
              </div>
            ) : aiExplanation ? (
              aiExplanation
            ) : (
              `### 📖 Comprehensive Overview: ${activeTopic.title}

1. **Foundational Context**:
${activeTopic.description}

2. **Everyday Analogy**:
Understanding this concept is much like how the Indian railway reservation chart operates: clear rules, strict priority hierarchy, and universal accessibility.

3. **High-Yield Exam Points**:
- Always link the theoretical framework to constitutional or empirical precedent.
- Practice solving at least 3 numerical or analytical case problems.
- Review related amendments and landmark judgments.`
            )}
          </div>
        </div>
      )}
    </div>
  );
};
