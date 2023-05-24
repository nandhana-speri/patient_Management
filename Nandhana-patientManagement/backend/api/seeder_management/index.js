var express = require('express');
var router = express.Router();
const {
  departmentGet,
  hospitalGet,
  doctorGet,
  diseaseListGet,
  vaccineGet,
  getDoctorByDate,
} = require('./controller');

router.get('/department', departmentGet);
router.get('/hospital', hospitalGet);
router.get('/doctor', doctorGet);
router.get('/vaccine', vaccineGet);
router.get('/diseaseList', diseaseListGet);
router.get('/getDoctor', getDoctorByDate);

module.exports = router;
