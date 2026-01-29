import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FinancialAnalyzer.css";

const FinancialAnalyzer = () => {
  const token = localStorage.getItem("agentToken");
  const [uploadHistory, setUploadHistory] = useState([]);
  const [combinedHistory, setCombinedHistory] = useState([]);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // 'single' or 'combined'
  const [uploadDetails, setUploadDetails] = useState(null);
  const [transactionBreakdown, setTransactionBreakdown] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [recategorizing, setRecategorizing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedForCombine, setSelectedForCombine] = useState([]);
  const [combining, setCombining] = useState(false);
  const [combineName, setCombineName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showAlgorithmEditor, setShowAlgorithmEditor] = useState(false);
  const [algorithmRules, setAlgorithmRules] = useState([]);
  const [newPattern, setNewPattern] = useState({ category: "", pattern: "" });

  // Fetch upload history and combined history on mount
  useEffect(() => {
    if (token) {
      fetchUploadHistory();
      fetchCombinedHistory();
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

  const fetchUploadHistory = async () => {
    try {
      const response = await axios.get("/api/agent/financial/history", {
        headers: { Authorization: token },
      });
      setUploadHistory(response.data);
    } catch (err) {
      console.error("Failed to fetch upload history:", err);
      setError("Failed to load upload history");
    }
  };

  const fetchCombinedHistory = async () => {
    try {
      const response = await axios.get("/api/agent/financial/combined/history", {
        headers: { Authorization: token },
      });
      setCombinedHistory(response.data);
    } catch (err) {
      console.error("Failed to fetch combined history:", err);
    }
  };

  const fetchUploadDetails = async (uploadId, type = 'single') => {
    try {
      const endpoint = type === 'combined'
        ? `/api/agent/financial/combined/${uploadId}`
        : `/api/agent/financial/${uploadId}`;

      const response = await axios.get(endpoint, {
        headers: { Authorization: token },
      });
      setUploadDetails(response.data);
      setSelectedUpload(uploadId);
      setSelectedType(type);
      setShowBreakdown(false);
      setTransactionBreakdown(null);
    } catch (err) {
      console.error("Failed to fetch upload details:", err);
      setError("Failed to load upload details");
    }
  };

  const fetchTransactionBreakdown = async (uploadId, type = 'single') => {
    try {
      const endpoint = type === 'combined'
        ? `/api/agent/financial/combined/${uploadId}/transactions`
        : `/api/agent/financial/${uploadId}/transactions`;

      const response = await axios.get(endpoint, {
        headers: { Authorization: token },
      });
      setTransactionBreakdown(response.data);
      setShowBreakdown(true);
    } catch (err) {
      console.error("Failed to fetch transaction breakdown:", err);
      setError("Failed to load transaction breakdown");
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

      if (files.length === 1) {
        const upload = response.data.uploads[0];
        let message = `Successfully processed ${upload.summary.totalTransactions} transactions from ${files[0].name}`;

        if (upload.aiCategorization && upload.aiCategorization.recategorized > 0) {
          message += ` (AI categorized ${upload.aiCategorization.recategorized} transactions)`;
        }

        setSuccess(message);

        if (upload.uploadId) {
          setTimeout(() => fetchUploadDetails(upload.uploadId, 'single'), 500);
        }
      } else if (response.data.combined) {
        setSuccess(`Successfully processed and combined ${files.length} files`);
        setTimeout(() => fetchUploadDetails(response.data.combined.combinedId, 'combined'), 500);
      } else {
        setSuccess(`Processed ${files.length} files`);
      }

      fetchUploadHistory();
      fetchCombinedHistory();
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.error || "Failed to upload and process CSV files");
    } finally {
      setUploading(false);
      event.target.value = ""; // Reset file input
    }
  };

  const handleDeleteUpload = async (uploadId, filename, type = 'single') => {
    if (!confirm(`Delete ${type === 'combined' ? 'combined ' : ''}upload: ${filename}?`)) {
      return;
    }

    try {
      const endpoint = type === 'combined'
        ? `/api/agent/financial/combined/${uploadId}`
        : `/api/agent/financial/${uploadId}`;

      await axios.delete(endpoint, {
        headers: { Authorization: token },
      });

      setSuccess(`Deleted: ${filename}`);
      fetchUploadHistory();
      fetchCombinedHistory();

      // Clear details if this was the selected upload
      if (selectedUpload === uploadId && selectedType === type) {
        setSelectedUpload(null);
        setSelectedType(null);
        setUploadDetails(null);
        setTransactionBreakdown(null);
        setShowBreakdown(false);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.response?.data?.error || "Failed to delete upload");
    }
  };

  const toggleSelectForCombine = (uploadId) => {
    setSelectedForCombine(prev => {
      if (prev.includes(uploadId)) {
        return prev.filter(id => id !== uploadId);
      } else {
        return [...prev, uploadId];
      }
    });
  };

  const handleCombineSelected = async () => {
    if (selectedForCombine.length < 2) {
      setError("Please select at least 2 uploads to combine");
      return;
    }

    setCombining(true);
    setError(null);

    try {
      const name = combineName || `Combined Upload: ${new Date().toLocaleDateString()}`;

      const response = await axios.post(
        "/api/agent/financial/combine",
        {
          uploadIds: selectedForCombine,
          name,
        },
        {
          headers: { Authorization: token },
        }
      );

      setSuccess(`Successfully combined ${selectedForCombine.length} uploads`);
      setSelectedForCombine([]);
      setCombineName("");
      fetchCombinedHistory();

      // Auto-select the new combined upload
      if (response.data.combinedId) {
        setTimeout(() => fetchUploadDetails(response.data.combinedId, 'combined'), 500);
      }
    } catch (err) {
      console.error("Combine error:", err);
      setError(err.response?.data?.error || "Failed to combine uploads");
    } finally {
      setCombining(false);
    }
  };

  const handleUpdateCategory = async (transactionId, newCategory) => {
    try {
      setEditingTransaction(transactionId);
      await axios.put(
        `/api/agent/financial/transactions/${transactionId}`,
        { category: newCategory },
        { headers: { Authorization: token } }
      );

      setSuccess(`Updated transaction category to ${newCategory}`);

      // Refresh transaction breakdown and upload details
      if (selectedType === 'single') {
        await fetchTransactionBreakdown(selectedUpload, 'single');
        await fetchUploadDetails(selectedUpload, 'single');
      } else {
        await fetchTransactionBreakdown(selectedUpload, 'combined');
        await fetchUploadDetails(selectedUpload, 'combined');
      }

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update category");
      setTimeout(() => setError(null), 5000);
    } finally {
      setEditingTransaction(null);
    }
  };

  const handleRecategorize = async () => {
    if (!selectedUpload) return;

    setRecategorizing(true);
    setError(null);

    try {
      const response = await axios.post(
        `/api/agent/financial/${selectedUpload}/recategorize`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      setSuccess(
        `AI recategorized ${response.data.recategorized} transactions. ${response.data.stillUncategorized} remain uncategorized.`
      );

      // Refresh details
      fetchUploadDetails(selectedUpload);
    } catch (err) {
      console.error("Recategorization error:", err);
      setError(err.response?.data?.error || "Failed to recategorize transactions");
    } finally {
      setRecategorizing(false);
    }
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

      {/* Upload History */}
      {uploadHistory.length > 0 && (
        <div className="upload-history">
          <h3>Individual Uploads</h3>

          {uploadHistory.length > 1 && (
            <div className="combine-section">
              <div className="combine-controls">
                <input
                  type="text"
                  placeholder="Name for combined upload (optional)"
                  value={combineName}
                  onChange={(e) => setCombineName(e.target.value)}
                  className="combine-name-input"
                />
                <button
                  className="combine-button"
                  onClick={handleCombineSelected}
                  disabled={selectedForCombine.length < 2 || combining}
                >
                  {combining
                    ? "Combining..."
                    : `Combine Selected (${selectedForCombine.length})`}
                </button>
              </div>
            </div>
          )}

          <div className="history-list">
            {uploadHistory.map((upload) => (
              <div
                key={upload.id}
                className={`history-item ${selectedUpload === upload.id && selectedType === 'single' ? "selected" : ""}`}
              >
                {uploadHistory.length > 1 && (
                  <div className="history-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedForCombine.includes(upload.id)}
                      onChange={() => toggleSelectForCombine(upload.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
                <div
                  className="history-item-main"
                  onClick={() => fetchUploadDetails(upload.id, 'single')}
                >
                  <div className="history-item-header">
                    <span className="history-filename">{upload.filename || "Unnamed upload"}</span>
                  </div>
                  <div className="history-item-body">
                    <p>{upload.dateRange}</p>
                    <p>
                      {upload.totalTransactions} transactions ({upload.monthCount} months)
                    </p>
                    <p className="history-average">
                      Avg: {formatCurrency(upload.totalMonthlyAverage)}/month
                    </p>
                  </div>
                </div>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteUpload(upload.id, upload.filename, 'single');
                  }}
                  title="Delete this upload"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Combined Upload History */}
      {combinedHistory.length > 0 && (
        <div className="upload-history">
          <h3>Combined Analyses</h3>
          <div className="history-list">
            {combinedHistory.map((combined) => (
              <div
                key={`combined-${combined.id}`}
                className={`history-item combined ${selectedUpload === combined.id && selectedType === 'combined' ? "selected" : ""}`}
              >
                <div
                  className="history-item-main"
                  onClick={() => fetchUploadDetails(combined.id, 'combined')}
                >
                  <div className="history-item-header">
                    <span className="history-filename">{combined.name}</span>
                  </div>
                  <div className="history-item-body">
                    <p>{combined.dateRange}</p>
                    <p>
                      {combined.totalTransactions} transactions ({combined.monthCount} months)
                    </p>
                    <p className="history-average">
                      Avg: {formatCurrency(combined.totalMonthlyAverage)}/month
                    </p>
                  </div>
                </div>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteUpload(combined.id, combined.name, 'combined');
                  }}
                  title="Delete this combined upload"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Details */}
      {uploadDetails && !showBreakdown && (
        <div className="upload-details">
          <div className="details-header">
            <h3>{uploadDetails.upload.dateRange}</h3>
            <p>
              {uploadDetails.upload.monthCount} months · {uploadDetails.upload.totalTransactions}{" "}
              transactions
            </p>
          </div>

          {/* Summary Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{uploadDetails.upload.totalTransactions}</div>
              <div className="stat-label">Total Transactions</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{uploadDetails.upload.categorizedCount}</div>
              <div className="stat-label">Categorized</div>
            </div>
            <div className="stat-card stat-card-uncategorized">
              <div className="stat-value">{uploadDetails.upload.uncategorizedCount}</div>
              <div className="stat-label">Uncategorized</div>
              {uploadDetails.upload.uncategorizedCount > 0 && (
                <button
                  className="stat-card-button"
                  onClick={handleRecategorize}
                  disabled={recategorizing}
                  title="Re-run AI categorization"
                >
                  {recategorizing ? "..." : "Re-run AI"}
                </button>
              )}
            </div>
            <div className="stat-card">
              <div className="stat-value">{uploadDetails.upload.excludedCount}</div>
              <div className="stat-label">Excluded (Transfers)</div>
            </div>
          </div>

          {/* Monthly Average */}
          <div className="total-average">
            <h4>Monthly Average</h4>
            <div className="average-amount">
              {formatCurrency(uploadDetails.upload.totalMonthlyAverage)}
            </div>
          </div>

          {/* Calculation & Source Grid */}
          <div className="calc-source-grid">
            {/* Source Breakdown (for combined uploads) */}
            {selectedType === 'combined' && uploadDetails.sourceBreakdown && (
              <div className="source-breakdown">
                <h4>Breakdown by Source File</h4>
                {(() => {
                  const maxAverage = Math.max(...uploadDetails.sourceBreakdown.map(s => s.monthlyAverage));
                  return uploadDetails.sourceBreakdown.map((source, idx) => (
                    <div
                      key={idx}
                      className={`source-item ${source.monthlyAverage === maxAverage ? 'heaviest' : ''}`}
                    >
                      <div className="source-header">
                        <span className="source-filename">{source.filename}</span>
                        <div className="source-details">
                          <span>{source.transactionCount} transactions</span>
                          <span>{source.monthCount} months</span>
                        </div>
                      </div>
                      <span className="source-average">
                        {formatCurrency(source.monthlyAverage)}/month
                      </span>
                    </div>
                  ));
                })()}
              </div>
            )}

            {/* Calculation Details */}
            {uploadDetails.calculationLog && (
              <div className="calculation-details">
              <h4>Calculation Breakdown (How We Got This Number)</h4>

              {uploadDetails.calculationLog.dateRange && (
                <div className="calc-section">
                  <strong>Question 1: What date range?</strong>
                  <p>First transaction: {uploadDetails.calculationLog.dateRange.firstTransactionDate}</p>
                  <p>Last transaction: {uploadDetails.calculationLog.dateRange.lastTransactionDate}</p>
                  <p>Days between: {uploadDetails.calculationLog.dateRange.daysBetween} days</p>
                </div>
              )}

              {uploadDetails.calculationLog.dateRange && (
                <div className="calc-section">
                  <strong>Question 2: How many months?</strong>
                  <p>{uploadDetails.calculationLog.dateRange.monthCountFormula}</p>
                  <p className="highlight">Using {uploadDetails.calculationLog.dateRange.monthCountUsed} months for division</p>
                </div>
              )}

              {uploadDetails.calculationLog.totals && (
                <div className="calc-section">
                  <strong>Question 3: What's the total sum?</strong>
                  <p>Sum of all categorized expenses: {formatCurrency(uploadDetails.calculationLog.totals.grandTotal)}</p>
                </div>
              )}

              {uploadDetails.calculationLog.breakdown && (
                <div className="calc-section">
                  <strong>Question 4: What was excluded?</strong>
                  <p>Transactions kept for analysis: {uploadDetails.calculationLog.breakdown.categorizedCount}</p>
                  <p className="highlight">
                    Of those, {uploadDetails.calculationLog.breakdown.uncategorizedCount} had no matching category pattern
                  </p>
                  <p>Excluded as transfers/payments: {uploadDetails.calculationLog.breakdown.excludedCount}</p>
                  <p className="math-check">{uploadDetails.calculationLog.breakdown.mathCheck}</p>
                  {uploadDetails.calculationLog.breakdown.note && (
                    <p className="math-check">{uploadDetails.calculationLog.breakdown.note}</p>
                  )}
                </div>
              )}

              {uploadDetails.calculationLog.totals && (
                <div className="calc-section final-calc">
                  <strong>Final Calculation:</strong>
                  <p className="formula">{uploadDetails.calculationLog.totals.formula}</p>
                </div>
              )}

              {uploadDetails.excludedTransactions && uploadDetails.excludedTransactions.length > 0 && (
                <details className="excluded-details">
                  <summary>View First {uploadDetails.excludedTransactions.length} Excluded Transactions</summary>
                  <div className="excluded-list">
                    {uploadDetails.excludedTransactions.map((txn, idx) => (
                      <div key={idx} className="excluded-item">
                        <span className="excluded-date">{txn.date}</span>
                        <span className="excluded-description">{txn.description}</span>
                        <span className="excluded-amount">{formatCurrency(txn.absAmount)}</span>
                        <span className="excluded-reason">{txn.reason}</span>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="action-button"
              onClick={() => fetchTransactionBreakdown(selectedUpload, selectedType)}
            >
              View Detailed Breakdown
            </button>
          </div>

          {/* Bucket Breakdown */}
          <div className="bucket-breakdown">
            <h4>Spending by Category</h4>
            {Object.entries(uploadDetails.buckets)
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

          {/* Uncategorized Transactions */}
          {uploadDetails.uncategorized && uploadDetails.uncategorized.length > 0 && (
            <div className="uncategorized-section">
              <div className="uncategorized-header">
                <h4>Uncategorized Transactions ({uploadDetails.uncategorized.length})</h4>
                <button
                  className="recategorize-button"
                  onClick={handleRecategorize}
                  disabled={recategorizing}
                >
                  {recategorizing ? "Processing..." : "Recategorize with AI"}
                </button>
              </div>
              <div className="uncategorized-list">
                {uploadDetails.uncategorized.map((txn) => (
                  <div key={txn.id} className="uncategorized-item">
                    <div className="txn-description">{txn.description}</div>
                    <div className="txn-amount">{formatCurrency(txn.amount)}</div>
                    {txn.aiSuggestedCategory && (
                      <div className="ai-suggestion">
                        <strong>AI Suggestion: {txn.aiSuggestedCategory}</strong>
                        <em>{txn.aiReasoning}</em>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Transaction Breakdown View */}
      {transactionBreakdown && showBreakdown && (
        <div className="transaction-breakdown">
          <div className="breakdown-header">
            <h3>Transaction Breakdown: {transactionBreakdown.upload.filename}</h3>
            <p>{transactionBreakdown.upload.dateRange} ({transactionBreakdown.upload.monthCount} months)</p>
            <button className="action-button" onClick={() => setShowBreakdown(false)}>
              Back to Summary
            </button>
          </div>

          <div className="breakdown-info">
            <p><strong>Total Transactions:</strong> {transactionBreakdown.transactions.length}</p>
            <p>This shows the exact categorization of every transaction for verification against your spreadsheet.</p>
          </div>

          <div className="breakdown-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Raw Amount</th>
                  <th>Normalized</th>
                  <th>Abs Amount</th>
                  <th>Source</th>
                  {selectedType === 'combined' && <th>File</th>}
                  <th>Category</th>
                  <th>Bucket</th>
                </tr>
              </thead>
              <tbody>
                {transactionBreakdown.transactions.map((txn, idx) => (
                  <tr key={idx}>
                    <td>{txn.date}</td>
                    <td className="description-cell">{txn.description}</td>
                    <td className="amount-cell">{formatCurrency(txn.rawAmount)}</td>
                    <td className="amount-cell">{formatCurrency(txn.normalizedAmount)}</td>
                    <td className="amount-cell">{formatCurrency(txn.absAmount)}</td>
                    <td className="source-cell">{txn.source}</td>
                    {selectedType === 'combined' && (
                      <td className="source-cell">{txn.sourceFile}</td>
                    )}
                    <td className="category-cell">
                      <select
                        value={txn.category}
                        onChange={(e) => handleUpdateCategory(txn.id, e.target.value)}
                        disabled={editingTransaction === txn.id}
                        className="category-select"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{txn.bucket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {uploadHistory.length === 0 && !uploading && (
        <div className="empty-state">
          No uploads yet. Upload your first CSV to get started.
        </div>
      )}
    </div>
  );
};

export default FinancialAnalyzer;
