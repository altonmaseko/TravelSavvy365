import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
//import client from "../utils/db.js";
import UserModel from "../Models/UserModels.js";
import { connectToDB } from "../config/mongoClient.js";

dotenv.config();

// MongoDB setup
const dbName = "TravelSavvy";
const collectionName = "users";

// REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password, employeeType = "employee", organization = "company" } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const db = await connectToDB();
      //  const db = client.db(dbName);
        const usersCollection = db.collection(collectionName);

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            password: hashedPassword,
            employeeType,
            organization,
            createdAt: new Date()
        };

        const result = await usersCollection.insertOne(newUser);
        newUser._id = result.insertedId;

        const token = generateToken(newUser);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                employeeType: newUser.employeeType,
                organization: newUser.organization
            }
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const db = await connectToDB();
       // const db = client.db(dbName);
        const usersCollection = db.collection(collectionName);

        const user = await usersCollection.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                employeeType: user.employeeType,
                organization: user.organization
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET CURRENT USER
export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const db = await connectToDB();
        //const db = client.db(dbName);
        const usersCollection = db.collection(collectionName);

        const user = await usersCollection.findOne({ _id: new client.constructor.ObjectId(decoded.id) });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                employeeType: user.employeeType,
                organization: user.organization
            }
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

function generateToken(user) {
    return jwt.sign(
        { 
            id: user._id?.toString(), 
            email: user.email, 
            role: user.employeeType 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
}
