var express = require('express');
var router = express.Router();
const {
  postContact,
  listContact,
  patchContact,
  getById,
} = require('./controller');

router.post('/post', postContact);
router.get('/', listContact);
router.patch('/:id', patchContact);
router.get('/:id', getById);

module.exports = router;
