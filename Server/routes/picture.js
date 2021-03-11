var express = require('express');
var router = express.Router();
const pictureController = require('../controllers/picture');

/* GET home page. */
router.get('/', pictureController.baseAPI);

module.exports = router;
