'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubFeature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubFeature.hasMany(models.Access, {
        as: 'accesses',
        sourceKey: 'id',
        foreignKey: 'sub_feature_id'
      })
    }
  }
  SubFeature.init({
    sub_feature_name: DataTypes.STRING,
    feature_id: DataTypes.BIGINT,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SubFeature',
  });
  return SubFeature;
};