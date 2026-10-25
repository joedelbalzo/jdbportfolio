// PRIVATE ROUTE — unlisted Tailscale launcher, served outside the SPA bundle.
// All identifying values (path, device key, tailnet host, Plex URL) come from
// env vars so nothing lands in this public repo or in any client-side JS.
// Deliberately NOT in robots.txt — a Disallow line would advertise the path.
// Destinations are Tailscale-only (.ts.net): they resolve and load ONLY on
// devices joined to the tailnet. From any other device they fail — that is
// intentional. Do not proxy them, health-check them, or mark them broken.
//
// Flow: visit LAUNCHER_PATH?k=LAUNCHER_KEY — sets the cookie and serves the
// page, leaving the key in the address bar so it can be copied to another
// device. The clean path serves with the cookie alone; without it the request
// falls through to the SPA catchall and renders the React 404,
// indistinguishable from any other dead route.
//
// The cookie rotates monthly: its value is a token for the current month, and
// the server accepts this month's and last month's, renewing a last-month
// cookie on sight. A stolen cookie dies within two months. Key and path never change.

const path = require("path");
const crypto = require("crypto");
require("dotenv").config({ path: path.resolve(__dirname, ".env"), quiet: true });

const COOKIE = "lk";
const COOKIE_MS = 62 * 24 * 60 * 60 * 1000;
const MIN_KEY_LENGTH = 24;
const LEGACY_UNTIL = "2026-12";

const PAGE_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "no-store",
  "Content-Security-Policy":
    "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
};

const buildHtml = (host, plexUrl) => {
  const services = [
    { label: "Search", url: `https://${host}:8445` },
    { label: "Photos", url: `https://${host}:8443` },
    { label: "Movies", url: `https://${host}/radarr` },
    { label: "TV", url: `https://${host}/sonarr` },
    { label: "Music", url: `https://${host}/lidarr` },
    { label: "Indexers", url: `https://${host}/prowlarr` },
    { label: "Downloads", url: `https://${host}:8444` },
    { label: "Server", url: `https://${host}/ops` },
  ];
  if (plexUrl) services.push({ label: "Plex", url: plexUrl });

  const buttons = services
    .map((s) => `<a class="btn" href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a>`)
    .join("\n      ");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="robots" content="noindex, nofollow" />
    <title>&mdash;</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        background-color: #1a1d2e;
        color: whitesmoke;
        font-family: "Space Grotesk", system-ui, -apple-system, sans-serif;
      }
      .grid {
        max-width: 480px;
        margin: 32px auto;
        padding: 0 16px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 80px;
        padding: 8px 16px;
        border: 1px solid #ff5722;
        border-radius: 8px;
        color: whitesmoke;
        font-size: 24px;
        font-weight: 500;
        letter-spacing: 0.5px;
        text-align: center;
        text-decoration: none;
        transition: background-color 0.25s ease, box-shadow 0.25s ease;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      .btn:hover,
      .btn:focus-visible {
        background-color: #ff5722;
        color: #fff;
        box-shadow: 0 0 12px rgba(255, 87, 34, 0.35);
      }
      .btn:focus-visible {
        outline: 2px solid #fff;
        outline-offset: 2px;
      }
      .btn:active { transform: scale(0.98); }
    </style>
  </head>
  <body>
    <main class="grid">
      ${buttons}
    </main>
  </body>
</html>
`;
};

const digest = (value) => crypto.createHash("sha256").update(String(value)).digest();

const safeEqual = (a, b) => crypto.timingSafeEqual(digest(a), digest(b));

const readCookie = (req) => {
  for (const part of (req.headers.cookie || "").split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === COOKIE) return rest.join("=");
  }
  return null;
};

// "YYYY-MM" in UTC, optionally some months back; Date.UTC carries month -1 into the previous year.
const period = (date, monthsAgo = 0) => {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - monthsAgo, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
};

module.exports = (app, now = () => new Date()) => {
  const route = process.env.LAUNCHER_PATH;
  const key = process.env.LAUNCHER_KEY;
  const host = process.env.LAUNCHER_HOST;
  if (!route || !key || !host) return;
  if (key.length < MIN_KEY_LENGTH) {
    console.error(`launcher disabled: LAUNCHER_KEY is shorter than ${MIN_KEY_LENGTH} characters`);
    return;
  }

  const html = buildHtml(host, process.env.LAUNCHER_PLEX_URL);
  const tokenFor = (month) => crypto.createHmac("sha256", key).update(`launcher-cookie:${month}`).digest("base64url");
  const legacyToken = crypto.createHmac("sha256", key).update("launcher-cookie").digest("base64url");
  const setCookie = (res, month) =>
    res.cookie(COOKIE, tokenFor(month), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: COOKIE_MS,
      path: route,
    });

  app.get(route, (req, res, next) => {
    const today = now();
    const current = period(today);
    const offered = req.query.k;
    if (typeof offered === "string" && safeEqual(offered, key)) {
      setCookie(res, current);
      return res.set(PAGE_HEADERS).type("html").send(html);
    }

    const cookie = readCookie(req);
    if (cookie === null) return next();
    if (!safeEqual(cookie, tokenFor(current))) {
      const lastMonth = safeEqual(cookie, tokenFor(period(today, 1)));
      // Cookies from before the rotation held one fixed token, or the raw key before that; they upgrade through LEGACY_UNTIL.
      const legacy = current <= LEGACY_UNTIL && (safeEqual(cookie, legacyToken) || safeEqual(cookie, key));
      if (!lastMonth && !legacy) return next();
      setCookie(res, current);
    }

    res.set(PAGE_HEADERS).type("html").send(html);
  });
};
