// weatherFetcher.js
const axios = require('axios');
const WeatherSummary = require('./models/WeatherSummary');
const nodemailer = require('nodemailer');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
let dailyData = {}; // To aggregate daily data for summaries

// Configure nodemailer for email alerts
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Initialize variables for tracking alerts
let alertCounts = {}; // Track alert counts for each city

// Function to fetch weather data
async function fetchWeatherData() {
    for (const city of CITIES) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            console.log(`Fetched data for ${city}:`, response.data);
            processWeatherData(response.data);
        } catch (error) {
            console.error(`Error fetching data for ${city}: ${error.response ? error.response.data.message : error.message}`);
        }
    }
}

// Function to process weather data
function processWeatherData(data) {
    const tempCelsius = data.main.temp; // Temperature in Celsius
    const condition = data.weather[0].main; // Current weather condition
    const timestamp = new Date(data.dt * 1000).toISOString().split('T')[0]; // YYYY-MM-DD format
    const cityName = data.name; // Get city name from the API response

    // Aggregate daily data
    if (!dailyData[timestamp]) {
        dailyData[timestamp] = {
            temps: [],
            conditions: [],
            cities: [],
        };
    }
    dailyData[timestamp].temps.push(tempCelsius);
    dailyData[timestamp].conditions.push(condition);
    dailyData[timestamp].cities.push(cityName);

    // Check for alert
    checkAlerts(tempCelsius, cityName);

    // Save the daily summary immediately
    saveDailySummary(timestamp); // Save after processing
}

// Function to check alerts
function checkAlerts(temp, city) {
    const alertThreshold = parseInt(process.env.ALERT_THRESHOLD) || 35; // User-configurable threshold
    // Initialize alertCounts for each city
    if (!alertCounts[city]) {
        alertCounts[city] = { count: 0, lastTemp: null };
    }

    // Check if temperature exceeds threshold
    if (temp > alertThreshold) {
        alertCounts[city].count += 1;
        alertCounts[city].lastTemp = temp;

        // Trigger alert if this is the second consecutive update
        if (alertCounts[city].count >= 2) {
            sendAlert(temp, city);
        }
    } else {
        // Reset alert count if below threshold
        alertCounts[city].count = 0;
    }
}

// Function to send email alert
function sendAlert(temp, city) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Weather Alert',
        text: `Alert: Temperature in ${city} has exceeded ${temp.toFixed(2)}°C!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    });
}

// Function to save daily summary
async function saveDailySummary(date) {
    const temps = dailyData[date].temps;
    const conditions = dailyData[date].conditions;
    const cities = dailyData[date].cities;

    const avgTemp = temps.reduce((a, b) => a + b) / temps.length;
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const dominantCondition = mostFrequent(conditions);

    const summary = new WeatherSummary({
        date,
        avgTemp,
        maxTemp,
        minTemp,
        dominantCondition,
        city: cities.join(', ') // Store all cities as a comma-separated string
    });

    // Save to MongoDB
    await summary.save();
    console.log(`Daily summary saved for ${date}: Avg Temp: ${avgTemp.toFixed(2)}°C, Max Temp: ${maxTemp}°C, Min Temp: ${minTemp}°C, Condition: ${dominantCondition}, Cities: ${cities.join(', ')}`);

    // Clear the daily data after saving
    delete dailyData[date];
}


// Function to find the most frequent item in an array
function mostFrequent(array) {
    const frequency = {};
    let maxFreq = 0;
    let mostFrequentItem = '';

    array.forEach(item => {
        frequency[item] = (frequency[item] || 0) + 1;
        if (frequency[item] > maxFreq) {
            maxFreq = frequency[item];
            mostFrequentItem = item;
        }
    });

    return mostFrequentItem;
}

module.exports = { fetchWeatherData };