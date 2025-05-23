'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MasterProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      product_code: {
        type: Sequelize.STRING
      },
      product_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      brand_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'Brands'
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      category_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'Categories'
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      sub_category_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'SubCategories'
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
    await queryInterface.dropTable('MasterProducts');
  }
};