const { 
    InventoryMaster,
    InventoryMasterLog, sequelize 
} = require('../../../models');

class InventoryService {
    insertDataInventory = async (data, transaction) => {
        let result = await InventoryMaster.upsert({
            warehouse_id: data.warehouse_id,
            detail_product_id: data.detail_product_id,
            qty: data.quantity
        }, {
            transaction
        });

        return result;
    }

    findDataInventoryByWarehouseIdAndDetailProductId = async (warehouseId, detailProductId) => {
        let result = await InventoryMaster.findOne({
            attributes: ['warehouse_id', 'detail_product_id', 'qty'],
            where: {
                warehouse_id: warehouseId,
                detail_product_id: detailProductId
            },
        });
        
        return result;
    }

    insertLogInventory = async (data, transaction) => {
        await InventoryMasterLog.create({
            warehouse_from_id: data.warehouse_from_id,
            warehouse_to_id: data.warehouse_to_id,
            type_id: data.type_id,
            detail_product_id: data.detail_product_id,
            qty: data.quantity
        }, {
            transaction,
            logging: (sqlCommand) => {
                console.info(sqlCommand);
            }
        })
    }
}

module.exports = new InventoryService();