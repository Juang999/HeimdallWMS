const { sequelize } = require('../../../models');
const { insertDataInventory, insertLogInventory, findDataInventoryByWarehouseIdAndDetailProductId } = require('../services/inventory.service');

class InventoryController {
    inboundInventory = (req, res) => {
        let { warehouse_id, detail_product_id, quantity } = req.body;

        sequelize.transaction(async t => {
            let dataInventory = await findDataInventoryByWarehouseIdAndDetailProductId(warehouse_id, detail_product_id);
            let qty = (dataInventory) ? dataInventory.dataValues.qty + parseInt(quantity) : quantity;

            let [ result ] = await Promise.all([
                insertDataInventory({ warehouse_id, detail_product_id, quantity: qty }, t),
                insertLogInventory({ warehouse_from_id: null, warehouse_to_id: warehouse_id, type_id: 11, detail_product_id, quantity }, t)
            ]);

            return result;
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inventory updated successfully',
                    data: result,
                    error: null
                });
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'error',
                    message: 'Failed to update inventory',
                    data: null,
                    error: err.message
                });
        })
    }

    outboundInventory = (req, res) => {
        let { warehouse_id, detail_product_id, quantity } = req.body;

        sequelize.transaction(async t => {
            let dataInventory = await findDataInventoryByWarehouseIdAndDetailProductId(warehouse_id, detail_product_id);
            let qty = (dataInventory) ? dataInventory.dataValues.qty - parseInt(quantity) : quantity;

            let [ result ] = await Promise.all([
                insertDataInventory({ warehouse_id, detail_product_id, quantity: qty }, t),
                insertLogInventory({ warehouse_from_id: warehouse_id, warehouse_to_id: null, type_id: 12, detail_product_id, quantity }, t)
            ]);

            return result;
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inventory updated successfully',
                    data: result,
                    error: null
                });
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'error',
                    message: 'Failed to update inventory',
                    data: null,
                    error: err.message
                });
        })
    }
}

module.exports = new InventoryController();