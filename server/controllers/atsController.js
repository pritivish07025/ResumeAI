import fs from "fs";
import Resume from "../models/Resume.js";
import { extractTextFromFile } from "../utils/parseResume.js";
import { calculateAtsScore } from "../utils/atsChecker.js";

export const checkAts = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Please upload a PDF or DOCX resume." });
    const text = await extractTextFromFile(req.file.path);
    fs.unlink(req.file.path, () => {});
    if (!text?.trim()) return res.status(400).json({ message: "Could not extract text from the resume." });
    const result = calculateAtsScore(text, req.body.jobDescription || "");
    const resume = await Resume.create({ user: req.user._id, originalFileName: req.file.originalname, rawText: text, fileType: req.file.mimetype });
    res.status(201).json({ resumeId: resume._id, ...result });
  } catch (error) {
    if (req.file?.path) fs.unlink(req.file.path, () => {});
    res.status(500).json({ message: error.message });
  }
};
