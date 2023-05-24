const { initiateTask, startTask } = require('./cron/index');
const Vaccination = require('../models/vaccination');
const { Op } = require('sequelize');

const changeVaccinationStatus = initiateTask('* * * * * *', async () => {
  const currentTime = new Date();

  

  const allVaccinations = await Vaccination.findAll({
    where: {
      status: 'notTaken',
      time: {
        [Op.lte]: currentTime,
      },
      date: {
        [Op.lte]: currentTime,
      },
    },
  });
  

  for (const vaccination of allVaccinations) {
    const endTime = calculateEndTime(vaccination.time, vaccination.date);

    if (currentTime >= endTime) {
      await Vaccination.update(
        { status: 'taken' },
        { where: { id: vaccination.id } }
      );
    }
  }
});

function calculateEndTime(startTime, startDate) {
  const [hour, minute, meridiem] = startTime
    .trim()
    .split(/:|(?<=\d{2})(?=am|pm)/i);
  let hourValue = parseInt(hour, 10);
  const isPM = meridiem?.toLowerCase() === 'pm';

  if (isPM && hourValue !== 12) {
    hourValue += 12;
  } else if (!isPM && hourValue === 12) {
    hourValue = 0;
  }

  const endTime = new Date(startDate);
  endTime.setHours(hourValue, minute || 0, 0);
  return endTime;
}

// task start
if (process.env.CRON && process.env.CRON === 'true') {
  startTask(changeVaccinationStatus, 'changeVaccinationStatus');
}
