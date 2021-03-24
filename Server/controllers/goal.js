const models = require('../models')

function createG(req, res) {
    var date = req.body.date.split('.')
    models.Goal.create({
        id: req.body.id,
        year: date[0],
        month: date[1],
        goal: req.body.goal,
    }).then((_)=> res.status(201).send())
    .catch((_)=>res.status(404).send(_))
};

function readG(req, res) {
    var date = req.body.date.split('.')
    models.Goal.findAll({
        where: { 
            id: req.body.id,
            year: date[0],
            month: date[1],
         }
    }).then((goal)=> res.status(200).json(goal))
    .catch((_)=> res.status(404).send(_))
};

function updateG(req, res) {
    var date = req.body.date.split('.')
    models.Goal.findOne({
        where: {
            id: req.body.id,
            year: date[0],
            month: date[1]
        }
    }).then(user=> {
        if (user) {
          user.update({
            pw: req.body.pw,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender
          }).then((_) => res.status(200).json({ success: true }))
          .catch((_) => res.status(404).send(_))
        }
      }).catch((_) => res.status(404).send(_))
};

function deleteG(req, res) {
    var date = req.body.date.split('.')
    models.Goal.destroy({ where: {
        id: req.body.id,
        year: date[0],
        month: date[1]
    }}).then(_ => res.status(204).send())
    .catch((_) => res.status(404).send(_))
};

module.exports = {
    createG: createG,
    readG: readG,
    updateG: updateG,
    deleteG: deleteG
};