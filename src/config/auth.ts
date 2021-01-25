const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '999d',
  },
};

export default authConfig;
