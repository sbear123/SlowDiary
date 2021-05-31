const request = require('request')

const apiKey =
  '1d46c269daa71084e547228e5ef78181ed56c788df7f1cc5223d9cc477e02711'
var json = Object()

async function getList(req, res) {
  var url = `http://211.237.50.150:7080/openapi/${apiKey}/json/Grid_20150827000000000226_1/1/1000`

  request.get(
    {
      uri: url,
    },
    function (error, response, body) {
      let foodJson = JSON.parse(body)

      json = foodJson.Grid_20150827000000000226_1.row.filter(
        (food) => food.TY_CODE == req.query.id,
      )

      res.status(200).json(json)

      json = Object()
    },
  )
}

module.exports = {
  getList: getList,
}
