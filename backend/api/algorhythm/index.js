const express = require("express");
const appAlgo = express.Router();
const { Question, CodingQuestion } = require("../../db/algorhythmDB");

appAlgo.use(express.json());

appAlgo.get("/questions", async (req, res, next) => {
  try {
    const questions = await Question.findAll();
    res.send(questions);
  } catch (err) {
    next(err);
  }
});

appAlgo.put("/questions", async (req, res, next) => {
  try {
    const id = req.body.curr.id;
    const submit = req.body.submit;
    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).send({ error: "Question not found" });
    }
    if (submit === "correct") {
      await question.increment("timesCorrect");
    } else if (submit === "incorrect") {
      await question.increment("timesIncorrect");
    }
    res.send(await Question.findAll());
  } catch (err) {
    next(err);
  }
});

appAlgo.get("/codingquestions", async (req, res, next) => {
  try {
    const codingQuestions = await CodingQuestion.findAll();
    res.send(codingQuestions);
  } catch (err) {
    next(err);
  }
});

appAlgo.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err.message || "Internal Server Error" });
});

module.exports = appAlgo;
