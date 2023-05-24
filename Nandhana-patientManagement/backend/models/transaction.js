const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const transaction = sequelize.define('transaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },

  appointmentType: {
    type: DataTypes.ENUM(
      'vaccination',
      'consultation',
      'consultationCertificate',
      'vaccinationCertificate'
    ),
    defaultValue: 'consultation',
    allowNull: true,
  },
});

transaction.associate = (models) => {
  transaction.belongsTo(models.user, {
    foreignKey: 'userId',
    allowNull: false,
  });
};

module.exports = transaction;
