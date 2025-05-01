const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');
const authMiddleware = require('../../shared/middleware/authMiddleware');

// Get all problems
router.get('/', authMiddleware, problemController.getAllProblems);

// Get problem by ID
router.get('/:id', authMiddleware, problemController.getProblemById);

// Create problem (admin only in a real app)
router.post('/', authMiddleware, problemController.createProblem);

// Update problem
router.put('/:id', authMiddleware, problemController.updateProblem);

// Delete problem
router.delete('/:id', authMiddleware, problemController.deleteProblem);

module.exports = router; 