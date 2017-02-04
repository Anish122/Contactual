var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var db= monk('localhost:27017/contactual');

//var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/views'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
    res.sendFile('index.html', { root: __dirname+'/public' });
});
app.post('/registerUser', function(request, response, next) {
    var collection = db.get("userData");
    console.log("app.js :: /registerUser :: coming here" + request.body);
    collection.insert(request.body, function(err, data){
        if (err){
            console.log("error adding contact to contact list.");
        } else {
            response.json(data);
        }
    });
    response.sendFile('index.html', { root: __dirname+'/public' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
