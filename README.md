````markdown
# 🚀 ResumeAI — AI Resume Analyzer, Skill Gap Detector & Interview Prep

> **Intelligent Resume Analysis, Skill Gap Detection & Interview Preparation Platform**

## 🎯 Live Demo

- **🌐 Frontend:** [https://resumea1.netlify.app](https://resumea1.netlify.app)
- **🔗 Backend API:** [https://resumeai-8ys4.onrender.com/api](https://resumeai-8ys4.onrender.com/api)
- **✅ Health Check:** [https://resumeai-8ys4.onrender.com/api/health](https://resumeai-8ys4.onrender.com/api/health)

### Quick Start
1. Visit [https://resumea1.netlify.app](https://resumea1.netlify.app)
2. Click **"Get Started"** → Register with email
3. Upload your resume (PDF/DOCX)
4. Paste a job description
5. Get AI-powered analysis instantly! 🚀

---

## ✨ Features

A full-stack MERN application that lets users:
- ✅ Upload a resume (PDF/DOCX)
- ✅ Paste a job description
- ✅ Get an AI-generated match score, matched/missing skills, and recommendations
- ✅ Generate tailored interview questions
- ✅ Generate an ATS-optimized, rewritten resume
- ✅ Build resumes with LaTeX templates
- ✅ Check ATS compatibility

**Stack:** MongoDB, Express, React (Vite), Node.js, Tailwind CSS, Google Gemini API (`@google/generative-ai`)

---

## 📋 Project Structure

```
ResumeAI/
├── server/                          # Express + MongoDB + Gemini backend
│   ├── config/db.js                 # MongoDB connection
│   ├── models/                      # User, Resume, Analysis (Mongoose schemas)
│   ├── middleware/                  # JWT auth guard, multer upload
│   ├── utils/                       # Gemini prompts + PDF/DOCX text extraction
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── .env
└── client/                          # React + Vite + Tailwind frontend
    ├── src/
    │   ├── api/axios.js             # Axios instance with JWT interceptor
    │   ├── context/AuthContext.jsx  # Auth state management
    │   ├── components/              # Navbar, ProtectedRoute
    │   ├── pages/                   # Home, Login, Register, Dashboard, UploadResume, JobAnalysis, SkillGap (Results)
    │   ├── App.jsx
    │   └── main.jsx
    └── .env
```

---

## 📋 Prerequisites

- Node.js 18+
- MongoDB (local install or free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)
- Google Gemini API key — [get free here](https://aistudio.google.com/app/apikey)

---

## 🚀 Getting Started (Local Development)

### 1. Backend Setup

```bash
cd server
npm install
```

**Create `.env` file:**

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume-ai
JWT_SECRET=some_long_random_string
GEMINI_API_KEY=your_google_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
CLIENT_URL=http://localhost:5173
```

**Run the server:**

```bash
npm run dev
```

✅ API will be live at `http://localhost:5000/api`  
✅ Health check: `http://localhost:5000/api/health`

---

### 2. Frontend Setup

```bash
cd client
npm install
```

**Create `.env` file:**

```
VITE_API_URL=http://localhost:5000/api
```

**Run the dev server:**

```bash
npm run dev
```

✅ Visit `http://localhost:5173`

---

## 🌐 Production Deployment

### Backend (Render)
1. Deploy on [Render](https://render.com)
2. Set environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   CLIENT_URL=https://resumea1.netlify.app
   ```

### Frontend (Netlify)
1. Deploy on [Netlify](https://netlify.com)
2. Set environment variables:
   ```
   VITE_API_URL=https://resumeai-8ys4.onrender.com/api
   ```

---

## 📖 How It Works

1. **Register/Login** — JWT-based auth, tokens stored in `localStorage`.
2. **Upload Resume** — PDF/DOCX is parsed server-side (`pdf-parse` / `mammoth`) into plain text and saved to MongoDB.
3. **Analyze** — Paste a job description; the backend sends the resume text + job description to Gemini, which returns a structured JSON: match score, matched skills, missing skills, and recommendations.
4. **Interview Questions** — On demand, Gemini generates 10 tailored questions (technical/behavioral/situational) based on the same resume + JD.
5. **ATS Resume** — On demand, Gemini rewrites the resume in Markdown, optimized for ATS parsing and tailored to the job description, without inventing new facts.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in, returns JWT |
| GET | `/api/auth/me` | Get current user (protected) |
| POST | `/api/resume/upload` | Upload + parse a resume |
| GET | `/api/resume` | List your resumes |
| GET | `/api/resume/:id` | Get one resume |
| DELETE | `/api/resume/:id` | Delete a resume |
| POST | `/api/analysis/skill-gap` | Run skill-gap analysis |
| POST | `/api/analysis/:id/interview-questions` | Generate interview questions |
| POST | `/api/analysis/:id/ats-resume` | Generate ATS-optimized resume |
| GET | `/api/analysis` | List your analyses |
| GET | `/api/analysis/:id` | Get one analysis |

---

## ✨ Features Breakdown

### Resume Builder + ATS Module

This version includes:
- `/builder` — Jake's Resume style, single-column resume builder
- Clickable GitHub, LinkedIn, LeetCode and portfolio links
- Download `.tex` and copy LaTeX source
- `/ats` — PDF/DOCX ATS compatibility checker
- Existing job-match, skill-gap, interview-question and ATS-rewrite flows

---

## 🔧 Configuration

### Environment Variables

**Backend (`server/.env`):**
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-ai
JWT_SECRET=your_super_secret_jwt_key_at_least_32_chars
GEMINI_API_KEY=AIzaSy...your_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash
CLIENT_URL=https://resumea1.netlify.app
```

**Frontend (`client/.env`):**
```env
VITE_API_URL=https://resumeai-8ys4.onrender.com/api
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check `MONGO_URI` in `.env`
- Verify MongoDB Atlas IP whitelist includes your IP
- Ensure MongoDB service is running

### E11000 Duplicate Key Error
- Server automatically drops problematic indexes on startup
- If issue persists, drop index manually: `db.users.dropIndex("username_1")`

### CORS Error
- Verify `CLIENT_URL` in backend `.env` matches frontend URL
- Ensure both URLs have `https://` in production
- Restart backend server

### API 404 Error
- Verify `VITE_API_URL` environment variable is set in Netlify
- Check API URL matches your Render backend URL
- Redeploy frontend after updating environment variables

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Priti Vishwakarma**
- GitHub: [@pritivish07025](https://github.com/pritivish07025)

---

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google.dev/) for AI capabilities
- [Jake's Resume Template](https://www.overleaf.com/latex/templates/jakes-resume-anonymous/cstpnrbkhndn)
- [Kickresume](https://www.kickresume.com/) for ATS checker concepts

---

## 📞 Support

For issues:
1. Check [Troubleshooting](#-troubleshooting) section
2. Search [GitHub Issues](https://github.com/pritivish07025/ResumeAI/issues)
3. Create new issue with detailed description

---

**Made with ❤️ for career growth**

````
