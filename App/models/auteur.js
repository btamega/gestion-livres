'use strict';
const {
  Model
} = require('sequelize');
const { default: Book } = require('./Book');
module.exports = (sequelize, DataTypes) => {
  class Auteur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Auteur.hasMany(Book);
    }
  }
  Auteur.init({
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    statut: {
      type : DataTypes.STRING,
      allowNull: true
    },
    // timestamps : true
  }, {
    sequelize,
    modelName: 'Auteur',
  });
  
  return Auteur;
};