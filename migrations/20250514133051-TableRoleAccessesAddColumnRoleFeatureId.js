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

    await queryInterface.addColumn('RoleAccesses', 'role_sub_feature_id', {
      type: Sequelize.BIGINT,
      references: {
        model: {
          tableName: 'RoleSubFeatures'
        },
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('RoleAccesses', 'role_sub_feature_id', {})
  }
};
