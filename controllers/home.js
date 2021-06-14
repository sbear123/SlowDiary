const { resolve } = require('path')
const models = require('../models')

function word(req, res) {
  var date = req.query.date.split('.')
  models.Date.findAll({
    where: {
      year: date[0],
      month: date[1],
      date: date[2],
      picture: -1,
    },
  })
    .then(function (write) {
      if (write.length > 0) {
        models.Write.findAll({
          where: {
            id: write[0].dataValues.written,
          },
        })
          .then((data) => {
            var feeling = data[0].dataValues.feel
            if (feeling == '') {
              feeling = 'main'
            }
            models.Word.findAll({
              where: {
                feel: feeling,
              },
            })
              .then((words) => {
                res.status(200).json(words[rand(words.length)])
              })
              .catch((_) => res.status(404).send(_))
          })
          .catch((_) => res.status(404).send(_))
      } else {
        models.Word.findAll({
          where: {
            feel: 'main',
          },
        })
          .then((words) => {
            res.status(200).json(words[rand(words.length)])
          })
          .catch((_) => res.status(404).send(_))
      }
    })
    .catch((_) => res.status(404).send(_))
}

async function read(req, res) {
  try {
    const dates = await models.Date.findAll({
      where: {
        year: Number(req.query.year),
        month: Number(req.query.month),
      },
    })
    var arr = new Array()
    const promises = []

    for (var i = 0; i < dates.length; i++) {
      var write = new Object()
      if (dates[i].dataValues.written == -1) {
        write.day = dates[i].dataValues.date
        write.feel = ''
        arr.push(write)
      } else {
        promises.push(
          new Promise(async (res, rej) => {
            const { date, written } = dates[i].dataValues
            const data = await models.Write.findOne({
              where: {
                id: written,
              },
            })
            arr.push({ day: date, feel: data.dataValues.feel })
            res()
          }),
        )
      }
    }
    await Promise.all(promises)
    // console.log(arr)
    res.status(200).json({ write: arr })
  } catch (err) {
    console.error(err)
    res.status(404).send(err)
  }
}

function rand(max) {
  return Math.floor(Math.random() * max)
}

module.exports = {
  word: word,
  read: read,
}
