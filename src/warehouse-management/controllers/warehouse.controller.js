const { sequelize } = require('../../../models');
const { insertDataWarehouse, retrieveDataWarehouse } = require('../services/warehouse.service');

class WarehouseController {
    createWarehouse = (req, res) => {
        insertDataWarehouse(req.body.warehouse_name)
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Warehouse created successfully',
                    data: result,
                    error: null
                });
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'error',
                    message: 'Failed to create warehouse',
                    data: null,
                    error: err.message
                });
        });
    }

    getWarehouse = (req, res) => {
        let search = req.query.search || '';

        retrieveDataWarehouse(search)
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Warehouse retrieved successfully',
                    data: result,
                    error: null
                });
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'error',
                    message: 'Failed to retrieve warehouse',
                    data: null,
                    error: err.message
                });
        });
    }
}

module.exports = new WarehouseController();