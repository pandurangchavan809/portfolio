import aiForEveryone from "../assets/certificates/ai-for-everyone.png";
import aiFundamentals from "../assets/certificates/ai-fundamentals-ibm.png";
import awsPractitioner from "../assets/certificates/aws-ai-practitioner.png";
import dataScience from "../assets/certificates/data-science-python.png";
import generativeAi from "../assets/certificates/generative-ai-aws.jpeg";
import mlSpecialization from "../assets/certificates/ml-specialization.png";
import mlFoundations from "../assets/certificates/ml-foundations-aws.jpeg";

const GITHUB = "https://github.com/pandurangchavan809";

export const profile = {
  name: "Pandurang Chavan",
  role: "Agentic AI Engineer",
  targetRoles: [
    "Agentic AI Engineer",
    "Generative AI / LLM Engineer",
    "AI Systems Engineer",
    "Forward Deployed Engineer",
    "Software Engineer (Backend / AI)",
  ],
  location: "Pune, Maharashtra",
  email: "pandurangchavan809@gmail.com",
  phone: "+91 87888 44632",
  phoneHref: "tel:+918788844632",
  github: GITHUB,
  linkedin: "https://www.linkedin.com/in/pandurang-chavan-7507b1325/",
  leetcode: "https://leetcode.com/u/Pandurang_0188/",
  formspree: "https://formspree.io/f/xkovddjk",
  summary:
    "Artificial Intelligence and Data Science student with hands-on experience in Enterprise AI, Machine Learning, Generative AI, and AI backend development. Proficient in Python, SQL, FastAPI, RAG, vector databases, and LLM applications, and passionate about Applied AI, Agentic AI, and advancing intelligent AI through research and innovation.",
  education: {
    degree: "B.E. in Artificial Intelligence",
    school: "Dr. D. Y. Patil Institute of Technology, Pune",
    period: "July 2023 – June 2027",
    cgpa: "8.19 / 10",
  },
};

export const experience = {
  title: "AI Intern",
  company: "Visteon Corporation India",
  period: "June 2026 – Present",
  location: "Pune, Maharashtra",
  intro: "AI-powered document intelligence and secure enterprise AI solutions for the automotive domain.",
  points: [
    "Developing enterprise Agentic RAG solutions for document intelligence and knowledge retrieval.",
    "Built configurable LLM, embedding, reranking, and Qdrant-based ingestion and retrieval pipelines with HITL validation.",
    "Implemented intent-aware routing, scope detection, query rewriting, text and image tool selection, and session memory.",
    "Supported NVIDIA DGX Spark inference, developed reusable AI microservices, and maintained Git repositories.",
  ],
};

export type Project = {
  name: string;
  kind: string;
  summary: string;
  stack: string[];
  points: string[];
  live?: string;
  code: string;
};

