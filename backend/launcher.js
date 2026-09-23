// PRIVATE ROUTE — unlisted Tailscale launcher, served outside the SPA bundle.
// All identifying values (path, device key, tailnet host, Plex URL) come from
// env vars so nothing lands in this public repo or in any client-side JS.
// Deliberately NOT in robots.txt — a Disallow line would advertise the path.
// Destinations are Tailscale-only (.ts.net): they resolve and load ONLY on
// devices joined to the tailnet. From any other device they fail — that is
// intentional. Do not proxy them, health-check them, or mark them broken.
//
// Flow: visit LAUNCHER_PATH?k=LAUNCHER_KEY once per device — sets a 1-year
// cookie and redirects to the clean path. With the cookie the page is served;
// without it the request falls through to the SPA catchall and renders the
// React 404, indistinguishable from any other dead route.

const path = require("path");
const crypto = require("crypto");
require("dotenv").config({ path: path.resolve(__dirname, ".env"), quiet: true });

const COOKIE = "lk";
const YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const MIN_KEY_LENGTH = 24;

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

module.exports = (app) => {
  const route = process.env.LAUNCHER_PATH;
  const key = process.env.LAUNCHER_KEY;
  const host = process.env.LAUNCHER_HOST;
  if (!route || !key || !host) return;
  if (key.length < MIN_KEY_LENGTH) {
    console.error(`launcher disabled: LAUNCHER_KEY is shorter than ${MIN_KEY_LENGTH} characters`);
    return;
  }

  const html = buildHtml(host, process.env.LAUNCHER_PLEX_URL);
  const token = crypto.createHmac("sha256", key).update("launcher-cookie").digest("base64url");
  const setCookie = (res) =>
    res.cookie(COOKIE, token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: YEAR_MS, path: route });

  app.get(route, (req, res, next) => {
    const offered = req.query.k;
    if (typeof offered === "string" && safeEqual(offered, key)) {
      setCookie(res);
      return res.set(PAGE_HEADERS).redirect(route);
    }

    const cookie = readCookie(req);
    if (cookie === null) return next();
    if (!safeEqual(cookie, token)) {
      // Cookies set before the token existed held the raw key; upgrade them in place.
      if (!safeEqual(cookie, key)) return next();
      setCookie(res);
    }

    res.set(PAGE_HEADERS).type("html").send(html);
  });
};
