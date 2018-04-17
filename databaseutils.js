var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "semsa_weinhandel"
});


const addWine = (name, region, location, year, deliveryDate, amount, basePrice, sellPrice, supplierID) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "INSERT INTO artikel (bezeichnung, herkunft, lagerort, jahrgang, lieferdatum, menge, einkaufspreis, verkaufspreis, lieferant_id) " +
            "VALUES ('" + name + "','" + region + "','" + location + "','" + year + "','" + deliveryDate + "','" + amount + "','" + basePrice + "','" + sellPrice + "','" + supplierID + "')";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Wine successfully added");
        });
    });

const updateWine = (id, name, region, location, year, deliveryDate, amount, basePrice, sellPrice, supplierID) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "UPDATE artikel SET bezeichnung = '" + name + "', herkunft = '" + region + "', lagerort = '" + location + "', jahrgang = '" + year + "', lieferdatum = '" + deliveryDate + "', menge = '" + amount + "', einkaufspreis = '" + basePrice + "', " +
            "verkaufspreis = '" + sellPrice + "', lieferant_id = '" + supplierID + "' WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Wine successfully updated");
            resolve(result);
        });
    });

const deleteWine = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "DELETE FROM artikel WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Wine successfully deleted");
            resolve(result);
        });
    });

const getWines = () =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM artikel";
        db.query(sql, function (err, result) {
            if (err) throw err;
            let jsonResultArray = [];
            for (let i = 0; i < result.length; i++) {
                let jsonResult = {
                    "name": result[i].bezeichnung,
                    "region": result[i].herkunft,
                    "location": result[i].lagerort,
                    "year": result[i].jahrgang,
                    "deliveryDate": result[i].lieferdatum,
                    "amount": result[i].menge,
                    "basePrice": result[i].einkaufspreis,
                    "sellPrice": result[i].verkaufspreis,
                    "supplierID": result[i].lieferant_id
                };
                jsonResultArray.push(jsonResult);
            }
            resolve(jsonResultArray);
        });
    });

const getWineById = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM artikel WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Wine successfully returned");
            let jsonResult = {
                "name": result.bezeichnung,
                "region": result.herkunft,
                "location": result.lagerort,
                "year": result.jahrgang,
                "deliveryDate": result.lieferdatum,
                "amount": result.menge,
                "basePrice": result.einkaufspreis,
                "sellPrice": result.verkaufspreis,
                "supplierID": result.lieferant_id
            }
            resolve(jsonResult);
        });
    });

const addSupplier = (name, vorname, region, address_id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "INSERT INTO lieferant (name, vorname, region, adresse_id) " +
            "VALUES ('" + name + "','" + vorname + "','" + region + "','" + address_id + "')";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Supplier successfully added");
            resolve(result);
        });
    });

const updateSupplier = (id, name, vorname, region, address_id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "UPDATE lieferant SET name = '" + name + "', vorname = '" + vorname + "', region = '" + region + "', adresse_id = '" + address_id + "' WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Supplier successfully updated");
            resolve(result);
        });
    });

const deleteSupplier = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "DELETE FROM artikel WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Supplier successfully deleted");
            resolve(result);
        });
    });

const getSuppliers = () =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM artikel";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Supplier successfully printed");
            let jsonResultArray = [];
            for (let i = 0; i < result.length; i++) {
                let jsonResult = {
                    "name": result[i].name,
                    "vorname": result[i].vorname,
                    "region": result[i].region,
                    "address_id": result[i].adresse_id
                };
                jsonResultArray.push(jsonResult);
            }
            resolve(jsonResultArray);
        });
    });

const getSupplierById = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM lieferant WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Wine successfully returned");
            let jsonResult = {
                "name": result.name,
                "firstName": result.vorname,
                "region": result.region,
                "address_id": result.adresse_id,
            }
            resolve(jsonResult);
        });
    });

const addAddress = (street, post, city, country) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "INSERT INTO adresse (land, strasse, plz, ort) " +
            "VALUES ('" + country + "','" + street + "','" + post + "','" + city + "')";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Address successfully added");
            resolve(result);
        });
    });

const updateAddress = (id, street, post, city, country) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "UPDATE adresse SET strasse = '" + street + "', plz = '" + post + "', " +
            "ort = '" + city + "', land = '" + country + "' WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Address successfully updated");
            resolve(result);
        });
    });

const deleteAddress = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "DELETE FROM adresse WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Address successfully deleted");
            resolve(result);
        });
    });

const getAddresses = () =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM adresse";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Adresses successfully printed");
            let jsonResultArray = [];
            for (let i = 0; i < result.length; i++) {
                let jsonResult = {
                    "street": result[i].strasse,
                    "post": result[i].plz,
                    "city": result[i].ort,
                    "country": result[i].land
                };
                jsonResultArray.push(jsonResult);
            }
            resolve(jsonResultArray);
        });
    });

const getAddressById = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM adresse WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Wine successfully returned");
            let jsonResult = {
                "street": result.strasse,
                "post": result.plz,
                "city": result.ort,
                "country": result.land
            }
            resolve(jsonResult);
        });
    });

module.exports = {
    addWine,
    updateWine,
    deleteWine,
    getWines,
    getWineById,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    getSuppliers,
    getSupplierById,
    addAddress,
    updateAddress,
    deleteAddress,
    getAddresses,
    getAddressById,
};