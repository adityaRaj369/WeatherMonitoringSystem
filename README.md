# Weather Monitoring System

## Overview

The Weather Monitoring System is a real-time application that fetches weather data for multiple cities, aggregates it, and presents daily summaries along with visualizations using charts. The application utilizes Node.js, Express, MongoDB, and Chart.js for the frontend representation.

## Features

- **Real-time Weather Data Fetching**: Uses the OpenWeatherMap API to fetch current weather conditions for multiple cities at regular intervals.
- **Daily Weather Summaries**: Aggregates weather data and stores daily summaries, including average, maximum, and minimum temperatures, as well as the dominant weather condition for each day.
- **Email Alerts**: Sends email notifications when the temperature exceeds a user-defined threshold.
- **Responsive Visualization**: Presents weather data using Chart.js, displaying average temperature trends over time, along with detailed daily summaries in a tabular format.
- **MongoDB Integration**: Stores weather summaries in a MongoDB database for persistent data storage.

## Technology Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Frontend**: HTML, CSS, JavaScript with Chart.js for visualizations
- **Email Service**: Nodemailer for sending alerts
- **Scheduling**: Node-schedule for periodic data fetching

## Getting Started

### Prerequisites

- **Node.js**: Ensure that you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **MongoDB**: You should have a MongoDB database set up. If you don't have MongoDB installed locally, you can use a cloud service like MongoDB Atlas.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of your project and add the following environment variables:
   ```plaintext
   API_KEY=<Your_OpenWeatherMap_API_Key>
   MONGODB_URI=<Your_MongoDB_Connection_String>
   PORT=3000
   EMAIL_USER=<Your_Email_Address>
   EMAIL_PASS=<Your_Email_Password>
   ALERT_THRESHOLD=20
   ```

### Running the Application

1. Start the MongoDB service (if running locally).

2. Run the application using:
   ```bash
   node index.js
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the Weather Monitoring System.

### Testing

To run the tests, you can use the following command:
```bash
npm test
```

### Project Structure

```
WeatherMonitoringSystem/
│
├── models/
│   └── WeatherSummary.js         # Mongoose schema for weather summaries
│
├── public/
│   ├── index.html                # Main HTML file for the frontend
│   ├── script.js                 # JavaScript file for fetching data and rendering the chart
│
├── tests/
│   ├── index.test.js             # Tests for the daily summaries API endpoint
│   └── weatherFetcher.test.js     # Tests for weather data fetching functionality
│
├── .env                           # Environment variables
├── index.js                       # Main application file
├── scheduler.js                   # Scheduler for fetching weather data periodically
└── weatherFetcher.js              # Module for fetching and processing weather data
```

## Technical Details

### Models

**WeatherSummary.js**: Defines the schema for storing weather summaries in MongoDB. It includes fields for date, average temperature, maximum and minimum temperatures, dominant weather condition, and city.

### Fetching Weather Data

**weatherFetcher.js**: Contains the logic for fetching weather data from the OpenWeatherMap API. It processes the fetched data, checks for alerts based on temperature thresholds, and saves daily summaries to the MongoDB database.

### Scheduling

**scheduler.js**: Uses the `node-schedule` package to fetch weather data every 5 minutes, ensuring that the application remains updated with the latest weather conditions.

### Frontend Visualization

**script.js**: Handles fetching the daily summaries and rendering them using Chart.js. It creates a line chart showing average temperatures over time and populates a table with detailed daily weather summaries.

## Conclusion

The Weather Monitoring System is a robust application that provides users with real-time weather updates and insights through effective data aggregation and visualization. The modular structure of the application allows for easy enhancements and maintenance.

Feel free to contribute to this project or reach out for any questions!


##ScreenShots

The screenshot includes the graph data fetched from the database and also the table content for changes in temperature with different table for specific dates

![image](https://github.com/user-attachments/assets/1ca2048e-69ba-4612-9003-39c0a5426ad7)
![image](https://github.com/user-attachments/assets/747b6e18-4079-4951-9e89-133ca60e5e29)
![image](https://github.com/user-attachments/assets/030aee56-2586-46e8-8832-0b0190d22c9b)

