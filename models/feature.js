'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Feature.hasMany(models.SubFeature, {
        as: 'sub_features',
        sourceKey: 'id',
        foreignKey: 'feature_id',
      })
    }
  }
  Feature.init({
    feature_name: DataTypes.STRING,
    is_activate: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Feature',
  });
  return Feature;
};