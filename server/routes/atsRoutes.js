import express from "express";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { checkAts } from "../controllers/atsController.js";
const router = express.Router();
router.use(protect);
router.post("/check", upload.single("resume"), checkAts);
export default router;
