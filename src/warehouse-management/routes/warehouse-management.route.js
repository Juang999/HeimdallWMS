const { Router } = require('express');
const router = Router();
const { AuthMiddleware } = require('../../auth/middleware/kernel');
const { WarehouseRequest, InventoryRequest } = require('../requests/request');
const { 
    createWarehouse,
    getWarehouse 
} = require('../controllers/warehouse.controller');
const {
    inboundInventory,
    outboundInventory
} = require('../controllers/inventory.controller');

/**
 * warehouse routes
*/
router.post('/warehouse/create', [ AuthMiddleware, WarehouseRequest.CreateWarehouseRequest ], createWarehouse);
router.get('/warehouse', [ AuthMiddleware ], getWarehouse);

/**
 * inventory routes
*/
router.post('/inventory/inbound', [ AuthMiddleware, InventoryRequest.InboundInventoryRequest ], inboundInventory);
router.post('/inventory/outbound', [ AuthMiddleware, InventoryRequest.InboundInventoryRequest ], outboundInventory);

module.exports = router;