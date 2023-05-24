var express = require('express');
var router = express.Router();
const {
    getPayment
} = require('./controller');

router.get('/', getPayment);

module.exports = router;
