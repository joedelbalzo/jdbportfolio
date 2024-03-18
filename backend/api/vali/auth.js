const express = require("express");
const authRoutes = express.Router();
const { User, MailingListUser, Business, FinancialInfo, decrypt } = require("../../db/valiDB");
const { isValiLoggedIn, isValiAdmin } = require("./middleware");
const { updateCSVFile } = require("../../s3");
const path = require("path");
const bcrypt = require("bcrypt");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
require("dotenv").config({ path: path.resolve(__dirname, "../", ".env") });

let salt1 = bcrypt.genSaltSync();
let salt2 = bcrypt.genSaltSync();
let secret = bcrypt.hashSync(salt1 + salt2, 10);

const callbackURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/auth/google/callback"
    : "https://www.usevali.com/api/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const [user] = await User.findOrCreate({
          where: { googleId: profile.id },
          defaults: {
            username: `google_${profile.id}`,
            adminStatus: false,
          },
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findByPk(id);
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
  })
);

authRoutes.use(passport.initialize());
authRoutes.use(passport.session());

authRoutes.get("/google", passport.authenticate("google", { scope: ["profile"] }));

authRoutes.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), async function (req, res) {
  try {
    const tokenData = await req.user.generateToken();
    if (tokenData && tokenData.token && process.env.NODE_ENV == "development") {
      res.redirect(`https://localhost:3000/client-route?token=${tokenData.token}`);
    }
    if (tokenData && tokenData.token && process.env.NODE_ENV == "production") {
      res.redirect(`https://www.usevali.com/client-route?token=${tokenData.token}`);
    }
  } catch (err) {
    console.log(err);
  }
});

authRoutes.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

authRoutes.get("/mailinglist", isValiAdmin, isValiLoggedIn, async (req, res, next) => {
  try {
    res.send(
      await MailingListUser.findAll({
        order: [["createdAt", "DESC"]],
      })
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
});

authRoutes.post("/mailinglist", async (req, res, next) => {
  try {
    const newEmail = req.body.email;
    await MailingListUser.create({
      email: newEmail,
      currentlyActive: true,
    });

    const csvFileName = "mailing-list/mailingList.csv";
    const newLine = `${newEmail}`;

    await updateCSVFile(csvFileName, newLine);

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

authRoutes.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

//admin things
authRoutes.get("/users", isValiAdmin, isValiLoggedIn, async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (err) {
    next(err);
  }
});
authRoutes.get("/filteredusers", isValiAdmin, isValiLoggedIn, async (req, res, next) => {
  try {
    const { param } = req.body;
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (err) {
    next(err);
  }
});

//basic user things
authRoutes.get("/", isValiLoggedIn, async (req, res, next) => {
  try {
    const userWithDetails = await User.findByPk(req.user.id, {
      include: [
        {
          model: Business,
          include: [
            {
              model: FinancialInfo,
            },
          ],
        },
      ],
    });

    if (!userWithDetails) {
      res.status(404).send("User not found");
      return;
    }

    res.send(userWithDetails);
  } catch (err) {
    next(err);
  }
});

authRoutes.post("/register", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send(user.generateToken());
  } catch (err) {
    next(err);
  }
});
authRoutes.post("/", async (req, res, next) => {
  try {
    res.send(await User.authenticate(req.body));
  } catch (err) {
    next(err);
  }
});

authRoutes.put("/user/:id", async (req, res, next) => {
  try {
    let userUpdates = req.body.formData;
    let userToEdit = await User.findByPk(req.params.id);
    let updatedUser = await User.update(
      {
        firstName: userUpdates.firstName,
        lastName: userUpdates.lastName,
        businessName: userUpdates.businessName,
        city: userUpdates.city,
        state: userUpdates.state,
        updates: userUpdates.updates,
        isNewUser: false,
      },
      {
        where: { id: userToEdit.id },
      }
    );
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
});

authRoutes.put("/user", isValiLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    //define the properties a user can change
    await user.update(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = authRoutes;
