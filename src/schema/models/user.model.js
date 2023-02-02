const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model { }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  })

  User.associate = (models) => {
    User.hasMany(models.UserSession, {
      as: 'userSessions',
      foreignKey: 'userId',
      sourceKey: 'id',
      constraints: false,
      onDelete: 'RESTRICT',
      hooks: true
    })
    User.hasMany(models.UserOtp, {
      as: 'userOtps',
      foreignKey: 'userId',
      sourceKey: 'id',
      constraints: false,
      onDelete: 'RESTRICT',
      hooks: true
    })
    User.hasMany(models.Task, {
      as: 'tasks',
      foreignKey: 'userId',
      sourceKey: 'id',
      constraints: false,
      onDelete: 'RESTRICT',
      hooks: true
    })
  }

  return User;
};