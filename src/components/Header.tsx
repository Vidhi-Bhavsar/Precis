import React from 'react';
import { RotateCcw, FileText } from 'lucide-react';

interface HeaderProps {
  hasDocument: boolean;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ hasDocument, onReset }) => {
  return (
    <header className="w-full border-b border-[#E8E3D8] bg-[#FBF9F4]/90 backdrop-blur-sm sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={hasDocument ? onReset : undefined}
          className="flex items-center gap-3 cursor-pointer select-none group"
          id="brand-logo"
        >
          <div className="w-8 h-8 rounded-lg bg-[#1D1B19] text-[#FAF8F5] flex items-center justify-center font-serif text-lg font-bold shadow-xs transition-transform group-hover:scale-105">
            P
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#161514]">
              Précis
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono font-medium tracking-wider text-[#696359] bg-[#EDE8DE] rounded border border-[#DFD9CD]">
              DOC ANALYZER
            </span>
          </div>
        </div>

        {/* Right Nav / Actions */}
        <div className="flex items-center gap-4">
          {hasDocument ? (
            <button
              onClick={onReset}
              id="analyze-another-btn"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium text-[#46423C] bg-white border border-[#DCD6C9] rounded-lg hover:bg-[#F3EFE6] hover:text-[#181715] transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Analyze another document</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-[#7B7468]">
              <span className="bg-[#EFEAE0] px-2.5 py-1 rounded-full text-[#5B554B] font-medium border border-[#E3DDD1]">
                Up to 200 pages
              </span>
              <span className="text-[#999285]">·</span>
              <span>PDF · DOCX · TXT</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
