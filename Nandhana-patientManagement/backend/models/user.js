const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const user = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aadharNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pinCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

user.associate = (models) => {
  user.belongsTo(models.login, { foreignKey: { allowNull: false } });
};

module.exports = user;
