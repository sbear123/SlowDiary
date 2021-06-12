const models = require('../models')

function createW(req, res) {
  var date = new Date()
  models.Write.create({
    feel: req.body.feel,
    praise: req.body.praise,
    reflection: req.body.reflection,
    title: req.body.title,
    content: req.body.content,
    satisfaction: req.body.satisfaction,
    goal: req.body.goal,
  })
    .then((_) => {
      models.Write.findOne({
        order: [['id', 'DESC']],
      })
        .then((w) => {
          models.Date.create({
            id: req.body.id,
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            date: date.getDate(),
            written: w.id,
            picture: -1,
          })
            .then((_) => res.status(201).json({ id: w.id }))
            .catch((_) =>
              res.status(409).json({ message: '이미 작성된 글이 존재합니다.' }),
            )
        })
        .catch((_) => res.status(404).send(_))
    })
    .catch((_) => res.status(404).send(_))
}

function readW(req, res) {
  models.Date.findOne({
    where: {
      id: req.query.id,
      year: req.query.year,
      month: req.query.month,
      date: req.query.date,
      picture: -1,
    },
  })
    .then((w) => {
      models.Write.findOne({
        where: {
          id: w.written,
        },
      })
        .then((data) => res.status(200).json(data))
        .catch((_) => res.status(404).send(_))
    })
    .catch((_) => res.status(404).send(_))
}

function updateW(req, res) {
  models.Write.update(
    {
      feel: req.body.feel,
      praise: req.body.praise,
      reflection: req.body.reflection,
      title: req.body.title,
      satisfaction: req.body.satisfaction,
      goal: req.body.goal,
    },
    {
      where: {
        id: req.body.id,
      },
    },
  )
    .then((_) => res.status(204).json({ success: true }))
    .catch((_) => res.status(404).send(_))
}

function updateC(req, res) {
  models.Write.update(
    {
      content: req.body.content,
    },
    {
      where: {
        id: req.body.id,
      },
    },
  )
    .then((_) => res.status(204).json({ success: true }))
    .catch((_) => res.status(404).send(_))
}

function deleteW(req, res) {
  models.Date.destroy({
    where: {
      id: req.query.id,
      written: req.body.id,
    },
  })
    .then((_) => {
      models.Write.destroy({
        where: { id: req.body.id },
      })
        .then((_) => res.status(204).json({ success: true }))
        .catch((_) => res.status(404).send(_))
    })
    .catch((_) => res.status(404).send(_))
}

module.exports = {
  createW: createW,
  readW: readW,
  updateW: updateW,
  updateC: updateC,
  deleteW: deleteW,
}
