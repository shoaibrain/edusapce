const request = require('supertest');
const app = require('@/app/api/users'); // Import your API route

describe('GET /api/users', () => {
  it('responds with JSON', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('responds with an array of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.body).toEqual([
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ]);
  });
});