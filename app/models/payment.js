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
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull:false,
      primaryKey: true,
    },
    channel:{
      type: Sequelize.DataTypes.STRING,
      allowNull:false},
    amount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull:false},
    type:  {
      type: Sequelize.ENUM("mpesa", "cheque", "bank_deposit"),
      allowNull:false}
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return payment;
};