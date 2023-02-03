const logger = require('../../../utils/logger');
const { sequelize, models } = require('../../../sequelize-client');
const { getMessage } = require('../../../utils/messages');

const create = async (req, res) => {
  let transaction;
  try {
    const { body } = req;
    const { User: UserModel } = models;
    transaction = await sequelize.transaction();

    // TODO: Check if same user exists
    const count = await UserModel.count({ where: { email: body.email } });
    if (count) throw new Error(getMessage('USER_EXISTS'));

    // TODO: Create User After Validation
    const userInstance = await UserModel.create(body, { transaction });

    const response = {
      data: userInstance,
      message: getMessage('USER_CREATE_SUCCESS')
    };

    await transaction.commit();
    res.status(201).json(response);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    logger.error('ERROR > USER > SERVICE > CREATE ', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = create;