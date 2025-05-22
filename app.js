import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Log all route registrations
const originalGet = app.get;
app.get = function (path, ...args) {
  console.log(`Registering route: ${path}`);
  return originalGet.call(this, path, ...args);
};

// Serve static files from the React frontend's dist folder
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Middleware to log request paths
app.use((req, res, next) => {
  console.log(`Request path: ${req.path}`);
  next();
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Catch-all route to serve index.html for client-side routing
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});



// Use environment port for Azure, fallback to 3000 locally
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});