const request = require('request')

const apiKey = '29a589d419d0602aa883b5e99332b5fb'
var json = Object()

function changeTime() {
  return Math.floor(new Date().getTime() / 1000)
}

async function weather(req, res) {
  var yesterday = Object()
  var today = Object()
  var tomorrow = Object()
  let lat = req.query.lat
  let lon = req.query.lon
  var url = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&units=metric&dt=${changeTime()}&appid=${apiKey}&lang=kr`

  request.get(
    {
      uri: url,
    },
    function (error, response, body) {
      let weatherJson = JSON.parse(body)

      yesterday.temp = weatherJson.current.temp
      yesterday.weather = weatherJson.current.weather[0].description
      yesterday.id = weatherJson.current.weather[0].id
      json.yesterday = yesterday

      url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric&lang=kr`

      request.get(
        {
          uri: url,
        },
        function (error, response, body) {
          let weatherJson = JSON.parse(body)

          today.temp = weatherJson.current.temp
          today.weather = weatherJson.current.weather[0].description
          today.id = weatherJson.current.weather[0].id

          tomorrow.temp = weatherJson.daily[0].temp.day
          tomorrow.weather = weatherJson.daily[0].weather[0].description
          tomorrow.id = weatherJson.daily[0].weather[0].id

          json.today = today
          json.tomorrow = tomorrow

          res.status(200).json(json)

          json = Object()
        },
      )
    },
  )
}

module.exports = {
  weather: weather,
}
