'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Write extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Write.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    feel: DataTypes.STRING,
    praise: DataTypes.STRING,
    reflection: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    satisfaction: DataTypes.STRING,
    goal: DataTypes.STRING,
    picture: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Write',
  });
  return Write;
};