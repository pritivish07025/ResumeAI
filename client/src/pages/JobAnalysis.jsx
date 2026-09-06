import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { HiOutlineSparkles } from "react-icons/hi";

const JobAnalysis = () => {
  const { resumeId } = useParams();
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (jobDescription.trim().length < 30) {
      setError("Please paste a fuller job description (at least 30 characters).");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/analysis/skill-gap", {
        resumeId,
        jobDescription,
      });
      navigate(`/results/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Paste the Job Description</h1>
      <p className="text-slate-500 text-sm mb-8">
        We'll compare it against your resume to calculate a match score, detect skill gaps, and give
        you tailored recommendations.
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={14}
          placeholder="Paste the full job description here..."
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none"
        />

        <p className="text-xs text-slate-400 mt-1 text-right">{jobDescription.length} characters</p>

        {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mt-2">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
        >
          <HiOutlineSparkles />
          {loading ? "Analyzing with AI..." : "Analyze Skill Gap"}
        </button>
      </form>
    </div>
  );
};

export default JobAnalysis;