export const projects: Project[] = [
  {
    name: "ResearchOps Agent",
    kind: "Agentic research",
    summary:
      "An evidence-grounded research agent that plans queries, ranks sources, verifies claims, and produces structured answers with PDF reports.",
    stack: ["LangGraph", "LangChain", "FastAPI", "Pydantic", "Tavily", "OpenAI", "Nebius", "React"],
    points: [
      "Engineered LangGraph agent orchestration with state management, structured function calling, and multi-LLM fallback, automating query planning, source ranking, evidence extraction, and claim verification.",
      "Built AI guardrails for hallucination and prompt injection, with chat history, JWT auth, and on-demand PDF reports.",
    ],
    live: "https://research-ops-agent.vercel.app/",
    code: `${GITHUB}/ResearchOps`,
  },
  {
    name: "DataPilot AI",
    kind: "Agentic NL2SQL",
    summary:
      "Ask questions in plain English and get safe, executable SQL through an agentic workflow that corrects its own mistakes.",
    stack: ["LangGraph", "FastAPI", "OpenAI", "Nebius", "React", "SQL", "SQLite"],
    points: [
      "Engineered an agentic NL2SQL workflow in LangGraph with conditional routing and self-correcting SQL loops.",
      "Built multi-provider LLM routing across OpenAI, Gemini, and Nebius with fallback and SSE streaming.",
      "Implemented AI guardrails using SQL parsing, read-only database sessions, JWT auth, and rate limiting.",
    ],
    live: "https://data-pilot-ai-mu.vercel.app",
    code: `${GITHUB}/DataPilot-AI`,
  },
  {
    name: "RAGDocs AI",
    kind: "RAG assistant",
    summary:
      "A document assistant with source citations, multi-document search, and persistent chat memory across sessions.",
    stack: ["LangChain", "Flask", "OpenAI API", "Gemini", "ChromaDB", "MySQL", "React"],
    points: [
      "Built a RAG-based document assistant with source citations, multi-document search, and persistent chat memory.",
      "Implemented semantic retrieval with Gemini embeddings, ChromaDB, MMR, and page-aware chunking.",
      "Integrated 4 LLMs with automatic fallback, token streaming (SSE), and JWT with a React frontend and Flask backend.",
    ],
    live: "https://rag-docs-ai.vercel.app",
    code: `${GITHUB}/RAGDocs-AI`,
  },
  {
    name: "Arise",
    kind: "Agent memory",
    summary:
      "Adaptive Memory Runtime: a local-first memory service for AI agents that stores, scores, and limits the context sent back to them.",
    stack: ["Python", "FastAPI", "SQLite FTS5", "React", "Tailwind CSS", "Python SDK", "Docker"],
    points: [
      "FastAPI backend for storing, recalling, updating, and forgetting memories, with SQLite and FTS5 for local persistence and text search.",
      "Memory quality manager that filters and deterministically scores candidates, resolves conflicts, and applies a context budget.",
      "Session, long-term, experience, and prospective memory types, with a Python SDK for calling the service from an agent.",
      "Optional adapters for Nebius (LLM), Tavily (web search), and Deepgram (speech), plus a React demo and inspection interface.",
    ],
    code: `${GITHUB}/Arise`,
  },
  {
    name: "Global Economic Intelligence Platform",
    kind: "AI analytics",
    summary:
      "An end-to-end economic analytics platform covering 193+ countries, with real-time macroeconomic insights and Gemini-powered analysis.",
    stack: ["React.js", "Flask", "SQL", "Gemini API"],
    points: [
      "Developed an end-to-end economic analytics platform integrating IMF, World Bank, and CountryLayer APIs with optimized MySQL pipelines for 193+ country-level datasets and real-time macroeconomic insights.",
      "Integrated Gemini API for intelligent trend analysis, economic summarization, and AI-powered insights.",
    ],
    live: "https://economic-intelligence.vercel.app/",
    code: `${GITHUB}/Economy-Intelligence-react`,
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Agentic AI", items: ["LangGraph", "Tool/Function Calling", "Agent Orchestration", "State & Memory", "HITL", "AI Guardrails"] },
  { group: "Generative AI", items: ["LLMs", "Transformers", "RAG", "LangChain", "Embeddings", "Reranking", "Prompt Engineering", "RAG Evaluation"] },
  { group: "Frameworks & Backend", items: ["FastAPI", "Flask", "Pydantic", "REST APIs", "API Integration", "Microservices", "React (Basic)"] },
  { group: "AI/ML Libraries", items: ["Scikit-learn", "TensorFlow", "Keras", "Pandas", "NumPy", "Matplotlib", "PyTorch (Basic)"] },
  { group: "Databases & Vector Stores", items: ["MySQL", "MongoDB", "Qdrant", "ChromaDB", "FAISS"] },
  { group: "Tools & Cloud", items: ["Git", "GitHub", "Docker", "AWS (EC2, S3, Lambda)"] },
  { group: "Core Concepts", items: ["ML", "DL", "NLP", "Fine-tuning (Basic)", "AI System Design", "Model Deployment", "DSA", "OOP"] },
  { group: "Languages", items: ["Python", "SQL", "C++"] },
];

export type CertCategory = "DeepLearning.AI" | "AWS" | "Cisco";

export type Certificate = {
  title: string;
  issuer: string;
  category: CertCategory;
  date?: string;
  image: string;
  verify?: string;
};

export const certificates: Certificate[] = [
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI & Stanford Online",
    category: "DeepLearning.AI",
    date: "Jan 25, 2026",
    image: mlSpecialization,
    verify: "https://coursera.org/verify/specialization/IPAU4H6ZQ0WG",
  },
  {
    title: "AWS AI Practitioner Challenge",
    issuer: "AWS & Udacity",
    category: "AWS",
    date: "May 1, 2026",
    image: awsPractitioner,
    verify: "https://www.udacity.com/certificate/e/3c874184-29dc-11f1-9a19-cbf9896dd694",
  },
  {
    title: "AWS Educate Machine Learning Foundations",
    issuer: "AWS Educate",
    category: "AWS",
    image: mlFoundations,
  },
  {
    title: "Introducing Generative AI with AWS",
    issuer: "AWS & Udacity",
    category: "AWS",
    date: "July 24, 2025",
    image: generativeAi,
    verify: "https://www.udacity.com/certificate/e/c236a17a-588c-11f0-af27-675a87409178",
  },
  {
    title: "AI Fundamentals with IBM SkillsBuild",
    issuer: "IBM SkillsBuild & Cisco Networking Academy",
    category: "Cisco",
    date: "Nov 27, 2024",
    image: aiFundamentals,
  },
  {
    title: "Data Science Essentials with Python",
    issuer: "Cisco Networking Academy",
    category: "Cisco",
    date: "Jan 18, 2026",
    image: dataScience,
  },
  {
    title: "AI For Everyone",
    issuer: "DeepLearning.AI, via Coursera",
    category: "DeepLearning.AI",
    date: "Nov 22, 2024",
    image: aiForEveryone,
    verify: "https://coursera.org/verify/VUL095TGL72F",
  },
];

export const achievements = [
  {
    title: "Autodesk Pune Open House 2026",
    detail: "Selected among 50+ students across 20+ colleges for developer interactions, mock interviews, and industry networking.",
  },
  {
    title: "Campus Ambassador, Entrepreneurship Development Cell, IIT Delhi",
    detail: "2023 – 2024",
  },
];
