# ResumeAI 🚀

### AI-Powered Resume Analyzer, Skill Gap Detector, ATS Checker & Interview Preparation Platform

ResumeAI is a full-stack MERN application designed to help job seekers analyze, improve, and optimize their resumes using Artificial Intelligence.

Users can upload their resumes, compare them with job descriptions, identify skill gaps, generate personalized interview questions, check ATS compatibility, and create ATS-friendly resumes.

---

## 🌐 Live Demo

🚀 **[Live Website](https://resumea1.netlify.app/)**



---

## ✨ Features

### 🔐 Authentication

- User registration and login
- JWT-based authentication
- Protected routes
- Persistent authentication using localStorage

### 📄 Resume Upload & Parsing

- Upload PDF or DOCX resumes
- Server-side resume parsing
- Automatic text extraction
- Resume data stored securely in MongoDB
- Temporary uploaded files deleted after processing

### 🤖 AI Resume Analysis

Paste a job description and get an AI-powered analysis including:

- Resume-to-job match score
- Matched skills
- Missing skills
- Personalized recommendations
- Areas for improvement

### 🎯 Skill Gap Detection

Identify the skills you already have and discover the skills you need to develop for a specific job role.

### 💬 AI Interview Preparation

Generate personalized interview questions based on:

- Resume
- Job description
- Technical skills
- Behavioral requirements
- Situational requirements

### 📊 ATS Resume Checker

Analyze your resume for ATS compatibility.

The ATS checker evaluates:

- Resume structure
- Keywords
- Formatting
- Contact information
- Resume sections
- Job-description keyword matching

### 📝 AI Resume Builder

Create a professional and ATS-friendly resume using a clean single-column layout.

Features include:

- Professional resume template
- GitHub link
- LinkedIn link
- LeetCode link
- Portfolio link
- LaTeX source generation
- Download `.tex` file
- Copy LaTeX source
- PDF generation
- Browser print fallback

### ✨ AI ATS Resume Rewriter

Generate an ATS-optimized version of your resume tailored to a specific job description.

It improves:

- Job relevance
- Keywords
- Resume wording
- ATS compatibility
- Professional presentation

> ResumeAI is designed to improve existing information and should not be used to fabricate qualifications, experience, or achievements.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- React Icons
- HTML2PDF.js

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- PDF Parser
- Mammoth
- Google Gemini API

## AI

- Google Gemini API
- `@google/generative-ai`
- AI Resume Analysis
- Skill Gap Detection
- Interview Question Generation
- ATS Resume Optimization
- Resume Rewriting

## Deployment

- **Frontend:** Netlify
- **Backend:** Render
- **Database:** MongoDB Atlas

---

# 📁 Project Structure

```text
resume-ai-project/
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── resumeController.js
│   │   ├── analysisController.js
│   │   ├── builderController.js
│   │   └── atsController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Resume.js
│   │   └── Analysis.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── resumeRoutes.js
│   │   ├── analysisRoutes.js
│   │   ├── builderRoutes.js
│   │   └── atsRoutes.js
│   │
│   ├── utils/
│   │   ├── gemini.js
│   │   ├── parseResume.js
│   │   ├── latexResume.js
│   │   └── atsChecker.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── client/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   │
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   │
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   │
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── UploadResume.jsx
    │   │   ├── JobAnalysis.jsx
    │   │   ├── SkillGap.jsx
    │   │   ├── ResumeBuilder.jsx
    │   │   └── AtsChecker.jsx
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── package.json
    └── .env.example
