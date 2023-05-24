const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const healthInformation = sequelize.define('healthInformation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  blood: {
    type: DataTypes.ENUM('A+', 'B+', 'A-', 'AB+', 'AB-', 'O+', 'O-'),

    allowNull: true,
  },
  height: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'others'),

    allowNull: true,
  },
});

healthInformation.associate = (models) => {
  healthInformation.belongsTo(models.user, {
    foreignKey: 'userId',
    allowNull: false,
  });
};

module.exports = healthInformation;
