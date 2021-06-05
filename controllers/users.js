/* GET home page. */
const models = require('../models')

function login(req, res) {
  models.User.findAll({
    where: {
      id: req.body.id,
      pw: req.body.pw,
    },
  }).then(function (users) {
    if (users.length > 0) {
      res.status(200).json({
        name: users[0].name,
        age: users[0].age,
        gender: users[0].gender,
      })
    } else {
      res.status(404).send()
    }
  })
}

function register(req, res) {
  models.User.create({
    id: req.body.id,
    pw: req.body.pw,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
  })
    .then((_) => res.status(201).json({ success: true }))
    .catch((_) => res.status(404).send(_))
}

function checkId(req, res) {
  models.User.findAll({
    where: { id: req.body.id },
  })
    .then(function (users) {
      if (users.length > 0) {
        res.status(409).send()
      } else {
        res.status(200).json({ success: true })
      }
    })
    .catch((_) => res.status(404).send())
}

function update(req, res) {
  models.User.update(
    {
      pw: req.body.pw,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
    },
    { where: { id: req.body.id } }
      .then((_) => res.status(204).send())
      .catch((_) => res.status(404).send(_)),
  )
}

module.exports = {
  login: login,
  register: register,
  checkId: checkId,
  update: update,
}
