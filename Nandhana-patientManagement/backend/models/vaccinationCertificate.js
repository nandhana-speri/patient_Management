const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VaacinationCertificate = sequelize.define('VaacinationCertificate', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  certificateNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientUUID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientRegId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vaccineName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vaccineTakenDatetime: {
    type: DataTypes.BIGINT,
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
  issuerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  issuerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  issuedDateTime: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

VaacinationCertificate.associate = (models) => {
  VaacinationCertificate.belongsTo(models.transaction, {
    foreignKey: { allowNull: false },
  });
};

module.exports = VaacinationCertificate;
