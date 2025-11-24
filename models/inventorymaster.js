'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InventoryMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InventoryMaster.init({
    warehouse_id: DataTypes.BIGINT,
    detail_product_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    indexes: [
      {
        unique: true,
        fields: ['warehouse_id', 'detail_product_id'],
        name: 'unique_warehouse_product_inventory'
      }
    ],
    modelName: 'InventoryMaster',
  });
  return InventoryMaster;
};