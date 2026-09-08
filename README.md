ResumeAI 🚀

AI-Powered Resume Analyzer, Skill Gap Detector, ATS Checker & Interview Preparation Platform

ResumeAI is a full-stack MERN application that helps job seekers analyze, improve, and optimize their resumes using Artificial Intelligence.

Users can upload a resume, compare it with a job description, identify skill gaps, generate personalized interview questions, check ATS compatibility, and create an ATS-friendly resume.

🌐 Live Demo

🚀 Live Website
💻 GitHub Repository

🎯 Why ResumeAI?

ResumeAI brings multiple job-preparation tools into one platform:

Resume analysis against a target job description

Skill matching and skill-gap detection

AI-powered resume recommendations

Personalized interview preparation

ATS compatibility checking

ATS-friendly resume rewriting

Professional resume building with LaTeX support

✨ Features

🔐 Authentication

User registration and login

JWT-based authentication

Protected routes

Persistent authentication using localStorage

User-specific resume and analysis data

📄 Resume Upload & Parsing

Supports PDF and DOCX resumes.

Resume Upload → Multer → PDF/DOCX Parser → Text Extraction → MongoDB
                                              ↓
                                      Temporary File Deleted

🤖 AI Resume Analysis

Users provide a job description and select a resume. Gemini analyzes the resume against the target role and provides:

Resume-to-job match score

Matched skills

Missing skills

Personalized recommendations

Areas for improvement

🎯 Skill Gap Detection

Identifies skills already present in the resume and important job-description skills that are missing or insufficiently represented.

💬 AI Interview Preparation

Generates personalized:

Technical questions

Behavioral questions

Situational questions

Resume-specific questions

Job-specific questions

📊 ATS Resume Checker

Checks common ATS compatibility factors including:

Resume structure

Contact information

Resume sections

Formatting

Keywords

Job-description keyword matching

ATS scores are practical estimates and may vary between ATS platforms.

📝 AI Resume Builder

Provides a clean, single-column, ATS-friendly resume builder with:

Professional resume template

GitHub, LinkedIn, LeetCode and portfolio links

LaTeX source generation

Copy LaTeX source

.tex download

PDF generation

Browser print fallback

✨ AI ATS Resume Rewriter

Tailors an existing resume to a target job description by improving:

Relevant keywords

Professional wording

Job relevance

ATS-friendly structure

Resume descriptions

The system is intended to improve existing information and should not be used to fabricate qualifications or experience.

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

PDF Parser

Mammoth

AI

Google Gemini API

@google/generative-ai

Deployment

Frontend: Netlify

Backend: Render

Database: MongoDB Atlas

🏗️ Architecture

                         ┌─────────────────┐
                         │      User       │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ React + Vite    │
                         │    Frontend     │
                         └────────┬────────┘
                                  │
                              REST API
                                  │
                                  ▼
                         ┌─────────────────┐
                         │    Express.js   │
                         │     Backend     │
                         └───────┬─┬───────┘
                                 │ │
                    ┌────────────┘ └────────────┐
                    ▼                           ▼
             ┌─────────────┐             ┌─────────────┐
             │  MongoDB    │             │ Gemini API  │
             │    Atlas    │             │     AI      │
             └─────────────┘             └─────────────┘

📁 Project Structure

ResumeAI/
├── server/
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
└── client/
    ├── src/
    │   ├── api/axios.js
    │   ├── components/
    │   ├── context/AuthContext.jsx
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
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── .env.example

⚙️ Prerequisites

Node.js 18+

Git

MongoDB or MongoDB Atlas

Google Gemini API key

Get a Gemini API key from Google AI Studio.

🚀 Getting Started

1. Clone the Repository

git clone https://github.com/pritivish07025/ResumeAI.git
cd ResumeAI

2. Backend Setup

cd server
npm install

Create .env from .env.example:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume-ai
JWT_SECRET=replace_with_a_long_random_secret
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
CLIENT_URL=http://localhost:5173

Start the backend:

npm run dev

Backend: http://localhost:5000
API: http://localhost:5000/api

3. Frontend Setup

Open another terminal:

cd client
npm install

Create .env:

VITE_API_URL=http://localhost:5000/api

Start the frontend:

npm run dev

Frontend: http://localhost:5173

🔑 Environment Variables

Variable

Purpose

Example

PORT

Backend server port

5000

MONGO_URI

MongoDB connection string

mongodb://127.0.0.1:27017/resume-ai

JWT_SECRET

JWT signing secret

Random secret

GEMINI_API_KEY

Gemini API key

your_key

GEMINI_MODEL

Gemini model

gemini-2.5-flash

CLIENT_URL

Frontend origin for CORS

http://localhost:5173

VITE_API_URL

Backend API base URL

http://localhost:5000/api

Never commit .env files, API keys, passwords, JWT secrets, or MongoDB credentials.

🌍 Production Configuration

Netlify — Frontend

VITE_API_URL=https://resumeai-8ys4.onrender.com/api

Render — Backend

CLIENT_URL=https://resumea1.netlify.app

Live frontend: https://resumea1.netlify.app/
Live API: https://resumeai-8ys4.onrender.com/api
Health check: https://resumeai-8ys4.onrender.com/api/health

VITE_API_URL must include /api.

