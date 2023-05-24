var express = require('express');
const { paymentTransfer, getVaccination,deleteVaccination } = require('./controller');
var router = express.Router();
const { vaccinationValidation } = require('./validation');

router.post('/', paymentTransfer);
router.get('/', getVaccination);
router.delete('/:id', deleteVaccination);

module.exports = router;
