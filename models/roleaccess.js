'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoleAccess.belongsTo(models.Access, {
        as: 'access',
        targetKey: 'id',
        foreignKey: 'access_id'
      })
    }
  }
  RoleAccess.init({
    role_id: DataTypes.BIGINT,
    access_id: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'RoleAccess',
  });
  return RoleAccess;
};