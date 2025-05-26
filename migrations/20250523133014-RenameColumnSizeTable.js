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

    await queryInterface.renameColumn('Sizes', 'size_group', 'size_group_id'),
    await queryInterface.changeColumn('Sizes', 'size_group_id', {
      type: Sequelize.DataTypes.BIGINT
    })
    await queryInterface.addConstraint('Sizes', {
      fields: ['size_group_id'],
      type: 'foreign key',
      name: 'Sizes_ibfk_1',
      references: {
        table: 'CodeMasters',
        field: 'id'
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

    await queryInterface.renameColumn('Sizes', 'size_group_id', 'size_group'),
    await queryInterface.changeColumn('Sizes', 'size_group', {
      type: Sequelize.DataTypes.STRING
    })
  }
};
