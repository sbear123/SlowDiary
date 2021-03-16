var express = require('express');
var router = express.Router();
const goalController = require('../controllers/write');

/* GET home page. */
router.get('/', goalController.login);

module.exports = router;
