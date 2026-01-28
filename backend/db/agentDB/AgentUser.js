const conn = require("../conn");
const { STRING, UUID, UUIDV4, BOOLEAN, TEXT, INTEGER } = conn.Sequelize;
const jwt = require("jsonwebtoken");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../..", ".env") });

const AGENT_JWT_SECRET =
  process.env.AGENT_JWT_SECRET || process.env.JWT || "agent-default-secret-change-in-production";

const DEFAULT_AI_PROMPT = `You are curating content for a senior software engineer working on microservices at JetBlue.

ONLY APPROVE articles that are:
- Production-ready engineering insights
- Advanced technical deep-dives
- Genuinely valuable to someone with 5+ years experience

Topics of interest: {topics}

REJECT:
- Beginner tutorials
- Memes/jokes
- Generic career advice
- Self-promotion

Be VERY selective. This person values their time.`;

const AgentUser = conn.define("agentuser", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  googleId: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: STRING,
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  isActive: {
    type: BOOLEAN,
    defaultValue: true,
  },
  aiPrompt: {
    type: TEXT,
    allowNull: true,
    defaultValue: DEFAULT_AI_PROMPT,
  },
  relevanceThreshold: {
    type: INTEGER,
    allowNull: true,
    defaultValue: 7,
    validate: {
      min: 0,
      max: 10,
    },
  },
  maxArticlesPerRun: {
    type: INTEGER,
    allowNull: true,
    defaultValue: 15,
  },
});

AgentUser.prototype.generateToken = function () {
  const payload = { id: this.id, email: this.email };
  const token = jwt.sign(payload, AGENT_JWT_SECRET, { expiresIn: "7d" });
  return { token };
};

AgentUser.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, AGENT_JWT_SECRET);
    const user = await this.findByPk(id);
    if (user && user.isActive) {
      return user;
    }
    const error = new Error("User not found or inactive");
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = new Error("Invalid token");
    error.status = 401;
    throw error;
  }
};

module.exports = AgentUser;
