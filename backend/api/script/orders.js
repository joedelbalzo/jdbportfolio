const express = require("express");
const app = express.Router();
const { UserScript } = require("../../db/scriptDB");
const { isLoggedIn } = require("./middleware.js");

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.createOrder());
  } catch (ex) {
    next(ex);
  }
});

app.get("/cart", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.post("/cart", isLoggedIn, async (req, res, next) => {
  try {
    console.log("trying to clear all", req.body);
    const user = req.user;
    const added = await user.addToCart(req.body);
    added.dataValues.userscriptId = user.id;
    res.send(added);
  } catch (ex) {
    next(ex);
  }
});

app.put("/cart", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.removeFromCart(req.body));
  } catch (ex) {
    next(ex);
  }
});
app.delete("/cart", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.clearCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
