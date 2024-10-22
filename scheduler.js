// scheduler.js
const schedule = require('node-schedule');
const { fetchWeatherData } = require('./weatherFetcher');

// Schedule the fetchWeatherData function to run every 5 minutes
schedule.scheduleJob('*/5 * * * *', () => {
    console.log('Fetching weather data...');
    fetchWeatherData();
});
