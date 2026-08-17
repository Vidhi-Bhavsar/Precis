import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import mammoth from 'mammoth';
import { ParsedDocument } from '../types';

// Configure local Vite-bundled PDF.js worker
if (typeof window !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
  } catch (e) {
    console.warn('Could not set pdfjs workerSrc:', e);
  }
}

export const MAX_PAGE_LIMIT = 200;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export async function parseUploadedFile(file: File): Promise<ParsedDocument> {
  const fileName = file.name;
  const fileExt = fileName.split('.').pop()?.toLowerCase() || '';
  const fileSize = formatFileSize(file.size);

  let fileType: ParsedDocument['fileType'] = 'other';
  if (fileExt === 'pdf') fileType = 'pdf';
  else if (fileExt === 'docx') fileType = 'docx';
  else if (fileExt === 'doc') fileType = 'doc';
  else if (['txt', 'md', 'csv', 'json', 'log'].includes(fileExt)) fileType = 'txt';

  // 1. PDF Parsing
  if (fileType === 'pdf') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      if (numPages > MAX_PAGE_LIMIT) {
        throw new Error(`This document has ${numPages} pages, which exceeds the ${MAX_PAGE_LIMIT}-page limit for Précis.`);
      }

      let fullText = '';
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += `--- Page ${pageNum} ---\n${pageText}\n\n`;
      }

      const cleanText = fullText.trim();
      const words = cleanText.split(/\s+/).filter(Boolean).length;

      return {
        name: fileName,
        text: cleanText,
        pageCount: numPages,
        wordCount: words,
        fileSize,
        fileType: 'pdf',
      };
    } catch (err: any) {
      if (err.message && err.message.includes('exceeds')) {
        throw err;
      }
      console.warn('PDF.js worker fallback, parsing text stream:', err);
      // Fallback text read if PDF fails or encrypted
      const text = await file.text();
      const words = text.split(/\s+/).filter(Boolean).length;
      const estimatedPages = Math.max(1, Math.ceil(words / 450));
      if (estimatedPages > MAX_PAGE_LIMIT) {
        throw new Error(`This document has approximately ${estimatedPages} pages, exceeding the ${MAX_PAGE_LIMIT}-page limit.`);
      }
      return {
        name: fileName,
        text: text.slice(0, 300000),
        pageCount: estimatedPages,
        wordCount: words,
        fileSize,
        fileType: 'pdf',
      };
    }
  }

  // 2. DOCX Parsing
  if (fileType === 'docx' || fileType === 'doc') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value.trim();
      const words = text.split(/\s+/).filter(Boolean).length;
      const estimatedPages = Math.max(1, Math.ceil(words / 450));

      if (estimatedPages > MAX_PAGE_LIMIT) {
        throw new Error(`This document has approximately ${estimatedPages} pages, exceeding the ${MAX_PAGE_LIMIT}-page limit.`);
      }

      return {
        name: fileName,
        text,
        pageCount: estimatedPages,
        wordCount: words,
        fileSize,
        fileType: 'docx',
      };
    } catch (err: any) {
      if (err.message && err.message.includes('exceeds')) throw err;
      console.warn('Mammoth docx parse fallback:', err);
      const text = await file.text();
      const words = text.split(/\s+/).filter(Boolean).length;
      const estimatedPages = Math.max(1, Math.ceil(words / 450));
      return {
        name: fileName,
        text,
        pageCount: estimatedPages,
        wordCount: words,
        fileSize,
        fileType: 'docx',
      };
    }
  }

  // 3. Plain Text / Markdown / Other Text formats
  const text = await file.text();
  const words = text.split(/\s+/).filter(Boolean).length;
  const estimatedPages = Math.max(1, Math.ceil(words / 450));

  if (estimatedPages > MAX_PAGE_LIMIT) {
    throw new Error(`This text document has ~${estimatedPages} pages, exceeding the ${MAX_PAGE_LIMIT}-page limit.`);
  }

  return {
    name: fileName,
    text: text.trim(),
    pageCount: estimatedPages,
    wordCount: words,
    fileSize,
    fileType: fileType === 'other' ? 'txt' : fileType,
  };
}
