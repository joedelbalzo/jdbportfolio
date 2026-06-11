import { useEffect, useState } from "react";
import agentApi from "../AgentFeatures/agentApi";
import Loader from "../Components/Loader";
import TaskTracker from "../AgentFeatures/Tasks/TaskTracker";
import FinancialAnalyzer from "../AgentFeatures/Financial/FinancialAnalyzer";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tasks");

  useEffect(() => {
    // Token arrives in the URL fragment so it never reaches server logs or analytics
    if (window.location.hash.startsWith("#token=")) {
      localStorage.setItem("agentToken", window.location.hash.slice("#token=".length));
      window.history.replaceState(null, "", window.location.pathname);
    }

    const loadUser = async () => {
      if (!localStorage.getItem("agentToken")) {
        window.location.href = "/api/agent/auth/google";
        return;
      }

      try {
        const response = await agentApi.get("/auth");
        setUser(response.data);
      } catch (error) {
        // 401 is handled by the interceptor (clears token, re-runs OAuth)
        console.error("Auth error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

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

      <div className="dashboard__tabs">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`dashboard__tab ${activeTab === "tasks" ? "dashboard__tab--active-tasks" : "dashboard__tab--inactive"}`}
        >
          Household Tasks
        </button>
        <button
          onClick={() => setActiveTab("financial")}
          className={`dashboard__tab ${activeTab === "financial" ? "dashboard__tab--active-financial" : "dashboard__tab--inactive"}`}
        >
          Financial Analyzer
        </button>
      </div>

      <div className="dashboard__content">
        {activeTab === "tasks" && <TaskTracker />}
        {activeTab === "financial" && <FinancialAnalyzer />}
      </div>
    </div>
  );
};

export default Dashboard;
