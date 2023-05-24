const Vaccine = require('../vaccine');
const sequelize = require('../../config/db');

const vaccines = [
  {
    name: 'Moderna',
    disease: 'COVID-19',
    antigen: 'Spike protein of the SARS-CoV-2 virus',
  },
  { name: 'Covishield', disease: 'Malaria', antigen: 'Spike protein' },
  {
    name: 'Sputnik',
    disease: 'Influenza',
    antigen: 'Hemagglutinin and neuraminidase proteins',
  },
  {
    name: 'Novavax',
    disease: 'Hepatitis B',
    antigen: 'Hepatitis B surface antigen (HBsAg)',
  },
];

async function seedVaccines() {
  try {
    await sequelize.sync({ force: false });

    console.log('Database synced');

    for (const eachData of vaccines) {
      const exists = await Vaccine.findOne({
        where: { name: eachData.name },
      });
      if (!exists) {
        const Vaccines = new Vaccine(eachData);

        const data = await Vaccines.save();
      } else console.log(`The ${eachData.name} Exists`);
    }
    process.exit(0);
  } catch (e) {
    console.log(e.message);
  }
}

seedVaccines();
