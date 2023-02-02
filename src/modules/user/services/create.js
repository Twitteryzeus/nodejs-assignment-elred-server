const logger = require('../../../utils/logger');

const create = async (req, res) => {
  try {
    res.status(200).json({ message: 'User Created Successfully!' });
  } catch (error) {
    logger.error('ERROR > USER > SERVICE > CREATE ', error);
    throw error;
  }
};

module.exports = create;