import express from "express";
import { protect } from "../middleware/auth.js";
import { generateResumeSource } from "../controllers/builderController.js";
const router = express.Router();
router.use(protect);
router.post("/generate", generateResumeSource);
export default router;
