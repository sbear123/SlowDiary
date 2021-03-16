'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pictures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        allowNull: false,
        type: Sequelize.BLOB('long')
      },
      place: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tag1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tag2: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tag3: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pictures');
  }
};