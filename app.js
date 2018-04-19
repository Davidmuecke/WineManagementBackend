var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var databaseutils = require('./databaseutils');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Get route to search for wines
 */
app.get("/wine/search", async function (req, res) {
    let searchResult = await databaseutils.searchWine(req.query.query);
    console.log(searchResult);
    let result = {
        "tableHeader": ["Nummer", "Name", "Jahrgang", "Bestand", "Lieferant", "Einkaufspreis", "Verkaufspreis", "Anbauort", "Lagerort"],
        "tableBody": []
    };
    let tableBody = [];
    for (let s in searchResult) {
        let supplier = await databaseutils.getSupplierById(searchResult[s].supplierID);
        console.log(supplier);
        tableBody.push([searchResult[s].id, searchResult[s].name, searchResult[s].year, searchResult[s].amount, supplier.name,
            searchResult[s].basePrice, searchResult[s].sellPrice, searchResult[s].region, searchResult[s].location]);
    }

    result.tableBody = tableBody;
    res.send(result);
});

/**
 * Post route to add wine
 */
app.post("/wine/add", async function (req, res) {
    console.log("Posting");
    console.log(req.body.name);
    let result = await databaseutils.addWine(req.body.name, req.body.region, req.body.location, req.body.year, req.body.deliveryDate,
        req.body.amount, req.body.basePrice, req.body.sellPrice, req.body.supplierID);
    console.log(result);
    res.send(result);
});

/**
 * Post route to update wine
 */
app.post("/wine/update", async function (req, res) {
    let result = await databaseutils.updateWine(req.body.id, req.body.name, req.body.region, req.body.location, req.body.year,
        req.body.deliveryDate, req.body.amount, req.body.basePrice, req.body.sellPrice, req.body.supplierID);
    console.log(result);
    res.send(result);
});

/**
 * Get route to delete wine
 */
app.get("/wine/delete", async function (req, res) {
    let result = await databaseutils.deleteWine(req.query.id);
    console.log(result);
    res.send(result);
});

/**
 * Get route to get wines
 */
app.get("/wine/get", async function (req, res) {
    let wineResult = await databaseutils.getWines();
    console.log(wineResult);
    let result = {
        "tableHeader": ["Nummer", "Name", "Jahrgang", "Bestand", "Lieferant", "Einkaufspreis", "Verkaufspreis", "Anbauort", "Lagerort"],
        "tableBody": []
    };
    let tableBody = [];
    for (let w in wineResult) {
        let supplier = await databaseutils.getSupplierById(wineResult[w].supplierID);
        console.log(supplier);
        tableBody.push([wineResult[w].id, wineResult[w].name, wineResult[w].year, wineResult[w].amount, supplier.name,
            wineResult[w].basePrice, wineResult[w].sellPrice, wineResult[w].region, wineResult[w].location]);
    }

    result.tableBody = tableBody;
    res.send(result);
});

/**
 * Get route to get wines by id
 */
app.get("/wine/getById", async function (req, res) {
    let result = await databaseutils.getWineById(req.query.id);
    console.log(result);
    res.send(result);
});

/**
 * Get route to search for suppliers
 */
app.get("/supplier/search", async function (req, res) {
    let searchResult = await databaseutils.searchSupplier(req.query.query);
    let result = {
        "tableHeader": ["Kundennummer", "Name", "Region", "Land", "Straße", "Ort", "PLZ"],
        "tableBody": []
    };
    let tableBody = [];
    for (let s in searchResult) {
        let address = await databaseutils.getAddressById(searchResult[s].addressID);
        tableBody.push([searchResult[s].id, searchResult[s].name, searchResult[s].region, address.country, address.street,
            address.city, address.post]);
    }

    result.tableBody = tableBody;
    res.send(result);
});

/**
 * Post route to add supplier
 */
app.post("/supplier/add", async function (req, res) {
    let result = await databaseutils.addSupplier(req.body.name, req.body.vorname, req.body.region, req.body.adresse_id);
    console.log(result);
    res.send(result);
});

/**
 * Post route to update supplier
 */
app.post("/supplier/update", async function (req, res) {
    let result = await databaseutils.updateSupplier(req.body.id, req.body.name, req.body.firstName, req.body.region, req.body.addressID);
    console.log(result);
    res.send(result);
});

/**
 * Get route to delete supplier
 */
app.get("/supplier/delete", async function (req, res) {
    let result = await databaseutils.deleteSupplier(req.body.id);
    console.log(result);
    res.send(result);
});

/**
 * Get route to get supplier
 */
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
        tableBody.push([supplierResult[s].id, supplierResult[s].name, supplierResult[s].region, address.country, address.street,
            address.city, address.post]);
    }

    result.tableBody = tableBody;
    res.send(result);
});

/**
 * Get route to get supplier by id
 */
app.get("/supplier/getById", async function (req, res) {
    let result = await databaseutils.getSupplierById(req.query.id);
    console.log(result);
    res.send(result);
});

/**
 * Post route to add address
 */
app.post("/address/add", async function (req, res) {
    let result = await databaseutils.addAddress(req.body.street, req.body.post, req.body.city, req.body.country);
    console.log(result);
    res.send(result);
});

/**
 * Post route to update address
 */
app.post("/address/update", async function (req, res) {
    let result = await databaseutils.updateAddress(req.body.id, req.body.street, req.body.post, req.body.city, req.body.country);
    console.log(result);
    res.send(result);
});

/**
 * Get route to delete for address
 */
app.get("/address/delete", async function (req, res) {
    let result = await databaseutils.deleteAddress(req.body.id);
    console.log(result);
    res.send(result);
});

/**
 * Get route to get addresses
 */
app.get("/address/get", async function (req, res) {
    let result = await databaseutils.getAddresses();
    console.log(result);
    res.send(result);
});

/**
 * Get route to get address by id
 */
app.get("/address/getById", async function (req, res) {
    let result = await databaseutils.getAddressById(req.query.id);
    console.log(result);
    res.send(result);
});


/**
 * catch 404 and forward to error handler
 **/
app.use(function (req, res, next) {
    next(createError(404));
});

/**
 * error handler
 */
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

/**
 * exporting app
 */
module.exports = app;
