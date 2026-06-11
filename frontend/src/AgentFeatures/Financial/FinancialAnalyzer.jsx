import { useState, useEffect } from "react";
import agentApi from "../agentApi";
import AlgorithmEditor from "./AlgorithmEditor";
import SessionFileList from "./SessionFileList";
import AnalysisResults from "./AnalysisResults";
import mergeAnalyses from "./mergeAnalyses";
import "./FinancialAnalyzer.css";

const FinancialAnalyzer = () => {
  // Session-based uploads (NOT saved to database)
  const [sessionUploads, setSessionUploads] = useState([]);
  const [selectedForAnalysis, setSelectedForAnalysis] = useState([]);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [categories, setCategories] = useState([]);

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(null), 5000);
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await agentApi.get("/financial/categories/list");
        setCategories(response.data.categories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("csvFiles", file);
    });

    try {
      const response = await agentApi.post("/financial/upload", formData);

      const { combinedAnalysis, files } = response.data;

      // Create session upload entries for each file with its individual analysis
      const newUploads = files.map((file, idx) => ({
        id: Date.now() + idx,
        filename: file.filename,
        transactionCount: file.analysis.totalTransactions,
        categorizedCount: file.analysis.categorizedCount,
        uncategorizedCount: file.analysis.uncategorizedCount,
        analysis: file.analysis, // Individual file analysis
      }));

      setSessionUploads((prev) => [...prev, ...newUploads]);
      setCurrentAnalysis(combinedAnalysis);
      setSelectedForAnalysis(newUploads.map((u) => u.id)); // Auto-select new files

      showSuccess(`Successfully analyzed ${files.length} file${files.length > 1 ? "s" : ""}`);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.error || "Failed to process CSV files");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleRemoveFile = (uploadId) => {
    if (!confirm("Remove this file from session?")) return;

    const remainingUploads = sessionUploads.filter((u) => u.id !== uploadId);
    const remainingSelected = selectedForAnalysis.filter((id) => id !== uploadId);

    setSessionUploads(remainingUploads);
    setSelectedForAnalysis(remainingSelected);

    // Recompute the analysis so removed files drop out of the displayed numbers
    const selectedUploads = remainingUploads.filter((u) => remainingSelected.includes(u.id));
    setCurrentAnalysis(selectedUploads.length > 0 ? mergeAnalyses(selectedUploads) : null);
  };

  const toggleSelectForAnalysis = (uploadId) => {
    setSelectedForAnalysis((prev) =>
      prev.includes(uploadId) ? prev.filter((id) => id !== uploadId) : [...prev, uploadId],
    );
  };

  const handleAnalyzeSelected = () => {
    if (selectedForAnalysis.length === 0) {
      showError("Please select at least one file to analyze");
      return;
    }

    const selectedUploads = sessionUploads.filter((u) => selectedForAnalysis.includes(u.id));
    setCurrentAnalysis(mergeAnalyses(selectedUploads));
  };

  const handleConfirmAISuggestion = async (description, category) => {
    try {
      await agentApi.post("/financial/confirm-ai-suggestion", { description, category });

      showSuccess(`Pattern saved: "${description}" → ${category}`);

      // Remove from AI suggestions list
      setCurrentAnalysis((prev) => ({
        ...prev,
        aiSuggestions: prev.aiSuggestions.filter((s) => s.description !== description),
      }));
    } catch (err) {
      console.error("Confirm AI suggestion error:", err);
      showError("Failed to save pattern");
    }
  };

  const handleRejectAISuggestion = (description) => {
    setCurrentAnalysis((prev) => ({
      ...prev,
      aiSuggestions: prev.aiSuggestions.filter((s) => s.description !== description),
    }));
  };

  return (
    <div className="financial-analyzer">
      {/* Upload Section */}
      <div className="upload-section">
        <label htmlFor="csv-upload" className="upload-button">
          {uploading ? "Processing..." : "Upload CSV"}
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            style={{ display: "none" }}
          />
        </label>
        <span className="upload-hint">
          Supports Chase, AFCU, and Amex CSV exports • Select multiple files to auto-combine
        </span>
      </div>

      <AlgorithmEditor categories={categories} showError={showError} showSuccess={showSuccess} />

      {/* Messages */}
      {error && (
        <div className="message error-message">
          <strong>Error:</strong> {error}
        </div>
      )}
      {success && <div className="message success-message">{success}</div>}

      <SessionFileList
        uploads={sessionUploads}
        selectedIds={selectedForAnalysis}
        onToggleSelect={toggleSelectForAnalysis}
        onRemove={handleRemoveFile}
        onAnalyzeSelected={handleAnalyzeSelected}
      />

      <AnalysisResults
        analysis={currentAnalysis}
        onConfirmSuggestion={handleConfirmAISuggestion}
        onRejectSuggestion={handleRejectAISuggestion}
      />

      {/* Empty State */}
      {!currentAnalysis && sessionUploads.length === 0 && !uploading && (
        <div className="empty-state">
          Upload CSV files to analyze your spending. Multiple files will be automatically combined.
        </div>
      )}
    </div>
  );
};

export default FinancialAnalyzer;
