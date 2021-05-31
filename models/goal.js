'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Goal.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    year: {
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    month: {
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    goal: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Goal',
  });
  return Goal;
};