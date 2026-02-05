import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FinancialAnalyzer.css";

const FinancialAnalyzer = () => {
  const token = localStorage.getItem("agentToken");

  // Session-based uploads (NOT saved to database)
  const [sessionUploads, setSessionUploads] = useState([]);
  const [selectedForAnalysis, setSelectedForAnalysis] = useState([]);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showAlgorithmEditor, setShowAlgorithmEditor] = useState(false);
  const [algorithmRules, setAlgorithmRules] = useState([]);
  const [newPattern, setNewPattern] = useState({ category: "", pattern: "" });

  useEffect(() => {
    if (token) {
      fetchCategories();
    }
  }, [token]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/agent/financial/categories/list", {
        headers: { Authorization: token },
      });
      setCategories(response.data.categories);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchAlgorithmRules = async () => {
    try {
      const response = await axios.get("/api/agent/financial/algorithm", {
        headers: { Authorization: token },
      });
      setAlgorithmRules(response.data.rules);
    } catch (err) {
      console.error("Failed to fetch algorithm rules:", err);
    }
  };

  const handleAddPattern = async () => {
    if (!newPattern.category || !newPattern.pattern) {
      setError("Category and pattern are required");
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      await axios.post(
        "/api/agent/financial/algorithm/pattern",
        newPattern,
        { headers: { Authorization: token } }
      );
      setSuccess("Pattern added successfully");
      setNewPattern({ category: "", pattern: "" });
      fetchAlgorithmRules();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add pattern");
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleDeletePattern = async (patternId) => {
    if (!confirm("Delete this custom pattern?")) return;

    try {
      await axios.delete(`/api/agent/financial/algorithm/pattern/${patternId}`, {
        headers: { Authorization: token },
      });
      setSuccess("Pattern deleted");
      fetchAlgorithmRules();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete pattern");
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    files.forEach(file => {
      formData.append("csvFiles", file);
    });

    try {
      const response = await axios.post("/api/agent/financial/upload", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

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

      setSessionUploads(prev => [...prev, ...newUploads]);
      setCurrentAnalysis(combinedAnalysis);
      setSelectedForAnalysis(newUploads.map(u => u.id)); // Auto-select new files

      setSuccess(`Successfully analyzed ${files.length} file${files.length > 1 ? 's' : ''}`);
      setTimeout(() => setSuccess(null), 3000);
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

    setSessionUploads(prev => prev.filter(u => u.id !== uploadId));
    setSelectedForAnalysis(prev => prev.filter(id => id !== uploadId));

    // Clear analysis if we removed all files
    const remaining = sessionUploads.filter(u => u.id !== uploadId);
    if (remaining.length === 0) {
      setCurrentAnalysis(null);
    }
  };

  const toggleSelectForAnalysis = (uploadId) => {
    setSelectedForAnalysis(prev => {
      if (prev.includes(uploadId)) {
        return prev.filter(id => id !== uploadId);
      } else {
        return [...prev, uploadId];
      }
    });
  };

  const handleAnalyzeSelected = () => {
    if (selectedForAnalysis.length === 0) {
      setError("Please select at least one file to analyze");
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Get selected files' analyses
    const selectedUploads = sessionUploads.filter(u => selectedForAnalysis.includes(u.id));

    if (selectedUploads.length === 1) {
      // Single file - just show its analysis
      setCurrentAnalysis(selectedUploads[0].analysis);
      return;
    }

    // Multiple files - merge their analyses
    const mergedBuckets = {};
    let totalMonthlyAverage = 0;
    let totalTransactions = 0;
    let categorizedCount = 0;
    let uncategorizedCount = 0;
    let excludedCount = 0;

    selectedUploads.forEach(upload => {
      const analysis = upload.analysis;
      totalMonthlyAverage += analysis.totalMonthlyAverage;
      totalTransactions += analysis.totalTransactions;
      categorizedCount += analysis.categorizedCount;
      uncategorizedCount += analysis.uncategorizedCount;
      excludedCount += analysis.excludedCount;

      // Merge buckets
      Object.entries(analysis.buckets).forEach(([bucket, data]) => {
        if (!mergedBuckets[bucket]) {
          mergedBuckets[bucket] = { total: 0, categories: [] };
        }
        mergedBuckets[bucket].total += data.total;

        // Merge categories within bucket
        data.categories.forEach(cat => {
          const existing = mergedBuckets[bucket].categories.find(c => c.category === cat.category);
          if (existing) {
            existing.monthlyAverage += cat.monthlyAverage;
            existing.transactionCount += cat.transactionCount;
          } else {
            mergedBuckets[bucket].categories.push({ ...cat });
          }
        });
      });
    });

    const mergedAnalysis = {
      dateRange: `Combined: ${selectedUploads.length} files`,
      monthCount: selectedUploads[0].analysis.monthCount, // Use first file's month count (simplified)
      totalTransactions,
      categorizedCount,
      uncategorizedCount,
      excludedCount,
      totalMonthlyAverage: Number(totalMonthlyAverage.toFixed(2)),
      buckets: mergedBuckets,
      aiSuggestions: [], // No AI suggestions for merged analysis
      uncategorized: [],
      excludedSample: [],
    };

    setCurrentAnalysis(mergedAnalysis);
  };

  const handleConfirmAISuggestion = async (description, category) => {
    try {
      await axios.post(
        "/api/agent/financial/confirm-ai-suggestion",
        { description, category },
        { headers: { Authorization: token } }
      );

      setSuccess(`Pattern saved: "${description}" → ${category}`);

      // Remove from AI suggestions list
      setCurrentAnalysis(prev => ({
        ...prev,
        aiSuggestions: prev.aiSuggestions.filter(s => s.description !== description),
      }));

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Confirm AI suggestion error:", err);
      setError("Failed to save pattern");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleRejectAISuggestion = (description) => {
    setCurrentAnalysis(prev => ({
      ...prev,
      aiSuggestions: prev.aiSuggestions.filter(s => s.description !== description),
    }));
  };

  const handleDownload = () => {
    if (!currentAnalysis) return;

    const dataStr = JSON.stringify(currentAnalysis, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `financial-analysis-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
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

      {/* Algorithm Editor Section */}
      <div className="algorithm-section">
        <button
          className="algorithm-toggle"
          onClick={() => {
            setShowAlgorithmEditor(!showAlgorithmEditor);
            if (!showAlgorithmEditor && algorithmRules.length === 0) {
              fetchAlgorithmRules();
            }
          }}
        >
          {showAlgorithmEditor ? "Hide" : "Show"} Algorithm Editor
        </button>

        {showAlgorithmEditor && (
          <div className="algorithm-editor">
            <h3>Categorization Algorithm</h3>
            <p className="algorithm-hint">
              Add custom patterns to categorize transactions. Custom patterns are checked before
              built-in rules.
            </p>

            {/* Add New Pattern */}
            <div className="add-pattern-form">
              <select
                value={newPattern.category}
                onChange={(e) => setNewPattern({ ...newPattern, category: e.target.value })}
                className="pattern-input"
              >
                <option value="">Select category...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Pattern (e.g., MERCHANT NAME, regex supported)"
                value={newPattern.pattern}
                onChange={(e) => setNewPattern({ ...newPattern, pattern: e.target.value })}
                className="pattern-input"
              />
              <button onClick={handleAddPattern} className="action-button">
                Add Pattern
              </button>
            </div>

            {/* Rules List */}
            <div className="rules-list">
              {algorithmRules.map((rule) => (
                <div key={rule.category} className="rule-category">
                  <h4>{rule.category}</h4>
                  <div className="patterns-grid">
                    {rule.patterns.map((p, idx) => (
                      <div
                        key={p.id || `builtin-${idx}`}
                        className={`pattern-item ${p.isBuiltIn ? "builtin" : "custom"}`}
                      >
                        <span className="pattern-text">{p.pattern}</span>
                        <span className="pattern-badge">{p.isBuiltIn ? "Built-in" : "Custom"}</span>
                        {!p.isBuiltIn && (
                          <button
                            className="delete-pattern-btn"
                            onClick={() => handleDeletePattern(p.id)}
                            title="Delete custom pattern"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="message error-message">
          <strong>Error:</strong> {error}
        </div>
      )}
      {success && (
        <div className="message success-message">
          {success}
        </div>
      )}

      {/* Session Files */}
      {sessionUploads.length > 0 && (
        <div className="upload-history">
          <h3>Uploaded Files (Session Only)</h3>

          {sessionUploads.length > 1 && (
            <div className="combine-section">
              <p style={{ color: '#b0b0b0', fontSize: '14px', marginBottom: '10px' }}>
                Select files to include in analysis • Refresh page to clear all
              </p>
              <button
                className="combine-button"
                onClick={handleAnalyzeSelected}
                disabled={selectedForAnalysis.length === 0}
              >
                Analyze Selected ({selectedForAnalysis.length})
              </button>
            </div>
          )}

          <div className="history-list">
            {sessionUploads.map((upload) => (
              <div
                key={upload.id}
                className={`history-item ${selectedForAnalysis.includes(upload.id) ? "selected" : ""}`}
              >
                {sessionUploads.length > 1 && (
                  <div className="history-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedForAnalysis.includes(upload.id)}
                      onChange={() => toggleSelectForAnalysis(upload.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
                <div className="history-item-main">
                  <div className="history-item-header">
                    <span className="history-filename">{upload.filename}</span>
                  </div>
                  <div className="history-item-body">
                    <p>{upload.transactionCount} transactions</p>
                    <p>{upload.categorizedCount} categorized · {upload.uncategorizedCount} uncategorized</p>
                  </div>
                </div>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(upload.id);
                  }}
                  title="Remove from session"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {currentAnalysis && (
        <div className="upload-details">
          <div className="details-header">
            <h3>{currentAnalysis.dateRange}</h3>
            <p>
              {currentAnalysis.monthCount} months · {currentAnalysis.totalTransactions} transactions
            </p>
            <button className="action-button" onClick={handleDownload}>
              Download Analysis
            </button>
          </div>

          {/* Summary Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{currentAnalysis.totalTransactions}</div>
              <div className="stat-label">Total Transactions</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{currentAnalysis.categorizedCount}</div>
              <div className="stat-label">Categorized</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{currentAnalysis.uncategorizedCount}</div>
              <div className="stat-label">Uncategorized</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{currentAnalysis.excludedCount}</div>
              <div className="stat-label">Excluded (Transfers)</div>
            </div>
          </div>

          {/* Monthly Average */}
          <div className="total-average">
            <h4>Monthly Average</h4>
            <div className="average-amount">
              {formatCurrency(currentAnalysis.totalMonthlyAverage)}
            </div>
          </div>

          {/* Calculation Details */}
          {currentAnalysis.calculationLog && (
            <div className="calculation-details">
              <h4>Calculation Breakdown</h4>

              {currentAnalysis.calculationLog.dateRange && (
                <div className="calc-section">
                  <strong>Date Range</strong>
                  <p>First transaction: {currentAnalysis.calculationLog.dateRange.firstTransactionDate}</p>
                  <p>Last transaction: {currentAnalysis.calculationLog.dateRange.lastTransactionDate}</p>
                  <p>Days between: {currentAnalysis.calculationLog.dateRange.daysBetween} days</p>
                  <p className="highlight">{currentAnalysis.calculationLog.dateRange.monthCountFormula}</p>
                </div>
              )}

              {currentAnalysis.calculationLog.totals && (
                <div className="calc-section">
                  <strong>Total Sum</strong>
                  <p>Sum of categorized expenses: {formatCurrency(currentAnalysis.calculationLog.totals.grandTotal)}</p>
                  <p className="formula">{currentAnalysis.calculationLog.totals.formula}</p>
                </div>
              )}

              {currentAnalysis.calculationLog.breakdown && (
                <div className="calc-section">
                  <strong>What Was Excluded</strong>
                  <p>Categorized: {currentAnalysis.calculationLog.breakdown.categorizedCount}</p>
                  <p>Uncategorized: {currentAnalysis.calculationLog.breakdown.uncategorizedCount}</p>
                  <p>Excluded: {currentAnalysis.calculationLog.breakdown.excludedCount}</p>
                </div>
              )}

              {currentAnalysis.excludedSample && currentAnalysis.excludedSample.length > 0 && (
                <details className="excluded-details">
                  <summary>View Sample Excluded Transactions</summary>
                  <div className="excluded-list">
                    {currentAnalysis.excludedSample.map((txn, idx) => (
                      <div key={idx} className="excluded-item">
                        <span className="excluded-date">{txn.date}</span>
                        <span className="excluded-description">{txn.description}</span>
                        <span className="excluded-amount">{formatCurrency(txn.amount)}</span>
                        <span className="excluded-reason">{txn.reason}</span>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          )}

          {/* Bucket Breakdown */}
          <div className="bucket-breakdown">
            <h4>Spending by Category</h4>
            {Object.entries(currentAnalysis.buckets)
              .sort((a, b) => b[1].total - a[1].total)
              .map(([bucket, data]) => (
                <div key={bucket} className="bucket-section">
                  <div className="bucket-header">
                    <span className="bucket-name">{bucket}</span>
                    <span className="bucket-total">{formatCurrency(data.total)}/month</span>
                  </div>
                  <div className="category-list">
                    {data.categories
                      .sort((a, b) => b.monthlyAverage - a.monthlyAverage)
                      .map((cat) => (
                        <div key={cat.category} className="category-item">
                          <span className="category-name">{cat.category}</span>
                          <span className="category-amount">
                            {formatCurrency(cat.monthlyAverage)}
                          </span>
                          <span className="category-count">({cat.transactionCount})</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>

          {/* AI Suggestions for Confirmation */}
          {currentAnalysis.aiSuggestions && currentAnalysis.aiSuggestions.length > 0 && (
            <div className="ai-suggestions-section">
              <h4>AI Categorization Suggestions</h4>
              <p className="ai-hint">
                Review and confirm AI suggestions. Confirmed patterns will be saved for future uploads.
              </p>
              <div className="ai-suggestions-list">
                {currentAnalysis.aiSuggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    className={`ai-suggestion-item ${suggestion.autoApplied ? "auto-applied" : ""}`}
                  >
                    <div className="suggestion-header">
                      <span className="suggestion-description">{suggestion.description}</span>
                      <span className="suggestion-amount">{formatCurrency(suggestion.amount)}</span>
                    </div>
                    <div className="suggestion-body">
                      <div className="suggestion-category">
                        <strong>Suggested Category:</strong> {suggestion.suggestedCategory}
                      </div>
                      <div className="suggestion-reasoning">
                        <em>{suggestion.reasoning}</em>
                      </div>
                      <div className="suggestion-confidence">
                        Confidence: <span className={`confidence-${suggestion.confidence}`}>
                          {suggestion.confidence}
                        </span>
                      </div>
                    </div>
                    {suggestion.autoApplied ? (
                      <div className="suggestion-status">
                        ✓ Auto-applied (high confidence)
                      </div>
                    ) : (
                      <div className="suggestion-actions">
                        <button
                          className="confirm-button"
                          onClick={() =>
                            handleConfirmAISuggestion(
                              suggestion.description,
                              suggestion.suggestedCategory
                            )
                          }
                        >
                          ✓ Confirm & Save Pattern
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => handleRejectAISuggestion(suggestion.description)}
                        >
                          ✕ Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Uncategorized Transactions */}
          {currentAnalysis.uncategorized && currentAnalysis.uncategorized.length > 0 && (
            <div className="uncategorized-section">
              <h4>Sample Uncategorized Transactions ({currentAnalysis.uncategorizedCount} total)</h4>
              <div className="uncategorized-list">
                {currentAnalysis.uncategorized.map((txn, idx) => (
                  <div key={idx} className="uncategorized-item">
                    <div className="txn-description">{txn.description}</div>
                    <div className="txn-amount">{formatCurrency(txn.amount)}</div>
                    <div className="txn-date">{txn.date}</div>
                    {txn.sourceFile && <div className="txn-source">{txn.sourceFile}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
