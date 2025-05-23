'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      detail_product_code: {
        type: Sequelize.STRING
      },
      detail_product_name: {
        type: Sequelize.STRING
      },
      product_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'MasterProducts',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      grade: {
        type: Sequelize.STRING
      },
      color_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'Colors',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      size_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'Sizes',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DetailProducts');
  }
};