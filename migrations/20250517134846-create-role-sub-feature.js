'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoleSubFeatures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      role_feature_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'RoleFeatures'
          },
          key: 'id'
        }
      },
      sub_feature_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'SubFeatures'
          },
          key: 'id'
        }
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
    await queryInterface.dropTable('RoleSubFeatures');
  }
};