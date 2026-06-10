import React from "react";

const SessionFileList = ({ uploads, selectedIds, onToggleSelect, onRemove, onAnalyzeSelected }) => {
  if (uploads.length === 0) return null;

  return (
    <div className="upload-history">
      <h3>Uploaded Files (Session Only)</h3>

      {uploads.length > 1 && (
        <div className="combine-section">
          <p style={{ color: "#b0b0b0", fontSize: "14px", marginBottom: "10px" }}>
            Select files to include in analysis • Refresh page to clear all
          </p>
          <button className="combine-button" onClick={onAnalyzeSelected} disabled={selectedIds.length === 0}>
            Analyze Selected ({selectedIds.length})
          </button>
        </div>
      )}

      <div className="history-list">
        {uploads.map((upload) => (
          <div key={upload.id} className={`history-item ${selectedIds.includes(upload.id) ? "selected" : ""}`}>
            {uploads.length > 1 && (
              <div className="history-checkbox">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(upload.id)}
                  onChange={() => onToggleSelect(upload.id)}
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
                <p>
                  {upload.categorizedCount} categorized · {upload.uncategorizedCount} uncategorized
                </p>
              </div>
            </div>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(upload.id);
              }}
              title="Remove from session"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionFileList;
