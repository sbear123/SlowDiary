'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Words', {
      word: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      feel: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Words');
  }
};