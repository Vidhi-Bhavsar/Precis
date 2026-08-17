import React, { useState, useRef } from 'react';
import { FileUp, FileText, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';
import { ParsedDocument } from '../types';

interface UploadViewProps {
  onFileSelect: (file: File) => void;
  onSampleSelect: (sample: ParsedDocument) => void;
  isProcessing: boolean;
  errorMessage?: string | null;
}

export const UploadView: React.FC<UploadViewProps> = ({
  onFileSelect,
  onSampleSelect,
  isProcessing,
  errorMessage,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-16">
      {/* Top Hero Section: Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Headline & Stats */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#7E776C] font-semibold">
              — READ ONCE, UNDERSTAND INSTANTLY
            </span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] leading-[1.12] font-semibold text-[#181615] tracking-tight">
            Turn long documents into the notes you'd actually take.
          </h1>

          {/* Sub-paragraph */}
          <p className="text-base sm:text-lg text-[#555048] leading-relaxed max-w-2xl font-sans">
            Drop in a PDF, Word file, or plain text — up to 200 pages. Précis reads it, pulls out what matters, and stays around to answer whatever you ask about it.
          </p>

          {/* 3 Metric Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E8E2D6] max-w-xl">
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#191715]">
                200
              </span>
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#7E786E] mt-0.5">
                PAGE CEILING
              </span>
            </div>
            <div className="flex flex-col border-l border-[#E8E2D6] pl-4">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#191715]">
                &lt;30s
              </span>
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#7E786E] mt-0.5">
                TO FIRST SUMMARY
              </span>
            </div>
            <div className="flex flex-col border-l border-[#E8E2D6] pl-4">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#191715]">
                ∞
              </span>
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#7E786E] mt-0.5">
                FOLLOW-UP QUESTIONS
              </span>
            </div>
          </div>

          {/* Quick Sample Documents Trigger */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-xs font-mono text-[#8C8476] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              Or try a sample document instantly:
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_DOCUMENTS.map((sample) => (
                <button
                  key={sample.name}
                  onClick={() => onSampleSelect(sample)}
                  disabled={isProcessing}
                  id={`sample-doc-${sample.fileType}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#464036] bg-[#F2EDE2] hover:bg-[#EAE3D4] hover:text-[#181615] border border-[#DDD6C8] rounded-md transition-colors text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-[#7E776C]" />
                  <span>{sample.name}</span>
                  <span className="text-[10px] text-[#9A9386]">({sample.wordCount} words)</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upload Card */}
        <div className="lg:col-span-5">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-2xl p-8 sm:p-10 transition-all border-2 flex flex-col items-center justify-center text-center bg-[#FFFFFF]/70 shadow-xs backdrop-blur-xs ${
              isDragOver
                ? 'border-[#181615] bg-[#F4EFE5] scale-[1.01]'
                : 'border-dashed border-[#D6CEC0] hover:border-[#ADA392]'
            }`}
            id="upload-dropzone"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc,.txt,.md,.csv"
              onChange={handleFileInputChange}
              className="hidden"
              id="file-upload-input"
            />

            {/* Document Illustration Icon */}
            <div className="w-16 h-20 bg-[#FBF9F4] rounded-lg border border-[#DED7C8] shadow-xs flex flex-col items-center justify-center mb-5 relative group">
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#EDE6D7] rounded-bl-sm border-b border-l border-[#D2C9B8]"></div>
              <div className="w-8 h-1 bg-[#D8D0BF] rounded-full mb-1.5"></div>
              <div className="w-8 h-1 bg-[#E4DDD0] rounded-full mb-1.5"></div>
              <div className="w-5 h-1 bg-[#E4DDD0] rounded-full"></div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1817] mb-1">
              Drop your document here
            </h3>
            <p className="text-xs sm:text-sm text-[#736C61] mb-6 font-sans">
              or click to browse from your device
            </p>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              id="choose-file-btn"
              className="w-full sm:w-auto px-7 py-3 bg-[#1A1816] hover:bg-[#2C2926] text-[#F9F7F2] font-medium text-sm rounded-lg shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              {isProcessing ? 'Reading file...' : 'Choose a file'}
            </button>

            {/* File format badges */}
            <div className="flex items-center gap-2 mt-6">
              {['.PDF', '.DOCX', '.DOC', '.TXT'].map((ext) => (
                <span
                  key={ext}
                  className="px-2 py-0.5 text-[11px] font-mono font-medium text-[#676156] bg-[#F3EFE7] rounded border border-[#E1DBD0]"
                >
                  {ext}
                </span>
              ))}
            </div>

            <span className="text-[11px] text-[#8E877A] mt-3 font-mono">
              Max 200 pages · processed in your browser before analysis
            </span>

            {/* Error Message if any */}
            {errorMessage && (
              <div className="mt-4 w-full p-3 bg-[#FDF2F2] border border-[#F5C6CB] rounded-lg text-left flex items-start gap-2 text-xs text-[#9B1C1C]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: How it works */}
      <div className="border-t border-[#E8E2D6] pt-12 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-[#181615]">
            How it works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col gap-2.5 p-6 rounded-xl bg-[#F7F4EC]/60 border border-[#E9E4D9]">
            <div className="font-mono text-xs font-semibold text-[#8C8476]">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-[#191715]">
              Upload
            </h3>
            <p className="text-sm text-[#5B554B] leading-relaxed">
              Bring a PDF, Word doc, or plain text file. We check the page count client-side first, so nothing over the 200-page limit gets sent anywhere.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col gap-2.5 p-6 rounded-xl bg-[#F7F4EC]/60 border border-[#E9E4D9]">
            <div className="font-mono text-xs font-semibold text-[#8C8476]">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-[#191715]">
              Analyze
            </h3>
            <p className="text-sm text-[#5B554B] leading-relaxed">
              The full text is read and condensed into a plain-language brief: the gist, the key points, and the topics it touches — like margin notes for the whole document.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col gap-2.5 p-6 rounded-xl bg-[#F7F4EC]/60 border border-[#E9E4D9]">
            <div className="font-mono text-xs font-semibold text-[#8C8476]">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-[#191715]">
              Ask
            </h3>
            <p className="text-sm text-[#5B554B] leading-relaxed">
              Open the Q&A panel and ask anything specific — a figure, a clause, a name. Answers are grounded only in what's actually in your file.
            </p>
          </div>
        </div>

        {/* Sub-footer banner */}
        <div className="text-center text-xs font-mono text-[#8C8578] pt-4 pb-2">
          Précis · Files are parsed in your browser; only extracted text is sent for analysis.
        </div>
      </div>
    </div>
  );
};
