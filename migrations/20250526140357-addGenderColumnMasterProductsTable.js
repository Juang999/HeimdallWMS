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
    await queryInterface.addColumn('MasterProducts', 'gender_id', {
      type: Sequelize.DataTypes.BIGINT,
      references: {
        model: {
          tableName: 'CodeMasters'
        },
        key: 'id'
      },
      onDelete: 'Restrict',
      onUpdate: 'Restrict'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('MasterProducts', 'gender_id', {})
  }
};
