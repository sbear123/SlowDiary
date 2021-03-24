var express = require('express');
var router = express.Router();
const goalController = require('../controllers/goal');

/* GET home page. */
router.get('/create', goalController.createG);

router.get('/read', goalController.readG);

router.get('/update', goalController.updateG);

router.get('/delete', goalController.deleteG);

module.exports = router;
