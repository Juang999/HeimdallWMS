'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleSubFeature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoleSubFeature.hasMany(models.RoleAccess, {
        as: 'role_accesses',
        sourceKey: 'id',
        foreignKey: 'role_sub_feature_id'
      })

      RoleSubFeature.belongsTo(models.SubFeature, {
        as: 'sub_features',
        targetKey: 'id',
        foreignKey: 'sub_feature_id'
      })
    }
  }
  RoleSubFeature.init({
    role_feature_id: DataTypes.BIGINT,
    sub_feature_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'RoleSubFeature',
  });
  return RoleSubFeature;
};