var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');

/* GET home page. */
router.get('/login', userController.login);

router.get('/checkId', userController.checkId);

router.post('/register', userController.register);

router.patch('/update', userController.update)

module.exports = router;