import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    originalFileName: { type: String, required: true },
    rawText: { type: String, required: true },
    fileType: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
