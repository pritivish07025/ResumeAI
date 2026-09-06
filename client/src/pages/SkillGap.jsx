import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import api from "../api/axios.js";
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineLightBulb,
  HiOutlineQuestionMarkCircle,
  HiOutlineDocumentDuplicate,
  HiOutlineClipboardCopy,
  HiOutlineRefresh,
} from "react-icons/hi";

const TABS = [
  { id: "overview", label: "Skill Gap" },
  { id: "interview", label: "Interview Questions" },
  { id: "ats", label: "ATS Resume" },
];

const ScoreRing = ({ score = 0 }) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  let color = "#ef4444";
  if (score >= 80) color = "#22c55e";
  else if (score >= 50) color = "#eab308";

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={radius} stroke="#e2e8f0" strokeWidth="10" fill="none" />
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke={color}
        strokeWidth="10"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="66" textAnchor="middle" fontSize="24" fontWeight="700" fill="#1e293b">
        {score}%
      </text>
    </svg>
  );
};

const DifficultyBadge = ({ level }) => {
  const styles = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles[level] || "bg-slate-100 text-slate-600"}`}>
      {level || "N/A"}
    </span>
  );
};

const Results = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchAnalysis = async () => {
    try {
      const { data } = await api.get(`/analysis/${id}`);
      setAnalysis(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load analysis");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleGenerateInterviewQuestions = async () => {
    setActionLoading(true);
    setError("");
    try {
      const { data } = await api.post(`/analysis/${id}/interview-questions`);
      setAnalysis(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate interview questions");
    } finally {
      setActionLoading(false);
    }
  };

  const handleGenerateAtsResume = async () => {
    setActionLoading(true);
    setError("");
    try {
      const { data } = await api.post(`/analysis/${id}/ats-resume`);
      setAnalysis(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate ATS resume");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCopyAtsResume = () => {
    if (!analysis?.atsResume) return;
    navigator.clipboard.writeText(analysis.atsResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-400">Loading analysis...</div>;
  }

  if (error && !analysis) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          {analysis.resume?.originalFileName || "Analysis Results"}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Generated {new Date(analysis.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="flex gap-2 border-b border-slate-200 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition ${
              activeTab === tab.id
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-6">{error}</div>}

      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col sm:flex-row items-center gap-6">
            <ScoreRing score={analysis.matchScore || 0} />
            <div>
              <h2 className="font-semibold text-slate-800 text-lg">Overall Match Score</h2>
              <p className="text-slate-500 text-sm mt-1 max-w-md">
                This score reflects how well your resume aligns with the job description based on
                skills, keywords, and experience.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                <HiOutlineCheckCircle className="text-green-500 text-xl" /> Matched Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.matchedSkills?.length ? (
                  analysis.matchedSkills.map((skill, i) => (
                    <span key={i} className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No matched skills found.</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                <HiOutlineXCircle className="text-red-500 text-xl" /> Missing Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills?.length ? (
                  analysis.missingSkills.map((skill, i) => (
                    <span key={i} className="bg-red-50 text-red-700 text-xs font-medium px-3 py-1.5 rounded-full">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No missing skills detected. Great fit!</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
              <HiOutlineLightBulb className="text-yellow-500 text-xl" /> Recommendations
            </h3>
            <ul className="space-y-2">
              {analysis.recommendations?.map((rec, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-primary-600 font-bold">{i + 1}.</span> {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === "interview" && (
        <div>
          {!analysis.interviewQuestions || analysis.interviewQuestions.length === 0 ? (
            <div className="text-center bg-white border border-dashed border-slate-300 rounded-2xl p-10">
              <HiOutlineQuestionMarkCircle className="text-4xl text-primary-500 mx-auto mb-3" />
              <p className="text-slate-600 mb-4">
                Generate 10 tailored interview questions based on this resume and job description.
              </p>
              <button
                onClick={handleGenerateInterviewQuestions}
                disabled={actionLoading}
                className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
              >
                {actionLoading ? "Generating..." : "Generate Interview Questions"}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleGenerateInterviewQuestions}
                  disabled={actionLoading}
                  className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline disabled:opacity-50"
                >
                  <HiOutlineRefresh /> {actionLoading ? "Regenerating..." : "Regenerate"}
                </button>
              </div>
              <div className="space-y-3">
                {analysis.interviewQuestions.map((q, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">
                        {q.category}
                      </span>
                      <DifficultyBadge level={q.difficulty} />
                    </div>
                    <p className="text-slate-800 text-sm font-medium">
                      {i + 1}. {q.question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "ats" && (
        <div>
          {!analysis.atsResume ? (
            <div className="text-center bg-white border border-dashed border-slate-300 rounded-2xl p-10">
              <HiOutlineDocumentDuplicate className="text-4xl text-primary-500 mx-auto mb-3" />
              <p className="text-slate-600 mb-4">
                Generate an ATS-optimized version of your resume, rewritten to match this job
                description.
              </p>
              <button
                onClick={handleGenerateAtsResume}
                disabled={actionLoading}
                className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
              >
                {actionLoading ? "Generating..." : "Generate ATS Resume"}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-end gap-3 mb-4">
                <button
                  onClick={handleCopyAtsResume}
                  className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline"
                >
                  <HiOutlineClipboardCopy /> {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
                <button
                  onClick={handleGenerateAtsResume}
                  disabled={actionLoading}
                  className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline disabled:opacity-50"
                >
                  <HiOutlineRefresh /> {actionLoading ? "Regenerating..." : "Regenerate"}
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 prose prose-sm max-w-none prose-headings:text-primary-700">
                <ReactMarkdown>{analysis.atsResume}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Results;
