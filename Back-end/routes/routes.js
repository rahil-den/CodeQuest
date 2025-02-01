import express from 'express';
import { addUser, getUserInfo, loginUser, updateUser } from '../controllers/user.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';
// import Login from '../../Front-end/src/pages/Auth/login.jsx';
const router = express.Router();

router.post("/adduser", addUser);
router.post("/login", loginUser);

router.get('/user/get', AuthMiddleware,getUserInfo);
router.put('/user/update', AuthMiddleware,updateUser);
export default router;