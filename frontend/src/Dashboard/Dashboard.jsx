import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import FinancialAnalyzer from "../AgentDashboard/FinancialAnalyzer";
import Loader from "../Components/Loader";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [fetchResult, setFetchResult] = useState(null);
  const [topics, setTopics] = useState([]);
  const [newTopicKeyword, setNewTopicKeyword] = useState("");
  const [articleFilter, setArticleFilter] = useState("all"); // "all", "unread", "saved"
  const [showSettings, setShowSettings] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [relevanceThreshold, setRelevanceThreshold] = useState(7);
  const [maxArticlesPerRun, setMaxArticlesPerRun] = useState(15);
  const [activeTab, setActiveTab] = useState("content"); // "content" or "financial"

  useEffect(() => {
    // Check if there's a token in the URL
    const tokenFromUrl = searchParams.get("token");

    if (tokenFromUrl) {
      // Store token in localStorage
      localStorage.setItem("agentToken", tokenFromUrl);
      // Clean up URL by removing token parameter
      navigate("/dashboard", {replace: true});
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
          headers: {Authorization: token},
        });
        setUser(response.data);

        // Load stats (don't fail if this errors)
        try {
          const statsResponse = await axios.get("/api/agent/jobs/stats", {
            headers: {Authorization: token},
          });
          setStats(statsResponse.data);
        } catch (err) {
          console.error("Failed to load stats:", err);
        }

        // Load recent articles (don't fail if this errors)
        try {
          const articlesResponse = await axios.get("/api/agent/articles?limit=10", {
            headers: {Authorization: token},
          });
          setArticles(articlesResponse.data.articles);
        } catch (err) {
          console.error("Failed to load articles:", err);
        }

        // Load topics (don't fail if this errors)
        try {
          const topicsResponse = await axios.get("/api/agent/topics", {
            headers: {Authorization: token},
          });
          setTopics(topicsResponse.data);
        } catch (err) {
          console.error("Failed to load topics:", err);
        }

        // Load AI settings
        try {
          const settingsResponse = await axios.get("/api/agent/settings", {
            headers: {Authorization: token},
          });
          setAiPrompt(settingsResponse.data.aiPrompt || "");
          setRelevanceThreshold(settingsResponse.data.relevanceThreshold || 7);
          setMaxArticlesPerRun(settingsResponse.data.maxArticlesPerRun || 15);
        } catch (err) {
          console.error("Failed to load settings:", err);
        }

        setLoading(false);
      } catch (error) {
        console.error("Auth error:", error);
        // Only clear token if auth verification failed (401)
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

  const handleFetchNow = async () => {
    const token = localStorage.getItem("agentToken");
    setFetching(true);
    setFetchResult(null);

    try {
      // Fetch from ALL sources
      const response = await axios.get("/api/agent/jobs/fetch-all", {
        headers: {Authorization: token},
      });

      const results = response.data.results || [];
      const totalApproved = results.reduce((sum, r) => sum + (r.aiApproved || 0), 0);
      const totalRejected = results.reduce((sum, r) => sum + (r.aiRejected || 0), 0);
      const totalNew = results.reduce((sum, r) => sum + (r.articlesProcessed || 0), 0);

      setFetchResult({
        success: true,
        data: {
          feed: `${results.length} sources`,
          aiApproved: totalApproved,
          aiRejected: totalRejected,
          articlesProcessed: totalNew,
          totalFetched: totalApproved + totalRejected,
        },
      });

      // Reload stats and articles after fetch
      const statsResponse = await axios.get("/api/agent/jobs/stats", {
        headers: {Authorization: token},
      });
      setStats(statsResponse.data);

      const articlesResponse = await axios.get("/api/agent/articles?limit=10", {
        headers: {Authorization: token},
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

  const handleAddTopic = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("agentToken");
    const keyword = newTopicKeyword.trim().toLowerCase();

    if (!keyword) return;

    // Check for duplicates
    if (topics.some((t) => t.keyword === keyword)) {
      alert("Topic already exists!");
      return;
    }

    try {
      const response = await axios.post("/api/agent/topics", {keyword, isActive: true}, {headers: {Authorization: token}});
      setTopics([...topics, response.data]);
      setNewTopicKeyword("");
    } catch (error) {
      console.error("Error adding topic:", error);
      alert("Failed to add topic");
    }
  };

  const handleDeleteTopic = async (topicId) => {
    const token = localStorage.getItem("agentToken");
    try {
      await axios.delete(`/api/agent/topics/${topicId}`, {
        headers: {Authorization: token},
      });
      setTopics(topics.filter((t) => t.id !== topicId));
    } catch (error) {
      console.error("Error deleting topic:", error);
      alert("Failed to delete topic");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("agentToken");
    window.location.href = "/";
  };

  const handleSaveSettings = async () => {
    const token = localStorage.getItem("agentToken");
    try {
      await axios.put(
        "/api/agent/settings",
        {
          aiPrompt,
          relevanceThreshold,
          maxArticlesPerRun,
        },
        {headers: {Authorization: token}},
      );
      alert("Settings saved!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    }
  };

  const handleMarkRead = async (articleId) => {
    const token = localStorage.getItem("agentToken");
    try {
      await axios.put(
        `/api/agent/articles/${articleId}/read`,
        {},
        {
          headers: {Authorization: token},
        },
      );
      // Update local state
      setArticles(articles.map((a) => (a.id === articleId ? {...a, isRead: true} : a)));
    } catch (error) {
      console.error("Error marking article as read:", error);
    }
  };

  const handleToggleSave = async (articleId) => {
    const token = localStorage.getItem("agentToken");
    try {
      const response = await axios.put(
        `/api/agent/articles/${articleId}/save`,
        {},
        {
          headers: {Authorization: token},
        },
      );
      // Update local state
      setArticles(articles.map((a) => (a.id === articleId ? {...a, isSaved: response.data.isSaved} : a)));
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  if (loading) {
    return <Loader message="Loading dashboard..." />;
  }

  return (
    <div style={{padding: "30px 20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "'Roboto', sans-serif"}}>
      <header
        style={{
          marginBottom: "25px",
          paddingBottom: "20px",
          borderBottom: "2px solid #ff5722",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <div>
          <h1 style={{margin: 0, fontSize: "32px", color: "whitesmoke", fontFamily: "'Space Grotesk', sans-serif"}}>Agent Dashboard</h1>
          <div style={{fontSize: "16px", color: "#737373", marginTop: "8px"}}>{user?.name || user?.email}</div>
        </div>
        <div style={{display: "flex", gap: "12px", alignItems: "center"}}>
          {activeTab === "content" && (
            <>
              <button
                onClick={handleFetchNow}
                disabled={fetching}
                style={{
                  padding: "10px 20px",
                  backgroundColor: fetching ? "#737373" : "#0066ff",
                  color: "whitesmoke",
                  border: "none",
                  cursor: fetching ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  transition: "0.3s ease",
                }}>
                {fetching ? "Fetching..." : "Fetch Now"}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#737373",
                  color: "whitesmoke",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}>
                Settings
              </button>
            </>
          )}
          <a href="#" onClick={handleLogout} style={{color: "#737373", fontSize: "16px", textDecoration: "none"}}>
            logout
          </a>
        </div>
      </header>

      {/* Tab Navigation */}
      <div style={{marginBottom: "25px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
        <div style={{display: "flex", gap: "20px"}}>
          <button
            onClick={() => setActiveTab("content")}
            style={{
              padding: "10px 0",
              backgroundColor: "transparent",
              color: activeTab === "content" ? "whitesmoke" : "#b0b0b0",
              border: "none",
              borderBottom: activeTab === "content" ? "2px solid #0066ff" : "2px solid transparent",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "400",
              transition: "all 0.2s",
            }}>
            Content Curation
          </button>
          <button
            onClick={() => setActiveTab("financial")}
            style={{
              padding: "10px 0",
              backgroundColor: "transparent",
              color: activeTab === "financial" ? "whitesmoke" : "#b0b0b0",
              border: "none",
              borderBottom: activeTab === "financial" ? "2px solid #ff5722" : "2px solid transparent",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "400",
              transition: "all 0.2s",
            }}>
            Financial Analyzer
          </button>
        </div>
      </div>

      {/* Render active tab content */}
      {activeTab === "financial" ? (
        <FinancialAnalyzer />
      ) : (
        <>
          {fetchResult && (
        <div
          style={{
            padding: "12px",
            marginBottom: "20px",
            backgroundColor: fetchResult.error ? "rgba(255, 87, 34, 0.1)" : "rgba(0, 102, 255, 0.1)",
            border: `1px solid ${fetchResult.error ? "#ff5722" : "#0066ff"}`,
            color: "whitesmoke",
            fontSize: "15px",
          }}>
          {fetchResult.error ? (
            <span>Error: {fetchResult.error}</span>
          ) : (
            <span>
              Fetched from {fetchResult.data.feed}: <strong>{fetchResult.data.aiApproved}</strong> approved / {fetchResult.data.aiRejected}{" "}
              rejected ({fetchResult.data.articlesProcessed} new)
            </span>
          )}
        </div>
      )}

      {stats && (
        <div style={{marginBottom: "20px", fontSize: "15px", color: "#737373"}}>
          {stats.totalArticles} articles · {stats.unreadArticles} unread · {stats.savedArticles} saved · {stats.recentJobs} jobs last 24h
        </div>
      )}

      <div style={{marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
        <div style={{marginBottom: "10px", fontSize: "16px"}}>
          <strong style={{color: "#ff5722"}}>Topics</strong>
          <span style={{fontSize: "13px", color: "#737373", marginLeft: "8px"}}>(cron uses these for AI curation)</span>
        </div>

        <div style={{display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px"}}>
          {topics.length === 0 ? (
            <span style={{color: "#737373", fontSize: "16px"}}>No topics yet. Add some below.</span>
          ) : (
            topics.map((topic) => (
              <div
                key={topic.id}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  backgroundColor: "rgba(0, 102, 255, 0.2)",
                  border: "1px solid #0066ff",
                  color: "whitesmoke",
                  fontSize: "16px",
                }}>
                <span>{topic.keyword}</span>
                <button
                  onClick={() => handleDeleteTopic(topic.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ff5722",
                    cursor: "pointer",
                    fontSize: "20px",
                    padding: "0",
                    lineHeight: "1",
                    fontWeight: "bold",
                  }}
                  title="Remove topic">
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleAddTopic} style={{display: "flex", gap: "10px", alignItems: "center"}}>
          <input
            type="text"
            value={newTopicKeyword}
            onChange={(e) => setNewTopicKeyword(e.target.value)}
            placeholder="add topic keyword"
            style={{
              padding: "8px 12px",
              border: "1px solid #737373",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "whitesmoke",
              fontSize: "16px",
              fontFamily: "'Roboto', sans-serif",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "#0066ff",
              color: "whitesmoke",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}>
            add
          </button>
        </form>
      </div>

      {showSettings && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowSettings(false)}>
          <div
            style={{
              backgroundColor: "#1a1d2e",
              padding: "30px",
              borderRadius: "8px",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
              border: "2px solid #ff5722",
            }}
            onClick={(e) => e.stopPropagation()}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px"}}>
              <h2 style={{margin: 0, color: "#ff5722", fontSize: "24px"}}>AI Curation Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#737373",
                  fontSize: "28px",
                  cursor: "pointer",
                  padding: "0",
                  lineHeight: "1",
                }}>
                ×
              </button>
            </div>

            <div style={{display: "flex", flexDirection: "column", gap: "25px"}}>
              <div>
                <label style={{color: "whitesmoke", fontSize: "16px", marginBottom: "8px", display: "block", fontWeight: "500"}}>AI Prompt</label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Custom AI curation prompt... Use {topics} as placeholder for your topics"
                  rows={10}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #737373",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    color: "whitesmoke",
                    fontSize: "14px",
                    fontFamily: "monospace",
                    resize: "vertical",
                    borderRadius: "4px",
                  }}
                />
                <div style={{fontSize: "13px", color: "#737373", marginTop: "6px"}}>
                  Use {"{topics}"} to insert your topic keywords into the prompt
                </div>
              </div>

              <div>
                <label style={{color: "whitesmoke", fontSize: "16px", marginBottom: "12px", display: "block", fontWeight: "500"}}>
                  Relevance Threshold: <strong style={{color: "#0066ff"}}>{relevanceThreshold}/10</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={relevanceThreshold}
                  onChange={(e) => setRelevanceThreshold(parseInt(e.target.value))}
                  style={{width: "100%", accentColor: "#0066ff"}}
                />
                <div style={{fontSize: "13px", color: "#737373", marginTop: "6px"}}>
                  Only save articles with AI relevance score ≥ {relevanceThreshold}
                </div>
              </div>

              <div>
                <label style={{color: "whitesmoke", fontSize: "16px", marginBottom: "8px", display: "block", fontWeight: "500"}}>
                  Max Articles Per Run
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={maxArticlesPerRun}
                  onChange={(e) => setMaxArticlesPerRun(parseInt(e.target.value))}
                  style={{
                    padding: "10px",
                    border: "1px solid #737373",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    color: "whitesmoke",
                    fontSize: "16px",
                    width: "120px",
                    borderRadius: "4px",
                  }}
                />
                <div style={{fontSize: "13px", color: "#737373", marginTop: "6px"}}>
                  Limit articles saved per cron run to top {maxArticlesPerRun} (sorted by relevance)
                </div>
              </div>

              <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>
                <button
                  onClick={() => {
                    handleSaveSettings();
                    setShowSettings(false);
                  }}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#0066ff",
                    color: "whitesmoke",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    borderRadius: "4px",
                  }}>
                  Save Settings
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#737373",
                    color: "whitesmoke",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    borderRadius: "4px",
                  }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <div style={{marginBottom: "20px", display: "flex", gap: "15px", alignItems: "center"}}>
          <span style={{color: "whitesmoke", fontSize: "16px"}}>Show:</span>
          <button
            onClick={() => setArticleFilter("all")}
            style={{
              padding: "6px 12px",
              backgroundColor: articleFilter === "all" ? "#0066ff" : "rgba(255, 255, 255, 0.05)",
              color: "whitesmoke",
              border: `1px solid ${articleFilter === "all" ? "#0066ff" : "#737373"}`,
              cursor: "pointer",
              fontSize: "14px",
            }}>
            All
          </button>
          <button
            onClick={() => setArticleFilter("unread")}
            style={{
              padding: "6px 12px",
              backgroundColor: articleFilter === "unread" ? "#0066ff" : "rgba(255, 255, 255, 0.05)",
              color: "whitesmoke",
              border: `1px solid ${articleFilter === "unread" ? "#0066ff" : "#737373"}`,
              cursor: "pointer",
              fontSize: "14px",
            }}>
            Unread
          </button>
          <button
            onClick={() => setArticleFilter("saved")}
            style={{
              padding: "6px 12px",
              backgroundColor: articleFilter === "saved" ? "#0066ff" : "rgba(255, 255, 255, 0.05)",
              color: "whitesmoke",
              border: `1px solid ${articleFilter === "saved" ? "#0066ff" : "#737373"}`,
              cursor: "pointer",
              fontSize: "14px",
            }}>
            Saved
          </button>
        </div>

        {articles.filter((article) => {
          if (articleFilter === "unread") return !article.isRead;
          if (articleFilter === "saved") return article.isSaved;
          return true;
        }).length === 0 ? (
          <div style={{color: "#737373", fontSize: "16px"}}>
            {articles.length === 0
              ? "No articles yet. Cron job will fetch content automatically."
              : `No ${articleFilter} articles.`}
          </div>
        ) : (
          <div style={{display: "flex", flexDirection: "column", gap: "25px"}}>
            {articles
              .filter((article) => {
                if (articleFilter === "unread") return !article.isRead;
                if (articleFilter === "saved") return article.isSaved;
                return true;
              })
              .map((article) => (
              <div
                key={article.id}
                style={{
                  padding: "20px",
                  backgroundColor: article.isRead ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  opacity: article.isRead ? 0.6 : 1,
                }}>
                <div style={{marginBottom: "10px"}}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#4e95ff",
                      textDecoration: "none",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}>
                    {article.title}
                  </a>
                  <span style={{fontSize: "14px", color: "#737373", marginLeft: "10px"}}>({article.sourceType})</span>
                </div>

                {article.aiSummary && (
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#737373",
                      fontStyle: "italic",
                      marginBottom: "10px",
                      paddingLeft: "12px",
                      borderLeft: "3px solid #ff5722",
                    }}>
                    {article.aiSummary}
                  </div>
                )}

                <div style={{fontSize: "15px", color: "#737373"}}>
                  {article.score} points · {article.commentCount} comments
                  {article.relevanceScore && ` · relevance ${article.relevanceScore}/10`}
                  {article.author && ` · ${article.author}`}
                  {" · "}
                  {!article.isRead && (
                    <>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleMarkRead(article.id);
                        }}
                        style={{color: "#4e95ff", textDecoration: "none"}}>
                        mark read
                      </a>
                      {" · "}
                    </>
                  )}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleSave(article.id);
                    }}
                    style={{color: "#4e95ff", textDecoration: "none"}}>
                    {article.isSaved ? "unsave" : "save"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
