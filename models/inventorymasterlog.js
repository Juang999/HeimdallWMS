'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InventoryMasterLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InventoryMasterLog.init({
    warehouse_from_id: DataTypes.BIGINT,
    warehouse_to_id: DataTypes.BIGINT,
    detail_product_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InventoryMasterLog',
  });
  return InventoryMasterLog;
};