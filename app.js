var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

const Message = require('./models/message');
const blogRoutes = require('./routes/index')

var app = express();

// connect to mongoDB
const dbURI =
  "mongodb+srv://gabriel:fwYvDNjmaqeqXLAv@messages.jvgpvv6.mongodb.net/Messages-Collection?retryWrites=true&w=majority&appName=Messages";

  mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use(blogRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//gabriel
//fwYvDNjmaqeqXLAv
//mongodb+srv://gabriel:<password>@messages.jvgpvv6.mongodb.net/