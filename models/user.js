'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.UserRole, {
        as: 'role_relationship',
        sourceKey: 'id',
        foreignKey: 'user_id'
      })
    }
  }
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    last_login: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};