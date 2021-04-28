const models = require('../models')

function createG(req, res) {
  var date = req.body.date.split('.')
  models.Goal.create({
    id: req.body.id,
    year: date[0],
    month: date[1],
    goal: req.body.goal,
  })
    .then((_) => res.status(201).send())
    .catch((_) => res.status(404).send(_))
}

function readG(req, res) {
  var date = req.body.date.split('.')
  models.Goal.findOne({
    where: {
      id: req.body.id,
      year: date[0],
      month: date[1],
    },
  })
    .then((goal) => res.status(200).json(goal))
    .catch((_) => res.status(404).send(_))
}

function updateG(req, res) {
  var date = req.body.date.split('.')
  models.Goal.update(
    {
      id: req.body.id,
      year: date[0],
      month: date[1],
      goal: req.body.goal,
    },
    {
      where: {
        id: req.body.id,
        year: date[0],
        month: date[1],
      },
    },
  )
    .then((_) => res.status(204).send())
    .catch((_) => res.status(404).send(_))
}

function deleteG(req, res) {
  var date = req.body.date.split('.')
  models.Goal.destroy({
    where: {
      id: req.body.id,
      year: date[0],
      month: date[1],
    },
  })
    .then((_) => res.status(204).send())
    .catch((_) => res.status(404).send(_))
}

module.exports = {
  createG: createG,
  readG: readG,
  updateG: updateG,
  deleteG: deleteG,
}
