'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payment.init({
    channel: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'payment',
  });
  return payment;
};