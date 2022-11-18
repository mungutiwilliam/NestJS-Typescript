'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apartment_units extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Apartment_units.init({
    house_no: DataTypes.STRING,
    rooms: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Apartment_units',
  });
  return Apartment_units;
};