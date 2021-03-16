'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Picture.init({
    id: {
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    url: DataTypes.BLOB('long'),
    place: DataTypes.STRING,
    tag1: DataTypes.STRING,
    tag2: DataTypes.STRING,
    tag3: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Picture',
  });
  return Picture;
};