import React, { useRef, useState } from "react";
import api from "../api/axios.js";

/* =========================================================
   EMPTY DATA
========================================================= */

const emptyEdu = {
  school: "",
  degree: "",
  location: "",
  start: "",
  end: "",
};

const emptyExp = {
  company: "",
  role: "",
  location: "",
  start: "",
  end: "",
  bullets: [""],
};

const emptyProject = {
  name: "",
  tech: "",
  link: "",
  bullets: [""],
};

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

const Section = ({ title, children }) => {
  return (
    <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-5 text-lg font-bold text-slate-900">
        {title}
      </h2>

      {children}
    </section>
  );
};

const Input = ({ label, ...props }) => {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <input
        {...props}
        className="
          h-11
          w-full
          min-w-0
          rounded-lg
          border
          border-slate-200
          bg-white
          px-3.5
          text-sm
          text-slate-800
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-primary-500
          focus:ring-2
          focus:ring-primary-100
        "
      />
    </label>
  );
};

const Textarea = ({ label, ...props }) => {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <textarea
        {...props}
        className="
          w-full
          min-w-0
          resize-y
          rounded-lg
          border
          border-slate-200
          bg-white
          px-3.5
          py-3
          text-sm
          text-slate-800
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-primary-500
          focus:ring-2
          focus:ring-primary-100
        "
      />
    </label>
  );
};

/* =========================================================
   RESUME BUILDER
========================================================= */

