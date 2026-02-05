import React, {useState, useEffect} from "react";
import axios from "axios";
import "./ContentCuration.css";

const ContentCuration = () => {
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [fetchResult, setFetchResult] = useState(null);
  const [topics, setTopics] = useState([]);
  const [newTopicKeyword, setNewTopicKeyword] = useState("");
  const [articleFilter, setArticleFilter] = useState("all");
  const [showSettings, setShowSettings] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [relevanceThreshold, setRelevanceThreshold] = useState(7);
  const [maxArticlesPerRun, setMaxArticlesPerRun] = useState(15);
  const [articleOffset, setArticleOffset] = useState(0);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const token = localStorage.getItem("agentToken");

    try {
      const statsResponse = await axios.get("/api/agent/jobs/stats", {
        headers: {Authorization: token},
      });
      setStats(statsResponse.data);
    } catch (err) {
      console.error("Failed to load stats:", err);
    }

    try {
      const articlesResponse = await axios.get("/api/agent/articles?limit=50&offset=0", {
        headers: {Authorization: token},
      });
      setArticles(articlesResponse.data.articles);
      setHasMoreArticles(articlesResponse.data.articles.length === 50);
      setArticleOffset(50);
    } catch (err) {
      console.error("Failed to load articles:", err);
    }

    try {
      const topicsResponse = await axios.get("/api/agent/topics", {
        headers: {Authorization: token},
      });
      setTopics(topicsResponse.data);
    } catch (err) {
      console.error("Failed to load topics:", err);
    }

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
  };

  const handleFetchNow = async () => {
    const token = localStorage.getItem("agentToken");
    setFetching(true);
    setFetchResult(null);

    try {
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

      const statsResponse = await axios.get("/api/agent/jobs/stats", {
        headers: {Authorization: token},
      });
      setStats(statsResponse.data);

      const articlesResponse = await axios.get("/api/agent/articles?limit=50&offset=0", {
        headers: {Authorization: token},
      });
      setArticles(articlesResponse.data.articles);
      setHasMoreArticles(articlesResponse.data.articles.length === 50);
      setArticleOffset(50);
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
      await axios.put(`/api/agent/articles/${articleId}/read`, {}, {headers: {Authorization: token}});
      setArticles(articles.map((a) => (a.id === articleId ? {...a, isRead: true} : a)));
    } catch (error) {
      console.error("Error marking article as read:", error);
    }
  };

  const handleToggleSave = async (articleId) => {
    const token = localStorage.getItem("agentToken");
    try {
      const response = await axios.put(`/api/agent/articles/${articleId}/save`, {}, {headers: {Authorization: token}});
      setArticles(articles.map((a) => (a.id === articleId ? {...a, isSaved: response.data.isSaved} : a)));
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  const handleLoadMore = async () => {
    const token = localStorage.getItem("agentToken");
    setLoadingMore(true);
    try {
      const response = await axios.get(`/api/agent/articles?limit=50&offset=${articleOffset}`, {
        headers: {Authorization: token},
      });
      setArticles([...articles, ...response.data.articles]);
      setHasMoreArticles(response.data.articles.length === 50);
      setArticleOffset(articleOffset + 50);
    } catch (error) {
      console.error("Failed to load more articles:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    const token = localStorage.getItem("agentToken");
    try {
      await axios.delete(`/api/agent/articles/${articleId}`, {
        headers: {Authorization: token},
      });
      setArticles(articles.filter((a) => a.id !== articleId));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleDeleteAllArticles = async () => {
    const token = localStorage.getItem("agentToken");
    if (!window.confirm("Delete all articles?")) return;

    try {
      await axios.delete("/api/agent/articles/delete-all", {
        headers: {Authorization: token},
      });
      setArticles([]);
    } catch (error) {
      console.error("Error deleting all articles:", error);
    }
  };

  const filteredArticles = articles.filter((article) => {
    if (articleFilter === "unread") return !article.isRead;
    if (articleFilter === "saved") return article.isSaved;
    return true;
  });

  return (
    <div className="content-curation">
      {/* Header Actions */}
      <div className="content-curation__actions">
        <button onClick={handleFetchNow} disabled={fetching} className={`btn ${fetching ? "btn--secondary" : "btn--primary"}`}>
          {fetching ? "Fetching..." : "Fetch Now"}
        </button>
        <button onClick={() => setShowSettings(true)} className="btn btn--secondary">
          Settings
        </button>
        <button onClick={handleDeleteAllArticles} className="btn btn--danger">
          Delete All
        </button>
      </div>

      {/* Fetch Result */}
      {fetchResult && (
        <div className={`content-curation__fetch-result ${fetchResult.error ? "content-curation__fetch-result--error" : "content-curation__fetch-result--success"}`}>
          {fetchResult.error ? (
            <span>Error: {fetchResult.error}</span>
          ) : (
            <span>
              Fetched from {fetchResult.data.feed}: <strong>{fetchResult.data.aiApproved}</strong> approved / {fetchResult.data.aiRejected} rejected (
              {fetchResult.data.articlesProcessed} new)
            </span>
          )}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="content-curation__stats">
          {stats.totalArticles} articles · {stats.unreadArticles} unread · {stats.savedArticles} saved · {stats.recentJobs} jobs last 24h
        </div>
      )}

      {/* Topics Section */}
      <div className="content-curation__topics-section">
        <div className="content-curation__topics-header">
          <strong className="content-curation__topics-title">Topics</strong>
          <span className="content-curation__topics-hint">(cron uses these for AI curation)</span>
        </div>

        <div className="content-curation__topics-list">
          {topics.length === 0 ? (
            <span className="content-curation__topics-empty">No topics yet. Add some below.</span>
          ) : (
            topics.map((topic) => (
              <div key={topic.id} className="content-curation__topic-tag">
                <span>{topic.keyword}</span>
                <button onClick={() => handleDeleteTopic(topic.id)} className="content-curation__topic-remove" title="Remove topic">
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleAddTopic} className="content-curation__add-topic-form">
          <input
            type="text"
            value={newTopicKeyword}
            onChange={(e) => setNewTopicKeyword(e.target.value)}
            placeholder="add topic keyword"
            className="content-curation__topic-input"
          />
          <button type="submit" className="btn btn--primary">
            add
          </button>
        </form>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="settings-modal" onClick={() => setShowSettings(false)}>
          <div className="settings-modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal__header">
              <h2 className="settings-modal__title">AI Curation Settings</h2>
              <button onClick={() => setShowSettings(false)} className="settings-modal__close">
                ×
              </button>
            </div>

            <div className="settings-modal__fields">
              <div className="settings-modal__field">
                <label className="settings-modal__label">AI Prompt</label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Custom AI curation prompt... Use {topics} as placeholder for your topics"
                  rows={10}
                  className="settings-modal__textarea"
                />
                <div className="settings-modal__hint">Use {"{topics}"} to insert your topic keywords into the prompt</div>
              </div>

              <div className="settings-modal__field">
                <label className="settings-modal__label">
                  Relevance Threshold: <strong style={{color: "#0066ff"}}>{relevanceThreshold}/10</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={relevanceThreshold}
                  onChange={(e) => setRelevanceThreshold(parseInt(e.target.value))}
                  className="settings-modal__slider"
                />
                <div className="settings-modal__hint">Only save articles with AI relevance score ≥ {relevanceThreshold}</div>
              </div>

              <div className="settings-modal__field">
                <label className="settings-modal__label">Max Articles Per Run</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={maxArticlesPerRun}
                  onChange={(e) => setMaxArticlesPerRun(parseInt(e.target.value))}
                  className="settings-modal__number-input"
                />
                <div className="settings-modal__hint">Limit articles saved per cron run to top {maxArticlesPerRun} (sorted by relevance)</div>
              </div>

              <div className="settings-modal__actions">
                <button
                  onClick={() => {
                    handleSaveSettings();
                    setShowSettings(false);
                  }}
                  className="btn btn--primary">
                  Save Settings
                </button>
                <button onClick={() => setShowSettings(false)} className="btn btn--secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Filters */}
      <div className="article-filters">
        <span className="article-filters__label">Show:</span>
        <button
          onClick={() => setArticleFilter("all")}
          className={`article-filters__button ${articleFilter === "all" ? "article-filters__button--active" : "article-filters__button--inactive"}`}>
          All
        </button>
        <button
          onClick={() => setArticleFilter("unread")}
          className={`article-filters__button ${articleFilter === "unread" ? "article-filters__button--active" : "article-filters__button--inactive"}`}>
          Unread
        </button>
        <button
          onClick={() => setArticleFilter("saved")}
          className={`article-filters__button ${articleFilter === "saved" ? "article-filters__button--active" : "article-filters__button--inactive"}`}>
          Saved
        </button>
      </div>

      {/* Articles List */}
      {filteredArticles.length === 0 ? (
        <div className="articles__empty">{articles.length === 0 ? "No articles yet. Cron job will fetch content automatically." : `No ${articleFilter} articles.`}</div>
      ) : (
        <div className="articles__list">
          {filteredArticles.map((article) => (
            <div key={article.id} className={`article ${article.isRead ? "article--read" : "article--unread"}`}>
              <div className="article__header">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="article__link">
                  {article.title}
                </a>
                <span className="article__source">({article.sourceType})</span>
              </div>

              {article.aiSummary && <div className="article__summary">{article.aiSummary}</div>}

              <div className="article__meta">
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
                      className="article__action-link">
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
                  className="article__action-link">
                  {article.isSaved ? "unsave" : "save"}
                </a>
                {" · "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteArticle(article.id);
                  }}
                  className="article__action-link article__action-link--danger">
                  delete
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMoreArticles && articles.length > 0 && (
        <div className="load-more">
          <button onClick={handleLoadMore} disabled={loadingMore} className={`btn ${loadingMore ? "btn--secondary" : "btn--primary"}`}>
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentCuration;
