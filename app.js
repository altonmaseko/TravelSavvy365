import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

// Import middleware
import { 
    requestLogger, 
    errorHandler, 
    rateLimit, 
    corsHandler 
} from './src/middleware/middleware.js';

// Import routes
import authRoutes from './src/Routes/auth.js';
import travelRoutes from './src/Routes/travel.js';
import bookingRoutes from './src/Routes/booking.js';

const app = express();

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Apply global middleware
app.use(corsHandler);
app.use(rateLimit(15 * 60 * 1000, 100)); // 100 requests per 15 minutes
app.use(requestLogger);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the React frontend's dist folder
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/travel', travelRoutes);
app.use('/api/booking', bookingRoutes);


// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// API 404 handler
app.use('/api/*', (req, res) => {
    res.status(404).json({ 
        message: 'API endpoint not found',
        path: req.path,
        method: req.method
    });
});

// Catch-all route to serve index.html for client-side routing
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

// Apply error handling middleware last
app.use(errorHandler);

// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

// Use environment port for Azure, fallback to 3001 locally
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Health check: http://localhost:${port}/api/health`);
});

// Handle server errors
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${port} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

export default app;

//