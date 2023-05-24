var express = require('express');
var router = express.Router();
const {
  healthInformation,
  getHealthInfo,
  healthInformationEdit,
} = require('./controller');
const { InformationValidation } = require('./validation');

router.post('/information', InformationValidation, healthInformation);
router.patch('/information', InformationValidation, healthInformationEdit);
router.get('/information', getHealthInfo);

module.exports = router;
