import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import TaskTracker from "../AgentFeatures/Tasks/TaskTracker";
import ContentCuration from "../AgentFeatures/ContentCuration/ContentCuration";
import FinancialAnalyzer from "../AgentFeatures/Financial/FinancialAnalyzer";
import "./Dashboard.css";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tasks");

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("agentToken", tokenFromUrl);
      navigate("/dashboard", {replace: true});
    }

    const loadUser = async () => {
      const token = localStorage.getItem("agentToken");

      if (!token) {
        window.location.href = "/api/agent/auth/google";
        return;
      }

      try {
        const response = await axios.get("/api/agent/auth", {
          headers: {Authorization: token},
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Auth error:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("agentToken");
          window.location.href = "/api/agent/auth/google";
        } else {
          setLoading(false);
        }
      }
    };

    loadUser();
  }, [searchParams, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("agentToken");
    window.location.href = "/";
  };

  if (loading) {
    return <Loader message="Loading dashboard..." />;
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Agent Dashboard</h1>
          <div className="dashboard__user-info">{user?.name || user?.email}</div>
        </div>
        <a href="#" onClick={handleLogout} className="dashboard__logout-link">
          logout
        </a>
      </header>

      {/* Tab Navigation */}
      <div className="dashboard__tabs">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`dashboard__tab ${activeTab === "tasks" ? "dashboard__tab--active-tasks" : "dashboard__tab--inactive"}`}>
          Household Tasks
        </button>
        <button
          onClick={() => setActiveTab("content")}
          className={`dashboard__tab ${activeTab === "content" ? "dashboard__tab--active-content" : "dashboard__tab--inactive"}`}>
          Content Curation
        </button>
        <button
          onClick={() => setActiveTab("financial")}
          className={`dashboard__tab ${activeTab === "financial" ? "dashboard__tab--active-financial" : "dashboard__tab--inactive"}`}>
          Financial Analyzer
        </button>
      </div>

      {/* Feature Content */}
      <div className="dashboard__content">
        {activeTab === "tasks" && <TaskTracker />}
        {activeTab === "content" && <ContentCuration />}
        {activeTab === "financial" && <FinancialAnalyzer />}
      </div>
    </div>
  );
};

export default Dashboard;
