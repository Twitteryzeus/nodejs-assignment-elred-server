const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Task extends Model { }

  Task.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'task'
  })

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      targetKey: 'id',
    })
  }

  return Task;
};