const ResumeBuilder = () => {
  const previewRef = useRef(null);

  const [data, setData] = useState({
    personal: {
      name: "",
      email: "",
      phone: "",
      location: "",
      github: "",
      linkedin: "",
      leetcode: "",
      portfolio: "",
      summary: "",
    },

    education: [{ ...emptyEdu }],

    experience: [{ ...emptyExp }],

    projects: [{ ...emptyProject }],

    skills: {
      Languages: "",
      Frontend: "",
      Backend: "",
      Database: "",
      Tools: "",
    },

    achievements: [""],

    certifications: [""],
  });

  const [latex, setLatex] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     PERSONAL INFORMATION
  ========================================================= */

  const updatePersonal = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [name]: value,
      },
    }));
  };

  /* =========================================================
     ARRAY UPDATE
  ========================================================= */

  const updateArray = (key, index, field, value) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      ),
    }));
  };

  /* =========================================================
     BULLETS
  ========================================================= */

  const updateBullet = (
    key,
    index,
    bulletIndex,
    value
  ) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].map((item, i) =>
        i === index
          ? {
              ...item,
              bullets: item.bullets.map((bullet, j) =>
                j === bulletIndex ? value : bullet
              ),
            }
          : item
      ),
    }));
  };

  const addBullet = (key, index) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].map((item, i) =>
        i === index
          ? {
              ...item,
              bullets: [...item.bullets, ""],
            }
          : item
      ),
    }));
  };

  const removeBullet = (
    key,
    index,
    bulletIndex
  ) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].map((item, i) =>
        i === index
          ? {
              ...item,
              bullets: item.bullets.filter(
                (_, j) => j !== bulletIndex
              ),
            }
          : item
      ),
    }));
  };

  /* =========================================================
     REMOVE SECTION ITEM
  ========================================================= */

  const removeItem = (key, index) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].filter(
        (_, i) => i !== index
      ),
    }));
  };

  /* =========================================================
     SIMPLE LIST
  ========================================================= */

  const updateList = (
    key,
    index,
    value
  ) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  /* =========================================================
     GENERATE LATEX
  ========================================================= */

  const generate = async () => {
    if (!data.personal.name.trim()) {
      setError("Please enter your full name first.");
      return;
    }

    setBusy(true);
    setError("");

    try {
      const response = await api.post(
        "/builder/generate",
        data
      );

      const result = response.data;

      if (!result?.latex) {
        throw new Error(
          "LaTeX was not returned by the server."
        );
      }

      setLatex(result.latex);
    } catch (err) {
      console.error(
        "Resume generation error:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Could not generate resume."
      );
    } finally {
      setBusy(false);
    }
  };

  /* =========================================================
     DOWNLOAD TEXT
  ========================================================= */

  const downloadText = (
    content,
    filename,
    type = "text/plain"
  ) => {
    const blob = new Blob([content], {
      type,
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =========================================================
     DOWNLOAD PDF
  ========================================================= */

  const downloadPdf = async () => {
    if (!previewRef.current) return;

    if (!window.html2pdf) {
      window.print();
      return;
    }

    const filename = `${
      data.personal.name || "resume"
    }-resume.pdf`;

    window
      .html2pdf()
      .set({
        margin: 0.2,

        filename,

        image: {
          type: "jpeg",
          quality: 0.98,
        },

        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        },

        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait",
        },
      })
      .from(previewRef.current)
      .save();
  };

  /* =========================================================
     ADD FUNCTIONS
  ========================================================= */

  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { ...emptyEdu },
      ],
    }));
  };

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          ...emptyExp,
          bullets: [""],
        },
      ],
    }));
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          ...emptyProject,
          bullets: [""],
        },
      ],
    }));
  };

  const addAchievement = () => {
    setData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        "",
      ],
    }));
  };

  const addCertification = () => {
    setData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        "",
      ],
    }));
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <main className="min-h-screen min-w-0 overflow-x-hidden bg-[#F7F7FF]">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            AI Resume Builder
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Create a clean, ATS-friendly Jake's Resume
            style layout with clickable links.
          </p>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* =================================================
            MAIN LAYOUT
        ================================================= */}

        <div className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-2">

          {/* =================================================
              LEFT FORM
          ================================================= */}

          <div className="min-w-0">

            {/* PERSONAL */}

            <Section title="Personal Information">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <Input
                  label="Full name *"
                  name="name"
                  value={data.personal.name}
                  onChange={updatePersonal}
                  placeholder="Your full name"
                />

                <Input
                  label="Email"
                  name="email"
                  value={data.personal.email}
                  onChange={updatePersonal}
                  placeholder="you@example.com"
                />

                <Input
                  label="Phone"
                  name="phone"
                  value={data.personal.phone}
                  onChange={updatePersonal}
                  placeholder="+91 XXXXX XXXXX"
                />

                <Input
                  label="Location"
                  name="location"
                  value={data.personal.location}
                  onChange={updatePersonal}
                  placeholder="City, India"
                />

                <Input
                  label="GitHub URL"
                  name="github"
                  value={data.personal.github}
                  onChange={updatePersonal}
                  placeholder="https://github.com/..."
                />

                <Input
                  label="LinkedIn URL"
                  name="linkedin"
                  value={data.personal.linkedin}
                  onChange={updatePersonal}
                  placeholder="https://linkedin.com/in/..."
                />

                <Input
                  label="LeetCode URL"
                  name="leetcode"
                  value={data.personal.leetcode}
                  onChange={updatePersonal}
                  placeholder="https://leetcode.com/..."
                />

                <Input
                  label="Portfolio URL"
                  name="portfolio"
                  value={data.personal.portfolio}
                  onChange={updatePersonal}
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div className="mt-4">
                <Textarea
                  label="Professional summary (optional)"
                  name="summary"
                  value={data.personal.summary}
                  onChange={updatePersonal}
                  rows={4}
                  placeholder="Write a short professional summary..."
                />
              </div>
            </Section>

            {/* EDUCATION */}

            <Section title="Education">
              {data.education.map(
                (education, index) => (
                  <div
                    key={index}
                    className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      <Input
                        label="College / University"
                        value={education.school}
                        onChange={(e) =>
                          updateArray(
                            "education",
                            index,
                            "school",
                            e.target.value
                          )
                        }
                        placeholder="College / University"
                      />

                      <Input
                        label="Degree"
                        value={education.degree}
                        onChange={(e) =>
                          updateArray(
                            "education",
                            index,
                            "degree",
                            e.target.value
                          )
                        }
                        placeholder="B.Tech Computer Science"
                      />

                      <Input
                        label="Location"
                        value={education.location}
                        onChange={(e) =>
                          updateArray(
                            "education",
                            index,
                            "location",
                            e.target.value
                          )
                        }
                        placeholder="Varanasi, India"
                      />

                      <Input
                        label="Start"
                        value={education.start}
                        onChange={(e) =>
                          updateArray(
                            "education",
                            index,
                            "start",
                            e.target.value
                          )
                        }
                        placeholder="2023"
                      />

                      <Input
                        label="End"
                        value={education.end}
                        onChange={(e) =>
                          updateArray(
                            "education",
                            index,
                            "end",
                            e.target.value
                          )
                        }
                        placeholder="2027"
                      />
                    </div>

                    {data.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(
                            "education",
                            index
                          )
                        }
                        className="mt-4 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        Remove Education
                      </button>
                    )}
                  </div>
                )
              )}

              <button
                type="button"
                onClick={addEducation}
                className="rounded-lg bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-100"
              >
                + Add Education
              </button>
            </Section>

            {/* EXPERIENCE */}

            <Section title="Experience">
              {data.experience.map(
                (experience, index) => (
                  <div
                    key={index}
                    className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      <Input
                        label="Company"
                        value={experience.company}
                        onChange={(e) =>
                          updateArray(
                            "experience",
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        placeholder="Company name"
                      />

                      <Input
                        label="Role"
                        value={experience.role}
                        onChange={(e) =>
                          updateArray(
                            "experience",
                            index,
                            "role",
                            e.target.value
                          )
                        }
                        placeholder="Software Developer Intern"
                      />

                      <Input
                        label="Location"
                        value={experience.location}
                        onChange={(e) =>
                          updateArray(
                            "experience",
                            index,
                            "location",
                            e.target.value
                          )
                        }
                        placeholder="Remote / City"
                      />

                      <Input
                        label="Start"
                        value={experience.start}
                        onChange={(e) =>
                          updateArray(
                            "experience",
                            index,
                            "start",
                            e.target.value
                          )
                        }
                        placeholder="Jun 2026"
                      />

                      <Input
                        label="End"
                        value={experience.end}
                        onChange={(e) =>
                          updateArray(
                            "experience",
                            index,
                            "end",
                            e.target.value
                          )
                        }
                        placeholder="Aug 2026"
                      />
                    </div>

                    <div className="mt-4 space-y-2">
                      {experience.bullets.map(
                        (bullet, bulletIndex) => (
                          <div
                            key={bulletIndex}
                            className="flex min-w-0 gap-2"
                          >
                            <input
                              value={bullet}
                              onChange={(e) =>
                                updateBullet(
                                  "experience",
                                  index,
                                  bulletIndex,
                                  e.target.value
                                )
                              }
                              placeholder="Achievement / responsibility"
                              className="h-11 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                            />

                            {experience.bullets.length >
                              1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeBullet(
                                    "experience",
                                    index,
                                    bulletIndex
                                  )
                                }
                                className="rounded-lg px-3 font-bold text-red-500 hover:bg-red-50"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        )
                      )}
                    </div>

                    <div className="mt-3 flex gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          addBullet(
                            "experience",
                            index
                          )
                        }
                        className="text-xs font-bold text-primary-600"
                      >
                        + Bullet
                      </button>

                      {data.experience.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeItem(
                              "experience",
                              index
                            )
                          }
                          className="text-xs font-bold text-red-500"
                        >
                          Remove Experience
                        </button>
                      )}
                    </div>
                  </div>
                )
              )}

              <button
                type="button"
                onClick={addExperience}
                className="rounded-lg bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600"
              >
                + Add Experience
              </button>
            </Section>

            {/* PROJECTS */}

            <Section title="Projects">
              {data.projects.map(
                (project, index) => (
                  <div
                    key={index}
                    className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      <Input
                        label="Project name"
                        value={project.name}
                        onChange={(e) =>
                          updateArray(
                            "projects",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="AI Resume Platform"
                      />

                      <Input
                        label="Tech stack"
                        value={project.tech}
                        onChange={(e) =>
                          updateArray(
                            "projects",
                            index,
                            "tech",
                            e.target.value
                          )
                        }
                        placeholder="React, Node.js, MongoDB"
                      />

                      <Input
                        label="GitHub / Live link"
                        value={project.link}
                        onChange={(e) =>
                          updateArray(
                            "projects",
                            index,
                            "link",
                            e.target.value
                          )
                        }
                        placeholder="https://github.com/..."
                      />
                    </div>

                    <div className="mt-4 space-y-2">
                      {project.bullets.map(
                        (bullet, bulletIndex) => (
                          <input
                            key={bulletIndex}
                            value={bullet}
                            onChange={(e) =>
                              updateBullet(
                                "projects",
                                index,
                                bulletIndex,
                                e.target.value
                              )
                            }
                            placeholder="Project impact / feature"
                            className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                          />
                        )
                      )}
                    </div>

                    <div className="mt-3 flex gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          addBullet(
                            "projects",
                            index
                          )
                        }
                        className="text-xs font-bold text-primary-600"
                      >
                        + Bullet
                      </button>

                      {data.projects.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeItem(
                              "projects",
                              index
                            )
                          }
                          className="text-xs font-bold text-red-500"
                        >
                          Remove Project
                        </button>
                      )}
                    </div>
                  </div>
                )
              )}

              <button
                type="button"
                onClick={addProject}
                className="rounded-lg bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600"
              >
                + Add Project
              </button>
            </Section>

            {/* SKILLS */}

            <Section title="Skills">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.keys(data.skills).map(
                  (skill) => (
                    <Input
                      key={skill}
                      label={skill}
                      value={data.skills[skill]}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          skills: {
                            ...prev.skills,
                            [skill]: e.target.value,
                          },
                        }))
                      }
                      placeholder={`Enter ${skill.toLowerCase()}...`}
                    />
                  )
                )}
              </div>
            </Section>

            {/* ACHIEVEMENTS */}

            <Section title="Achievements & Certifications">
              <div className="space-y-3">

                <h3 className="font-bold text-slate-800">
                  Achievements
                </h3>

                {data.achievements.map(
                  (achievement, index) => (
                    <input
                      key={index}
                      value={achievement}
                      onChange={(e) =>
                        updateList(
                          "achievements",
                          index,
                          e.target.value
                        )
                      }
                      placeholder="Achievement"
                      className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    />
                  )
                )}

                <button
                  type="button"
                  onClick={addAchievement}
                  className="text-xs font-bold text-primary-600"
                >
                  + Add Achievement
                </button>

                <h3 className="pt-4 font-bold text-slate-800">
                  Certifications
                </h3>

                {data.certifications.map(
                  (certificate, index) => (
                    <input
                      key={index}
                      value={certificate}
                      onChange={(e) =>
                        updateList(
                          "certifications",
                          index,
                          e.target.value
                        )
                      }
                      placeholder="Certification"
                      className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    />
                  )
                )}

                <button
                  type="button"
                  onClick={addCertification}
                  className="text-xs font-bold text-primary-600"
                >
                  + Add Certification
                </button>
              </div>
            </Section>

            {/* GENERATE */}

            <button
              type="button"
              onClick={generate}
              disabled={busy}
              className="h-12 w-full rounded-xl bg-primary-600 font-bold text-white shadow-lg shadow-primary-500/20 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy
                ? "Generating LaTeX..."
                : "Generate Resume Source"}
            </button>

            {/* LATEX */}

            {latex && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    downloadText(
                      latex,
                      `${
                        data.personal.name ||
                        "resume"
                      }.tex`
                    )
                  }
                  className="h-11 rounded-lg border border-slate-300 bg-white font-semibold hover:bg-slate-50"
                >
                  Download .tex
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      latex
                    )
                  }
                  className="h-11 rounded-lg border border-slate-300 bg-white font-semibold hover:bg-slate-50"
                >
                  Copy LaTeX
                </button>
              </div>
            )}
          </div>

          {/* =================================================
              RIGHT PREVIEW
          ================================================= */}

          <div className="min-w-0 xl:sticky xl:top-6">

            {/* PREVIEW HEADER */}

            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-800">
                Resume Preview
              </h2>

              <button
                type="button"
                onClick={downloadPdf}
                className="whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
              >
                Download PDF
              </button>
            </div>

            {/* RESUME PAPER */}

            <div
              ref={previewRef}
              id="resume-preview"
              className="
                min-h-[11in]
                overflow-hidden
                rounded-sm
                border
                border-slate-100
                bg-white
                p-7
                text-[11px]
                leading-[1.4]
                text-slate-800
                shadow-xl
                sm:p-9
              "
            >

              {/* HEADER */}

              <div className="border-b border-slate-300 pb-3 text-center">
                <h1 className="text-2xl font-bold text-slate-900">
                  {data.personal.name ||
                    "Your Name"}
                </h1>

                <p className="mt-1">
                  {[
                    data.personal.location,
                    data.personal.phone,
                    data.personal.email,
                  ]
                    .filter(Boolean)
                    .join(" | ")}
                </p>

                <p className="mt-1 text-primary-700">
                  {[
                    data.personal.github &&
                      "GitHub",
                    data.personal.linkedin &&
                      "LinkedIn",
                    data.personal.leetcode &&
                      "LeetCode",
                    data.personal.portfolio &&
                      "Portfolio",
                  ]
                    .filter(Boolean)
                    .join(" | ")}
                </p>
              </div>

              {/* SUMMARY */}

              {data.personal.summary && (
                <>
                  <h3 className="resume-heading">
                    SUMMARY
                  </h3>

                  <p>
                    {data.personal.summary}
                  </p>
                </>
              )}

              {/* EDUCATION */}

              {data.education.some(
                (item) => item.school
              ) && (
                <>
                  <h3 className="resume-heading">
                    EDUCATION
                  </h3>

                  {data.education
                    .filter(
                      (item) => item.school
                    )
                    .map((item, index) => (
                      <div
                        key={index}
                        className="mb-2"
                      >
                        <div className="flex justify-between gap-4 font-bold">
                          <span>
                            {item.school}
                          </span>

                          <span>
                            {item.location}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4 italic">
                          <span>
                            {item.degree}
                          </span>

                          <span>
                            {item.start}

                            {item.start &&
                            item.end
                              ? " – "
                              : ""}

                            {item.end}
                          </span>
                        </div>
                      </div>
                    ))}
                </>
              )}

              {/* EXPERIENCE */}

              {data.experience.some(
                (item) => item.company
              ) && (
                <>
                  <h3 className="resume-heading">
                    EXPERIENCE
                  </h3>

                  {data.experience
                    .filter(
                      (item) => item.company
                    )
                    .map((item, index) => (
                      <div
                        key={index}
                        className="mb-2"
                      >
                        <div className="flex justify-between gap-4 font-bold">
                          <span>
                            {item.company}
                          </span>

                          <span>
                            {item.location}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4 italic">
                          <span>
                            {item.role}
                          </span>

                          <span>
                            {item.start}

                            {item.start &&
                            item.end
                              ? " – "
                              : ""}

                            {item.end}
                          </span>
                        </div>

                        {item.bullets.some(
                          Boolean
                        ) && (
                          <ul className="ml-5 mt-1 list-disc">
                            {item.bullets
                              .filter(Boolean)
                              .map(
                                (
                                  bullet,
                                  bulletIndex
                                ) => (
                                  <li
                                    key={
                                      bulletIndex
                                    }
                                  >
                                    {bullet}
                                  </li>
                                )
                              )}
                          </ul>
                        )}
                      </div>
                    ))}
                </>
              )}

              {/* PROJECTS */}

              {data.projects.some(
                (item) => item.name
              ) && (
                <>
                  <h3 className="resume-heading">
                    PROJECTS
                  </h3>

                  {data.projects
                    .filter(
                      (item) => item.name
                    )
                    .map((item, index) => (
                      <div
                        key={index}
                        className="mb-2"
                      >
                        <p className="font-bold">
                          {item.name}

                          {item.tech && (
                            <span className="font-normal italic">
                              {" "}
                              | {item.tech}
                            </span>
                          )}
                        </p>

                        {item.bullets.some(
                          Boolean
                        ) && (
                          <ul className="ml-5 list-disc">
                            {item.bullets
                              .filter(Boolean)
                              .map(
                                (
                                  bullet,
                                  bulletIndex
                                ) => (
                                  <li
                                    key={
                                      bulletIndex
                                    }
                                  >
                                    {bullet}
                                  </li>
                                )
                              )}
                          </ul>
                        )}
                      </div>
                    ))}
                </>
              )}

              {/* SKILLS */}

              {Object.values(
                data.skills
              ).some(Boolean) && (
                <>
                  <h3 className="resume-heading">
                    TECHNICAL SKILLS
                  </h3>

                  {Object.entries(
                    data.skills
                  )
                    .filter(
                      ([, value]) => value
                    )
                    .map(
                      ([key, value]) => (
                        <p key={key}>
                          <b>{key}:</b>{" "}
                          {value}
                        </p>
                      )
                    )}
                </>
              )}

              {/* ACHIEVEMENTS */}

              {data.achievements.some(
                Boolean
              ) && (
                <>
                  <h3 className="resume-heading">
                    ACHIEVEMENTS
                  </h3>

                  <ul className="ml-5 list-disc">
                    {data.achievements
                      .filter(Boolean)
                      .map(
                        (
                          achievement,
                          index
                        ) => (
                          <li key={index}>
                            {achievement}
                          </li>
                        )
                      )}
                  </ul>
                </>
              )}

              {/* CERTIFICATIONS */}

              {data.certifications.some(
                Boolean
              ) && (
                <>
                  <h3 className="resume-heading">
                    CERTIFICATIONS
                  </h3>

                  <ul className="ml-5 list-disc">
                    {data.certifications
                      .filter(Boolean)
                      .map(
                        (
                          certificate,
                          index
                        ) => (
                          <li key={index}>
                            {certificate}
                          </li>
                        )
                      )}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResumeBuilder;