const models = require('../models')
const multer = require('multer')
const iconv = require('iconv-lite')
var fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    var imageBuffer = new Buffer.from(file.originalname, 'utf8')
    console.log(file.encoding)
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const uploadImg = multer({ storage: storage }).single('image')

function createP(req, res) {
  var date = new Date()
  var uri = 'http://10.80.161.67:3000' + req.file.path.slice(6)
  models.Picture.create({
    url: uri,
    place: req.body.place,
    tag1: req.body.tag[0],
    tag2: req.body.tag[1],
    tag3: req.body.tag[2],
  })
    .then((_) => {
      models.Picture.findOne({
        order: [['id', 'DESC']],
      })
        .then((dataValues) => {
          models.Date.create({
            id: req.body.id,
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            date: date.getDate(),
            written: -1,
            picture: dataValues.id,
          })
            .then((_) =>
              res.status(201).json({
                id: dataValues.id,
                url: dataValues.url,
              }),
            )
            .catch((_) => res.status(401).send(_))
        })
        .catch((_) => res.status(404).send(_))
    })
    .catch((_) => res.status(404).send(_))
}

function readP(req, res) {
  models.Date.findAll({
    where: {
      id: req.query.id,
      year: req.query.year,
      month: req.query.month,
      date: req.query.date,
      written: -1,
    },
  })
    .then((p) => {
      forLoop(p).then((value) => {
        var arr = new Array()
        for (var i = 0; i < value.length; i++) {
          arr.push(value[i].dataValues)
        }
        res.status(200).json(arr)
      })
    })
    .catch((_) => res.status(402).send(_))
}

async function forLoop(p) {
  var array = Array()
  for (i = 0; i < p.length; i++) {
    await getImageUrl(p[i].picture).then((value) => {
      array.push(value)
    })
  }
  return array
}

function getImageUrl(imageId) {
  return new Promise((resolve, rejects) => {
    models.Picture.findOne({
      where: { id: imageId },
    })
      .then((data) => resolve(data))
      .catch((_) => res.status(401).send(_))
  })
}

function updateP(req, res) {
  models.Picture.update(
    {
      place: req.body.place,
      tag1: req.body.tag[0],
      tag2: req.body.tag[1],
      tag3: req.body.tag[2],
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

function deleteP(req, res) {
  models.Picture.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((p) => {
      fs.unlink('public' + p.url.slice(21), (err) => {
        if (err) {
          console.error(err)
        }
      })
    })
    .then((_) => {
      models.Date.destroy({
        where: {
          id: req.body.userid,
          picture: req.body.id,
        },
      })
        .then((_) =>
          models.Picture.destroy({
            where: { id: req.body.id },
          })
            .then((_) => res.status(204).json({ success: true }))
            .catch((_) => res.status(404).send(_)),
        )
        .catch((_) => res.status(404).send(_))
    })
}

module.exports = {
  uploadImg: uploadImg,
  createP: createP,
  readP: readP,
  updateP: updateP,
  deleteP: deleteP,
}
