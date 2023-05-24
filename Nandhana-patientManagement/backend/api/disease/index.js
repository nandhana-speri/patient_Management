var express = require('express');
var router = express.Router();
const {
  diseasePost,
  getDiseaseInfo,
  deleteDiseaseInfo,
} = require('./controller');
const { diseaseValidation } = require('./validation');

router.post('/', diseaseValidation, diseasePost);
router.get('/', getDiseaseInfo);
router.delete('/:id', deleteDiseaseInfo);

module.exports = router;
