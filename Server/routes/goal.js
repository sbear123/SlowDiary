var express = require('express');
var router = express.Router();
const goalController = require('../controllers/goal');

/* GET home page. */
router.post('/create', goalController.createG);

router.get('/read', goalController.readG);

router.patch('/update', goalController.updateG);

router.delete('/delete', goalController.deleteG);

module.exports = router;
