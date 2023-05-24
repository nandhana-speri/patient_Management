var express = require('express');
var router = express.Router();
const authRoutes = require('../api/auth/index');
const healthRoute = require('../api/health/index');
const profileRoute = require('../api/profile/index');
const seederRoute = require('../api/seeder_management/index');
const diseaseRoute = require('../api/disease/index');
const contactRoute = require('../api/contact/index');
const consultationRoute = require('../api/consultation/index');
const vaccinationRoute = require('../api/vaccination/index');
const patientRoute = require('../api/patient/index');
const blockchainRoute = require('../api/blockChain/index');
const paymentRoute = require('../api/payment/index');

router.use('/auth', authRoutes);
router.use('/health', healthRoute);
router.use('/profile', profileRoute);
router.use('/disease', diseaseRoute);
router.use('/contact', contactRoute);
router.use('/consultation', consultationRoute);
router.use('/vaccination', vaccinationRoute);
router.use('/patient', patientRoute);
router.use('/payment', paymentRoute);
router.use('/seeder', seederRoute);
router.use('/blockChain', blockchainRoute);

module.exports = router;
