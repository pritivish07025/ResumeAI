import { buildJakeResumeLatex } from "../utils/latexResume.js";

export const generateResumeSource = async (req, res) => {
  try {
    if (!req.body?.personal?.name) return res.status(400).json({ message: "Name is required" });
    const latex = buildJakeResumeLatex(req.body);
    res.json({ latex, fileName: `${req.body.personal.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-resume.tex` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
