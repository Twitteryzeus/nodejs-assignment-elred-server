const jwt = require('jsonwebtoken');
const { jwt: { secret, lifeTime } } = require('../config');

const generateToken = (payload = {}) => {
  const token = jwt.sign(payload, secret, { expiresIn: lifeTime });
  return token;
};

const decodeToken = (token = '') => {
  try {
    const decodedPayload = jwt.verify(token, secret);
    return decodedPayload;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateToken,
  decodeToken
};