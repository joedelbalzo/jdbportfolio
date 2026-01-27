# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRITICAL FILE SAFETY RULES

### NEVER DELETE OR OVERWRITE NON-CODE FILES WITHOUT EXPLICIT PERMISSION

**NEVER EVER EVER EVER EVER EVER EVER DELETE SOMETHING THAT COULD LEGITIMATELY BE GITIGNORED WITHOUT EXPRESS PERMISSION**

- ALWAYS read existing NON-CODE files first before making ANY changes
- Files like CLAUDE.md, .env, config files, documentation may contain weeks/months of work
- If unsure about a NON-CODE file's contents, ASK FIRST
- When told to "add to file X" for NON-CODE files, use Edit tool to append, never Write to replace
- CODE files can be overwritten as needed for functionality

### DOUBLE CHECK WHEN EDITING NON-CODE FILES

**IF EDITING ANYTHING BUT CODE, DOUBLE CHECK, REGARDLESS OF WHETHER OR NOT USER IS ACCEPTING AUTO EDITS**

- Configuration files (.env, config.json, etc.)
- Documentation files (CLAUDE.md, README.md, etc.)
- Data files (JSON, XML, etc.)
- Any file that could contain important accumulated work
- ASK before making changes to these file types
- Before editing files, always use cat -A (or equivalent) to verify exact whitespace characters (tabs vs spaces). Especially if you find yourself saying "Error: File has been unexpectedly modified. Read it again before attempting to write it."

## Important Instruction Reminders

- Do what has been asked; nothing more, nothing less
- NEVER create files unless they're absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (*.md) or README files unless explicitly requested

---

## Project Overview

