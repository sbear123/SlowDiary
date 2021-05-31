var express = require('express');
var router = express.Router();
const weatherController = require('../controllers/weather');

/* GET home page. */
router.get('/', weatherController.weather);

module.exports = router;