🔌 API Documentation

Protected endpoints require:

Authorization: Bearer <token>

Authentication

Method

Endpoint

Description

Auth

POST

/api/auth/register

Create account

No

POST

/api/auth/login

Login and receive JWT

No

GET

/api/auth/me

Get current user

Yes

Resume

Method

Endpoint

Description

Auth

POST

/api/resume/upload

Upload and parse resume

Yes

GET

/api/resume

List user's resumes

Yes

GET

/api/resume/:id

Get a resume

Yes

DELETE

/api/resume/:id

Delete a resume

Yes

Upload format:

Content-Type: multipart/form-data
resume: <PDF or DOCX file>

AI Analysis

Method

Endpoint

Description

Auth

POST

/api/analysis/skill-gap

Analyze resume against job description

Yes

POST

/api/analysis/:id/interview-questions

Generate interview questions

Yes

POST

/api/analysis/:id/ats-resume

Generate ATS resume

Yes

GET

/api/analysis

List analyses

Yes

GET

/api/analysis/:id

Get analysis

Yes

Example request:

{
  "resumeId": "resume_id",
  "jobDescription": "Job description here"
}

Resume Builder

Builder functionality is available under:

/api/builder

ATS Checker

ATS functionality is available under:

/api/ats

🔄 User Workflow

Register / Login
      ↓
Upload Resume
      ↓
Resume Text Extraction
      ↓
Select Resume + Add Job Description
      ↓
AI Resume Analysis
      ↓
Match Score + Skill Gap
      ↓
Interview Questions
      ↓
ATS Check / AI Rewrite
      ↓
Build & Download Improved Resume

🧠 Technical Workflow

Resume Processing

User uploads a PDF or DOCX.

Multer receives the file.

parseResume.js extracts text.

Extracted data is stored in MongoDB.

Temporary uploaded files are deleted.

AI Processing

Backend receives resume text and job description.

gemini.js creates the AI prompt.

Gemini processes the request.

Backend parses the response.

Analysis data is stored and returned to the frontend.

🤝 Contributing

Contributions are welcome.

1. Fork the Repository

Fork the project on GitHub.

2. Clone Your Fork

git clone https://github.com/YOUR_USERNAME/ResumeAI.git
cd ResumeAI

3. Create a Feature Branch

git checkout -b feature/your-feature-name

Examples:

git checkout -b feature/cover-letter-generator
git checkout -b fix/ats-score-calculation

4. Install Dependencies

cd server
npm install

cd ../client
npm install

5. Configure Environment Variables

Create local .env files. Never commit them.

6. Make Your Changes

Keep changes focused and follow the existing project structure.

7. Test Your Changes

Before opening a pull request:

Test the frontend

Test the backend

Test affected API endpoints

Check browser console errors

Verify authentication if affected

Check responsive behavior for UI changes

8. Commit

git add .
git commit -m "feat: add your feature"

Recommended prefixes:

feat:     New feature
fix:      Bug fix
docs:     Documentation
refactor: Code refactoring
style:    Styling / formatting
test:     Tests
chore:    Maintenance

9. Push

git push origin feature/your-feature-name

10. Open a Pull Request

In your PR description, include:

What changed

Why it changed

How it was tested

Screenshots or API examples when useful

📋 Contribution Guidelines

Keep code readable and maintainable.

Follow the existing folder structure.

Avoid unnecessary dependencies.

Do not commit secrets.

Validate user input on the backend.

Handle API and UI errors gracefully.

Test changes before submitting a PR.

Update documentation when adding major features.

🐛 Reporting Issues

When opening an issue, include:

Expected Behavior

What should happen?

Actual Behavior

What happens instead?

Steps to Reproduce

1. Open the application
2. Login
3. Upload a resume
4. Run analysis
5. Observe the issue

Environment

Include relevant:

Browser

Operating system

Node.js version

Console/API error

Never post API keys, passwords, JWT tokens, or other secrets.

🔒 Security

ResumeAI uses:

JWT authentication

Protected API routes

Password hashing

CORS configuration

Environment variables

Temporary file cleanup

User-specific resources

If a secret is accidentally exposed, rotate it immediately.

⚠️ Limitations

Gemini API usage is subject to API quotas and limits.

AI-generated recommendations should be reviewed before use.

ATS scores are estimates and can vary between providers.

Resume parsing quality can vary with document formatting.

AI output does not guarantee job selection.

ResumeAI should not be used to fabricate experience or qualifications.

🗺️ Future Roadmap

Cover letter generator

Multiple resume templates

Resume version history

Job application tracker

LinkedIn profile optimization

AI mock interviews

Voice-based interview practice

Resume analytics

Advanced ATS scoring

Rate limiting

Redis caching

Email notifications

User profile customization

💡 Inspiration

Overleaf — Jake's Resume

Kickresume ATS Checker

👩‍💻 Author

Priti Vishwakarma

B.Tech Computer Science Engineering
Kashi Institute of Technology

Connect With Me

💻 GitHub

🔗 LinkedIn

🧩 LeetCode

⭐ Support

If you find ResumeAI useful, consider giving the repository a ⭐ on GitHub.

Ideas, improvements, bug fixes, and pull requests are welcome!

📄 License

This project is currently intended for educational, learning, and portfolio purposes
