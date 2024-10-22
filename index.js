// index.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const WeatherSummary = require('./models/WeatherSummary');
require('./scheduler'); // Start the scheduler 
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the HTML file for visualization
});

// Route to get daily weather summaries
app.get('/daily-summaries', async (req, res) => {
    try {
        const summaries = await WeatherSummary.find().sort({ date: -1 });
        res.json(summaries);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
