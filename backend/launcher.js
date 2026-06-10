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
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const COOKIE = "lk";
const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const buildHtml = (host, plexUrl) => {
  const services = [
    { label: "Photos", url: `https://${host}:8443` },
    { label: "Movies", url: `https://${host}/radarr` },
    { label: "TV", url: `https://${host}/sonarr` },
    { label: "Music", url: `https://${host}/lidarr` },
    { label: "Search", url: `https://${host}/prowlarr` },
    { label: "Downloads", url: `https://${host}:8444` },
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

const hasValidCookie = (req, key) => (req.headers.cookie || "").split(";").some((c) => c.trim() === `${COOKIE}=${key}`);

module.exports = (app) => {
  const route = process.env.LAUNCHER_PATH;
  const key = process.env.LAUNCHER_KEY;
  const host = process.env.LAUNCHER_HOST;
  if (!route || !key || !host) return;

  const html = buildHtml(host, process.env.LAUNCHER_PLEX_URL);

  app.get(route, (req, res, next) => {
    res.set("X-Robots-Tag", "noindex, nofollow");
    res.set("Cache-Control", "no-store");

    if (req.query.k === key) {
      res.cookie(COOKIE, key, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: YEAR_MS,
        path: route,
      });
      return res.redirect(route);
    }

    if (!hasValidCookie(req, key)) return next();

    res.type("html").send(html);
  });
};
