import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
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
  const [topics, setTopics] = useState([]);
  const [newTopicKeyword, setNewTopicKeyword] = useState("");
  const [articleFilter, setArticleFilter] = useState("all"); // "all", "unread", "saved"

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
      // Get the first active feed to test
      const feedsResponse = await axios.get("/api/agent/feeds", {
        headers: {Authorization: token},
      });

      const activeFeed = feedsResponse.data.find((f) => f.isActive);

      if (!activeFeed) {
        setFetchResult({error: "No active feeds found. Please contact admin."});
        setFetching(false);
        return;
      }

      const response = await axios.post(
        `/api/agent/jobs/fetch/${activeFeed.id}`,
        {},
        {
          headers: {Authorization: token},
        },
      );

      setFetchResult({
        success: true,
        data: response.data,
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
    return (
      <div style={{padding: "40px", textAlign: "center"}}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{padding: "50px 30px", maxWidth: "1200px", margin: "0 auto", fontFamily: "'Roboto', sans-serif"}}>
      <header
        style={{
          marginBottom: "40px",
          paddingBottom: "25px",
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
          <a href="#" onClick={handleLogout} style={{color: "#737373", fontSize: "16px", textDecoration: "none"}}>
            logout
          </a>
        </div>
      </header>

      {fetchResult && (
        <div
          style={{
            padding: "16px",
            marginBottom: "25px",
            backgroundColor: fetchResult.error ? "rgba(255, 87, 34, 0.1)" : "rgba(0, 102, 255, 0.1)",
            border: `1px solid ${fetchResult.error ? "#ff5722" : "#0066ff"}`,
            color: "whitesmoke",
            fontSize: "16px",
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
        <div style={{marginBottom: "30px", fontSize: "16px", color: "#737373"}}>
          {stats.totalArticles} articles · {stats.unreadArticles} unread · {stats.savedArticles} saved · {stats.recentJobs} jobs last 24h
        </div>
      )}

      <div style={{marginBottom: "40px", paddingBottom: "25px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
        <div style={{marginBottom: "16px", fontSize: "18px"}}>
          <strong style={{color: "#ff5722"}}>Topics</strong>
        </div>

        <div style={{display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "16px"}}>
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
    </div>
  );
};

export default Dashboard;
