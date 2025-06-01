const request = require('supertest');
const app = require('../app');

describe('POST /chat', () => {
  it('returns mock reply', async () => {
    const res = await request(app).post('/chat').send({ message: "hello" });
    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toContain('Mock');
  });
});
