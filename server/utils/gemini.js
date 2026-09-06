import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-3.7-flash";

const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// Strips markdown code fences that Gemini sometimes wraps JSON in
const cleanJsonResponse = (text) => {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
};

const safeJsonParse = (text) => {
  const cleaned = cleanJsonResponse(text);
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Attempt to salvage the largest {...} or [...] block
    const match = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error("Failed to parse AI response as JSON: " + err.message);
  }
};

// 1. Compare resume text against job description -> skill gap analysis
export const analyzeSkillGap = async (resumeText, jobDescription) => {
  const prompt = `
You are an expert technical recruiter and ATS (Applicant Tracking System) specialist.
Compare the RESUME below against the JOB DESCRIPTION and return ONLY a valid JSON object
(no markdown, no commentary) with this exact shape:

{
  "matchScore": <number 0-100 representing overall fit>,
  "matchedSkills": [<array of skill strings found in both resume and job description>],
  "missingSkills": [<array of important skills required by the job but missing/weak in the resume>],
  "recommendations": [<array of 4-6 specific, actionable strings telling the candidate how to close the gaps>]
}

RESUME:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return safeJsonParse(text);
};

// 2. Generate tailored interview questions based on resume + job description
export const generateInterviewQuestions = async (resumeText, jobDescription) => {
  const prompt = `
You are a senior hiring manager preparing for an interview.
Based on the RESUME and JOB DESCRIPTION below, generate 10 interview questions
tailored specifically to this candidate and this role. Mix technical, behavioral,
and situational questions. Return ONLY a valid JSON array (no markdown, no commentary)
where each item has this exact shape:

{ "question": "<the question text>", "category": "<Technical|Behavioral|Situational>", "difficulty": "<Easy|Medium|Hard>" }

RESUME:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return safeJsonParse(text);
};

// 3. Generate an ATS-optimized rewritten resume in Markdown
export const generateAtsResume = async (resumeText, jobDescription) => {
  const prompt = `
You are an expert resume writer who specializes in ATS (Applicant Tracking System) optimization.
Rewrite the RESUME below so that it is tailored and optimized for the JOB DESCRIPTION provided.

Rules:
- Preserve the candidate's real experience, companies, dates, and education — do not invent facts.
- Naturally incorporate relevant keywords and skills from the job description where truthful and appropriate.
- Use clear section headers (Summary, Skills, Experience, Education, Projects/Certifications if applicable).
- Use simple formatting: plain text and markdown-style headers (##) and bullet points (-) only. No tables, no images, no columns, no special characters that could confuse an ATS parser.
- Quantify achievements with metrics where the original resume implies them.
- Return ONLY the final resume text in Markdown. No commentary, no explanations, no code fences.

RESUME:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return cleanJsonResponse(text); // just strips stray fences, not JSON here
};
