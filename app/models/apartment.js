'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Apartment.init({
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull:false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull:false},
    location: {
      type: Sequelize.DataTypes.STRING,
      allowNull:false},
    estate: {
      type: Sequelize.DataTypes.STRING,
      allowNull:false},
    units: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull:false}
  }, {
    sequelize,
    modelName: 'Apartment',
  });
  return Apartment;
};