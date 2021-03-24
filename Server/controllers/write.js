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
        picture: req.body.picture
    }).then((w)=> {
        models.Date.create({
            id: req.query.id,
            year: date.getFullYear(),
            month: date.getMonth()+1,
            date: date.getDate(),
            write: w.id
        }).then((_)=> res.status(201).send(_))
        .catch((_)=>res.status(404).send(_))
    }).catch((_)=>res.status(404).send(_))
};

function readW(req, res) {
    models.Write.findAll({
        where: { 
            id: req.query.id,
            year: req.body.year,
            month: req.body.month,
            date: req.body.date
         }
    }).then((w)=> res.status(200).json(w))
    .catch((_)=> res.status(404).send(_))
};

function updateW(req, res) {
    models.Goal.findOne({
        where: {
            id: req.body.id
        }
    }).then(w => {
        if (w) {
          user.update({
            pw: req.body.pw,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender
          }).then((_) => res.status(200).send())
          .catch((_) => res.status(404).send(_))
        }else res.status(404).send()
      }).catch((_) => res.status(404).send(_))
};

function deleteW(req, res) {
    var date = req.body.date.split('.')
    models.Date.destroy({ where: {
        id: req.query.id,
        write: req.body.id
    }}).then(_ => models.Write.destroy({ 
        where: { id: req.body.id }
    }).then(_=> res.status(204).send())
    .catch((_) => res.status(404).send(_))
    ).catch((_) => res.status(404).send(_))
};

module.exports = {
    createW: createW,
    readW: readW,
    updateW: updateW,
    deleteW: deleteW
};