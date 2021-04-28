const models = require('../models')

function word(req, res) {
  var date = req.body.date.split('.')
  models.Date.findAll({
    where: {
        year: date[0],
        month: date[1],
        date: date[2]
     },
  }).then(function (write) {
    if (write.length > 0) {
      models.Write.findAll({
          where: {
            id: write.write
          }
      }).then(data => {
        var feeling = data.feel
        if (data.feel == ""){
            feeling = "main"
        }
        models.Word.findAll({
          where: {
              feel: feeling
            }
        }).then(words => {
            res.status(200).json({word: words[rand(words.length)]})
        }).catch((_) => res.status(404).send(_))
      }).catch((_) => res.status(404).send(_))
    } else {
        models.Word.findAll({
          where: {
              feel: "main"
            }
        }).then(words => {
            res.status(200).json({word: words[rand(words.length)]})
        }).catch((_) => res.status(404).send(_))
    }
  }).catch((_) => res.status(404).send(_))
}

function read(req, res) {
  models.Date.findAll({
     where: { 
         year: req.body.year,
         month: req.body.month
      }
    }).then(dates => {
      if (dates) {
        res.status(200).json(dates)
      }else{
          res.status(204).send()
      }
    }).catch((_) => res.status(404).send(_))
}

function rand(max) {
  return Math.floor(Math.random() * max);
}

module.exports = {
  word: word,
  read: read,
}
