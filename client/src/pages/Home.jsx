import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import {
  HiOutlineUpload,
  HiOutlineChartBar,
  HiOutlineChatAlt2,
  HiOutlineDocumentDuplicate,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineSearch,
  HiOutlinePlay,
  HiOutlineCheck,
  HiOutlineLightningBolt,
  HiOutlineCloudUpload,
} from "react-icons/hi";

/* =========================================================
   FEATURES
========================================================= */

const features = [
  {
    icon: HiOutlineDocumentDuplicate,
    title: "AI Resume Builder",
    desc: "Create professional, ATS-friendly resumes in minutes with our AI-powered builder.",
    iconBg: "bg-[#EEE9FF]",
    iconColor: "text-[#6846E8]",
  },
  {
    icon: HiOutlineSearch,
    title: "Job Analysis",
    desc: "Match your resume with any job description and get personalized insights.",
    iconBg: "bg-[#E8F9FF]",
    iconColor: "text-[#159BB8]",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "ATS Checker",
    desc: "Check your ATS score and get actionable tips to improve your chances.",
    iconBg: "bg-[#E9FBF2]",
    iconColor: "text-[#16A66A]",
  },
  {
    icon: HiOutlineChartBar,
    title: "Skill Gap Analysis",
    desc: "Discover missing skills and get recommendations to become job-ready.",
    iconBg: "bg-[#FFF2E5]",
    iconColor: "text-[#F08A24]",
  },
  {
    icon: HiOutlineCloudUpload,
    title: "Easy Upload",
    desc: "Upload your existing resume and let our AI do the rest.",
    iconBg: "bg-[#F0EBFF]",
    iconColor: "text-[#7048E8]",
  },
];

/* =========================================================
   CHECK ITEM
========================================================= */

const CheckItem = ({ children }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-[#4D5B91]">
      <span className="w-5 h-5 rounded-full bg-[#E9E3FF] flex items-center justify-center">
        <HiOutlineCheck className="text-[#6846E8] text-sm" />
      </span>

      <span>{children}</span>
    </div>
  );
};

/* =========================================================
   RESUME MOCKUP
========================================================= */

