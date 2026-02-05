const nodemailer = require("nodemailer");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../..", ".env") });

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AGENT_EMAIL_USER || process.env.VALI_CONTACT_EMAIL,
    pass: process.env.AGENT_EMAIL_PASSWORD || process.env.VALI_CONTACT_EMAIL_PASSWORD,
  },
});

/**
 * Send task reminder email
 * @param {Object} user - AgentUser object with email
 * @param {Array} overdueTasks - Array of overdue tasks
 * @param {Array} dueSoonTasks - Array of tasks due within 3 days
 * @returns {Promise<Object>} - Result of email send
 */
const sendTaskReminder = async (user, overdueTasks = [], dueSoonTasks = []) => {
  if (!user || !user.email) {
    throw new Error("User email is required");
  }

  if (overdueTasks.length === 0 && dueSoonTasks.length === 0) {
    console.log(`No tasks to remind ${user.email} about`);
    return { skipped: true, reason: "No tasks due" };
  }

  // Build email body
  let emailBody = `Hi ${user.name || "there"},\n\nThis is your household task reminder from Agent Dashboard.\n\n`;

  if (overdueTasks.length > 0) {
    emailBody += `OVERDUE TASKS (${overdueTasks.length}):\n`;
    overdueTasks.forEach((task) => {
      const daysLate = Math.ceil((new Date() - new Date(task.nextDueAt)) / (1000 * 60 * 60 * 24));
      emailBody += `  • ${task.name} - ${daysLate} days overdue\n`;
    });
    emailBody += `\n`;
  }

  if (dueSoonTasks.length > 0) {
    emailBody += `DUE SOON (${dueSoonTasks.length}):\n`;
    dueSoonTasks.forEach((task) => {
      const daysUntil = Math.ceil((new Date(task.nextDueAt) - new Date()) / (1000 * 60 * 60 * 24));
      emailBody += `  • ${task.name} - due in ${daysUntil} day${daysUntil === 1 ? "" : "s"}\n`;
    });
    emailBody += `\n`;
  }

  emailBody += `Log into your dashboard to mark tasks as complete:\n`;
  emailBody += `${process.env.NODE_ENV === "development" ? "http://localhost:3000/dashboard" : "https://www.joedelbalzo.com/dashboard"}\n\n`;
  emailBody += `Best,\nAgent Dashboard`;

  const mailOptions = {
    from: process.env.AGENT_EMAIL_USER || process.env.VALI_CONTACT_EMAIL,
    to: user.email,
    subject: `Task Reminder: ${overdueTasks.length} overdue, ${dueSoonTasks.length} due soon`,
    text: emailBody,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Task reminder sent to ${user.email}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`Failed to send task reminder to ${user.email}:`, error);
    throw error;
  }
};

/**
 * Check for due tasks and send reminder emails to all users
 * @returns {Promise<Array>} - Array of results for each user
 */
const sendDueTaskReminders = async () => {
  const { AgentUser, TaskTemplate } = require("../../../db/agentDB");
  const { Op } = require("sequelize");

  try {
    const users = await AgentUser.findAll({
      where: { isActive: true },
    });

    const results = [];

    for (const user of users) {
      try {
        const now = new Date();
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

        // Get user's overdue tasks
        const overdueTasks = await TaskTemplate.findAll({
          where: {
            agentuserId: user.id,
            nextDueAt: {
              [Op.lt]: now,
            },
          },
          order: [["nextDueAt", "ASC"]],
        });

        // Get user's tasks due soon (within 3 days)
        const dueSoonTasks = await TaskTemplate.findAll({
          where: {
            agentuserId: user.id,
            nextDueAt: {
              [Op.gte]: now,
              [Op.lte]: threeDaysFromNow,
            },
          },
          order: [["nextDueAt", "ASC"]],
        });

        if (overdueTasks.length > 0 || dueSoonTasks.length > 0) {
          const result = await sendTaskReminder(user, overdueTasks, dueSoonTasks);
          results.push({
            user: user.email,
            overdue: overdueTasks.length,
            dueSoon: dueSoonTasks.length,
            ...result,
          });
        } else {
          results.push({
            user: user.email,
            skipped: true,
            reason: "No tasks due",
          });
        }
      } catch (error) {
        console.error(`Failed to process reminders for ${user.email}:`, error);
        results.push({
          user: user.email,
          error: error.message,
        });
      }
    }

    return results;
  } catch (error) {
    console.error("Failed to send task reminders:", error);
    throw error;
  }
};

module.exports = {
  sendTaskReminder,
  sendDueTaskReminders,
};
