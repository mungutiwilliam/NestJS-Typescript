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
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull:false,
      primaryKey: true,
    },
    house_no:  {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull:false},
    rooms:  {
      type: Sequelize.DataTypes.INTEGER,
      allowNull:false},
    price:  {
      type: Sequelize.DataTypes.INTEGER,
      allowNull:false}
  }, {
    sequelize,
    modelName: 'Apartment_units',
  });
  return Apartment_units;
};