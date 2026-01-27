const express = require("express");
const authRoutes = express.Router();
const {AgentUser} = require("../../db/agentDB");
const {isAgentLoggedIn} = require("./middleware");
const path = require("path");
const bcrypt = require("bcrypt");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
require("dotenv").config({path: path.resolve(__dirname, "../..", ".env")});

let salt1 = bcrypt.genSaltSync();
let salt2 = bcrypt.genSaltSync();
let secret = bcrypt.hashSync(salt1 + salt2, 10);

// Email whitelist from env var
const getAllowedEmails = () => {
  const allowedEmailsEnv = process.env.AGENT_ALLOWED_EMAILS || "";
  return allowedEmailsEnv.split(",").map((email) => email.trim().toLowerCase());
};

const callbackURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/agent/auth/google/callback"
    : process.env.AGENT_OAUTH_CALLBACK_URL || "https://www.joedelbalzo.com/api/agent/auth/google/callback";

passport.use(
  "agent-google",
  new GoogleStrategy(
    {
      clientID: process.env.AGENT_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.AGENT_GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Get email from profile
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

        if (!email) {
          return done(new Error("No email found in Google profile"), null);
        }

        // Check email whitelist
        const allowedEmails = getAllowedEmails();

        if (allowedEmails.length > 0 && !allowedEmails.includes(email.toLowerCase())) {
          const error = new Error("Email not authorized");
          error.status = 403;
          return done(error, null);
        }

        // Find or create user
        const [user] = await AgentUser.findOrCreate({
          where: {googleId: profile.id},
          defaults: {
            email: email,
            name: profile.displayName || email,
            isAdmin: true, // All whitelisted users are admins
            isActive: true,
          },
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await AgentUser.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

authRoutes.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  }),
);

authRoutes.use(passport.initialize());
authRoutes.use(passport.session());

// Initiate Google OAuth
authRoutes.get("/google", passport.authenticate("agent-google", {scope: ["profile", "email"]}));

// Google OAuth callback
authRoutes.get("/google/callback", passport.authenticate("agent-google", {failureRedirect: "/login"}), async function (req, res) {
  try {
    const tokenData = await req.user.generateToken();
    if (tokenData && tokenData.token) {
      if (process.env.NODE_ENV === "development") {
        res.redirect(`http://localhost:3000/dashboard?token=${tokenData.token}`);
      } else {
        res.redirect(`https://www.joedelbalzo.com/dashboard?token=${tokenData.token}`);
      }
    } else {
      res.status(500).send("Failed to generate token");
    }
  } catch (err) {
    console.error("OAuth callback error:", err);
    res.status(500).send("Authentication failed");
  }
});

// Get current user by token
authRoutes.get("/", isAgentLoggedIn, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

// Check authentication status
authRoutes.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({error: "Not authenticated"});
  }
});

// Logout
authRoutes.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.redirect("/");
  });
});

// Debug endpoint to check allowed emails (remove in production)
authRoutes.get("/debug/allowed-emails", (req, res) => {
  const allowedEmails = getAllowedEmails();
  res.json({
    raw: process.env.AGENT_ALLOWED_EMAILS,
    parsed: allowedEmails,
    count: allowedEmails.length,
  });
});

module.exports = authRoutes;
