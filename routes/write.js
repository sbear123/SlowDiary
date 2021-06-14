var express = require('express')
var router = express.Router()
const writeController = require('../controllers/write')

/* GET home page. */
router.post('/create/content', writeController.createC)

router.post('/create', writeController.createW)

router.get('/read', writeController.readW)

router.patch('/update/content', writeController.updateC)

router.patch('/update/write', writeController.updateW)

router.delete('/delete', writeController.deleteW)

module.exports = router
