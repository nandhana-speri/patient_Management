const path = require('path');
const fs = require('fs');
const sequelize = require('../config/db');

const basename = path.basename(__filename);

const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  );
const sync = async () => {
  for (const file of files) {
    await import(`file://${path.resolve(__dirname, file)}`);
  }

  Object.values(sequelize.models).forEach((model) => {
    if (model.associate) {
      model.associate(sequelize.models);
    }
  });

  sequelize
    .sync({ force: false, alter: { drop: false } })
    .then(() => console.log('db sync done!'))
    .catch((e) => console.log('error', e));
};
module.exports = sync;
