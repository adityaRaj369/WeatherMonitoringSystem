// tests/index.test.js
const request = require('supertest');
const app = require('../index'); // Assuming your app is exported from index.js

describe('GET /daily-summaries', () => {
    it('should return daily weather summaries', async () => {
        const response = await request(app).get('/daily-summaries');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