Full-stack portfolio website (https://www.joedelbalzo.com/) hosting multiple independent sub-applications. Monorepo structure with separate frontend (React/Vite) and backend (Node/Express/PostgreSQL) deployments.

## Common Commands

```bash
# Development (runs both frontend and backend concurrently)
npm start

# Run frontend only (port 3000, proxies API to localhost:5000)
npm run start-frontend

# Run backend only (port 5000)
npm run start-backend

# Production build
npm run build:prod

# Install all dependencies
npm run build

# Analyze frontend bundle size
cd frontend && npm run analyze
```

## Architecture

### Directory Structure
- `frontend/` - React 18 SPA built with Vite
- `backend/` - Express API server with Sequelize ORM

### Multi-App Structure
The site hosts multiple independent applications under one domain:
- `/dropofcss/*` - CSS design tool
- `/scriptforjava/*` - Java learning platform
- `/openplaces/*` - Location/places discovery app
- `/letschat/*` - WebRTC chat application
- `/blog` - Blog posts with slug routing
- `/portfolio` - Portfolio showcase

Each sub-app has corresponding:
- Frontend: Redux slices in `frontend/src/store/`, components in `frontend/src/{AppName}/`
- Backend: API routes in `backend/api/{appname}/`, database models in `backend/db/{appname}DB/`

### State Management
Redux with Redux Thunk for async operations. Store slices are organized by feature/app in `frontend/src/store/`.

### Database
PostgreSQL with Sequelize. Each sub-app has its own models. Database syncs and seeds on backend startup via `backend/index.js`.

### Authentication
JWT-based authentication with bcrypt password hashing. Google OAuth available via Passport. Test credentials for demo access: username "moe" / password "123".

### File Storage
AWS S3 for file uploads with pre-signed URLs (`backend/s3.js`).

## Development Workflow

1. Frontend dev server (Vite) runs on port 3000
2. Backend runs on port 5000
3. Vite proxies `/api/*` requests to the backend (configured in `frontend/vite.config.js`)
4. Backend serves built frontend from `frontend/dist/` in production

## Environment Variables

Backend (`backend/.env`):
- `DATABASE_URL` - PostgreSQL connection string
- `AWS_ACCESS_KEY`, `AWS_SECRET_KEY`, `AWS_REGION`, `AWS_BUCKET_NAME`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `JWT` - JWT signing key
- `ENCRYPTION_KEY`

Frontend (`frontend/.env`):
- `VITE_SITEPASSWORD` - Password for protected site access

---

# AI Agent Platform Implementation Plan (January 2026)

## Overview

Three focused steps to transform the portfolio:
1. Comment out legacy apps
2. Code cleanup and tech debt reduction
3. Doom scroll scraper (Google OAuth + content aggregation for APIs/NestJS/HTTP topics)

---

## Step 1: Hide Legacy Apps + Delete WebRTC

### Apps to HIDE (comment out, keep restorable):
- Script for Java
- Drop of CSS
- OpenPlaces
- Blog

### App to DELETE (remove entirely):
- WebRTC (Let's Chat)

---

### Backend - `backend/app.js`
Comment out:
```javascript
// Script for Java routes
// app.use("/api/script/reviews", require("./api/script/reviews"));
// app.use("/api/script/auth", require("./api/script/auth"));
// app.use("/api/script/orders", require("./api/script/orders"));
// app.use("/api/script/menu", require("./api/script/drinks"));
// app.use("/api/script/merches", require("./api/script/merches"));

// OpenPlaces routes
// app.use("/api/openplaces/auth", require("./api/openplaces/auth"));
// app.use("/api/openplaces/places", require("./api/openplaces/places"));

// Drop of CSS routes
// app.use("/api/css/auth", require("./api/css/auth"));
// app.use("/api/css/components", require("./api/css/components"));
// app.use("/api/css/cpg", require("./api/css/cpg"));
// app.use("/api/css/templates", require("./api/css/templates"));
```

### Backend - `backend/index.js`
Comment out sync calls for script, css, openplaces databases

### Frontend - `frontend/src/App.jsx`
Comment out:
- Lazy imports for AScriptForJavaApp, OpenPlacesApp, CssApp, Blog (lines 21-24)
- Routes for `/dropofcss/*`, `/scriptforjava/*`, `/openplaces/*`, `/blog/*` (lines 87-90)

### Frontend - `frontend/src/store/index.jsx`
Comment out:
- All `places-*` imports and reducers
- All `script-*` imports and reducers
- All `css-*` imports and reducers
- Related exports

### DELETE WebRTC entirely:
- Delete folder: `frontend/src/WebRTC/`
- Remove lazy import and route for `/letschat/*` from `App.jsx`

---

## Step 2: Code Cleanup

### CSS Archive
**File:** `frontend/assets/styles.css` (2,584 lines)

Move to new `frontend/assets/styles-archived.css`:
- Lines 1105-1287: Script for Java (~174 lines)
- Lines 1289-1440: OpenPlaces (~144 lines)
- Lines 1442-2503: Drop of CSS (~1,054 lines)

**Result:** Main styles.css reduced to ~1,212 lines (portfolio-focused)

**Note:** Blog has its own `frontend/src/Blog/BlogStyles.css` - leave it in place (hidden but restorable)

### Code Review Checklist
- Remove unused imports in modified files
- Check for dead code references to disabled apps
- Delete any WebRTC-related remnants
- Verify portfolio still builds and runs cleanly
- Test all remaining routes work (portfolio, resume, home)

---

## Step 3: Doom Scroll Scraper

### 3A: Database Models

**Create `backend/db/agentDB/`:**

| File | Purpose |
|------|---------|
| `AgentUser.js` | Google OAuth users (email, googleId, name, isAdmin) |
| `Feed.js` | Content sources (name, sourceType, subreddit, isActive, lastFetchedAt) |
| `Topic.js` | Keywords to track (keyword, isActive) |
| `Article.js` | Fetched content (externalId, title, url, author, score, sourceType, isRead, isSaved) |
| `JobRun.js` | Job execution tracking (status, errorMessage, retryCount, articlesProcessed) |
| `index.js` | Associations + syncAndSeedAgent() |

### 3B: Google OAuth

**Create `backend/api/agent/auth.js`:**
- `GET /api/agent/auth/google` - Initiate OAuth
- `GET /api/agent/auth/google/callback` - Handle callback, check email whitelist, return JWT
- `GET /api/agent/auth/` - Get current user by token

**Email whitelist via env var:**
```
AGENT_ALLOWED_EMAILS=you@gmail.com,wife@gmail.com
```

**Create `backend/api/agent/middleware.js`:**
- `isAgentLoggedIn` - Verify JWT, attach user to req

### 3C: Content Fetchers

**Create `backend/api/agent/services/jobService.js`:**

```javascript
// Retry wrapper with exponential backoff
const withRetry = async (fn, maxRetries = 3, baseDelay = 1000) => {...}

// Reddit fetcher (no API key needed for public subreddits)
const fetchReddit = async (subreddit) => {...}

// Hacker News fetcher (Firebase API, no auth)
const fetchHackerNews = async () => {...}

// Stack Overflow fetcher (tagged questions)
const fetchStackOverflow = async (tags) => {...}
```

### 3D: API Routes

**Create `backend/api/agent/`:**

| File | Endpoints |
|------|-----------|
| `index.js` | Mount all routes under `/api/agent` |
| `feeds.js` | CRUD for feeds |
| `topics.js` | CRUD for topics |
| `articles.js` | GET (with filters), PUT /:id/read, PUT /:id/save |
| `jobs.js` | GET /fetch-all?secret=XXX (cron), GET /history |

### 3E: Default Configuration

**Seed data for interests (microservices team focus):**
```javascript
// Default feeds
{ name: "Reddit - node", sourceType: "reddit", subreddit: "node" }
{ name: "Reddit - nestjs", sourceType: "reddit", subreddit: "nestjs" }
{ name: "Reddit - microservices", sourceType: "reddit", subreddit: "microservices" }
{ name: "Hacker News", sourceType: "hackernews" }
{ name: "Stack Overflow", sourceType: "stackoverflow" }

// Default topics (for SO tags and article filtering)
"api", "nestjs", "http", "rest", "microservices", "nodejs", "express"
```

---

## Environment Variables to Add

```
# Google OAuth
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx

# Agent Platform
AGENT_JWT_SECRET=strong-random-secret
AGENT_ALLOWED_EMAILS=you@gmail.com,wife@gmail.com
JOB_SECRET=cron-job-secret-for-render
```

---

## Files Summary

### Step 1 - Modify (4 files):
- `backend/app.js` - comment out legacy routes
- `backend/index.js` - comment out legacy sync calls
- `frontend/src/App.jsx` - comment out legacy imports/routes, remove WebRTC
- `frontend/src/store/index.jsx` - comment out legacy reducers

### Step 1 - Delete (1 folder):
- `frontend/src/WebRTC/` - delete entirely

### Step 2 - Modify/Create (2 files):
- `frontend/assets/styles.css` (trim)
- `frontend/assets/styles-archived.css` (new, archived styles)

### Step 3 - Create (13 files):
```
backend/db/agentDB/
  index.js, AgentUser.js, Feed.js, Topic.js, Article.js, JobRun.js

backend/api/agent/
  index.js, auth.js, middleware.js, feeds.js, topics.js, articles.js, jobs.js
  services/jobService.js
```

### Step 3 - Modify (2 files):
- `backend/app.js` (add agent routes)
- `backend/index.js` (add agent sync)

---

## Verification

**After Step 1:**
- `npm start` works
- Portfolio loads at localhost:3000
- `/scriptforjava`, `/openplaces`, `/dropofcss`, `/blog`, `/letschat` all return 404
- WebRTC folder is gone

**After Step 2:**
- Build still works
- No console errors
- Styles look correct on portfolio pages

**After Step 3:**
- `GET /api/agent/auth/google` redirects to Google
- Login with allowed email → returns JWT
- Login with other email → returns 403
- `GET /api/agent/jobs/fetch-all?secret=XXX` → fetches articles from Reddit/HN/SO
- `GET /api/agent/articles` → returns fetched articles about APIs/NestJS/microservices
