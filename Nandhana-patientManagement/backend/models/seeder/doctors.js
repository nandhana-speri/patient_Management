const Doctor = require('../doctors'); // Assuming you have a Vaccine model defined
const sequelize = require('../../config/db');
require('dotenv').config();

const doctors = [
  {
    name: 'Dr. Michael Brown',
    departmentId: 1,
    hospitalId: 1,
  },
  {
    name: 'Dr. Emily Davis',
    departmentId: 2,
    hospitalId: 1,
  },
  {
    name: 'Dr. Robert Wilson',
    departmentId: 3,
    hospitalId: 1,
  },
  {
    name: 'Dr. Mia Anderson',
    departmentId: 4,
    hospitalId: 1,
  },
  {
    name: 'Dr. Noah Thompson',
    departmentId: 5,
    hospitalId: 1,
  },
  {
    name: 'Dr. Jennifer Martinez',
    departmentId: 1,
    hospitalId: 2,
  },
  {
    name: 'Dr. Andrew Thompson',
    departmentId: 2,
    hospitalId: 2,
  },
  {
    name: 'Dr. Jessica Lee',
    departmentId: 3,
    hospitalId: 2,
  },
  {
    name: 'Dr. Isabella Harris',
    departmentId: 4,
    hospitalId: 2,
  },
  {
    name: 'Dr. William Johnson',
    departmentId: 5,
    hospitalId: 2,
  },
  {
    name: 'Dr. David Wilson',
    departmentId: 1,
    hospitalId: 3,
  },
  {
    name: 'Dr. Samantha Miller',
    departmentId: 2,
    hospitalId: 3,
  },
  {
    name: 'Dr. Christopher Anderson',
    departmentId: 3,
    hospitalId: 3,
  },
  {
    name: 'Dr. Amelia Davis',
    departmentId: 4,
    hospitalId: 3,
  },
  {
    name: 'Dr. James Johnson',
    departmentId: 5,
    hospitalId: 3,
  },
  {
    name: 'Dr. Olivia Thompson',
    departmentId: 1,
    hospitalId: 4,
  },
  {
    name: 'Dr. Benjamin Davis',
    departmentId: 2,
    hospitalId: 4,
  },

  {
    name: 'Dr. Liam Wilson',
    departmentId: 2,
    hospitalId: 4,
  },
  {
    name: 'Dr. Ava Johnson',
    departmentId: 3,
    hospitalId: 4,
  },
  {
    name: 'Dr. Ethan Martinez',
    departmentId: 4,
    hospitalId: 4,
  },

  {
    name: 'Dr. Ethan Wilson',
    departmentId: 1,
    hospitalId: 5,
  },
  {
    name: 'Dr. Olivia Davis',
    departmentId: 2,
    hospitalId: 5,
  },
  {
    name: 'Dr. Ema Thompson',
    departmentId: 3,
    hospitalId: 5,
  },
  {
    name: 'Dr. Ava Thomas',
    departmentId: 4,
    hospitalId: 5,
  },
  {
    name: 'Dr. Liam Martinez',
    departmentId: 5,
    hospitalId: 5,
  },
];

const seedVaccines = async () => {
  try {
    await sequelize.sync({ force: false });

    console.log('Database synced');

    for (const eachData of doctors) {
      const exists = await Doctor.findOne({
        where: { name: eachData.name },
      });
      if (!exists) {
        const doctor = new Doctor(eachData);

        const data = await doctor.save();
      } else console.log(`The ${eachData.name} Exists`);
    }
    process.exit(0);
  } catch (e) {
    console.log(e.message);
  }
};

seedVaccines();
