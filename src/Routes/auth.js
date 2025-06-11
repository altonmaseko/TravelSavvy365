// auth.js
import express from 'express';
import { 
    login, 
    logout, 
    register, 
    getCurrentUser, 
    resetPassword 
} from '../Controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/register', register);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

// Protected routes
router.get('/me', getCurrentUser);

export default router;