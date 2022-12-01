'use strict';
const {
  Model
} = require('sequelize');
const book = require('./book');
module.exports = (sequelize, DataTypes) => {
  class Edition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(Edition) {
      // book.belongsTo(Edition);
    }
  }
  Edition.init({
    name: DataTypes.STRING,
    date:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Edition',
  });
  return Edition;
};