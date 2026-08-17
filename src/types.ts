export interface DocumentAnalysis {
  summary: string;
  keyPoints: string[];
  topics: string[];
  documentType: string;
  wordCount: number;
  pageCount: number;
  fileName: string;
  extractedAt: string;
  readingTimeMinutes?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  groundedSnippets?: string[];
}

export interface ParsedDocument {
  name: string;
  text: string;
  pageCount: number;
  wordCount: number;
  fileSize: string;
  fileType: 'pdf' | 'docx' | 'doc' | 'txt' | 'other';
}
