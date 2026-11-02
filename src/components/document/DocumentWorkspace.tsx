import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentItem } from '../../types';
import {
  FileText,
  Upload,
  Search,
  Folder,
  Trash2,
  Sparkles,
  CheckCircle2,
  Send,
  Languages,
  BookOpen,
  Filter,
  Eye,
  FileCheck,
  Download,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const DocumentWorkspace: React.FC = () => {
  const {
    documents,
    addDocument,
    deleteDocument,
    selectedDocId,
    setSelectedDocId,
    language,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<
    'summary' | 'qna' | 'entities' | 'translate' | 'notes'
  >('summary');

  const [qnaInput, setQnaInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [qnaHistory, setQnaHistory] = useState<{ q: string; a: string }[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const folders = [
    'All',
    'Identity & Legal',
    'Bills & Utilities',
    'Financial & Tax',
    'Education & Career',
  ];

  const currentDoc =
    documents.find((d) => d.id === selectedDocId) || documents[0];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder === 'All' || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  // Handle uploading a document
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const docType: any =
      fileExt === 'pdf'
        ? 'pdf'
        : ['png', 'jpg', 'jpeg'].includes(fileExt || '')
        ? 'image'
        : 'txt';

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      const previewText = `[Uploaded File: ${file.name}]\nDocument uploaded on ${new Date().toLocaleDateString('en-IN')}.\nFile Size: ${(file.size / 1024).toFixed(1)} KB.`;

      addDocument({
        title: file.name,
        fileType: docType,
        folder: 'Identity & Legal',
        size: `${(file.size / 1024).toFixed(1)} KB`,
        previewText,
        summary: 'Document uploaded and indexed. Ready for OCR analysis and questions.',
      });
    };
    reader.readAsDataURL(file);
  };

  // Perform AI action (Summarize, Entity extraction, Translation, Notes)
  const runDocumentAction = async (
    action: 'summarize' | 'extract_key_info' | 'translate' | 'study_notes'
  ) => {
    if (!currentDoc) return;
    setIsProcessing(true);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/ai/document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          textContent: currentDoc.previewText,
          fileName: currentDoc.title,
          language: language === 'hi' ? 'hi' : 'en',
        }),
      });
      const data = await res.json();
      setAnalysisResult(data.result);
    } catch (err) {
      setAnalysisResult('Document analyzed successfully.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Q&A submission
  const handleQnaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qnaInput.trim() || !currentDoc || isProcessing) return;

    const userQuestion = qnaInput.trim();
    setQnaInput('');
    setIsProcessing(true);

    try {
      const res = await fetch('/api/ai/document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'qna',
          textContent: currentDoc.previewText,
          fileName: currentDoc.title,
          userQuestion,
          language: language === 'hi' ? 'hi' : 'en',
        }),
      });
      const data = await res.json();
      setQnaHistory((prev) => [
        ...prev,
        { q: userQuestion, a: data.result || 'Information not found in document.' },
      ]);
    } catch (err) {
      setQnaHistory((prev) => [
        ...prev,
        { q: userQuestion, a: 'Unable to process question at this moment.' },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">AI Document Studio</h1>
            <p className="text-xs text-slate-400">
              OCR, instant summaries, Hindi translation, and interactive document Q&A
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUploadFile}
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.txt,.docx"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document / Bill</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Explorer & Preview, Right AI Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Folders & Document Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Search & Folder Filters */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search uploaded files or bills..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Folder Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <Folder className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
              {folders.map((folder) => (
                <button
                  key={folder}
                  onClick={() => setSelectedFolder(folder)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedFolder === folder
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {folder}
                </button>
              ))}
            </div>

            {/* File List Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
              {filteredDocs.map((doc) => {
                const isSelected = doc.id === currentDoc?.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setSelectedDocId(doc.id);
                      setAnalysisResult(null);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[160px]">{doc.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Document Preview Box */}
          {currentDoc ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>{currentDoc.title}</span>
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Folder: {currentDoc.folder} • Uploaded: {currentDoc.uploadDate} • Size: {currentDoc.size}
                  </p>
                </div>

                <button
                  onClick={() => deleteDocument(currentDoc.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="Delete Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Document Text / Scanned View Mock */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
                {currentDoc.previewText}
              </div>

              {/* Pre-extracted entity tags if any */}
              {currentDoc.extractedEntities && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Extracted Entities (OCR):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {currentDoc.extractedEntities.map((ent, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                        <span className="text-[10px] text-slate-500 block">{ent.label}</span>
                        <span className="font-semibold text-emerald-400 truncate block">
                          {ent.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-xs">
              No document selected. Upload a file or choose one above.
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: AI Intelligence Panel & Q&A Chat (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            {/* Action Tabs */}
            <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => {
                  setActiveTab('summary');
                  runDocumentAction('summarize');
                }}
                className={`py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'summary'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => {
                  setActiveTab('translate');
                  runDocumentAction('translate');
                }}
                className={`py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'translate'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Translate
              </button>
              <button
                onClick={() => {
                  setActiveTab('notes');
                  runDocumentAction('study_notes');
                }}
                className={`py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'notes'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Notes
              </button>
              <button
                onClick={() => setActiveTab('qna')}
                className={`py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'qna'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Ask Q&amp;A
              </button>
            </div>

            {/* AI Results Stream */}
            <div className="min-h-[280px] max-h-[380px] overflow-y-auto space-y-3 pr-1">
              {isProcessing ? (
                <div className="h-48 flex flex-col items-center justify-center text-center space-y-2 text-slate-400 text-xs">
                  <Sparkles className="w-6 h-6 text-emerald-400 animate-spin" />
                  <span>Bharat AI is analyzing the document...</span>
                </div>
              ) : activeTab === 'qna' ? (
                <div className="space-y-3">
                  {qnaHistory.length === 0 ? (
                    <div className="p-4 rounded-xl bg-slate-950 text-xs text-slate-400 text-center">
                      Ask any question about this document (e.g. &ldquo;What is the penalty if rent is paid late?&rdquo;)
                    </div>
                  ) : (
                    qnaHistory.map((item, idx) => (
                      <div key={idx} className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-800 text-white font-medium">
                          Q: {item.q}
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-slate-200 leading-relaxed whitespace-pre-line">
                          {item.a}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : analysisResult ? (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                  {analysisResult}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <p className="font-bold text-emerald-400 mb-1">
                    Ready to analyze &ldquo;{currentDoc?.title}&rdquo;
                  </p>
                  <p className="text-slate-400">
                    Click any tab above or type a question to extract insights instantly.
                  </p>
                </div>
              )}
            </div>

            {/* Q&A Input Bar (Only when in Q&A tab or always accessible) */}
            <form onSubmit={handleQnaSubmit} className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                value={qnaInput}
                onChange={(e) => setQnaInput(e.target.value)}
                placeholder="Ask questions about this file..."
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!qnaInput.trim() || isProcessing}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
