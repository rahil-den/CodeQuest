const express = require("express");
const router = express.Router();
const aiController = require("./../controllers/aiControllers");
const authMiddleware = require("../../shared/middleware/authMiddleware");

// Route to generate AI response
router.post("/", authMiddleware, aiController.generateResponse);

module.exports = router;
// This code sets up the route for generating AI responses. It uses the `authMiddleware` to ensure that only authenticated users can access this route. The actual logic for generating the response is handled in the `aiController.generateResponse` function.
// The `authMiddleware` checks if the user is authenticated before allowing access to the AI response generation route. If the user is not authenticated, they will receive an error response.