import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { HiOutlineCloudUpload, HiOutlineDocumentText } from "react-icons/hi";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleFile = (selectedFile) => {
    setError("");
    if (!selectedFile) return;
    const validExtensions = [".pdf", ".docx", ".doc"];
    const ext = selectedFile.name.slice(selectedFile.name.lastIndexOf(".")).toLowerCase();
    if (!validExtensions.includes(ext)) {
      setError("Please upload a PDF or DOCX file.");
      return;
    }
    if (selectedFile.size > 8 * 1024 * 1024) {
      setError("File is too large. Max size is 8MB.");
      return;
    }
    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const { data } = await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/analyze/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Upload Your Resume</h1>
      <p className="text-slate-500 text-sm mb-8">
        Upload a PDF or DOCX resume. We'll extract the text so you can analyze it against any job description.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition ${
          dragActive ? "border-primary-500 bg-primary-50" : "border-slate-300 bg-white"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {file ? (
          <div className="flex flex-col items-center gap-2">
            <HiOutlineDocumentText className="text-4xl text-primary-600" />
            <p className="font-medium text-slate-800">{file.name}</p>
            <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <HiOutlineCloudUpload className="text-4xl" />
            <p className="font-medium">Drag & drop your resume here</p>
            <p className="text-xs">or click to browse — PDF or DOCX, max 8MB</p>
          </div>
        )}
      </div>

      {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mt-4">{error}</div>}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Uploading & Parsing..." : "Upload & Continue"}
      </button>
    </div>
  );
};

export default UploadResume;
