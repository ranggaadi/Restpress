var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//menggunakan mongoose (tambahan user)
var mongoose = require('mongoose');

//dicomment karena tidak digunakan lagi, karena menggunakan controller
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

//connect ke mongodb menggunakan sintaks dibawah ini (tambahan user)
mongoose.connect('mongodb://localhost:27017/express_app', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Koneksi ke mongodb sudah dibuat");
})
.catch(err => {
  console.log('App starting error: ', err.stack);
  process.exit(1);
});

//require file-system module (tambahan user sendiri)
var fs = require('file-system');

//Include controller (tambahan user sendiri)
fs.readdirSync('controllers').forEach((file) => {
  if(file.substr(-3) == '.js') {
    const route = require('./controllers/' + file)
    route.controller(app)
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//dicomment karena tidak digunakan lagi, karena menggunakan controller
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

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

//tambahan user sendiri untuk membuat server
app.listen(3000, () => {
  console.log('Listening on port 3000')
})

module.exports = app;