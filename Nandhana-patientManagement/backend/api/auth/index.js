var express = require('express');
var router = express.Router();
const { login, registration, getProfile } = require('./controller');
const { signupValidation } = require('./validation');

router.post('/register', signupValidation, registration);
router.post('/login', login);
router.get('/profile', getProfile);

module.exports = router;
