import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [fetchResult, setFetchResult] = useState(null);

  useEffect(() => {
    // Check if there's a token in the URL
    const tokenFromUrl = searchParams.get("token");

    if (tokenFromUrl) {
      // Store token in localStorage
      localStorage.setItem("agentToken", tokenFromUrl);
      // Clean up URL by removing token parameter
      navigate("/dashboard", { replace: true });
    }

    // Load user data
    const loadUser = async () => {
      const token = localStorage.getItem("agentToken");

      if (!token) {
        // No token, redirect to login
        window.location.href = "/api/agent/auth/google";
        return;
      }

      try {
        // Verify token and get user
        const response = await axios.get("/api/agent/auth", {
          headers: { Authorization: token },
        });
        setUser(response.data);

        // Load stats
        const statsResponse = await axios.get("/api/agent/jobs/stats", {
          headers: { Authorization: token },
        });
        setStats(statsResponse.data);

        // Load recent articles
        const articlesResponse = await axios.get("/api/agent/articles?limit=10", {
          headers: { Authorization: token },
        });
        setArticles(articlesResponse.data.articles);

        setLoading(false);
      } catch (error) {
        console.error("Auth error:", error);
        // Token invalid, clear it and redirect to login
        localStorage.removeItem("agentToken");
        window.location.href = "/api/agent/auth/google";
      }
    };

    loadUser();
  }, [searchParams, navigate]);

  const handleFetchNow = async () => {
    const token = localStorage.getItem("agentToken");
    setFetching(true);
    setFetchResult(null);

    try {
      // Get the first active feed to test
      const feedsResponse = await axios.get("/api/agent/feeds", {
        headers: { Authorization: token },
      });

      const activeFeed = feedsResponse.data.find(f => f.isActive);

      if (!activeFeed) {
        setFetchResult({ error: "No active feeds found. Please contact admin." });
        setFetching(false);
        return;
      }

      const response = await axios.post(`/api/agent/jobs/fetch/${activeFeed.id}`, {}, {
        headers: { Authorization: token },
      });

      setFetchResult({
        success: true,
        data: response.data,
      });

      // Reload stats and articles after fetch
      const statsResponse = await axios.get("/api/agent/jobs/stats", {
        headers: { Authorization: token },
      });
      setStats(statsResponse.data);

      const articlesResponse = await axios.get("/api/agent/articles?limit=10", {
        headers: { Authorization: token },
      });
      setArticles(articlesResponse.data.articles);

    } catch (error) {
      console.error("Fetch error:", error);
      setFetchResult({
        error: error.response?.data?.error || error.message || "Failed to fetch articles",
      });
    } finally {
      setFetching(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("agentToken");
    window.location.href = "/";
  };

  const handleMarkRead = async (articleId) => {
    const token = localStorage.getItem("agentToken");
    try {
      await axios.put(`/api/agent/articles/${articleId}/read`, {}, {
        headers: { Authorization: token },
      });
      // Update local state
      setArticles(articles.map(a =>
        a.id === articleId ? { ...a, isRead: true } : a
      ));
    } catch (error) {
      console.error("Error marking article as read:", error);
    }
  };

  const handleToggleSave = async (articleId) => {
    const token = localStorage.getItem("agentToken");
    try {
      const response = await axios.put(`/api/agent/articles/${articleId}/save`, {}, {
        headers: { Authorization: token },
      });
      // Update local state
      setArticles(articles.map(a =>
        a.id === articleId ? { ...a, isSaved: response.data.isSaved } : a
      ));
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "40px",
        borderBottom: "2px solid #e0e0e0",
        paddingBottom: "20px"
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "28px" }}>Agent Dashboard</h1>
          <p style={{ margin: "5px 0 0 0", color: "#666" }}>
            Welcome, {user?.name || user?.email}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleFetchNow}
            disabled={fetching}
            style={{
              padding: "10px 20px",
              backgroundColor: fetching ? "#ccc" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: fetching ? "not-allowed" : "pointer",
              fontSize: "14px"
            }}
          >
            {fetching ? "Fetching..." : "Fetch Now"}
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {fetchResult && (
        <div style={{
          padding: "15px",
          backgroundColor: fetchResult.error ? "#ffebee" : "#e8f5e9",
          border: `1px solid ${fetchResult.error ? "#f44336" : "#4CAF50"}`,
          borderRadius: "4px",
          marginBottom: "20px"
        }}>
          {fetchResult.error ? (
            <p style={{ margin: 0, color: "#c62828" }}>
              <strong>Error:</strong> {fetchResult.error}
            </p>
          ) : (
            <div>
              <p style={{ margin: "0 0 10px 0", color: "#2e7d32" }}>
                <strong>✓ Success!</strong> Fetched from {fetchResult.data.feed}
              </p>
              <div style={{ fontSize: "14px", color: "#555" }}>
                <div>Total fetched: {fetchResult.data.totalFetched}</div>
                <div>AI approved: <strong>{fetchResult.data.aiApproved}</strong></div>
                <div>AI rejected: {fetchResult.data.aiRejected}</div>
                <div>New articles saved: <strong>{fetchResult.data.articlesProcessed}</strong></div>
              </div>
            </div>
          )}
        </div>
      )}

      {stats && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}>
          <StatCard title="Total Articles" value={stats.totalArticles} />
          <StatCard title="Unread" value={stats.unreadArticles} color="#2196F3" />
          <StatCard title="Saved" value={stats.savedArticles} color="#4CAF50" />
          <StatCard title="Recent Jobs" value={stats.recentJobs} color="#FF9800" />
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>Recent Articles</h2>
        {articles.length === 0 ? (
          <p style={{ color: "#666", fontStyle: "italic" }}>
            No articles yet. The cron job will fetch curated content automatically.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onMarkRead={handleMarkRead}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color = "#333" }) => (
  <div style={{
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #e0e0e0"
  }}>
    <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>{title}</div>
    <div style={{ fontSize: "32px", fontWeight: "bold", color }}>{value}</div>
  </div>
);

const ArticleCard = ({ article, onMarkRead, onToggleSave }) => (
  <div style={{
    padding: "20px",
    backgroundColor: article.isRead ? "#f5f5f5" : "white",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    opacity: article.isRead ? 0.7 : 1
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#1976d2",
          textDecoration: "none",
          flex: 1
        }}
      >
        {article.title}
      </a>
      <span style={{
        fontSize: "12px",
        padding: "4px 8px",
        backgroundColor: getSourceColor(article.sourceType),
        color: "white",
        borderRadius: "4px",
        marginLeft: "10px",
        whiteSpace: "nowrap"
      }}>
        {article.sourceType}
      </span>
    </div>

    {article.aiSummary && (
      <div style={{
        padding: "10px",
        backgroundColor: "#fff3cd",
        borderLeft: "3px solid #ffc107",
        marginBottom: "10px",
        fontSize: "14px",
        fontStyle: "italic"
      }}>
        <strong>AI:</strong> {article.aiSummary}
      </div>
    )}

    <div style={{
      display: "flex",
      gap: "15px",
      fontSize: "13px",
      color: "#666",
      marginBottom: "10px"
    }}>
      {article.author && <span>👤 {article.author}</span>}
      <span>⬆️ {article.score}</span>
      <span>💬 {article.commentCount}</span>
      {article.relevanceScore && (
        <span style={{ color: "#4CAF50", fontWeight: "600" }}>
          ⭐ {article.relevanceScore}/10
        </span>
      )}
    </div>

    <div style={{ display: "flex", gap: "10px" }}>
      {!article.isRead && (
        <button
          onClick={() => onMarkRead(article.id)}
          style={{
            padding: "6px 12px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px"
          }}
        >
          Mark as Read
        </button>
      )}
      <button
        onClick={() => onToggleSave(article.id)}
        style={{
          padding: "6px 12px",
          backgroundColor: article.isSaved ? "#4CAF50" : "#757575",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "12px"
        }}
      >
        {article.isSaved ? "Saved ✓" : "Save"}
      </button>
    </div>
  </div>
);

const getSourceColor = (sourceType) => {
  switch (sourceType) {
    case "reddit":
      return "#FF4500";
    case "hackernews":
      return "#FF6600";
    case "stackoverflow":
      return "#F48024";
    default:
      return "#666";
  }
};

export default Dashboard;
