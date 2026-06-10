import React from "react";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const AnalysisResults = ({ analysis, onConfirmSuggestion, onRejectSuggestion }) => {
  if (!analysis) return null;

  const handleDownload = () => {
    const dataStr = JSON.stringify(analysis, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `financial-analysis-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="upload-details">
      <div className="details-header">
        <h3>{analysis.dateRange}</h3>
        <p>
          {analysis.monthCount} months · {analysis.totalTransactions} transactions
        </p>
        <button className="action-button" onClick={handleDownload}>
          Download Analysis
        </button>
      </div>

      {/* Summary Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{analysis.totalTransactions}</div>
          <div className="stat-label">Total Transactions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{analysis.categorizedCount}</div>
          <div className="stat-label">Categorized</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{analysis.uncategorizedCount}</div>
          <div className="stat-label">Uncategorized</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{analysis.excludedCount}</div>
          <div className="stat-label">Excluded (Transfers)</div>
        </div>
      </div>

      {/* Monthly Average */}
      <div className="total-average">
        <h4>Monthly Average</h4>
        <div className="average-amount">{formatCurrency(analysis.totalMonthlyAverage)}</div>
      </div>

      {/* Calculation Details */}
      {analysis.calculationLog && (
        <div className="calculation-details">
          <h4>Calculation Breakdown</h4>

          {analysis.calculationLog.dateRange && (
            <div className="calc-section">
              <strong>Date Range</strong>
              <p>First transaction: {analysis.calculationLog.dateRange.firstTransactionDate}</p>
              <p>Last transaction: {analysis.calculationLog.dateRange.lastTransactionDate}</p>
              <p>Days between: {analysis.calculationLog.dateRange.daysBetween} days</p>
              <p className="highlight">{analysis.calculationLog.dateRange.monthCountFormula}</p>
            </div>
          )}

          {analysis.calculationLog.totals && (
            <div className="calc-section">
              <strong>Total Sum</strong>
              <p>Sum of categorized expenses: {formatCurrency(analysis.calculationLog.totals.grandTotal)}</p>
              <p className="formula">{analysis.calculationLog.totals.formula}</p>
            </div>
          )}

          {analysis.calculationLog.breakdown && (
            <div className="calc-section">
              <strong>What Was Excluded</strong>
              <p>Categorized: {analysis.calculationLog.breakdown.categorizedCount}</p>
              <p>Uncategorized: {analysis.calculationLog.breakdown.uncategorizedCount}</p>
              <p>Excluded: {analysis.calculationLog.breakdown.excludedCount}</p>
            </div>
          )}

          {analysis.excludedSample && analysis.excludedSample.length > 0 && (
            <details className="excluded-details">
              <summary>View Sample Excluded Transactions</summary>
              <div className="excluded-list">
                {analysis.excludedSample.map((txn, idx) => (
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
        {Object.entries(analysis.buckets)
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
                      <span className="category-amount">{formatCurrency(cat.monthlyAverage)}</span>
                      <span className="category-count">({cat.transactionCount})</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>

      {/* AI Suggestions for Confirmation */}
      {analysis.aiSuggestions && analysis.aiSuggestions.length > 0 && (
        <div className="ai-suggestions-section">
          <h4>AI Categorization Suggestions</h4>
          <p className="ai-hint">
            Review and confirm AI suggestions. Confirmed patterns will be saved for future uploads.
          </p>
          <div className="ai-suggestions-list">
            {analysis.aiSuggestions.map((suggestion, idx) => (
              <div key={idx} className={`ai-suggestion-item ${suggestion.autoApplied ? "auto-applied" : ""}`}>
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
                    Confidence: <span className={`confidence-${suggestion.confidence}`}>{suggestion.confidence}</span>
                  </div>
                </div>
                {suggestion.autoApplied ? (
                  <div className="suggestion-status">✓ Auto-applied (high confidence)</div>
                ) : (
                  <div className="suggestion-actions">
                    <button
                      className="confirm-button"
                      onClick={() => onConfirmSuggestion(suggestion.description, suggestion.suggestedCategory)}
                    >
                      ✓ Confirm & Save Pattern
                    </button>
                    <button className="reject-button" onClick={() => onRejectSuggestion(suggestion.description)}>
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
      {analysis.uncategorized && analysis.uncategorized.length > 0 && (
        <div className="uncategorized-section">
          <h4>Sample Uncategorized Transactions ({analysis.uncategorizedCount} total)</h4>
          <div className="uncategorized-list">
            {analysis.uncategorized.map((txn, idx) => (
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
  );
};

export default AnalysisResults;
