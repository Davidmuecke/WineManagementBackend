var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var databaseutils = require('./databaseutils');

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    res.render('test');
});

app.get("/wine/search", function (req, res) {
    let query = req.query;
    console.log(query);
    let tableResponse = {
        "tableHeader": ["colName1", "colName2", "colNameX"],
        "tableBody": [["colData11", "colData12", "colData1X"],["colData21", "colData22", "colData2X" ],["colDataX1", "colDataX2", "colDataXX" ]]
    };
    res.send(tableResponse);
});

app.post("/wine/add", async function (req, res) {
    console.log("Posting");
    console.log(req.body.name);
    let result = await databaseutils.addWine(req.body.name, req.body.region, req.body.location, req.body.year, req.body.deliveryDate, req.body.amount, req.body.basePrice, req.body.sellPrice, req.body.supplierID);
    console.log(result);
    res.send(result);
});

app.post("/wine/update", async function (req, res) {
    let result = await databaseutils.updateWine(req.body.id, req.body.name, req.body.region, req.body.location, req.body.year, req.body.deliveryDate, req.body.amount, req.body.basePrice, req.body.sellPrice, req.body.supplierID);
    console.log(result);
    res.send(result);
});

app.post("/wine/delete", async function (req, res) {
    let result = await databaseutils.deleteWine(req.body.id);
    console.log(result);
    res.send(result);
});

app.get("/wine/get", async function (req, res) {
    let result = await databaseutils.getWines();
    console.log(result);
    res.send(result);
});

app.get("/wine/getById", async function (req, res) {
    let result = await databaseutils.getWineById(req.body.id);
    console.log(result);
    res.send(result);
});

app.post("/supplier/add", async function (req, res) {
    let result = await databaseutils.addSupplier(req.body.name, req.body.region, req.body.year, req.body.basePrice, req.body.sellPrice, req.body.supplierID);
    console.log(result);
    res.send(result);
});

app.post("/supplier/update", async function (req, res) {
    let result = await databaseutils.updateSupplier(req.body.id, req.body.name, req.body.region, req.body.year, req.body.basePrice, req.body.sellPrice, req.body.supplierID);
    console.log(result);
    res.send(result);
});

app.post("/supplier/delete", async function (req, res) {
    let result = await databaseutils.deleteSupplier(req.body.id);
    console.log(result);
    res.send(result);
});

app.get("/supplier/get", async function (req, res) {
    let result = await databaseutils.getSuppliers();
    console.log(result);
    res.send(result);
});

app.get("/supplier/getById", async function (req, res) {
    let result = await databaseutils.getSupplierById(req.body.id);
    console.log(result);
    res.send(result);
});

app.post("/address/add", async function (req, res) {
    let result = await databaseutils.addAddress(req.body.street, req.body.post, req.body.city, req.body.country);
    console.log(result);
    res.send(result);
});

app.post("/address/update", async function (req, res) {
    let result = await databaseutils.updateAddress(req.body.id, req.body.street, req.body.post, req.body.city, req.body.country);
    console.log(result);
    res.send(result);
});

app.post("/address/delete", async function (req, res) {
    let result = await databaseutils.deleteAddress(req.body.id);
    console.log(result);
    res.send(result);
});

app.get("/address/get", async function (req, res) {
    let result = await databaseutils.getAddresses();
    console.log(result);
    res.send(result);
});

app.get("/address/getById", async function (req, res) {
    let result = await databaseutils.getAddressById(req.body.id);
    console.log(result);
    res.send(result);
});


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
