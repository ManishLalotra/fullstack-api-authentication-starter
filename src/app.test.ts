import request from 'supertest';
import { app } from './app';

describe('Auth Starter Endpoints', () => {
  it('GET /health returns healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('POST /api/auth/login succeeds with credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@platform.local', password: 'password123' });
    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
  });
});
