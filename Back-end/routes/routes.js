import express from 'express';
import { addUser, loginUser } from '../controllers/user.js';
// import Login from '../../Front-end/src/pages/Auth/login.jsx';
const router = express.Router();

router.post('/', (req, res) => {
  // Code to login user
});
router.post("/adduser", addUser);
router.post("/login", loginUser);
export default router;