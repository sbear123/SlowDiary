var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')

var usersRouter = require('./routes/users')
var weatherRouter = require('./routes/weather')
var pictureRouter = require('./routes/picture')
var goalRouter = require('./routes/goal')
var writeRouter = require('./routes/write')
var homeRouter = require('./routes/home')
var foodRouter = require('./routes/food')

const { sequelize } = require('./models')

var app = express()
sequelize.sync()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter)
app.use('/weather', weatherRouter)
app.use('/picture', pictureRouter)
app.use('/goal', goalRouter)
app.use('/write', writeRouter)
app.use('/home', homeRouter)
app.use('/food', foodRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