const ResumeMockup = () => {
  return (
    <div className="relative w-full max-w-[560px] mx-auto h-[470px] sm:h-[520px]">

      {/* Background glow */}

      <div className="absolute w-[360px] h-[360px] bg-[#B9A7FF]/30 rounded-full blur-3xl top-12 left-1/2 -translate-x-1/2" />

      {/* Decorative stars */}

      <div className="absolute top-12 left-8 text-[#7452E8] animate-pulse">
        <HiOutlineSparkles className="text-3xl" />
      </div>

      <div className="absolute top-28 right-8 text-[#7452E8]">
        <HiOutlineSparkles className="text-xl" />
      </div>

      <div className="absolute bottom-16 right-14 text-[#8E6AF2]">
        <HiOutlineSparkles className="text-2xl" />
      </div>

      {/* Resume */}

      <div
        className="
          absolute
          top-8
          left-1/2
          -translate-x-1/2
          w-[285px]
          sm:w-[330px]
          h-[420px]
          sm:h-[460px]
          bg-white
          rounded-2xl
          shadow-[0_25px_70px_rgba(70,50,150,0.18)]
          border border-[#E8E4FA]
          rotate-[2deg]
          overflow-hidden
        "
      >
        {/* Resume header */}

        <div className="p-6 pb-4">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E9E1FF] to-[#D8CCFF] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#7654E8]" />
            </div>

            <div>
              <div className="h-4 w-28 bg-[#172052] rounded mb-2" />
              <div className="h-2 w-20 bg-[#B0B7CF] rounded" />
            </div>

          </div>

          <div className="flex gap-2 mt-4">
            <div className="h-2 w-16 bg-[#A9B0C7] rounded" />
            <div className="h-2 w-20 bg-[#A9B0C7] rounded" />
            <div className="h-2 w-16 bg-[#A9B0C7] rounded" />
          </div>

        </div>

        {/* Summary */}

        <div className="px-6">

          <div className="h-2 w-20 bg-[#7654E8] rounded mb-3" />

          <div className="space-y-2">
            <div className="h-2 w-full bg-[#E3E5EE] rounded" />
            <div className="h-2 w-[92%] bg-[#E3E5EE] rounded" />
            <div className="h-2 w-[78%] bg-[#E3E5EE] rounded" />
          </div>

        </div>

        {/* Experience */}

        <div className="px-6 mt-6">

          <div className="h-2 w-24 bg-[#7654E8] rounded mb-3" />

          <div className="flex gap-3">

            <div className="w-2 h-2 rounded-full bg-[#7654E8] mt-1" />

            <div className="flex-1 space-y-2">
              <div className="h-2 w-[65%] bg-[#4E577A] rounded" />
              <div className="h-2 w-full bg-[#E3E5EE] rounded" />
              <div className="h-2 w-[90%] bg-[#E3E5EE] rounded" />
              <div className="h-2 w-[70%] bg-[#E3E5EE] rounded" />
            </div>

          </div>

        </div>

        {/* Education */}

        <div className="px-6 mt-6">

          <div className="h-2 w-20 bg-[#7654E8] rounded mb-3" />

          <div className="space-y-2">
            <div className="h-2 w-[70%] bg-[#4E577A] rounded" />
            <div className="h-2 w-[85%] bg-[#E3E5EE] rounded" />
            <div className="h-2 w-[60%] bg-[#E3E5EE] rounded" />
          </div>

        </div>

      </div>

      {/* AI Suggestions card */}

      <div
        className="
          absolute
          left-0
          sm:left-[-20px]
          top-[250px]
          w-[190px]
          bg-white
          rounded-2xl
          p-4
          shadow-[0_18px_50px_rgba(67,47,150,0.16)]
          border border-[#EAE6FA]
          z-20
        "
      >

        <div className="flex items-center gap-2 mb-4">

          <div className="w-8 h-8 rounded-lg bg-[#EEE8FF] flex items-center justify-center">
            <HiOutlineSparkles className="text-[#7048E8] text-lg" />
          </div>

          <p className="text-xs font-bold text-[#182052]">
            AI Suggestions
          </p>

        </div>

        <div className="space-y-3">

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#E8F9EF] flex items-center justify-center">
              <HiOutlineCheck className="text-[#17A568] text-[10px]" />
            </span>

            <span className="text-[10px] text-[#68749A]">
              Add more action verbs
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#E8F9EF] flex items-center justify-center">
              <HiOutlineCheck className="text-[#17A568] text-[10px]" />
            </span>

            <span className="text-[10px] text-[#68749A]">
              Include relevant keywords
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#E8F9EF] flex items-center justify-center">
              <HiOutlineCheck className="text-[#17A568] text-[10px]" />
            </span>

            <span className="text-[10px] text-[#68749A]">
              Improve skills section
            </span>
          </div>

        </div>

      </div>

      {/* ATS Score card */}

      <div
        className="
          absolute
          right-0
          sm:right-[-10px]
          top-[100px]
          w-[155px]
          bg-white
          rounded-2xl
          p-4
          shadow-[0_18px_50px_rgba(67,47,150,0.16)]
          border border-[#EAE6FA]
          z-20
        "
      >

        <div className="flex items-center gap-2">

          <HiOutlineSparkles className="text-[#7048E8] text-lg" />

          <p className="text-xs font-bold text-[#1A2454]">
            ATS Score
          </p>

        </div>

        {/* Circle */}

        <div className="flex justify-center py-4">

          <div
            className="
              w-24 h-24
              rounded-full
              flex items-center justify-center
              relative
              bg-[conic-gradient(#19B98B_0deg_331deg,#E7EAF3_331deg_360deg)]
            "
          >

            <div className="w-[76px] h-[76px] bg-white rounded-full flex flex-col items-center justify-center">

              <span className="text-2xl font-bold text-[#172052]">
                92%
              </span>

            </div>

          </div>

        </div>

        <div className="space-y-2">

          <div className="flex items-center gap-2">
            <HiOutlineCheck className="text-[#17A568]" />
            <span className="text-[10px] text-[#66749B]">
              Keywords Match
            </span>
          </div>

          <div className="flex items-center gap-2">
            <HiOutlineCheck className="text-[#17A568]" />
            <span className="text-[10px] text-[#66749B]">
              Skills Match
            </span>
          </div>

          <div className="flex items-center gap-2">
            <HiOutlineCheck className="text-[#17A568]" />
            <span className="text-[10px] text-[#66749B]">
              Formatting
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

/* =========================================================
   HOME
========================================================= */

const Home = () => {

  const { user } = useAuth();

  const getStartedLink = user ? "/builder" : "/register";

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          bg-gradient-to-br
          from-white
          via-[#FAF9FF]
          to-[#F2EEFF]
          overflow-hidden
        "
      >

        {/* Background decoration */}

        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#BCA9FF]/20 blur-3xl" />

        <div className="absolute top-[300px] -left-40 w-[400px] h-[400px] rounded-full bg-[#D8CEFF]/25 blur-3xl" />

        <div
          className="
            relative
            max-w-[1180px]
            mx-auto
            px-5
            sm:px-8
            pt-14
            sm:pt-20
            pb-10
            lg:pb-16
          "
        >

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="text-center lg:text-left">

              {/* Badge */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-[#EEE9FF]
                  border border-[#DED5FF]
                  text-[#6745DF]
                  text-xs
                  sm:text-sm
                  font-semibold
                "
              >

                <HiOutlineSparkles className="text-lg" />

                AI-Powered Resume Builder & Analyzer

              </div>

              {/* Heading */}

              <h1
                className="
                  mt-6
                  text-[42px]
                  sm:text-[52px]
                  lg:text-[58px]
                  xl:text-[62px]
                  leading-[1.04]
                  font-extrabold
                  tracking-[-2px]
                  text-[#172052]
                "
              >
                Build Your Dream
                <br />

                Resume with{" "}

                <span
                  className="
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-[#6846E8]
                    via-[#7949F0]
                    to-[#A64FEA]
                  "
                >
                  AI
                </span>
              </h1>

              {/* Description */}

              <p
                className="
                  mt-6
                  text-[16px]
                  sm:text-[18px]
                  leading-7
                  text-[#5B6896]
                  max-w-[590px]
                  mx-auto
                  lg:mx-0
                "
              >
                Create ATS-friendly resumes, analyze your profile,
                find skill gaps and get personalized recommendations
                — all in one place.
              </p>

              {/* Check points */}

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  justify-center
                  lg:justify-start
                  gap-x-6
                  gap-y-3
                "
              >

                <CheckItem>ATS Optimized</CheckItem>
                <CheckItem>AI Powered</CheckItem>
                <CheckItem>Free to Start</CheckItem>

              </div>

              {/* Buttons */}

              <div
                className="
                  mt-8
                  flex
                  flex-col
                  sm:flex-row
                  justify-center
                  lg:justify-start
                  gap-3
                "
              >

                <Link
                  to={getStartedLink}
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-7
                    py-3.5
                    rounded-xl
                    bg-gradient-to-r
                    from-[#6846E8]
                    to-[#7D48EA]
                    text-white
                    font-bold
                    shadow-[0_10px_25px_rgba(104,70,232,0.28)]
                    hover:shadow-[0_14px_30px_rgba(104,70,232,0.38)]
                    hover:-translate-y-0.5
                    transition-all
                  "
                >

                  <HiOutlineArrowRight className="text-xl group-hover:translate-x-1 transition" />

                  Get Started Free

                </Link>

                <button
                  type="button"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-7
                    py-3.5
                    rounded-xl
                    bg-white
                    border border-[#D7D0F8]
                    text-[#35306F]
                    font-semibold
                    hover:bg-[#F8F5FF]
                    hover:border-[#BEB3F1]
                    transition
                  "
                >

                  <HiOutlinePlay className="text-lg" />

                  Watch Demo

                </button>

              </div>

            </div>

            {/* =================================================
                RIGHT
            ================================================= */}

            <div className="relative">

              <ResumeMockup />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="bg-white py-16 sm:py-20">

        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">

          {/* Heading */}

          <div className="text-center mb-10">

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-[#F1EDFF]
                text-[#6945E5]
                text-xs
                font-bold
                uppercase
                tracking-wide
              "
            >

              <HiOutlineLightningBolt />

              Why Choose ResumeAI

            </div>

            <h2
              className="
                mt-4
                text-[32px]
                sm:text-[40px]
                font-extrabold
                text-[#172052]
                tracking-tight
              "
            >
              Everything you need to get hired
            </h2>

            <p className="mt-3 text-[#66749C] text-sm sm:text-base">
              Powerful tools to build, analyze and optimize your resume
              for success.
            </p>

          </div>

          {/* Feature Cards */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">

            {features.map((feature, index) => {

              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="
                    group
                    bg-white
                    rounded-2xl
                    border border-[#E8E8F4]
                    p-5
                    shadow-[0_6px_25px_rgba(40,35,100,0.05)]
                    hover:-translate-y-1
                    hover:shadow-[0_14px_35px_rgba(40,35,100,0.09)]
                    transition-all
                  "
                >

                  <div
                    className={`
                      w-11
                      h-11
                      rounded-xl
                      ${feature.iconBg}
                      ${feature.iconColor}
                      flex
                      items-center
                      justify-center
                      mb-5
                      group-hover:scale-105
                      transition
                    `}
                  >

                    <Icon className="text-2xl" />

                  </div>

                  <h3 className="font-bold text-[#172052] text-[15px] mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] leading-5 text-[#6B7699]">
                    {feature.desc}
                  </p>

                </div>
              );

            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="pb-14">

        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">

          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border border-[#DDD6FF]
              bg-gradient-to-r
              from-[#F5F1FF]
              via-[#F8F5FF]
              to-[#F0EBFF]
              px-6
              sm:px-9
              py-6
              flex
              flex-col
              sm:flex-row
              sm:items-center
              justify-between
              gap-5
            "
          >

            {/* Glow */}

            <div className="absolute -right-20 -top-20 w-56 h-56 bg-[#A98CFF]/20 rounded-full blur-3xl" />

            <div className="relative flex items-center gap-4">

              <div
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-white
                  shadow-sm
                  flex
                  items-center
                  justify-center
                  text-[#7048E8]
                "
              >

                <HiOutlineSparkles className="text-xl" />

              </div>

              <div>

                <h3 className="font-bold text-[#29256C] text-base">
                  Ready to land your dream job?
                </h3>

                <p className="text-xs text-[#747DA5] mt-1">
                  Make your resume job-ready with AI.
                </p>

              </div>

            </div>

            <Link
              to={getStartedLink}
              className="
                relative
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-3
                rounded-xl
                bg-gradient-to-r
                from-[#6846E8]
                to-[#8049E8]
                text-white
                font-bold
                text-sm
                shadow-[0_8px_20px_rgba(104,70,232,0.25)]
                hover:-translate-y-0.5
                transition
              "
            >

              Get Started Free

              <HiOutlineArrowRight />

            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;