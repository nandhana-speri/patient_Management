var express = require('express');
var router = express.Router();
const { profilePatch, changePassword } = require('./controller');
const { signupValidation } = require('./validation');

router.patch('/', signupValidation, profilePatch);
router.post('/changepassword', changePassword);

module.exports = router;
