
# ResumeAI 🚀

**AI-Powered Resume Analysis, ATS Optimization, Resume Builder & Interview Preparation Platform**

ResumeAI is a full-stack MERN application that helps students and job seekers analyze, improve, and optimize their resumes using Artificial Intelligence.

Users can upload PDF or DOCX resumes, compare them with job descriptions, identify skill gaps, receive AI-powered recommendations, generate personalized interview questions, check ATS compatibility, and create ATS-friendly resumes.

---

## 🌐 Live Application

- **Frontend:** https://resumea1.netlify.app/
- **Backend API:** https://resumeai-8ys4.onrender.com/api
- **Health Check:** https://resumeai-8ys4.onrender.com/api/health
- **GitHub Repository:** https://github.com/pritivish07025/ResumeAI

> **Note:** The backend is hosted on Render. The first request may take a little longer if the service is waking up.

---

## 🎯 Project Overview

ResumeAI brings several job-preparation tools together in one platform:

- Resume upload and text extraction
- Resume-to-job-description analysis
- Estimated resume match score
- Matched and missing skill detection
- AI-powered resume improvement suggestions
- Personalized technical and behavioral interview questions
- ATS compatibility checks
- ATS-focused resume rewriting
- Resume building and LaTeX export
- PDF export and browser print fallback

### Problems It Solves

- Understanding how well a resume matches a target job
- Identifying missing or weak skills
- Improving resume content for a specific role
- Checking common ATS compatibility factors
- Preparing for technical, behavioral, and situational interviews
- Creating a clean, professional, ATS-friendly resume

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 Authentication | JWT-based registration, login, and protected routes |
| 📄 Resume Upload | Upload PDF and DOCX resumes |
| 🔍 Resume Parsing | Server-side text extraction from uploaded documents |
| 🤖 AI Job Analysis | Compare a resume with a job description using Gemini AI |
| 📊 Match Score | Estimated resume-to-job alignment score |
| 🎯 Skill Gap Detection | Identify matched, missing, and weak skills |
| 💡 AI Recommendations | Receive personalized resume improvement suggestions |
| 💬 Interview Preparation | Generate technical, behavioral, and situational questions |
| 📈 ATS Checker | Check resume structure, formatting, and keywords |
| 📝 Resume Builder | Create a professional single-column resume |
| 📑 LaTeX Export | Generate, copy, and download LaTeX source |
| ✨ ATS Rewriter | Tailor resume content to a target job |
| 📥 PDF Export | Generate a PDF with a browser print fallback |

---

## 🧠 Application Workflow

```text
Register / Login
       ↓
Upload Resume
       ↓
Extract Text from PDF / DOCX
       ↓
Select Resume and Add Job Description
       ↓
Gemini AI Analysis
       ↓
Match Score + Matched Skills + Missing Skills
       ↓
AI Recommendations
       ↓
Personalized Interview Questions
       ↓
ATS Check / ATS Rewrite
       ↓
Build and Download Resume
```

---

## 🏗️ System Architecture

```text
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
                  └───────┬────┬─────┘
                          │    │
                ┌─────────┘    └──────────┐
                ▼                         ▼
         ┌──────────────┐          ┌──────────────┐
         │ MongoDB      │          │ Google       │
         │ Atlas        │          │ Gemini API   │
         └──────────────┘          └──────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- React Icons
- HTML2PDF.js

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- Multer
- PDF parsing
- Mammoth for DOCX text extraction

### Artificial Intelligence

- Google Gemini API
- `@google/generative-ai`

### Deployment

- **Frontend:** Netlify
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 📁 Project Structure

```text
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
```

> Update this structure if your actual folder or file names differ.

---

## ⚙️ Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) 18 or later
- Git
- MongoDB locally or a MongoDB Atlas database
- A Google Gemini API key

You can create a Gemini API key through [Google AI Studio](https://aistudio.google.com/).

---

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/pritivish07025/ResumeAI.git
cd ResumeAI
```

### 2. Configure and Run the Backend

```bash
cd server
npm install
```

Create a file named `.env` inside the `server` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume-ai
JWT_SECRET=replace_with_a_long_random_secret
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The backend API will be available at:

```text
http://localhost:5000/api
```

### 3. Configure and Run the Frontend

Open a second terminal:

```bash
cd client
npm install
```

Create a file named `.env` inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend: `server/.env`

| Variable | Purpose |
|---|---|
| `PORT` | Port used by the Express server |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `GEMINI_API_KEY` | Google Gemini API key |
| `GEMINI_MODEL` | Gemini model used for AI operations |
| `CLIENT_URL` | Frontend origin allowed by CORS |

### Frontend: `client/.env`

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend API base URL |

### Production Configuration

**Netlify frontend environment variable:**

```env
VITE_API_URL=https://resumeai-8ys4.onrender.com/api
```

**Render backend environment variable:**

```env
CLIENT_URL=https://resumea1.netlify.app
```

> `VITE_API_URL` must include `/api`.

> Never commit `.env`, `.env.local`, API keys, passwords, JWT secrets, or database credentials.

---

## 🔌 API Overview

Protected endpoints require the following header:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Authentication

| Method | Endpoint | Access |
|---|---|---|
| `POST` | `/api/auth/register` | Public |
| `POST` | `/api/auth/login` | Public |
| `GET` | `/api/auth/me` | Protected |

### Resume

