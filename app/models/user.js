'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull:false,
      primaryKey: true,
    },
    firstName:{
      type: Sequelize.DataTypes.STRING,
      allowNull:false},
    lastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false},
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false},
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false},
    phoneNumber: {
      type: Sequelize.DataTypes.STRING,
      max:10,
      min:10,
      allowNull: false,
      unique:true},
    role: {
      type: Sequelize.ENUM("admin", "agent", "tenant"),
        allowNull: false},
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};