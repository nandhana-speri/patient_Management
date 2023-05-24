var express = require('express');
const {
  paymentTransfer,
  getConsultation,
  deleteConsultation,
  getConsultationById,
  patchConsultation,
} = require('./controller');
var router = express.Router();
const { consultationValidation } = require('./validation');

router.post('/', paymentTransfer);
router.get('/', getConsultation);
router.delete('/:id', deleteConsultation);
router.patch('/:id', patchConsultation);
router.get('/:id', getConsultationById);

module.exports = router;
