import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

import {
  HiOutlineUpload,
  HiOutlineDocumentSearch,
  HiOutlineChartBar,
  HiOutlineDocumentText,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineFolderOpen,
  HiOutlineSearch,
} from "react-icons/hi";

/* =========================================================
   SCORE BADGE
========================================================= */

const ScoreBadge = ({ score }) => {
  let classes = "bg-red-50 text-red-600";

  if (score >= 80) {
    classes = "bg-green-50 text-green-600";
  } else if (score >= 50) {
    classes = "bg-amber-50 text-amber-600";
  }

  return (
    <span
      className={`text-xs font-bold px-3 py-1.5 rounded-full ${classes}`}
    >
      {score}% match
    </span>
  );
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  type = "purple",
}) => {
  const styles = {
    purple: {
      background:
        "bg-gradient-to-br from-white via-[#FCF9FF] to-[#F4EAFF]",
      icon:
        "bg-gradient-to-br from-[#8B5CF6] to-[#6D4AFF] text-white",
      glow: "bg-[#A78BFA]/20",
      line: "from-[#8B5CF6] to-[#C084FC]",
    },

    teal: {
      background:
        "bg-gradient-to-br from-white via-[#F8FFFF] to-[#E8FBFC]",
      icon:
        "bg-gradient-to-br from-[#35C6D3] to-[#16A6B8] text-white",
      glow: "bg-[#67E8F9]/20",
      line: "from-[#22C1D6] to-[#67E8F9]",
    },

    pink: {
      background:
        "bg-gradient-to-br from-white via-[#FFF9FF] to-[#FBEFFF]",
      icon:
        "bg-gradient-to-br from-[#B65CFF] to-[#8B3DDB] text-white",
      glow: "bg-[#D8B4FE]/25",
      line: "from-[#A855F7] to-[#E879F9]",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`
        relative overflow-hidden
        ${style.background}
        border border-white
        rounded-[18px]
        p-6
        shadow-[0_8px_30px_rgba(76,29,149,0.07)]
        hover:-translate-y-1
        hover:shadow-[0_14px_35px_rgba(76,29,149,0.11)]
        transition-all duration-300
      `}
    >
      {/* Background glow */}
      <div
        className={`absolute -right-8 -bottom-10 w-32 h-32 rounded-full ${style.glow} blur-2xl`}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-[15px] font-medium text-[#53639B]">
            {title}
          </p>

          <p className="text-[38px] leading-none font-bold text-[#15184A] mt-3">
            {value}
          </p>

          <p className="text-xs text-[#6674A8] mt-4">
            {subtitle}
            <span className="ml-2 text-[#6D4AFF] font-bold">→</span>
          </p>
        </div>

        <div
          className={`
            w-12 h-12
            rounded-xl
            flex items-center justify-center
            ${style.icon}
            shadow-lg
          `}
        >
          <Icon className="text-2xl" />
        </div>
      </div>

      {/* Decorative icon */}
      <div className="absolute right-6 bottom-5 opacity-[0.08]">
        <Icon className="text-[72px] text-[#6D4AFF]" />
      </div>

      {/* Bottom gradient line */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-[3px]
          bg-gradient-to-r ${style.line}
          opacity-50
        `}
      />
    </div>
  );
};

/* =========================================================
   DASHBOARD
========================================================= */

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     FETCH DATA
  ======================================================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resumeRes, analysisRes] = await Promise.all([
          api.get("/resume"),
          api.get("/analysis"),
        ]);

        setResumes(resumeRes.data || []);
        setAnalyses(analysisRes.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =======================================================
     AVERAGE SCORE
  ======================================================= */

  const averageScore = analyses.length
    ? Math.round(
        analyses.reduce(
          (sum, item) => sum + (item.matchScore || 0),
          0
        ) / analyses.length
      )
    : 0;

  return (
    <div className="min-h-screen bg-[#F7F8FF] md:ml-[262px] md:pt-[76px]">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-7 lg:py-9">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

          {/* Heading */}

          <div>
            <h1 className="text-[30px] sm:text-[34px] font-bold text-[#17194B] tracking-tight">
              Welcome back, Priti! 👋
            </h1>

            <p className="text-[16px] text-[#59689E] mt-2">
              Manage your resumes and review your job-match analyses.
            </p>
          </div>

          {/* Actions */}

          <div className="flex flex-col sm:flex-row gap-3">

            <Link
              to="/builder"
              className="
                group
                flex items-center justify-center gap-2
                px-6 py-3.5
                rounded-xl
                bg-gradient-to-r from-[#6846E8] to-[#7E48E8]
                text-white
                font-semibold
                text-sm
                shadow-[0_8px_20px_rgba(109,74,255,0.28)]
                hover:shadow-[0_12px_25px_rgba(109,74,255,0.35)]
                hover:-translate-y-0.5
                transition-all
              "
            >
              <HiOutlineDocumentText className="text-xl" />

              Build My Resume

              <HiOutlineArrowRight className="text-lg group-hover:translate-x-1 transition" />
            </Link>

            <Link
              to="/upload"
              className="
                flex items-center justify-center gap-2
                px-6 py-3.5
                rounded-xl
                bg-white
                border border-[#CFC7FF]
                text-[#39309B]
                font-semibold
                text-sm
                hover:bg-[#F8F5FF]
                hover:border-[#AFA1FF]
                transition-all
              "
            >
              <HiOutlineUpload className="text-xl" />

              Upload Resume
            </Link>
          </div>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* =================================================
            STATS
        ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-7">

          <StatCard
            title="Resumes Uploaded"
            value={resumes.length}
            subtitle="Your uploaded resumes"
            icon={HiOutlineDocumentText}
            type="purple"
          />

          <StatCard
            title="Analyses Run"
            value={analyses.length}
            subtitle="Total job-match analyses"
            icon={HiOutlineChartBar}
            type="teal"
          />

          <StatCard
            title="Avg. Match Score"
            value={`${averageScore}%`}
            subtitle="Average job match score"
            icon={HiOutlineSparkles}
            type="pink"
          />

        </div>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* =================================================
              YOUR RESUMES
          ================================================= */}

          <div
            className="
              bg-white
              rounded-[18px]
              border border-[#E8E7F6]
              shadow-[0_8px_30px_rgba(38,31,100,0.05)]
              overflow-hidden
            "
          >

            {/* Card Header */}

            <div className="px-6 py-4 border-b border-[#EEEFF7] flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-[#F0EAFF] text-[#7652E9] flex items-center justify-center">
                  <HiOutlineDocumentText className="text-xl" />
                </div>

                <h2 className="font-bold text-[17px] text-[#17194B]">
                  Your Resumes
                </h2>

              </div>

              {resumes.length > 0 && (
                <Link
                  to="/upload"
                  className="flex items-center gap-1 text-sm font-semibold text-[#5540D4] hover:text-[#3927B5]"
                >
                  View All
                  <HiOutlineArrowRight />
                </Link>
              )}

            </div>

            {/* Card Content */}

            <div className="min-h-[300px]">

              {/* Loading */}

              {loading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="w-9 h-9 border-4 border-[#E7DEFF] border-t-[#7048E8] rounded-full animate-spin" />
                </div>
              ) : resumes.length === 0 ? (

                /* Empty State */

                <div className="flex flex-col items-center justify-center text-center px-6 py-12">

                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#FAF7FF] to-[#F1E9FF] flex items-center justify-center mb-5">

                    <div className="absolute inset-3 rounded-full bg-white/70" />

                    <HiOutlineFolderOpen className="relative text-[48px] text-[#8874EE]" />

                  </div>

                  <h3 className="font-bold text-[#17194B] text-[15px]">
                    No resumes uploaded yet.
                  </h3>

                  <p className="text-sm text-[#6674A8] max-w-sm mt-2 leading-6">
                    Upload your resume to get started with AI-powered
                    job matching and analysis.
                  </p>

                  <Link
                    to="/upload"
                    className="
                      mt-5
                      flex items-center gap-2
                      px-5 py-2.5
                      rounded-xl
                      bg-gradient-to-r from-[#6846E8] to-[#7E48E8]
                      text-white
                      text-sm
                      font-semibold
                      shadow-[0_7px_18px_rgba(109,74,255,0.25)]
                      hover:-translate-y-0.5
                      transition
                    "
                  >
                    <HiOutlineUpload />
                    Upload Resume
                  </Link>

                </div>

              ) : (

                /* Resume List */

                <div className="p-5 space-y-3">

                  {resumes.slice(0, 5).map((resume) => (
                    <div
                      key={resume._id}
                      className="
                        flex items-center justify-between gap-4
                        p-4
                        rounded-xl
                        bg-[#FAF8FF]
                        border border-[#EEE8FF]
                        hover:bg-[#F6F1FF]
                        hover:border-[#D9CEFF]
                        transition
                      "
                    >

                      <div className="flex items-center gap-3 min-w-0">

                        <div className="w-10 h-10 rounded-lg bg-white text-[#7652E9] flex items-center justify-center shadow-sm">
                          <HiOutlineDocumentText className="text-xl" />
                        </div>

                        <div className="min-w-0">

                          <p className="font-semibold text-sm text-[#17194B] truncate">
                            {resume.originalFileName}
                          </p>

                          <p className="text-xs text-[#8A93B3] mt-1">
                            {new Date(
                              resume.createdAt
                            ).toLocaleDateString()}
                          </p>

                        </div>
                      </div>

                      <Link
                        to={`/analyze/${resume._id}`}
                        className="shrink-0 text-[#6244D8] font-semibold text-sm hover:text-[#3927B5]"
                      >
                        Analyze →
                      </Link>

                    </div>
                  ))}

                </div>
              )}
            </div>
          </div>

          {/* =================================================
              RECENT ANALYSES
          ================================================= */}

          <div
            className="
              bg-white
              rounded-[18px]
              border border-[#E8E7F6]
              shadow-[0_8px_30px_rgba(38,31,100,0.05)]
              overflow-hidden
            "
          >

            {/* Header */}

            <div className="px-6 py-4 border-b border-[#EEEFF7] flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-[#EAFBFC] text-[#1AA7B7] flex items-center justify-center">
                  <HiOutlineChartBar className="text-xl" />
                </div>

                <h2 className="font-bold text-[17px] text-[#17194B]">
                  Recent Analyses
                </h2>

              </div>

              {analyses.length > 0 && (
                <span className="flex items-center gap-1 text-sm font-semibold text-[#5540D4]">
                  View All
                  <HiOutlineArrowRight />
                </span>
              )}

            </div>

            {/* Content */}

            <div className="min-h-[300px]">

              {loading ? (

                <div className="flex items-center justify-center h-[300px]">
                  <div className="w-9 h-9 border-4 border-[#D9F7F9] border-t-[#19A9B9] rounded-full animate-spin" />
                </div>

              ) : analyses.length === 0 ? (

                /* Empty State */

                <div className="flex flex-col items-center justify-center text-center px-6 py-12">

                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#F4FEFF] to-[#E5F9FA] flex items-center justify-center mb-5">

                    <div className="absolute inset-3 rounded-full bg-white/60" />

                    <HiOutlineSearch className="relative text-[46px] text-[#6BCED7]" />

                  </div>

                  <h3 className="font-bold text-[#17194B] text-[15px]">
                    No analyses yet.
                  </h3>

                  <p className="text-sm text-[#6674A8] max-w-sm mt-2 leading-6">
                    Upload a resume and run a job match to see your
                    results here.
                  </p>

                  <Link
                    to="/upload"
                    className="
                      mt-5
                      flex items-center gap-2
                      px-5 py-2.5
                      rounded-xl
                      bg-gradient-to-r from-[#1CAAB9] to-[#32C4CE]
                      text-white
                      text-sm
                      font-semibold
                      shadow-[0_7px_18px_rgba(28,170,185,0.22)]
                      hover:-translate-y-0.5
                      transition
                    "
                  >
                    <HiOutlineUpload />
                    Start Analysis
                  </Link>

                </div>

              ) : (

                /* Analysis List */

                <div className="p-5 space-y-3">

                  {analyses.slice(0, 5).map((analysis) => (
                    <Link
                      key={analysis._id}
                      to={`/results/${analysis._id}`}
                      className="
                        block
                        p-4
                        rounded-xl
                        bg-[#FAFBFF]
                        border border-[#ECEEF7]
                        hover:bg-[#F8F4FF]
                        hover:border-[#D9CEFF]
                        transition
                      "
                    >

                      <div className="flex items-center justify-between gap-3">

                        <p className="font-semibold text-sm text-[#17194B] truncate">
                          {analysis.resume?.originalFileName ||
                            "Resume"}
                        </p>

                        <ScoreBadge
                          score={analysis.matchScore || 0}
                        />

                      </div>

                      <p className="text-xs text-[#8A93B3] mt-2">
                        {new Date(
                          analysis.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </Link>
                  ))}

                </div>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <div
          className="
            relative
            overflow-hidden
            mt-7
            rounded-[18px]
            bg-gradient-to-r from-[#211957] via-[#30206F] to-[#47257A]
            px-7 py-7 sm:px-10 sm:py-8
            text-white
            shadow-[0_12px_35px_rgba(43,30,105,0.18)]
          "
        >

          {/* Background glows */}

          <div className="absolute -right-16 -top-24 w-72 h-72 rounded-full bg-[#9B6CFF]/20 blur-3xl" />

          <div className="absolute right-[25%] -bottom-28 w-60 h-60 rounded-full bg-[#E879F9]/10 blur-3xl" />

          {/* Decorative circles */}

          <div className="absolute right-20 top-8 w-3 h-3 rounded-full bg-[#C084FC]/70" />

          <div className="absolute right-36 top-20 w-2 h-2 rounded-full bg-[#67E8F9]/70" />

          <div className="absolute right-12 bottom-12 w-2 h-2 rounded-full bg-[#F0ABFC]/70" />

          {/* Content */}

          <div className="relative z-10 max-w-[650px]">

            <div className="flex items-center gap-2 text-[#D8C8FF] mb-3">

              <HiOutlineSparkles className="text-xl" />

              <span className="text-xs sm:text-sm font-semibold tracking-wide">
                AI-POWERED RESUME BUILDER
              </span>

            </div>

            <h2 className="text-2xl sm:text-[27px] font-bold">
              Ready to improve your resume?
            </h2>

            <p className="text-[#DDD7F4] mt-2.5 text-sm sm:text-[15px] leading-6 max-w-xl">
              Create an ATS-friendly resume and increase your chances
              of getting shortlisted.
            </p>

            <Link
              to="/builder"
              className="
                inline-flex items-center gap-2
                mt-5
                px-6 py-3
                rounded-xl
                bg-gradient-to-r from-[#7351E9] to-[#9655E8]
                text-white
                font-bold
                text-sm
                shadow-lg shadow-black/20
                hover:-translate-y-0.5
                transition
              "
            >
              Build My Resume
              <HiOutlineArrowRight />
            </Link>

          </div>

          {/* Right side decorative resume */}

          <div className="hidden lg:block absolute right-16 bottom-5 opacity-20">

            <div className="relative w-36 h-44">

              <div className="absolute inset-0 rounded-xl border-2 border-white/60 rotate-6" />

              <div className="absolute inset-2 rounded-xl border border-white/50 bg-white/5 -rotate-3" />

              <div className="absolute inset-5 rounded-lg bg-white/10 backdrop-blur-sm p-4">

                <div className="w-12 h-2 bg-white rounded mb-3" />

                <div className="w-full h-1.5 bg-white/70 rounded mb-2" />
                <div className="w-4/5 h-1.5 bg-white/50 rounded mb-2" />
                <div className="w-full h-1.5 bg-white/40 rounded mb-5" />

                <div className="w-10 h-10 rounded-full border-2 border-white/60 mx-auto" />

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;