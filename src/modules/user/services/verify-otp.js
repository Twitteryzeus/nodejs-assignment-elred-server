const logger = require('../../../utils/logger');
const { sequelize, models } = require('../../../sequelize-client');
const { getMessage } = require('../../../utils/messages');
const moment = require('moment');
const { Op } = require('sequelize');
const { generateToken } = require('../../../utils/authorization');

const verifyOtp = async (req, res) => {
  let transaction;
  try {
    const { body } = req;
    const {
      User: UserModel,
      UserOtp: UserOtpModel,
      UserSession: UserSessionModel
    } = models;
    transaction = await sequelize.transaction();

    // TODO: Check if user exists with such email and OTP
    const userInstance = await UserModel.findOne({
      where: {
        email: body.email
      },
      include: {
        model: UserOtpModel,
        as: 'userOtps',
        where: {
          otp: body.otp,
          expiresAt: {
            [Op.gte]: moment()
          }
        }
      },
    });

    // TODO: If user doesn't exists throw error
    if (!userInstance) throw new Error(getMessage('USER_NOT_FOUND'));

    // TODO: Generate Token with user id as payload
    const token = generateToken({ userId: userInstance.id });

    // TODO: Create User Session Input Object
    const userSessionInput = {
      userId: userInstance.id,
      token,
      expiresAt: moment().add(10, 'minutes')
    };

    // Make a entry in the user session model
    await UserSessionModel.create(userSessionInput, { transaction });

    const response = {
      data: userSessionInput,
      message: getMessage('USER_OTP_VERIFY_SUCCESS')
    };

    await transaction.commit();
    res.status(200).json(response);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    logger.error('ERROR > USER > SERVICE > VERIFY OTP ', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = verifyOtp;