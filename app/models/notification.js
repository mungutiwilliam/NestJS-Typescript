'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notification.init({
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull:false,
      primaryKey: true,
    },
    message: {
      type: Sequelize.DataTypes.STRING,
      allowNull:false},
    type: {
      type: Sequelize.ENUM("announcement", "issues", "others"),
      allowNull:false}
  },
   {
    sequelize,
    modelName: 'Notification',
  });
  return notification;
};