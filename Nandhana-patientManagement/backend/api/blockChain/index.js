var express = require('express');
var router = express.Router();
const {
  consultationCertificate,
  vaccinationCertificate,
  consultationCertificateGet,
  vaccinationCertificateGet,
} = require('./controller');

router.post('/', consultationCertificate);
router.post('/vaccination', vaccinationCertificate);
router.get('/', consultationCertificateGet);
router.get('/vaccination', vaccinationCertificateGet);

module.exports = router;
