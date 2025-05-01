const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const authMiddleware = require('../../shared/middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify', authMiddleware, authController.verify);
router.put('/profile', authMiddleware, authController.updateProfile);
router.get('/alluser', authMiddleware, authController.getAllUsers);
router.delete('/user/:id', authMiddleware, authController.deleteUser);
module.exports = router