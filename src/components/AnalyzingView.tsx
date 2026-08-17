import React from 'react';
import { motion } from 'motion/react';

interface AnalyzingViewProps {
  fileName: string;
}

export const AnalyzingView: React.FC<AnalyzingViewProps> = ({ fileName }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-24 sm:py-32 flex flex-col items-center justify-center text-center">
      {/* Animated Document Icon with pulsing scan lines */}
      <div className="relative w-24 h-32 bg-[#FFFFFF] rounded-xl border border-[#DCD5C5] shadow-md p-4 flex flex-col justify-between overflow-hidden mb-8">
        {/* Document Fold Corner */}
        <div className="absolute top-0 right-0 w-6 h-6 bg-[#EBE4D5] rounded-bl-lg border-b border-l border-[#D6CDBC]"></div>

        {/* Shimmering scanning line */}
        <motion.div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C29B38] to-transparent opacity-80 z-10"
          animate={{
            top: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Document Header line */}
        <div className="w-10 h-2 bg-[#D1C9B7] rounded-sm mb-2"></div>

        {/* Body placeholder lines pulsing */}
        <div className="flex flex-col gap-2 w-full">
          <motion.div
            className="w-full h-1.5 bg-[#E6DFD0] rounded-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          />
          <motion.div
            className="w-5/6 h-1.5 bg-[#E6DFD0] rounded-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="w-full h-1.5 bg-[#E6DFD0] rounded-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="w-4/6 h-1.5 bg-[#E6DFD0] rounded-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
          />
          <motion.div
            className="w-full h-1.5 bg-[#E6DFD0] rounded-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
          />
        </div>

        {/* Bottom indicator */}
        <div className="w-8 h-1 bg-[#D9D1C0] rounded-full self-start"></div>
      </div>

      {/* Text Feedback */}
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A] tracking-tight mb-2">
        Analyzing document...
      </h2>
      <p className="text-sm font-mono text-[#7A7469] max-w-md truncate">
        {fileName}
      </p>

      {/* Footer reassurance */}
      <div className="mt-16 text-xs font-mono text-[#968F81] bg-[#F2EDE1] px-4 py-2 rounded-full border border-[#E4DDCF]">
        Précis · Files are parsed in your browser; only extracted text is sent for analysis.
      </div>
    </div>
  );
};
