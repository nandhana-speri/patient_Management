const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const vaccine = sequelize.define('vaccine', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disease: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  antigen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = vaccine;
