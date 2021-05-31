var express = require('express');
var router = express.Router();
const homeController = require('../controllers/home');

/* GET home page. */
router.get('/word', homeController.word);

router.get('/read', homeController.read);

module.exports = router;