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
    await Promise.all([
      queryInterface.addColumn('SubCategories', 'deletedAt', {
        type: Sequelize.DataTypes.DATE,
      }),
      queryInterface.addColumn('SubCategories', 'is_active', {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await Promise.all([
      queryInterface.removeColumn('SubCategories', 'deletedAt', null),
      queryInterface.removeColumn('SubCategories', 'is_active', null)
    ])
  }
};
