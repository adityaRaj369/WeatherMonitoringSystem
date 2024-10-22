// models/WeatherSummary.js
const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
    date: { type: String, required: true },
    avgTemp: { type: Number, required: true },
    maxTemp: { type: Number, required: true },
    minTemp: { type: Number, required: true },
    dominantCondition: { type: String, required: true },
    city: { type: String, required: true } // City field for the summary
});

module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);
