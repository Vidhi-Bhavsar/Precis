import React, { useState } from 'react';
import { Header } from './components/Header';
import { UploadView } from './components/UploadView';
import { AnalyzingView } from './components/AnalyzingView';
import { AnalysisResultView } from './components/AnalysisResultView';
import { ParsedDocument, DocumentAnalysis, ChatMessage } from './types';
import { parseUploadedFile } from './utils/documentParser';

export default function App() {
  const [currentDocument, setCurrentDocument] = useState<ParsedDocument | null>(null);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Trigger Gemini Analysis on backend
  const triggerDocumentAnalysis = async (doc: ParsedDocument) => {
    setIsAnalyzing(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: doc.text,
          fileName: doc.name,
          pageCount: doc.pageCount,
          wordCount: doc.wordCount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data: DocumentAnalysis = await response.json();
      setAnalysis(data);
      setChatMessages([]);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setErrorMessage(err.message || 'Failed to analyze document. Please check the file and try again.');
      setCurrentDocument(null);
      setAnalysis(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle User File Upload
  const handleFileSelect = async (file: File) => {
    setIsProcessingFile(true);
    setErrorMessage(null);
    try {
      const parsed = await parseUploadedFile(file);
      setCurrentDocument(parsed);
      await triggerDocumentAnalysis(parsed);
    } catch (err: any) {
      console.error('File parsing error:', err);
      setErrorMessage(err.message || 'Failed to parse the file. Please ensure it is under 200 pages.');
    } finally {
      setIsProcessingFile(false);
    }
  };

  // Handle Sample Document Select
  const handleSampleSelect = async (sample: ParsedDocument) => {
    setCurrentDocument(sample);
    await triggerDocumentAnalysis(sample);
  };

  // Handle Q&A Questions
  const handleAskQuestion = async (question: string) => {
    if (!currentDocument || !question.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...chatMessages, userMessage];
    setChatMessages(newHistory);
    setIsAsking(true);

    try {
      const response = await fetch('/api/ask-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText: currentDocument.text,
          fileName: currentDocument.name,
          question,
          chatHistory: newHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to get answer');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Q&A Error:', err);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sorry, I encountered an issue retrieving the answer: ${err.message || 'Unknown error'}. Please try asking again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsAsking(false);
    }
  };

  // Reset to Upload view
  const handleReset = () => {
    setCurrentDocument(null);
    setAnalysis(null);
    setChatMessages([]);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1E1C1A] flex flex-col font-sans">
      {/* Top Header */}
      <Header
        hasDocument={!!currentDocument && !isAnalyzing}
        onReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {isAnalyzing ? (
          <AnalyzingView fileName={currentDocument?.name || 'Document'} />
        ) : currentDocument && analysis ? (
          <AnalysisResultView
            document={currentDocument}
            analysis={analysis}
            chatMessages={chatMessages}
            onAskQuestion={handleAskQuestion}
            isAsking={isAsking}
          />
        ) : (
          <UploadView
            onFileSelect={handleFileSelect}
            onSampleSelect={handleSampleSelect}
            isProcessing={isProcessingFile}
            errorMessage={errorMessage}
          />
        )}
      </main>
    </div>
  );
}
