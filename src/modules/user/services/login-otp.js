const logger = require('../../../utils/logger');
const { sequelize, models } = require('../../../sequelize-client');
const { getMessage } = require('../../../utils/messages');
const { sendMail } = require('../../../utils/mail');
const { sendGrid } = require('../../../config');
const randomString = require('randomstring');
const moment = require('moment');

const loginOtp = async (req, res) => {
  let transaction;
  try {
    const { body } = req;
    const { User: UserModel, UserOtp: UserOtpModel } = models;
    transaction = await sequelize.transaction();

    // TODO: Check if user exists
    const userInstance = await UserModel.findOne({ where: { email: body.email }, raw: true });
    if (!userInstance) throw new Error(getMessage('USER_NOT_FOUND'));

    // TODO: Create Data for UserOtp Model
    const userModelInput = {
      userId: userInstance.id,
      otp: randomString.generate({ length: 6, charset: 'numeric' }),
      expiresAt: moment().add(10, 'minute')
    };

    // TODO: Create OTP Sending Data
    const msg = {
      to: body.email,
      from: sendGrid.fromMail, // Use the email address or domain you verified above
      subject: 'OTP For Verification',
      // text: 'and easy to do anywhere, even with Node.js',
      html: `<p>Please use this OTP for verification <strong>${userModelInput.otp}</strong>.</p>`,
    };

    // TODO: Send Mail to the user
    await sendMail(msg);

    // TODO: Create User OTP Instance
    await UserOtpModel.create(userModelInput, { transaction });

    const response = {
      data: userModelInput,
      message: getMessage('USER_OTP_SENT_SUCCESS')
    };

    await transaction.commit();
    res.status(200).json(response);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    logger.error('ERROR > USER > SERVICE > LOGIN OTP ', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = loginOtp;