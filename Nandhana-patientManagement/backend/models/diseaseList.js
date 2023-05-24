const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const disease = sequelize.define('diseaseList', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = disease;
