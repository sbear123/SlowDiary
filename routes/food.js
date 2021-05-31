var express = require('express')
var router = express.Router()
const foodController = require('../controllers/food')

/* GET home page. */
router.get('/list', foodController.getList)

module.exports = router
