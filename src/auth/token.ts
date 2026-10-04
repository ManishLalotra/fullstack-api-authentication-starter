import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
  role: string;
}

export const generateTokens = (user: UserPayload) => {
  const accessSecret = process.env.JWT_ACCESS_SECRET || 'dev_access_secret_key_32_bytes_min';
  const refreshSecret = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_key_32_bytes_min';

  const accessToken = jwt.sign(user, accessSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id }, refreshSecret, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};
