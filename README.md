ResumeAI 🚀

AI-Powered Resume Analysis, ATS Optimization & Interview Preparation Platform




ResumeAI is a full-stack MERN application that helps students and job seekers analyze, improve, and optimize their resumes using Artificial Intelligence.

Users can upload PDF/DOCX resumes, compare them with job descriptions, identify skill gaps, receive AI-powered recommendations, generate personalized interview questions, check ATS compatibility, and build ATS-friendly resumes.

🌐 Live Application

🚀 Open ResumeAI

Frontend: https://resumea1.netlify.app/

Backend API: https://resumeai-8ys4.onrender.com/api

Health Check: https://resumeai-8ys4.onrender.com/api/health

Repository: https://github.com/pritivish07025/ResumeAI

The backend is hosted on Render. The first request can take a little longer if the service is waking up.

🎯 Project Overview

ResumeAI combines resume analysis, ATS checking, skill-gap detection, interview preparation, and resume building into one application.

Problems it addresses

Understanding whether a resume matches a specific job

Finding missing or weak skills

Improving resume content for a target role

Checking common ATS compatibility factors

Preparing personalized interview questions

Creating a clean, ATS-friendly resume

✨ Features

Feature

Description

🔐 Authentication

JWT-based registration, login, and protected routes

📄 Resume Upload

PDF/DOCX resume upload

🔍 Resume Parsing

Server-side text extraction

🤖 AI Job Analysis

Resume vs. job-description analysis

📊 Match Score

Estimated resume-to-job alignment

🎯 Skill Gap

Matched and missing skills

💡 AI Recommendations

Personalized improvement suggestions

💬 Interview Prep

Technical, behavioral, and situational questions

📈 ATS Checker

Resume structure, formatting, and keyword checks

📝 Resume Builder

Professional single-column resume builder

📑 LaTeX Export

Generate, copy, and download LaTeX source

✨ ATS Rewriter

Tailor resume content to a target job

📥 PDF Export

PDF generation with browser print fallback

🧠 Application Workflow

Register / Login
       ↓
Upload Resume
       ↓
PDF / DOCX Text Extraction
       ↓
Select Resume + Add Job Description
       ↓
Gemini AI Analysis
       ↓
Match Score + Matched Skills + Missing Skills
       ↓
Recommendations
       ↓
Interview Questions
       ↓
ATS Check / ATS Rewrite
       ↓
Build & Download Resume

🏗️ Architecture

                         USER
                           │
                           ▼
                 ┌──────────────────┐
                 │ React + Vite     │
                 │ Frontend         │
                 └────────┬─────────┘
                          │
                       REST API
                          │
                          ▼
                 ┌──────────────────┐
                 │ Express.js       │
                 │ Backend          │
                 │ JWT + Controllers│
                 └───────┬───┬──────┘
                         │   │
              ┌──────────┘   └──────────┐
              ▼                         ▼
       ┌──────────────┐          ┌──────────────┐
       │ MongoDB      │          │ Google       │
       │ Atlas        │          │ Gemini API   │
       └──────────────┘          └──────────────┘

🛠️ Tech Stack

Frontend

React.js

Vite

Tailwind CSS

Axios

React Router

React Icons

HTML2PDF.js

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

Multer

PDF parsing

Mammoth

AI

Google Gemini API

@google/generative-ai

Deployment

Netlify — Frontend

Render — Backend

MongoDB Atlas — Database

📁 Project Structure

ResumeAI/
│
├── client/                         # React + Vite frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js            # Axios API instance
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Authentication state
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UploadResume.jsx
│   │   │   ├── JobAnalysis.jsx
│   │   │   ├── SkillGap.jsx
│   │   │   ├── ResumeBuilder.jsx
│   │   │   └── AtsChecker.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── .env.example
│
├── server/                         # Express + MongoDB backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── resumeController.js
│   │   ├── analysisController.js
│   │   ├── builderController.js
│   │   └── atsController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Resume.js
│   │   └── Analysis.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── resumeRoutes.js
│   │   ├── analysisRoutes.js
│   │   ├── builderRoutes.js
│   │   └── atsRoutes.js
│   ├── utils/
│   │   ├── gemini.js
│   │   ├── parseResume.js
│   │   ├── latexResume.js
│   │   └── atsChecker.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── README.md

⚙️ Prerequisites

Install the following before running the project:

Node.js 18+

Git

MongoDB locally or MongoDB Atlas

Google Gemini API key

Get a Gemini API key:

Google AI Studio

🚀 Local Setup

1. Clone the repository

git clone https://github.com/pritivish07025/ResumeAI.git
cd ResumeAI

2. Backend

cd server
npm install

Create server/.env:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume-ai
JWT_SECRET=replace_with_a_long_random_secret
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
CLIENT_URL=http://localhost:5173

Run:

npm run dev

Backend API:

http://localhost:5000/api

3. Frontend

Open another terminal:

cd client
npm install

Create client/.env:

VITE_API_URL=http://localhost:5000/api

Run:

npm run dev

Open:

http://localhost:5173

🔑 Environment Variables

Backend — server/.env

Variable

Purpose

PORT

Express server port

MONGO_URI

MongoDB connection string

