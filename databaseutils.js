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
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Wine successfully added");
        });
    });

const updateWine = (id, name, region, location, year, deliveryDate, amount, basePrice, sellPrice, supplierID) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "UPDATE artikel SET bezeichnung = '" + name + "', herkunft = '" + region + "', lagerort = '" + location + "', jahrgang = '" + year + "', lieferdatum = '" + deliveryDate + "', menge = '" + amount + "', einkaufspreis = '" + basePrice + "', " +
            "verkaufspreis = '" + sellPrice + "', lieferant_id = '" + supplierID + "' WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Wine successfully updated");
            resolve(result);
        });
    });

const deleteWine = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "DELETE FROM artikel WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Wine successfully deleted");
            resolve(result);
        });
    });

const getWines = () =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM artikel";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            }
            let jsonResultArray = [];
            for (let i = 0; i < result.length; i++) {
                let jsonResult = {
                    "nummer": result[i].id,
                    "name": result[i].bezeichnung,
                    "jahrgang": result[i].jahrgang,
                    "bestand": result[i].menge,
                    "lieferant_id": result[i].lieferant_id,
                    "einkaufspreis": result[i].einkaufspreis,
                    "verkaufspreis": result[i].verkaufspreis,
                    "anbauort": result[i].herkunft,
                    "lagerort": result[i].lagerort,
                    "lieferdatum": result[i].lieferdatum
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
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Wine successfully returned");
            let jsonResult = {
                "nummer": result[0].id,
                "name": result[0].bezeichnung,
                "jahrgang": result[0].jahrgang,
                "bestand": result[0].menge,
                "lieferant_id": result[0].lieferant_id,
                "einkaufspreis": result[0].einkaufspreis,
                "verkaufspreis": result[0].verkaufspreis,
                "anbauort": result[0].herkunft,
                "lagerort": result[0].lagerort,
                "lieferdatum": result[0].lieferdatum
            }
            resolve(jsonResult);
        });
    });

const searchWine = (query) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM artikel WHERE jahrgang = '" + query + "' OR menge = '" + query + "' OR bezeichnung = '" + query + "' lagerort = '" + query + "' OR herkunft = '" + query + "'";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            }
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

const addSupplier = (name, vorname, region, addresse_id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "INSERT INTO lieferant (name, vorname, region, adresse_id) " +
            "VALUES ('" + name + "','" + vorname + "','" + region + "','" + addresse_id + "')";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Supplier successfully added");
            resolve(result);
        });
    });

const updateSupplier = (id, name, vorname, region, address_id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "UPDATE lieferant SET name = '" + name + "', vorname = '" + vorname + "', region = '" + region + "', adresse_id = '" + address_id + "' WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Supplier successfully updated");
            resolve(result);
        });
    });

const deleteSupplier = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "DELETE FROM artikel WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Supplier successfully deleted");
            resolve(result);
        });
    });

const getSuppliers = () =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM lieferant";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Supplier successfully printed");
            let jsonResultArray = [];
            for (let i = 0; i < result.length; i++) {
                let jsonResult = {
                    "kundennummer": result[i].id,
                    "name": result[i].name,
                    "vorname": result[i].vorname,
                    "region": result[i].region,
                    "addresse_id": result[i].adresse_id
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
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Supplier successfully returned");
            let jsonResult = {
                "kundennummer": result[0].id,
                "name": result[0].name,
                "vorname": result[0].vorname,
                "region": result[0].region,
                "addresse_id": result[0].adresse_id
            };
            resolve(jsonResult);
        });
    });

const searchSupplier = (query) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM lieferant WHERE name = '" + query + "' OR vorname = '" + query + "' OR region = '" + query + "'";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            }
            let jsonResultArray = [];
            for (let r in result) {
                let jsonResult = {
                    "kundennummer": result[r].id,
                    "name": result[r].name,
                    "vorname": result[r].vorname,
                    "region": result[r].region,
                    "addresse_id": result[r].adresse_id
                };
                jsonResultArray.push(jsonResult);
            }
            resolve(result);
        });
    });

const addAddress = (street, post, city, country) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "INSERT INTO adresse (land, strasse, plz, ort) " +
            "VALUES ('" + country + "','" + street + "','" + post + "','" + city + "')";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Address successfully added");
            resolve(result);
        });
    });

const updateAddress = (id, street, post, city, country) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "UPDATE adresse SET strasse = '" + street + "', plz = '" + post + "', " +
            "ort = '" + city + "', land = '" + country + "' WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Address successfully updated");
            resolve(result);
        });
    });

const deleteAddress = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "DELETE FROM adresse WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Address successfully deleted");
            resolve(result);
        });
    });

const getAddresses = () =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM adresse";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Adresses successfully printed");
            let jsonResultArray = [];
            for (let i = 0; i < result.length; i++) {
                let jsonResult = {
                    "strasse": result[i].strasse,
                    "plz": result[i].plz,
                    "ort": result[i].ort,
                    "land": result[i].land
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
            if (err) {
                throw err;
                console.log(err);
            } else console.log("Wine successfully returned");
            let jsonResult = {
                "strasse": result[0].strasse,
                "plz": result[0].plz,
                "ort": result[0].ort,
                "land": result[0].land
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
    searchWine,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    getSuppliers,
    getSupplierById,
    searchSupplier,
    addAddress,
    updateAddress,
    deleteAddress,
    getAddresses,
    getAddressById
};