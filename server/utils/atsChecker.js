const SECTION_ALIASES = {
  contact: ["email", "phone", "linkedin", "github"],
  summary: ["summary", "profile", "objective"],
  experience: ["experience", "work experience", "employment"],
  education: ["education", "academic"],
  skills: ["skills", "technical skills", "technologies"],
  projects: ["projects", "personal projects"],
  certifications: ["certifications", "certificates"],
};

const ACTION_VERBS = ["built", "developed", "designed", "implemented", "created", "optimized", "automated", "led", "deployed", "improved", "engineered", "integrated"];

const normalize = text => String(text || "").toLowerCase().replace(/[^a-z0-9+.#\s-]/g, " ").replace(/\s+/g, " ").trim();

export const calculateAtsScore = (rawText, jobDescription = "") => {
  const text = normalize(rawText);
  const job = normalize(jobDescription);
  const checks = [];
  const add = (name, score, max, status, detail) => checks.push({ name, score, max, status, detail });

  const contact = ["@", "linkedin", "github", "phone", "email"].filter(x => text.includes(x)).length;
  add("Contact information", contact >= 4 ? 10 : contact >= 3 ? 8 : contact >= 2 ? 6 : 3, 10, contact >= 3 ? "pass" : "warning", "Include email, phone and professional links.");

  const sectionCount = Object.values(SECTION_ALIASES).filter(aliases => aliases.some(a => text.includes(a))).length;
  add("Resume structure", sectionCount >= 6 ? 15 : sectionCount >= 4 ? 11 : 7, 15, sectionCount >= 6 ? "pass" : "warning", "Use standard headings such as Education, Experience, Projects and Skills.");

  const words = text.split(/\s+/).filter(Boolean).length;
  add("Content length", words >= 250 && words <= 900 ? 10 : words >= 180 ? 7 : 4, 10, words >= 250 && words <= 900 ? "pass" : "warning", `${words} words detected.`);

  const actionCount = ACTION_VERBS.filter(v => text.includes(v)).length;
  add("Action language", actionCount >= 6 ? 10 : actionCount >= 3 ? 7 : 4, 10, actionCount >= 6 ? "pass" : "warning", "Start bullets with strong action verbs.");

  const metricCount = (text.match(/\b\d+(?:\.\d+)?\s*(?:%|x|k|m|years?|months?)\b/g) || []).length;
  add("Quantified impact", metricCount >= 3 ? 10 : metricCount >= 1 ? 6 : 3, 10, metricCount >= 2 ? "pass" : "warning", "Add measurable results where truthful.");

  const keywordSet = job ? [...new Set(job.split(/\s+/).filter(w => w.length >= 4))] : [];
  const matched = keywordSet.filter(k => text.includes(k));
  const keywordScore = keywordSet.length ? Math.round((matched.length / keywordSet.length) * 20) : 14;
  add("Job keywords", Math.min(20, keywordScore), 20, keywordScore >= 14 ? "pass" : "warning", job ? `${matched.length}/${keywordSet.length} job-description terms matched.` : "Add a job description for keyword matching.");

  const formattingRedFlags = [/table/, /column/, /header/, /footer/, /graphic/, /photo/, /icon/].filter(r => r.test(text)).length;
  add("ATS readability", formattingRedFlags === 0 ? 10 : 6, 10, formattingRedFlags === 0 ? "pass" : "warning", "Prefer single-column, text-first formatting.");

  const linkCount = ["http", "www.", "linkedin.com", "github.com"].filter(x => text.includes(x)).length;
  add("Professional links", linkCount >= 2 ? 5 : linkCount === 1 ? 3 : 1, 5, linkCount >= 2 ? "pass" : "warning", "Keep GitHub/LinkedIn/portfolio URLs complete and readable.");

  const score = Math.max(0, Math.min(100, checks.reduce((s, c) => s + c.score, 0)));
  const suggestions = checks.filter(c => c.status !== "pass").map(c => c.detail);
  return { score, checks, matchedKeywords: matched.slice(0, 30), suggestions: suggestions.slice(0, 8) };
};
