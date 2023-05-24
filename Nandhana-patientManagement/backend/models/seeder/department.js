const Department = require('../departments');
const sequelize = require('../../config/db');

const departments = [
  { name: 'Cardiology', departmentId: 1 },
  { name: 'Neurology', departmentId: 2 },
  { name: 'Orthopedics', departmentId: 3 },
  { name: 'Gastroenterology', departmentId: 4 },
  { name: 'Ophthalmology', departmentId: 5 },
];

async function Departments() {
  try {
    await sequelize.sync({ force: false });

    console.log('Database synced');

    for (const eachData of departments) {
      const exists = await Department.findOne({
        where: { name: eachData.name },
      });
      if (!exists) {
        const Departments = new Department(eachData);

        const data = await Departments.save();
      } else console.log(`The ${eachData.name} Exists`);
    }
    process.exit(0);
  } catch (e) {
    console.log(e.message);
  }
}

Departments();
