import { ParsedDocument } from '../types';

export const SAMPLE_DOCUMENTS: ParsedDocument[] = [
  {
    name: 'Concept_Note.pdf',
    pageCount: 1,
    wordCount: 549,
    fileSize: '42.8 KB',
    fileType: 'pdf',
    text: `Concept Note: AI Travel Planner

1. Project Overview & Vision
The AI Travel Planner is a modern web application that uses Google Gemini LLM to generate personalized, end-to-end travel plans from a single interface. It addresses the inefficiency of consulting multiple travel websites by consolidating destination recommendations, transportation options, hotel suggestions, cost estimates, and day-wise itineraries in one place. The project also serves as a demonstration of Generative AI integration in a modern web application.

2. Architecture & Cloud Deployment
- The application live deployment is hosted at https://ai-trip-planner-seven-lac.vercel.app/ and built as a responsive web app with secure cloud deployment.
- Google Gemini LLM is used via API to generate all travel recommendations and itineraries; API keys are protected through environment variables.
- Front-end is created with React, Vite, and Tailwind CSS for responsive mobile and desktop viewports.
- Back-end proxy API verifies session tokens and prevents rate limits.

3. Key Features & User Experience
- User inputs include starting location, destination, travel dates, number of travelers, transportation preference, hotel preference, and places of interest.
- If a selected transport mode is unavailable for a destination, the system explains why and recommends alternatives.
- Key outputs include a day-wise itinerary, transportation details with estimated time and cost, hotel suggestions, tourist attractions, and an overall trip budget estimate.
- Two distinctive features are a Local Language AI Companion and Destination Emergency Contacts, going beyond standard itinerary generation.

4. Target Audience & Market Fit
Target users span individual travelers, families, students, working professionals, and first-time visitors to a destination.

5. Technology Stack & Implementation
The project demonstrates practical application of prompt engineering, backend API integration, and Generative AI-driven personalization.
- Frontend: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion animations.
- Backend: Node.js Express server, Google GenAI SDK (@google/genai).
- AI Engine: Gemini 3.7 Flash for instant extraction and contextual Q&A.

6. Conclusion & Roadmap
Future iterations will incorporate real-time flight pricing, multi-currency conversion, and offline PDF export of finalized itineraries.`,
  },
  {
    name: 'Quarterly_Strategy_Brief_2026.docx',
    pageCount: 3,
    wordCount: 1120,
    fileSize: '78.5 KB',
    fileType: 'docx',
    text: `Executive Strategy Brief: Q3-Q4 Growth & Technology Roadmap

1. Executive Summary
This document outlines the strategic priorities for the second half of 2026. With enterprise demand for automated intelligence and real-time document workflows accelerating, our organization is prioritizing three core pillars: Cloud Modernization, AI Document Intelligence, and Customer Retention.

2. Key Strategic Objectives
- Revenue Targets: Accelerate Annual Recurring Revenue (ARR) by 34% year-over-year, targeting $48M by end of Q4.
- Product Velocity: Launch Précis v2 with multi-modal document reasoning, support for up to 200 pages, and sub-second retrieval latency.
- Infrastructure Efficiency: Migrate 100% of microservices to containerized Cloud Run deployments to reduce idle compute costs by 28%.
- Data Privacy & Security: Complete SOC-2 Type II audit and implement client-side document pre-parsing to ensure zero data retention on unanalyzed files.

3. Departmental Milestones
- Engineering: Deliver full integration with Gemini 3.7 Flash models, streaming Q&A endpoints, and local PDF parsing engines.
- Product & Design: Achieve CSAT > 92% across web and mobile experiences with refined warm-editorial typography and intuitive one-click actions.
- Sales & Enterprise: Onboard 50 Tier-1 enterprise pilots across legal, financial, and healthcare verticals.

4. Risk Matrix & Mitigations
- Token Window Limits: Mitigated by chunked vector grounding and 1M token context windows.
- Regulatory Compliance: Mitigated by GDPR and HIPAA-compliant data processing agreements.
- Market Competition: Mitigated by rapid deployment cadence and industry-leading response accuracy.

5. Budget Allocations
- R&D and Engineering: 45% ($8.2M)
- Go-to-Market & Sales: 30% ($5.5M)
- Operations & Infrastructure: 15% ($2.7M)
- General & Administrative: 10% ($1.8M)`,
  },
  {
    name: 'Research_Paper_AI_Architectures.txt',
    pageCount: 2,
    wordCount: 890,
    fileSize: '34.2 KB',
    fileType: 'txt',
    text: `Title: Advances in Long-Context Document Understanding and Selective Synthesis
Authors: Dr. Elena Vance, Marcus Thorne, Dept. of Applied Artificial Intelligence

Abstract:
Modern generative models with extended context windows (up to 1M+ tokens) have revolutionized document synthesis. Rather than relying solely on lossy chunk-and-embed retrieval pipelines, native large-context models can ingest complete 100 to 200 page dossiers, technical manuals, and legal contracts simultaneously. This paper examines the fidelity of synthesis, topic tagging accuracy, and grounded Q&A latency across structured corpora.

1. Introduction
Traditional retrieval-augmented generation (RAG) often suffers from semantic drift when critical context spans multiple non-contiguous pages. Large-context models like Gemini 3.7 Flash retain full semantic continuity across up to 200 pages, enabling holistic synthesis.

2. Methodology & Benchmarks
We evaluated 500 documents across legal, medical, and engineering disciplines:
- Summary Faithfulness: 99.4% agreement with human expert summaries.
- Key Fact Retention: Zero hallucination on quantitative tables and numerical metrics.
- Question Answering Precision: 98.7% grounding accuracy against source text.
- Processing Latency: Average of 3.2 seconds for full 50-page synthesis.

3. Findings & Discussion
Our empirical results confirm that client-side page validation coupled with server-side native context ingestion provides the optimal balance of privacy, speed, and analytical precision. Margin notes, structured key points, and dynamic topic extraction provide users with instant mental models before engaging in conversational inquiry.

4. Conclusion
Direct document ingestion marks a paradigm shift from keyword indexing to deep conceptual understanding. Future research will explore real-time cross-document synthesis and dynamic reasoning chains.`,
  },
];
