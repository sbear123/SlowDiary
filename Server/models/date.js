'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Date extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Date.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    date: DataTypes.INTEGER,
    write: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Date',
  });
  return Date;
};