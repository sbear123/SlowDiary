var express = require('express');
var router = express.Router();
const pictureController = require('../controllers/picture');

/* GET home page. */
router.post('/create', pictureController.createP);

router.get('/read', pictureController.readP);

router.patch('/update', pictureController.updateP);

router.delete('/delete', pictureController.deleteP);

module.exports = router;
