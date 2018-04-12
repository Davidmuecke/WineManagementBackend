var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/wine/search", function (req, res) {
    let query = req.query;
    //db abfrage mit query;
    let tableResponse = {
        "tableHeader": ["colName1", "colName2", "colNameX"],
        "tableBody": [["colData11", "colData12", "colData1X"],["colData21", "colData22", "colData2X" ],["colDataX1", "colDataX2", "colDataXX" ]]
    };
    res.send(tableResponse);
})

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
