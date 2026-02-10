const Anthropic = require("@anthropic-ai/sdk");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../..", ".env") });

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY,
});

/**
 * Analyze task completion patterns and recommend optimal interval
 * @param {Array} completions - Completion records (sorted by date)
 * @param {Object} task - TaskTemplate object
 * @param {string} userPreferences - User's task preferences text
 * @returns {Promise<{recommendedInterval: number, insight: string}>}
 */
const analyzeTaskPattern = async (completions, task, userPreferences = "") => {
  const completionData = completions
    .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt))
    .map((c) => ({
      date: new Date(c.completedAt).toISOString().split("T")[0],
      dayOfWeek: new Date(c.completedAt).toLocaleDateString("en-US", { weekday: "long" }),
      actualInterval: c.actualInterval,
      wishEarlier: c.wishEarlier,
    }));

  const prompt = `You analyze household task completion patterns to recommend optimal repeat intervals.

Task: "${task.name}"
Default interval: ${task.defaultInterval} days
Current interval: ${task.currentInterval} days

Completion history (oldest to newest):
${completionData.map((c) => `- ${c.date} (${c.dayOfWeek}) | interval: ${c.actualInterval ?? "first"} days | feedback: ${c.wishEarlier === true ? "wish sooner" : c.wishEarlier === false ? "timing fine" : "no feedback"}`).join("\n")}

${userPreferences ? `User notes: ${userPreferences}` : ""}

Analyze the real pattern:
1. What's the average actual interval?
2. Does feedback suggest they want shorter or longer?
3. Any day-of-week patterns?
4. Is the current interval too long or too short based on behavior?

Respond in JSON ONLY (no markdown):
{"recommendedInterval": <integer days>, "insight": "<1-2 sentences explaining your recommendation>"}`;

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    temperature: 0.3,
    messages: [{ role: "user", content: prompt }],
  });

  const responseText = message.content[0].text.trim();

  let result;
  try {
    result = JSON.parse(responseText);
  } catch {
    const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (jsonMatch) {
      result = JSON.parse(jsonMatch[1]);
    } else {
      result = JSON.parse(responseText.replace(/^[^{]*/, "").replace(/[^}]*$/, ""));
    }
  }

  return {
    recommendedInterval: Math.max(1, Math.round(result.recommendedInterval)),
    insight: result.insight,
  };
};

module.exports = { analyzeTaskPattern };
