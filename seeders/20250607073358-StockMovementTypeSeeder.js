'use strict';
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('CodeMasters', [
      {
        field: 'stock_movement_type',
        code_name: 'INBOUND',
        is_active: true,
        description: 'Inbound Stock Movement',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        code_code: 'INBOUND',
      }, {
        field: 'stock_movement_type',
        code_name: 'OUTBOUND',
        is_active: true,
        description: 'Outbound Stock Movement',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        code_code: 'OUTBOUND',
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('CodeMasters', {
      field: 'stock_movement_type',
    }, {})
  }
};
