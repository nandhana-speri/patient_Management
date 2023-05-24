const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ConsultationCertificate = sequelize.define('ConsultationCertificate', {
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
  doctorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  consultationTime: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  departmentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hospitalName: {
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

ConsultationCertificate.associate = (models) => {
  ConsultationCertificate.belongsTo(models.transaction, {
    foreignKey: { allowNull: false },
  });
};

module.exports = ConsultationCertificate;
