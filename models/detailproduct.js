'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailProduct.belongsTo(models.MasterProduct, {
        as: 'master_product',
        foreignKey: 'product_id',
        targetKey: 'id'
      });
    }
  }
  DetailProduct.init({
    detail_product_code: DataTypes.STRING,
    detail_product_name: DataTypes.STRING,
    grade: DataTypes.STRING,
    color_id: DataTypes.BIGINT,
    size_id: DataTypes.BIGINT
  }, {
    sequelize,
    paranoid: true,
    modelName: 'DetailProduct',
  });
  return DetailProduct;
};