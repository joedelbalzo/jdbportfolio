// Sanity checks for questionData.js — run with: node backend/db/algorhythmDB/validateQuestions.js
const questionData = require("./questionData");

const errors = [];
const seen = new Set();

questionData.forEach((q, i) => {
  const label = `q${q.questionNumber}`;

  if (q.questionNumber !== i + 1) errors.push(`${label}: numbering out of sequence at index ${i}`);
  if (!q.category) errors.push(`${label}: missing category`);
  if (!q.question) errors.push(`${label}: missing question text`);

  if (!Array.isArray(q.correctAnswerArray) || q.correctAnswerArray.length !== 5) {
    errors.push(`${label}: correctAnswerArray must have exactly 5 slots`);
    return;
  }

  const trueCount = q.correctAnswerArray.filter(Boolean).length;
  if (trueCount !== 1) errors.push(`${label}: has ${trueCount} correct answers, expected exactly 1`);

  const answers = [q.answerOne, q.answerTwo, q.answerThree, q.answerFour, q.answerFive];
  const correctIndex = q.correctAnswerArray.indexOf(true);
  if (correctIndex !== -1 && !answers[correctIndex]) {
    errors.push(`${label}: correct slot ${correctIndex + 1} has no answer text`);
  }

  if (!q.answerOne || !q.answerTwo) errors.push(`${label}: answerOne and answerTwo are required`);

  if (seen.has(q.question)) errors.push(`${label}: duplicate question text`);
  seen.add(q.question);
});

const counts = {};
questionData.forEach((q) => {
  counts[q.category] = (counts[q.category] || 0) + 1;
});

console.log(`${questionData.length} questions | ${JSON.stringify(counts)}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("all checks passed");
