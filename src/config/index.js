require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    lifeTime: process.env.JWT_LIFE_TIME
  },
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    fromMail: process.env.SENDGRID_FROM_MAIL
  }
};