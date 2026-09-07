# ResumeAI — AI Resume Analyzer, Skill Gap Detector & Interview Prep

A full-stack MERN application that lets users:
- Upload a resume (PDF/DOCX)
- Paste a job description
- Get an AI-generated match score, matched/missing skills, and recommendations
- Generate tailored interview questions
- Generate an ATS-optimized, rewritten resume

**Stack:** MongoDB, Express, React (Vite), Node.js, Tailwind CSS, Google Gemini API (`@google/generative-ai`)

---

## Project Structure

```
resume-ai-project/
├── server/                 # Express + MongoDB + Gemini backend
│   ├── config/db.js
│   ├── models/              # User, Resume, Analysis (Mongoose schemas)
│   ├── middleware/          # JWT auth guard, multer upload
│   ├── utils/                # Gemini prompts + PDF/DOCX text extraction
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── .env
└── client/                 # React + Vite + Tailwind frontend
    ├── src/
    │   ├── api/axios.js      # Axios instance with JWT interceptor
    │   ├── context/AuthContext.jsx
    │   ├── components/       # Navbar, ProtectedRoute
    │   ├── pages/             # Home, Login, Register, Dashboard, UploadResume, JobAnalysis, SkillGap (Results)
    │   ├── App.jsx
    │   └── main.jsx
    └── .env
```

## Prerequisites

- Node.js 18+
- MongoDB (local install or a free MongoDB Atlas cluster)
- A Google Gemini API key — get one free at https://aistudio.google.com/app/apikey

## 1. Backend Setup

```bash
cd server
npm install
cp .env
```

Edit `.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume-ai
JWT_SECRET=some_long_random_string
GEMINI_API_KEY=your_google_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
CLIENT_URL=http://localhost:5173
```

Run the server:

```bash
npm run dev
```

The API will be live at `http://localhost:5000/api`. Check `http://localhost:5000/api/health`.

## 2. Frontend Setup

```bash
cd client
npm install
cp  .env
```

Edit `.env` if needed (defaults already match the backend):

```
VITE_API_URL=http://localhost:5000/api
```

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:5173`.

## How It Works

1. **Register/Login** — JWT-based auth, tokens stored in `localStorage`.
2. **Upload Resume** — PDF/DOCX is parsed server-side (`pdf-parse` / `mammoth`) into plain text and saved to MongoDB.
3. **Analyze** — Paste a job description; the backend sends the resume text + job description to Gemini, which returns a structured JSON: match score, matched skills, missing skills, and recommendations.
4. **Interview Questions** — On demand, Gemini generates 10 tailored questions (technical/behavioral/situational) based on the same resume + JD.
5. **ATS Resume** — On demand, Gemini rewrites the resume in Markdown, optimized for ATS parsing and tailored to the job description, without inventing new facts.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in, returns JWT |
| GET  | `/api/auth/me` | Get current user (protected) |
| POST | `/api/resume/upload` | Upload + parse a resume (multipart/form-data, field `resume`) |
| GET  | `/api/resume` | List your resumes |
| GET  | `/api/resume/:id` | Get one resume |
| DELETE | `/api/resume/:id` | Delete a resume |
| POST | `/api/analysis/skill-gap` | Run skill-gap analysis `{ resumeId, jobDescription }` |
| POST | `/api/analysis/:id/interview-questions` | Generate interview questions for an analysis |
| POST | `/api/analysis/:id/ats-resume` | Generate ATS-optimized resume for an analysis |
| GET  | `/api/analysis` | List your analyses |
| GET  | `/api/analysis/:id` | Get one analysis |

## Notes & Next Steps

- Gemini responses are prompted to return strict JSON; `utils/gemini.js` includes a fallback parser in case the model wraps the JSON in markdown fences.
- Uploaded files are deleted from disk right after text extraction — only the extracted text is stored in MongoDB.
- To deploy: host the backend (Render/Railway/EC2), use MongoDB Atlas, and deploy the frontend (Vercel/Netlify) with `VITE_API_URL` pointed at your live backend URL.
- Consider adding rate limiting on the analysis routes since each call consumes Gemini API quota.

## New Resume Builder + ATS module

This version adds:
- `/builder` — Jake's Resume style, single-column resume builder.
- Clickable GitHub, LinkedIn, LeetCode and portfolio links in the LaTeX source.
- Download `.tex` and copy LaTeX source.
- `/ats` — PDF/DOCX ATS compatibility checker with practical checks and optional job-description keyword matching.
- Existing job-match, skill-gap, interview-question and ATS-rewrite flows remain available.

### Setup

Server `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume-ai
JWT_SECRET=replace_with_a_long_random_secret
GEMINI_API_KEY=your_key
GEMINI_MODEL=gemini-2.5-flash
CLIENT_URL=http://localhost:5173
```

Install:
```bash
cd server
npm install
npm run dev
```

In another terminal:
```bash
cd client
npm install
npm run dev
```

If you want one-click PDF generation, the client uses `html2pdf.js`. If the package is unavailable, the Download PDF button falls back to the browser print dialog where you can choose Save as PDF.

Reference inspirations:
- Overleaf Jake's Resume: https://www.overleaf.com/latex/templates/jakes-resume-anonymous/cstpnrbkhndn
- Kickresume ATS Checker: https://www.kickresume.com/en/ats-resume-checker/
