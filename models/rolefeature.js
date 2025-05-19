'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleFeature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoleFeature.hasMany(models.RoleSubFeature, {
        as: 'role_sub_features',
        sourceKey: 'id',
        foreignKey: 'role_feature_id'
      })

      RoleFeature.belongsTo(models.Feature, {
        as: 'feature',
        targetKey: 'id',
        foreignKey: 'role_feature_id'
      })
    }
  }
  RoleFeature.init({
    role_id: DataTypes.BIGINT,
    feature_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'RoleFeature',
  });
  return RoleFeature;
};