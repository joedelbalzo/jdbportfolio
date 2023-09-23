const express = require("express");
const appAlgo = express.Router();
const path = require("path");
const { Question, CodingQuestion } = require("../../db/algorhythmDB");

appAlgo.use(express.json());

appAlgo.get("/questions", async (req, res, next) => {
  try {
    const questions = await Question.findAll();
    res.send(questions);
  } catch (err) {
    console.log(err);
  }
});
appAlgo.put("/questions", async (req, res, next) => {
  try {
    const id = req.body.curr.id;
    const question = await Question.findByPk(id);
    const submit = req.body.submit;
    console.log("correct", question.timesCorrect, "incorrect", question.timesIncorrect);
    if (submit === "correct") {
      await question.update({
        attributes: [question.timesCorrect++],
      });
    } else if (submit === "incorrect") {
      await question.update({
        attributes: [question.timesIncorrect++],
      });
    }
    console.log("correct", question.timesCorrect, "incorrect", question.timesIncorrect);
    res.send(await Question.findAll());
  } catch (err) {
    console.log(err);
  }
});
appAlgo.get("/codingquestions", async (req, res, next) => {
  try {
    const codingQuestions = await CodingQuestion.findAll();
    res.send(codingQuestions);
  } catch (err) {
    console.log(err);
  }
});
appAlgo.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

module.exports = appAlgo;
