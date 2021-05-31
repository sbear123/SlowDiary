'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Goals', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      year: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      month: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      goal: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Goals');
  }
};