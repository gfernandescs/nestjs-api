export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY || 'a4nsg@%g@@25s',
  options: {
    expiresIn: '1h',
  },
};

export const IS_PUBLIC_KEY = 'isPublic';
