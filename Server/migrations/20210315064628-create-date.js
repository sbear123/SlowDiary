'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dates', {
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
      date: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      written: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      picture: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Dates');
  }
};