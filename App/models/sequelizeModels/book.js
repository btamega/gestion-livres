'use strict';
const {
  Model
} = require('sequelize');
const { default: Auteur } = require('./Auteur');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Book.hasMany(Auteur);
    }
  }
  Book.init({
    title: DataTypes.STRING,
    gender: DataTypes.STRING,
    cover: DataTypes.STRING,
    // timestamps : true

  }, {
    sequelize,
    modelName: 'Book',
  });
  
  return Book;
};