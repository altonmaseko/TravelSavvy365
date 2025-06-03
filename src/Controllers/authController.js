import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModels.js";

dotenv.config();

// In-memory user storage for demo (replace with actual database)
//TODO include company database connection and user model
// This is just a placeholder. In a real application, you would use a database.
const users = [
    new UserModel(1, "John Doe", "employee@company.com", "password123", "employee"),
    new UserModel(2, "Jane Smith", "manager@company.com", "password123", "line_manager"),
    new UserModel(3, "Admin User", "admin@company.com", "password123", "admin")
];

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login request received:', { email });
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        // Find user by email
        const user = users.find(u => u.email === email);
        
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isValidPassword = user.verifyPassword(password);
        
        if (!isValidPassword) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken(user);

        // Set HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Return user info (without password)
        res.json({
            message: "Login successful",
            user: user.toJSON()
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

export const logout = async (req, res) => {
    try {
        // Clear the authentication cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        });

        res.json({ message: "Logout successful" });

    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password, employeeType = "employee" } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email, and password are required'
            });
        }

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({
                message: 'User with this email already exists'
            });
        }

        // Validate employee type
        const validTypes = ['employee', 'line_manager', 'admin'];
        if (!validTypes.includes(employeeType)) {
            return res.status(400).json({
                message: 'Invalid employee type'
            });
        }

        // Create new user
        const newUser = new UserModel(
            users.length + 1, // Simple ID generation for demo
            name,
            email,
            password,
            employeeType
        );

        users.push(newUser);

        // Generate token
        const token = generateToken(newUser);

        // Set HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.status(201).json({
            message: "Registration successful",
            user: newUser.toJSON()
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = users.find(u => u.id === decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            user: user.toJSON()
        });

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        console.error('Get current user error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: 'Email is required'
            });
        }

        const user = users.find(u => u.email === email);
        
        if (!user) {
            // Don't reveal whether user exists or not for security
            return res.json({
                message: 'If an account with that email exists, a password reset link has been sent.'
            });
        }
        
        console.log(`Password reset requested for user: ${email}`);
        
        res.json({
            message: 'If an account with that email exists, a password reset link has been sent.'
        });

    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

function generateToken(user) {
    return jwt.sign(
        { 
            id: user.id, 
            email: user.email, 
            role: user.employeeType 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
}