| Method | Endpoint | Access |
|---|---|---|
| `POST` | `/api/resume/upload` | Protected |
| `GET` | `/api/resume` | Protected |
| `GET` | `/api/resume/:id` | Protected |
| `DELETE` | `/api/resume/:id` | Protected |

### Analysis

| Method | Endpoint | Access |
|---|---|---|
| `POST` | `/api/analysis/skill-gap` | Protected |
| `POST` | `/api/analysis/:id/interview-questions` | Protected |
| `POST` | `/api/analysis/:id/ats-resume` | Protected |
| `GET` | `/api/analysis` | Protected |
| `GET` | `/api/analysis/:id` | Protected |

### Builder and ATS APIs

Builder-related endpoints are available under:

```text
/api/builder
```

ATS-related endpoints are available under:

```text
/api/ats
```

> Refer to the route files in the `server/routes` directory for request bodies, parameters, and detailed endpoint behavior.

---

## 🧪 Health Check

### Local

```text
http://localhost:5000/api/health
```

### Production

```text
https://resumeai-8ys4.onrender.com/api/health
```

Expected response:

```json
{
  "status": "ok",
  "message": "Resume AI server is running"
}
```

---

## 🤝 Contributing

Contributions, bug reports, documentation improvements, and feature suggestions are welcome.

You do not need direct write access to contribute. Follow the workflow below.

### 1. Fork the Repository

Open the [ResumeAI repository](https://github.com/pritivish07025/ResumeAI) and click **Fork**.

### 2. Clone Your Fork

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git clone https://github.com/YOUR_USERNAME/ResumeAI.git
cd ResumeAI
```

### 3. Add the Original Repository as Upstream

```bash
git remote add upstream https://github.com/pritivish07025/ResumeAI.git
git remote -v
```

### 4. Create a Feature Branch

Do not work directly on `main`.

```bash
git checkout -b feature/your-feature-name
```

Examples:

```bash
git checkout -b feature/cover-letter-generator
git checkout -b fix/ats-score
git checkout -b docs/improve-readme
```

### 5. Install Dependencies

Backend:

```bash
cd server
npm install
```

Frontend:

```bash
cd ../client
npm install
```

### 6. Configure Environment Variables

Create local `.env` files using the provided `.env.example` files.

Never commit:

```text
.env
.env.local
```

### 7. Make and Test Your Changes

For frontend changes:

```bash
cd client
npm run build
```

For backend changes:

- Start the backend server.
- Verify `GET /api/health`.
- Test the endpoint or feature you changed.
- Check both frontend and backend logs for errors.

### 8. Commit Your Changes

```bash
git add .
git commit -m "feat: describe your change"
```

Recommended commit prefixes:

| Prefix | Use |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation change |
| `refactor:` | Code restructuring |
| `style:` | UI or formatting changes |
| `test:` | Tests |
| `chore:` | Maintenance |

### 9. Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 10. Open a Pull Request

Create a pull request from your fork to:

```text
pritivish07025/ResumeAI
```

Include:

- What changed
- Why the change was needed
- How the change was tested
- Screenshots for UI changes
- API examples for API changes

### Keep Your Fork Updated

Before starting new work:

```bash
git checkout main
git fetch upstream
git merge upstream/main
```

Then create a new branch:

```bash
git checkout -b feature/new-feature
```

---

## 🐛 Bug Reports

Before opening an issue:

1. Search existing issues.
2. Confirm that the problem still exists.
3. Check the browser console.
4. Check backend logs.
5. Prepare clear reproduction steps.

Include the following information:

```text
Expected behavior:
Actual behavior:
Steps to reproduce:
Browser:
Operating system:
Node.js version:
Relevant error:
```

Never include:

- API keys
- Passwords
- JWT tokens
- MongoDB credentials
- `.env` contents
- Private user data

---

## 🔒 Security

ResumeAI includes or is designed around the following security measures:

- JWT-based authentication
- Protected routes
- Password hashing
- CORS configuration
- Environment-based secret management
- User-specific data access
- Temporary uploaded-file cleanup

If a secret is accidentally exposed, rotate or revoke it immediately and update the deployment environment.

---

## ⚠️ Limitations

- Gemini responses depend on API availability and the configured model.
- AI usage may be subject to quotas and rate limits.
- ATS scores are estimates and may differ between ATS providers.
- Resume parsing quality can vary depending on document formatting.
- AI-generated content should be reviewed before submission.
- The application must not be used to fabricate qualifications, skills, or experience.

---

## 🗺️ Roadmap

- [ ] Multiple resume templates
- [ ] Cover letter generator
- [ ] Resume version history
- [ ] Job application tracker
- [ ] LinkedIn profile optimization
- [ ] AI mock interviews
- [ ] Voice-based interview practice
- [ ] Advanced ATS scoring
- [ ] Resume analytics
- [ ] Rate limiting
- [ ] Redis caching
- [ ] Automated tests
- [ ] CI/CD pipeline
- [ ] Accessibility improvements

---

## 👩‍💻 Author

**Priti Vishwakarma**

B.Tech Computer Science Engineering  
Kashi Institute of Technology

- **GitHub:** https://github.com/pritivish07025
- **LinkedIn:** https://www.linkedin.com/in/priti-vishwakarma-279118304/
- **LeetCode:** https://leetcode.com/u/pritivishwakarma25/

---

## ⭐ Support the Project

If you find ResumeAI useful:

- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest improvements
- 🤝 Submit a pull request
- 📖 Improve the documentation

---

## 📄 License

This project is currently intended for educational, learning, and portfolio purposes.
