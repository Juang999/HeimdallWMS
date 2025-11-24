'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    await queryInterface.addConstraint('InventoryMasters', {
      fields: ['warehouse_id', 'detail_product_id'],
      type: 'unique',
      name: 'unique_warehouse_product_inventory',
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeConstraint('InventoryMasters', 'unique_warehouse_product_inventory');
  }
};
