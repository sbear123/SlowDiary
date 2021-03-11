var express = require('express');
var router = express.Router();
const writeController = require('../controllers/write');

/* GET home page. */
router.get('/', writeController.baseAPI);

module.exports = router;
