const Hospital = require('../hospitals'); // Assuming you have a Vaccine model defined
const sequelize = require('../../config/db');

const hospitals = [
  { name: 'Central City Hospital', hospitalId: 1 },
  { name: 'Northwest Medical Center', hospitalId: 2 },
  { name: 'Valleyview General Hospital', hospitalId: 3 },
  { name: 'Riverside Community Hospital', hospitalId: 4 },
  { name: 'Hilltop Regional Medical Center', hospitalId: 5 },
];

async function seedVaccines() {
  try {
    await sequelize.sync({ force: false });

    console.log('Database synced');

    for (const eachData of hospitals) {
      const exists = await Hospital.findOne({
        where: { name: eachData.name },
      });
      if (!exists) {
        const Hospitals = new Hospital(eachData);

        const data = await Hospitals.save();
      } else console.log(`The ${eachData.name} Exists`);
    }
    process.exit(0);
  } catch (e) {
    console.log(e.message);
  }
}

seedVaccines();
