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
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    res.render('test');
});

app.get("/wine/search", async function (req, res) {
    let searchResult = await databaseutils.searchWine(req.query.query);
    console.log(searchResult);
    let result = {
        "tableHeader": ["Nummer", "Name", "Jahrgang", "Bestand", "Lieferant", "Einkaufspreis", "Verkaufspreis", "Anbauort", "Lagerort"],
        "tableBody": []
    };
    let tableBody = [];
    for (let s in searchResult) {
        let supplier = await databaseutils.getSupplierById(searchResult[s].lieferant_id);
        console.log(supplier);
        tableBody.push([searchResult[s].nummer, searchResult[s].name, searchResult[s].jahrgang, searchResult[s].bestand, supplier.name,
            searchResult[s].einkaufspreis, searchResult[s].verkaufspreis, searchResult[s].anbauort, searchResult[s].lagerort]);
    }

    result.tableBody = tableBody;
    res.send(result);
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

app.get("/wine/delete", async function (req, res) {
    let result = await databaseutils.deleteWine(req.query.id);
    console.log(result);
    res.send(result);
});

app.get("/wine/get", async function (req, res) {
    let wineResult = await databaseutils.getWines();
    console.log(wineResult);
    let result = {
        "tableHeader": ["Nummer", "Name", "Jahrgang", "Bestand", "Lieferant", "Einkaufspreis", "Verkaufspreis", "Anbauort", "Lagerort"],
        "tableBody": []
    };
    let tableBody = [];
    for (let w in wineResult) {
        let supplier = await databaseutils.getSupplierById(wineResult[w].lieferant_id);
        console.log(supplier);
        tableBody.push([wineResult[w].nummer, wineResult[w].name, wineResult[w].jahrgang, wineResult[w].bestand, supplier.name,
                        wineResult[w].einkaufspreis, wineResult[w].verkaufspreis, wineResult[w].anbauort, wineResult[w].lagerort]);
    }

    result.tableBody = tableBody;
    res.send(result);
});

app.get("/wine/getById", async function (req, res) {
    let result = await databaseutils.getWineById(req.query.id);
    console.log(result);
    res.send(result);
});


app.get("/supplier/search", async function (req, res) {
    let searchResult = await databaseutils.searchSupplier(req.query.query);
    let result = {
        "tableHeader": ["Kundennummer", "Name", "Region", "Land", "Straße", "Ort", "PLZ"],
        "tableBody": []
    };
    let tableBody = [];
    for (let s in searchResult) {
        let address = await databaseutils.getAddressById(searchResult[s].adresse_id);
        tableBody.push([searchResult[s].kundennummer, searchResult[s].name, searchResult[s].region, address.land, address.strasse,
            address.ort, address.plz]);
    }

    result.tableBody = tableBody;
    res.send(result);
});

app.post("/supplier/add", async function (req, res) {
    let result = await databaseutils.addSupplier(req.body.name, req.body.vorname, req.body.region, req.body.adresse_id);
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
    let supplierResult = await databaseutils.getSuppliers();
    let result = {
        "tableHeader": ["Kundennummer", "Name", "Region", "Land", "Straße", "Ort", "PLZ"],
        "tableBody": []
    };
    console.log(supplierResult);
    let tableBody = [];
    for (let s in supplierResult) {
        let address = await databaseutils.getAddressById(supplierResult[s].adresse_id);
        console.log(address);
        tableBody.push([supplierResult[s].kundennummer, supplierResult[s].name, supplierResult[s].region, address.land, address.strasse,
            address.ort, address.plz]);
    }

    result.tableBody = tableBody;
    res.send(result);
});

app.get("/supplier/getById", async function (req, res) {
    let result = await databaseutils.getSupplierById(req.query.id);
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
    let result = await databaseutils.getAddressById(req.query.id);
    console.log(result);
    res.send(result);
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
