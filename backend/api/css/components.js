const express = require("express");
const app = express.Router();
const axios = require("axios");
const Component = require("../../db/cssDB/Component");

app.get("/", async (req, res, next) => {
  try {
    const comp = await Component.findAll();
    // console.log("comp", comp);
    res.send(comp);
  } catch (err) {
    next(err);
  }
});

app.post("/", async (req, res, next) => {
  const {
    bgColor,
    bgColorContrast,
    primaryColor,
    primaryColorContrast,
    secondaryColor,
    secondaryColorContrast,
    tertiaryColor,
    tertiaryColorContrast,
    component,
  } = req.body;
  const id = component.id;
  try {
    const response = await Component.findByPk(component.id);
    // const replacedHtmlText = response.htmlText
    //   .replaceAll("primaryColorContrast", primaryColorContrast)
    //   .replaceAll("primaryColor", primaryColor)
    //   .replaceAll("bgColorContrast", bgColorContrast)
    //   .replaceAll("bgColor", bgColor)
    //   .replaceAll("secondaryColorContrast", secondaryColorContrast)
    //   .replaceAll("secondaryColor", secondaryColor)
    //   .replaceAll("tertiaryColorContrast", tertiaryColorContrast)
    //   .replaceAll("tertiaryColor", tertiaryColor);
    // response.htmlText = replacedHtmlText;
    res.send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
