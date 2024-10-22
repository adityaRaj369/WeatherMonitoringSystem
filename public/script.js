// // public/script.js
// async function fetchWeatherData() {
//     const response = await fetch('/daily-summaries');
//     const data = await response.json();
//     return data;
// }

// async function renderChart() {
//     const weatherData = await fetchWeatherData();

//     const dates = weatherData.map(item => item.date);
//     const avgTemps = weatherData.map(item => item.avgTemp);

//     const ctx = document.getElementById('weatherChart').getContext('2d');
//     const weatherChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: dates,
//             datasets: [{
//                 label: 'Average Temperature (°C)',
//                 data: avgTemps,
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 2,
//                 fill: false,
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });

//     // Populate the summary table
//     const summaryTable = document.getElementById('summaryTable');
//     summaryTable.innerHTML = `<tr>
//         <th>Date</th>
//         <th>Avg Temp (°C)</th>
//         <th>Max Temp (°C)</th>
//         <th>Min Temp (°C)</th>
//         <th>Dominant Condition</th>
//         <th>City</th>
//     </tr>`;
    
//     weatherData.forEach(item => {
//         summaryTable.innerHTML += `<tr>
//             <td>${item.date}</td>
//             <td>${item.avgTemp}</td>
//             <td>${item.maxTemp}</td>
//             <td>${item.minTemp}</td>
//             <td>${item.dominantCondition}</td>
//             <td>${item.city}</td>
//         </tr>`;
//     });
// }

// renderChart();
async function fetchWeatherData() {
    const response = await fetch('/daily-summaries');
    const data = await response.json();
    return data;
}

async function renderChart() {
    const weatherData = await fetchWeatherData();

    // Group the data by date
    const groupedData = weatherData.reduce((acc, item) => {
        if (!acc[item.date]) {
            acc[item.date] = [];
        }
        acc[item.date].push(item);
        return acc;
    }, {});

    // Chart logic
    const dates = Object.keys(groupedData);
    const avgTemps = dates.map(date => {
        const temps = groupedData[date].map(item => item.avgTemp);
        return temps.reduce((a, b) => a + b) / temps.length;
    });

    const ctx = document.getElementById('weatherChart').getContext('2d');
    const weatherChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Average Temperature (°C)',
                data: avgTemps,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Render each date in a separate table
    const summaryContainer = document.getElementById('summaryContainer');
    summaryContainer.innerHTML = ''; // Clear previous content

    for (const [date, items] of Object.entries(groupedData)) {
        // Create a new table for each date
        const table = document.createElement('table');
        table.innerHTML = `
            <caption>Weather Summary for ${date}</caption>
            <tr>
                <th>Date</th>
                <th>Avg Temp (°C)</th>
                <th>Max Temp (°C)</th>
                <th>Min Temp (°C)</th>
                <th>Dominant Condition</th>
                <th>City</th>
            </tr>
        `;
        
        items.forEach(item => {
            const row = `<tr>
                <td>${item.date}</td>
                <td>${item.avgTemp}</td>
                <td>${item.maxTemp}</td>
                <td>${item.minTemp}</td>
                <td>${item.dominantCondition}</td>
                <td>${item.city}</td>
            </tr>`;
            table.innerHTML += row;
        });

        summaryContainer.appendChild(table);
    }
}

renderChart();
