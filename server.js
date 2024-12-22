const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // For serving static files
const connectDB = require('./config/db');
const sessionMiddleware = require('./config/session');
const authRoutes = require('./routes/authRoutes');

const app = express();
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Supports form submissions
app.use(sessionMiddleware);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
connectDB();

// Routes
app.use('/auth', authRoutes);

app.use((req, res, next) => {
    console.log('Session:', req.session);
    next();
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

