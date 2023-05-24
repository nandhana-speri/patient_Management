var express = require('express');
var router = express.Router();
const {
    getPatientInfo
} = require('./controller');

router.get('/', getPatientInfo);

module.exports = router;
