import express from "express";
import { protect } from "../middleware/auth.js";
import {
  runSkillGapAnalysis,
  runInterviewQuestions,
  runAtsResume,
  getMyAnalyses,
  getAnalysisById,
} from "../controllers/analysisController.js";

const router = express.Router();

router.use(protect);

router.post("/skill-gap", runSkillGapAnalysis);
router.post("/:id/interview-questions", runInterviewQuestions);
router.post("/:id/ats-resume", runAtsResume);
router.get("/", getMyAnalyses);
router.get("/:id", getAnalysisById);

export default router;
