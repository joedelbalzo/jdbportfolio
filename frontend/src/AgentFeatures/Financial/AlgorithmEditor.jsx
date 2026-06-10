import React, { useState } from "react";
import agentApi from "../agentApi";

const AlgorithmEditor = ({ categories, showError, showSuccess }) => {
  const [show, setShow] = useState(false);
  const [rules, setRules] = useState([]);
  const [newPattern, setNewPattern] = useState({ category: "", pattern: "" });

  const fetchRules = async () => {
    try {
      const response = await agentApi.get("/financial/algorithm");
      setRules(response.data.rules);
    } catch (err) {
      console.error("Failed to fetch algorithm rules:", err);
    }
  };

  const handleToggle = () => {
    setShow(!show);
    if (!show && rules.length === 0) {
      fetchRules();
    }
  };

  const handleAddPattern = async () => {
    if (!newPattern.category || !newPattern.pattern) {
      showError("Category and pattern are required");
      return;
    }

    try {
      await agentApi.post("/financial/algorithm/pattern", newPattern);
      showSuccess("Pattern added successfully");
      setNewPattern({ category: "", pattern: "" });
      fetchRules();
    } catch (err) {
      showError(err.response?.data?.error || "Failed to add pattern");
    }
  };

  const handleDeletePattern = async (patternId) => {
    if (!confirm("Delete this custom pattern?")) return;

    try {
      await agentApi.delete(`/financial/algorithm/pattern/${patternId}`);
      showSuccess("Pattern deleted");
      fetchRules();
    } catch (err) {
      showError(err.response?.data?.error || "Failed to delete pattern");
    }
  };

  return (
    <div className="algorithm-section">
      <button className="algorithm-toggle" onClick={handleToggle}>
        {show ? "Hide" : "Show"} Algorithm Editor
      </button>

      {show && (
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
            {rules.map((rule) => (
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
  );
};

export default AlgorithmEditor;