JWT_SECRET

JWT signing secret

GEMINI_API_KEY

Gemini API key

GEMINI_MODEL

Gemini model

CLIENT_URL

Frontend origin used by CORS

Frontend — client/.env

Variable

Purpose

VITE_API_URL

Backend API base URL

Production

# Netlify
VITE_API_URL=https://resumeai-8ys4.onrender.com/api

# Render
CLIENT_URL=https://resumea1.netlify.app

VITE_API_URL must include /api.

Do not commit .env files or secrets.

🔌 API Overview

Protected endpoints require:

Authorization: Bearer <JWT_TOKEN>

Authentication

Method

Endpoint

Auth

POST

/api/auth/register

Public

POST

/api/auth/login

Public

GET

/api/auth/me

Protected

Resume

Method

Endpoint

Auth

POST

/api/resume/upload

Protected

GET

/api/resume

Protected

GET

/api/resume/:id

Protected

DELETE

/api/resume/:id

Protected

Analysis

Method

Endpoint

Auth

POST

/api/analysis/skill-gap

Protected

POST

/api/analysis/:id/interview-questions

Protected

POST

/api/analysis/:id/ats-resume

Protected

GET

/api/analysis

Protected

GET

/api/analysis/:id

Protected

Builder APIs are under:

/api/builder

ATS APIs are under:

/api/ats

🧪 Health Check

Local:

http://localhost:5000/api/health

Production:

Backend Health Check

Expected response:

{
  "status": "ok",
  "message": "Resume AI server is running"
}

🤝 Contributing

Contributions are welcome.

You do not need direct write access to the repository. The recommended workflow is:

Fork
 ↓
Clone
 ↓
Create Branch
 ↓
Make Changes
 ↓
Test
 ↓
Commit
 ↓
Push
 ↓
Pull Request
 ↓
Review
 ↓
Merge

1. Fork

Go to:

ResumeAI GitHub Repository

Click Fork.

2. Clone your fork

Replace YOUR_USERNAME with your GitHub username:

git clone https://github.com/YOUR_USERNAME/ResumeAI.git
cd ResumeAI

3. Add the original repository as upstream

git remote add upstream https://github.com/pritivish07025/ResumeAI.git
git remote -v

4. Create a feature branch

Do not work directly on main.

git checkout -b feature/your-feature-name

Examples:

git checkout -b feature/cover-letter-generator
git checkout -b fix/ats-score
git checkout -b docs/improve-readme

5. Install dependencies

Backend:

cd server
npm install

Frontend:

cd ../client
npm install

6. Configure environment variables

Create local .env files using .env.example.

Never commit:

.env
.env.local

7. Make and test your changes

For frontend changes:

cd client
npm run build

For backend changes, start the server and verify:

GET /api/health

Also test the feature or endpoint you changed.

8. Commit

git add .
git commit -m "feat: add your feature"

Recommended prefixes:

feat:      new feature
fix:       bug fix
docs:      documentation
refactor:  code restructuring
style:     UI/formatting
test:      tests
chore:     maintenance

9. Push

git push origin feature/your-feature-name

10. Open a Pull Request

Create a Pull Request from your fork to:

pritivish07025/ResumeAI

Include:

What changed

Why the change was needed

How you tested it

Screenshots for UI changes

API examples for API changes

🔄 Sync Your Fork

Before starting new work:

git checkout main
git fetch upstream
git merge upstream/main

Then create a new branch:

git checkout -b feature/new-feature

🐛 Bug Reports

Before opening an issue:

Search existing issues.

Confirm the problem still exists.

Check browser console and backend logs.

Provide clear reproduction steps.

Include:

Expected behavior:
Actual behavior:
Steps to reproduce:
Browser:
Operating system:
Node.js version:
Relevant error:

Never include:

API keys
Passwords
JWT tokens
MongoDB credentials
.env contents
Private user data

🔒 Security

ResumeAI uses:

JWT authentication

Protected routes

Password hashing

CORS

Environment variables

User-specific data access

Temporary uploaded-file cleanup

If a secret is accidentally exposed, rotate/revoke it immediately and update the deployment environment.

⚠️ Limitations

Gemini responses depend on API availability and configured model.

AI usage may be subject to quotas and rate limits.

ATS scores are estimates and can differ between ATS providers.

Resume parsing quality can vary with document formatting.

AI-generated content should be reviewed before submission.

The application should not be used to fabricate qualifications or experience.

🗺️ Roadmap

Multiple resume templates

Cover letter generator

Resume version history

Job application tracker

LinkedIn profile optimization

AI mock interviews

Voice-based interview practice

Advanced ATS scoring

Resume analytics

Rate limiting

Redis caching

Automated tests

CI/CD pipeline

Accessibility improvements

👩‍💻 Author

Priti Vishwakarma

B.Tech Computer Science Engineering
Kashi Institute of Technology

💻 GitHub

🔗 LinkedIn

🧩 LeetCode

⭐ Support

If you find ResumeAI useful:

⭐ Star the repository

🐛 Report bugs

💡 Suggest improvements

🤝 Submit a Pull Request

📖 Improve documentation

📄 License

This project is currently intended for educational, learning, and portfolio purposes.
