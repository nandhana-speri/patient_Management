const { initiateTask, startTask } = require('./cron/index');
const Consultation = require('../models/consultation');

const changeConsultationStatus = initiateTask('*/5 * * * * *', async () => {
  let allConsultations = await Consultation.findAll({
    where: {
      status: 'pending',
    },
  });

  const currentTime = new Date();

  allConsultations.forEach(async (consultation) => {
    const endTime = calculateEndTime(consultation.time, consultation.date);
    console.log(currentTime >= endTime);

    if (currentTime >= endTime) {
      await consultation.update(
        { status: 'consulted' },
        { where: { id: consultation.id } }
      );
    }
  });
});

function calculateEndTime(startTime, date) {
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

  const [year, month, day] = date.trim().split('-');
  const endTime = new Date(year, month - 1, day, hourValue + 1, minute || 0, 0);
  return endTime;
}

// task start
if (process.env.CRON && process.env.CRON === 'true') {
  startTask(changeConsultationStatus, 'changeConsultationStatus');
}