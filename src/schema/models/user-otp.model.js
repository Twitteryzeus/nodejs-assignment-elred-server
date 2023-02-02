const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class UserOtp extends Model { }

  UserOtp.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserOtp',
    tableName: 'user_otp'
  })

  UserOtp.associate = (models) => {
    UserOtp.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      targetKey: 'id',
    })
  }

  return UserOtp;
};