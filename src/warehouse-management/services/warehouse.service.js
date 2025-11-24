const { WarehouseMaster } = require('../../../models');
const { Op } = require('sequelize');

class WarehouseService {
    insertDataWarehouse = async (warehouse_name) => {
        let result = await WarehouseMaster.create({warehouse_name});

        return result;
    }

    retrieveDataWarehouse = async (search) => {
        let result = await WarehouseMaster.findAll({
            attributes: [['id', 'warehouse_id'], 'warehouse_name'],
            where: {
                warehouse_name: {
                    [Op.like]: `%${search}%`
                }
            },
            order: [['id', 'ASC']]
        });

        return result;
    }
}

module.exports = new WarehouseService();