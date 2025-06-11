// auth.js
import express from 'express';
import { 
    login, 
    register, 
    getCurrentUser, 
} from '../Controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/register', register);

// Protected routes
router.get('/me', getCurrentUser);

export default router;