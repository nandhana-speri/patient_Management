const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
// const user = require('../models/user');

const disease = sequelize.define('disease', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  start_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

disease.associate = (models) => {
  disease.belongsTo(models.user, { foreignKey: { allowNull: false } });

  disease.belongsTo(models.diseaseList, {
    allowNull: false,
  });
};

module.exports = disease;
