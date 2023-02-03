const sgMail = require('@sendgrid/mail');
const logger = require('../logger');
const { sendGrid } = require('../../config');
sgMail.setApiKey(sendGrid.apiKey);

const sendMail = async (data = {}) => {
  try {
    await sgMail.send(data);
    logger.info('INFO > SEND MAIL > ', JSON.stringify(data));
  } catch (error) {
    logger.error('ERROR > SEND MAIL > ', error);
    throw error;
  }
};

module.exports = { sendMail };