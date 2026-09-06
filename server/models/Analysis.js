import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resume: { type: mongoose.Schema.Types.ObjectId, ref: "Resume", required: true },
    jobDescription: { type: String, required: true },
    matchScore: { type: Number },
    matchedSkills: [{ type: String }],
    missingSkills: [{ type: String }],
    recommendations: [{ type: String }],
    interviewQuestions: [
      {
        question: { type: String },
        category: { type: String },
        difficulty: { type: String },
      },
    ],
    atsResume: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Analysis", analysisSchema);
