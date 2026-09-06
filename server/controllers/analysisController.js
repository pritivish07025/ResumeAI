import Resume from "../models/Resume.js";
import Analysis from "../models/Analysis.js";
import {
  analyzeSkillGap,
  generateInterviewQuestions,
  generateAtsResume,
} from "../utils/gemini.js";

// @route POST /api/analysis/skill-gap
// body: { resumeId, jobDescription }
export const runSkillGapAnalysis = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription || jobDescription.trim().length < 30) {
      return res.status(400).json({
        message: "Please provide a resumeId and a job description of at least 30 characters",
      });
    }

    const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const aiResult = await analyzeSkillGap(resume.rawText, jobDescription);

    const analysis = await Analysis.create({
      user: req.user._id,
      resume: resume._id,
      jobDescription,
      matchScore: aiResult.matchScore,
      matchedSkills: aiResult.matchedSkills,
      missingSkills: aiResult.missingSkills,
      recommendations: aiResult.recommendations,
    });

    res.status(201).json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/analysis/:id/interview-questions
export const runInterviewQuestions = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user._id }).populate(
      "resume"
    );
    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }

    const questions = await generateInterviewQuestions(
      analysis.resume.rawText,
      analysis.jobDescription
    );

    analysis.interviewQuestions = questions;
    await analysis.save();

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/analysis/:id/ats-resume
export const runAtsResume = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user._id }).populate(
      "resume"
    );
    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }

    const atsResume = await generateAtsResume(analysis.resume.rawText, analysis.jobDescription);

    analysis.atsResume = atsResume;
    await analysis.save();

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/analysis
export const getMyAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user._id })
      .populate("resume", "originalFileName")
      .sort({ createdAt: -1 });
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/analysis/:id
export const getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user._id }).populate(
      "resume",
      "originalFileName"
    );
    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
