import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UploadResume from "./pages/UploadResume.jsx";
import JobAnalysis from "./pages/JobAnalysis.jsx";
import Results from "./pages/SkillGap.jsx";
import ResumeBuilder from "./pages/ResumeBuilder.jsx";
import AtsChecker from "./pages/AtsChecker.jsx";

/*
  Common layout for authenticated pages.

  Sidebar width  = 262px
  Top navbar     = 72px

  This prevents the fixed sidebar/topbar from covering
  the page content.
*/
const ProtectedPage = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen md:ml-[262px] md:pt-[72px]">
        {children}
      </div>
    </ProtectedRoute>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-[#f7f7ff]">
      <Navbar />

      <Routes>
        {/* ================= PUBLIC PAGES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* ================= PROTECTED PAGES ================= */}

        {/* Dashboard already has its own sidebar offset */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Upload Resume */}
        <Route
          path="/upload"
          element={
            <ProtectedPage>
              <UploadResume />
            </ProtectedPage>
          }
        />

        {/* Job Analysis */}
        <Route
          path="/analyze/:resumeId"
          element={
            <ProtectedPage>
              <JobAnalysis />
            </ProtectedPage>
          }
        />

        {/* Skill Gap / Results */}
        <Route
          path="/results/:id"
          element={
            <ProtectedPage>
              <Results />
            </ProtectedPage>
          }
        />

        {/* Resume Builder */}
        <Route
          path="/builder"
          element={
            <ProtectedPage>
              <ResumeBuilder />
            </ProtectedPage>
          }
        />

        {/* ATS Checker */}
        <Route
          path="/ats"
          element={
            <ProtectedPage>
              <AtsChecker />
            </ProtectedPage>
          }
        />

        {/* ================= FALLBACK ================= */}

        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;