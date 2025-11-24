'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MasterProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MasterProduct.hasMany(models.DetailProduct, {
        as: 'detail_products',
        sourceKey: 'id',
        foreignKey: 'product_id'
      })

      MasterProduct.belongsTo(models.Brand, {
        as: 'brand',
        targetKey: 'id',
        foreignKey: 'brand_id'
      })

      MasterProduct.belongsTo(models.Category, {
        as: 'category',
        targetKey: 'id',
        foreignKey: 'category_id'
      })

      MasterProduct.belongsTo(models.SubCategory, {
        as: 'sub_category',
        targetKey: 'id',
        foreignKey: 'sub_category_id'
      })

      MasterProduct.belongsTo(models.CodeMaster, {
        as: 'gender',
        targetKey: 'id',
        foreignKey: 'gender_id'
      })
    }
  }
  MasterProduct.init({
    product_code: DataTypes.STRING,
    product_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    brand_id: DataTypes.BIGINT,
    category_id: DataTypes.BIGINT,
    sub_category_id: DataTypes.BIGINT,
    product_seq: DataTypes.STRING,
    gender_id: DataTypes.BIGINT
  }, {
    sequelize,
    paranoid: true,
    modelName: 'MasterProduct',
  });
  return MasterProduct;
};