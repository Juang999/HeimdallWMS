'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InventoryMasterLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      warehouse_from_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'WarehouseMasters',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      warehouse_to_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'WarehouseMasters',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: true
      },
      detail_product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'DetailProducts',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      type_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'CodeMasters'
          },
          key: 'id',
          onDelete: 'Cascade',
          onUpdate: 'Cascade'
        }
      },
      qty: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('InventoryMasterLogs');
  }
};