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
        field: 'gender',
        code_name: 'Man',
        is_active: true,
        description: 'data gender to clothing gender',
        code_code: 'MN',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      }, {
        field: 'gender',
        code_name: 'Boy',
        is_active: true,
        description: 'data gender to clothing gender',
        code_code: 'By',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      }, {
        field: 'gender',
        code_name: 'Woman',
        is_active: true,
        description: 'data gender to clothing gender',
        code_code: 'WMN',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      }, {
        field: 'gender',
        code_name: 'Girl',
        is_active: true,
        description: 'data gender to clothing gender',
        code_code: 'GRL',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
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
      where: {
        field: 'gender'
      }
    }, {})
  }
};
