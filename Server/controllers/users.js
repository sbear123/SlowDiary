/* GET home page. */
var mysql_dbc = require('../config/database')()
var connection = mysql_dbc.init()
const models = require('../models')

function login(req, res) {
  connection.connect()
  var sql = `SELECT * FROM user WHERE id = '${req.body.id} AND pw = '${req.body.pw}`
  connection.query(sql, function (error, rows, fields) {
    if (!error) {
      if (rows.length != 0) {
        res.status(200).json({ success: true })
      } else {
        res.status(200).json({ success: false })
      }
    } else {
      console.log('query error: ' + error)
      res.status(404).send()
    }
  })
  connection.end()
}

function register(req, res) {
   models.User.create({
    id: req.body.id,
    pw: req.body.pw,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
  }).then(_ => res.status(200).json({ success: true })).catch(_ => res.status(404).send(_))
  // connection.connect()
  // var sql = `INSERT INTO user VALUES ( ${req.body.id}, ${req.body.pw}, ${req.body.name}, ${req.body.age}, ${req.body.gender});`
  // connection.query(sql, function (error, rows, fields) {
  //   if (!error) {
  //     res.status(200).json({ success: true })
  //   } else {
  //     console.log('query error: ' + error)
  //     res.status(404).send()
  //   }
  // })
  // connection.end()
}

function checkId(req, res) {
  connection.connect()
  var sql = 'SELECT * FROM user WHERE id = ' + req.body.id
  connection.query(sql, function (error, rows, fields) {
    if (!error) {
      if (rows.length != 0) {
        res.status(200).json({ success: false })
      } else {
        res.status(200).json({ success: true })
      }
    } else {
      console.log('query error: ' + error)
      res.status(404).send()
    }
  })
  connection.end()
}

function update(req, res) {
  connection.connect()
  var sql = `UPDATE user SET pw = ${req.query.password} & name = ${req.query.name} & gender = ${req.query.gender} WHERE id = ${req.query.id}`
  connection.query(sql, function (error, rows, fields) {
    if (error) {
      console.log('query error: ' + error)
      res.status(404).send()
    } else {
      res.status(200).json({ success: true })
    }
  })
}

module.exports = {
  login: login,
  register: register,
  checkId: checkId,
  update: update,
}
