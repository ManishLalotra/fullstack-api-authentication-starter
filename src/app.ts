import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { generateTokens } from './auth/token.js';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many authentication attempts. Please retry later.' }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'fullstack-api-authentication-starter',
    author: 'Manish Lalotra',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/auth/login', authLimiter, (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  // Realistic mock credentials verification
  const tokens = generateTokens({
    id: 'usr_admin',
    email,
    role: 'admin'
  });

  res.json({
    message: 'Authentication successful',
    ...tokens
  });
});
