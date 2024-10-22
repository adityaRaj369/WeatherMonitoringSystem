// tests/weatherFetcher.test.js
const axios = require('axios');
const { fetchWeatherData } = require('../weatherFetcher');

jest.mock('axios');

describe('fetchWeatherData', () => {
    it('should fetch weather data successfully', async () => {
        const mockData = {
            main: { temp: 30 },
            weather: [{ main: 'Clear' }],
            dt: Math.floor(Date.now() / 1000),
            name: 'Delhi'
        };
        axios.get.mockResolvedValue({ data: mockData });
        
        await fetchWeatherData(); // Call the function to test
        
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('Delhi'));
    });

    it('should handle errors when fetching data', async () => {
        axios.get.mockRejectedValue(new Error('Error fetching data'));
        
        await expect(fetchWeatherData()).rejects.toThrow('Error fetching data');
    });
});
