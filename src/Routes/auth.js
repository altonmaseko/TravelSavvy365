
import express from 'express';
const router = express.Router();
import { login } from '../Controllers/authController.js'


router.post('/login', login);

export default router;