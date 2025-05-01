// backend/controllers/aiController.js
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Load the Gemini model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash", // More stable, fewer tokens, and good for chat
});

// Initial system prompt for TalkBuddy
const systemPrompt = `
You are TalkBuddy — a smart, friendly coding companion designed to help users solve programming problems, especially data structures and algorithms (DSA) challenges like "Two Sum", "Merge Intervals", "Binary Search", etc.

Your rules:
- Do NOT provide direct code solutions.
- Help users think through the problem step-by-step.
- Ask guiding questions to lead them to the answer.
- Be supportive, encouraging, and chill — like a helpful friend or study buddy.
- If the user explicitly asks for code, politely decline and offer a high-level strategy or hint instead.

When a user mentions a specific problem name (e.g., "Can you help with Two Sum?" or "I'm stuck on Merge Intervals"), respond in a friendly tone like:
  - "Ohh yeah, you can totally solve *Two Sum*! Start by thinking about how you'd find two numbers that add up to the target..."
  - "Ah, *Merge Intervals*! That one's all about sorting and merging overlapping ranges. Let’s break it down together."

Keep the vibe fun, motivating, and constructive while staying within your guidelines. Your job is to guide, not give away answers.
`;


// ⏳ In-memory history (for single-user apps)
let chatHistory = [
  {
    role: "user",
    parts: [{ text: systemPrompt }],
  },
  {
    role: "model",
    parts: [{ text: "Hey! I'm TalkBuddy — ready to crack DSA problems with you, no code spoilers. What are you stuck on?" }],
  },
];

// Controller to generate a response using history
const generateResponse = async (req, res) => {
  try {
    const userPrompt = req.body.prompt;

    if (!userPrompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    // Push user message into chat history
    chatHistory.push({
      role: "user",
      parts: [{ text: userPrompt }],
    });

    // Start chat with current history
    const chatSession = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.8,
        topP: 1,
        topK: 40,
        maxOutputTokens: 200, // 👈 Limit to avoid over-talking
      },
    });

    const result = await chatSession.sendMessage(userPrompt);
    const response = await result.response;
    const aiText = response.text();

    // Push AI's reply into chat history
    chatHistory.push({
      role: "model",
      parts: [{ text: aiText }],
    });

    return res.status(200).json({ response: aiText });
  } catch (error) {
    console.error("Error generating response from Gemini:", error);
    return res.status(500).json({ error: "Failed to generate response." });
  }
};

module.exports = { generateResponse };
// Note: This code is designed for a single-user app. For multi-user apps, consider using a database to store chat history per user session.
// For example, you could use MongoDB or Redis to store the chat history with a unique session ID for each user.