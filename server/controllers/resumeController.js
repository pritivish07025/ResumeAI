import fs from "fs";
import Resume from "../models/Resume.js";
import { extractTextFromFile } from "../utils/parseResume.js";

// @route POST /api/resume/upload
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const rawText = await extractTextFromFile(req.file.path);

    if (!rawText || rawText.trim().length < 30) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: "Could not extract meaningful text from this file. Please upload a text-based PDF or DOCX.",
      });
    }

    const resume = await Resume.create({
      user: req.user._id,
      originalFileName: req.file.originalname,
      rawText,
      fileType: req.file.mimetype,
    });

    // Clean up the file from disk after extracting text — we don't need to keep it
    fs.unlink(req.file.path, () => {});

    res.status(201).json({
      _id: resume._id,
      originalFileName: resume.originalFileName,
      rawTextPreview: rawText.slice(0, 500),
      createdAt: resume.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/resume
export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .select("originalFileName createdAt")
      .sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/resume/:id
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DELETE /api/resume/:id
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json({ message: "Resume deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
