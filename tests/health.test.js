// File: tests/health.test.js
// Generated: 2025-10-08 11:36:52 UTC
// Project ID: proj_388a524d8735
// Task ID: task_d7g4d6ll86pg


const app = require('../src/app');


const request = require('supertest');

describe('Health Check Endpoint', () => {
  describe('GET /health', () => {
    it('should return 200 status code', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.status).toBe(200);
    });

    it('should return success true', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.body).toHaveProperty('success');
      expect(response.body.success).toBe(true);
    });

    it('should return status healthy', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('status');
      expect(response.body.data.status).toBe('healthy');
    });

    it('should return timestamp', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.body.data).toHaveProperty('timestamp');
      expect(typeof response.body.data.timestamp).toBe('string');
      expect(new Date(response.body.data.timestamp).toString()).not.toBe('Invalid Date');
    });

    it('should return uptime', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.body.data).toHaveProperty('uptime');
      expect(typeof response.body.data.uptime).toBe('number');
      expect(response.body.data.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should return message', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.body).toHaveProperty('message');
      expect(typeof response.body.message).toBe('string');
      expect(response.body.message.length).toBeGreaterThan(0);
    });

    it('should have consistent response format', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.body).toEqual({
        success: true,
        data: expect.objectContaining({
          status: 'healthy',
          timestamp: expect.any(String),
          uptime: expect.any(Number)
        }),
        message: expect.any(String)
      });
    });

    it('should respond quickly (under 100ms)', async () => {
      const startTime = Date.now();

      await request(app)
        .get('/health')
        .expect(200);

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(responseTime).toBeLessThan(100);
    });

    it('should handle multiple concurrent requests', async () => {
      const requests = Array(10).fill(null).map(() =>
        request(app).get('/health').expect(200)
      );

      const responses = await Promise.all(requests);

      responses.forEach(response => {
        expect(response.body.success).toBe(true);
        expect(response.body.data.status).toBe('healthy');
      });
    });

    it('should not accept POST requests', async () => {
      await request(app)
        .post('/health')
        .expect(404);
    });

    it('should not accept PUT requests', async () => {
      await request(app)
        .put('/health')
        .expect(404);
    });

    it('should not accept DELETE requests', async () => {
      await request(app)
        .delete('/health')
        .expect(404);
    });

    it('should not accept PATCH requests', async () => {
      await request(app)
        .patch('/health')
        .expect(404);
    });

    it('should return valid JSON', async () => {
      const response = await request(app)
        .get('/health');

      expect(() => JSON.parse(JSON.stringify(response.body))).not.toThrow();
    });

    it('should have correct content-type header', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.headers['content-type']).toMatch(/application\/json/);
    });
  });

  describe('Health Check Reliability', () => {
    it('should return same structure on repeated calls', async () => {
      const response1 = await request(app).get('/health');
      const response2 = await request(app).get('/health');

      expect(Object.keys(response1.body).sort()).toEqual(Object.keys(response2.body).sort());
      expect(Object.keys(response1.body.data).sort()).toEqual(Object.keys(response2.body.data).sort());
    });

    it('should increment uptime on subsequent calls', async () => {
      const response1 = await request(app).get('/health');

      await new Promise(resolve => setTimeout(resolve, 100));

      const response2 = await request(app).get('/health');

      expect(response2.body.data.uptime).toBeGreaterThanOrEqual(response1.body.data.uptime);
    });

    it('should have different timestamps on subsequent calls', async () => {
      const response1 = await request(app).get('/health');

      await new Promise(resolve => setTimeout(resolve, 10));

      const response2 = await request(app).get('/health');

      expect(response1.body.data.timestamp).not.toBe(response2.body.data.timestamp);
    });
  });
});
