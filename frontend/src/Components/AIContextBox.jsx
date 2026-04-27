import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Components.css";

const AIContextBox = () => {
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const token = localStorage.getItem("agentToken");
    try {
      const response = await axios.get("/api/agent/settings", {
        headers: {Authorization: token},
      });
      setNotes(response.data.taskPreferences || "");
    } catch (error) {
      console.error("Failed to load AI context:", error);
    }
  };

  const saveNotes = async () => {
    const token = localStorage.getItem("agentToken");
    setSaving(true);

    try {
      await axios.put(
        "/api/agent/settings",
        {taskPreferences: notes},
        {headers: {Authorization: token}},
      );
      setLastSaved(new Date());
    } catch (error) {
      console.error("Failed to save AI context:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="ai-context-box">
      <h3 className="ai-context-box__title">AI Context</h3>

      <p className="ai-context-box__description">Help AI understand your preferences and behavior patterns</p>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Tell me a little more about how you would like to handle certain tasks"
        className="ai-context-box__textarea"
      />

      <button onClick={saveNotes} disabled={saving} className="ai-context-box__button">
        {saving ? "Saving..." : "Save"}
      </button>

      {lastSaved && <div className="ai-context-box__last-saved">Last saved: {lastSaved.toLocaleTimeString()}</div>}
    </div>
  );
};

export default AIContextBox;
