var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "semsa_weinhandel"
});

/**
 * Function adds wine to database
 * @param name
 * @param region
 * @param location
 * @param year
 * @param deliveryDate
 * @param amount
 * @param basePrice
 * @param sellPrice
 * @param supplierID
 * @returns {Promise<any>}
 */
const addWine = (name, region, location, year, deliveryDate, amount, basePrice, sellPrice, supplierID) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "INSERT INTO artikel (bezeichnung, herkunft, lagerort, jahrgang, lieferdatum, menge, einkaufspreis, verkaufspreis, lieferant_id) "
            + "VALUES ('" + name + "','" + region + "','" + location + "','" + year + "','" + deliveryDate + "','" + amount + "','" + basePrice
            + "','" + sellPrice + "','" + supplierID + "')";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Wine successfully added");
            }
        });
    });

/**
 * Function updates wine in database
 * @param id
 * @param name
 * @param region
 * @param location
 * @param year
 * @param deliveryDate
 * @param amount
 * @param basePrice
 * @param sellPrice
 * @param supplierID
 * @returns {Promise<any>}
 */
const updateWine = (id, name, region, location, year, deliveryDate, amount, basePrice, sellPrice, supplierID) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "UPDATE artikel SET bezeichnung = '" + name + "', herkunft = '" + region + "', lagerort = '" + location + "', jahrgang = '" + year
            + "', lieferdatum = '" + deliveryDate + "', menge = '" + amount + "', einkaufspreis = '" + basePrice + "', verkaufspreis = '"
            + sellPrice + "', lieferant_id = '" + supplierID + "' WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Wine successfully updated");
            }
            resolve(result);
        });
    });


/**
 * Function deletes wine from database
 * @param id
 * @returns {Promise<any>}
 */
const deleteWine = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "DELETE FROM artikel WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                resolve({result: false});
            } else {
                console.log("Wine successfully deleted");
            }
            resolve({result: true});
        });
    });

/**
 * Function queries wine from database
 * @returns {Promise<any>}
 */
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
                    "id": result[i].id,
                    "name": result[i].bezeichnung,
                    "year": result[i].jahrgang,
                    "amount": result[i].menge,
                    "supplierID": result[i].lieferant_id,
                    "basePrice": result[i].einkaufspreis,
                    "sellPrice": result[i].verkaufspreis,
                    "region": result[i].herkunft,
                    "location": result[i].lagerort,
                    "deliveryDate": result[i].lieferdatum
                };
                jsonResultArray.push(jsonResult);
            }
            resolve(jsonResultArray);
        });
    });

/**
 * Function queries wine from database by id
 * @param id
 * @returns {Promise<any>}
 */
const getWineById = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM artikel WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Wine successfully returned");
            }
            let jsonResult = {
                "id": result[0].id,
                "name": result[0].bezeichnung,
                "year": result[0].jahrgang,
                "amount": result[0].menge,
                "supplierID": result[0].lieferant_id,
                "basePrice": result[0].einkaufspreis,
                "sellPrice": result[0].verkaufspreis,
                "region": result[0].herkunft,
                "location": result[0].lagerort,
                "deliveryDate": result[0].lieferdatum
            }
            resolve(jsonResult);
        });
    });


/**
 * Function searches wines in database by query
 * @param query
 * @returns {Promise<any>}
 */
const searchWine = (query) =>
    new Promise((resolve, reject) => {
        console.log(query);
        console.log("Connected!");
        let sql = "SELECT * FROM artikel WHERE jahrgang = '" + query + "' OR menge = '" + query + "' OR bezeichnung = '" + query
            + "' OR lagerort = '" + query + "' OR herkunft = '" + query + "'";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            }
            if (query == null) {
                resolve([]);
            }
            let jsonResultArray = [];
            for (let i = 0; i < result.length; i++) {
                let jsonResult = {
                    "id": result[i].id,
                    "name": result[i].bezeichnung,
                    "year": result[i].jahrgang,
                    "amount": result[i].menge,
                    "supplierID": result[i].lieferant_id,
                    "basePrice": result[i].einkaufspreis,
                    "sellPrice": result[i].verkaufspreis,
                    "region": result[i].herkunft,
                    "location": result[i].lagerort,
                    "deliveryDate": result[i].lieferdatum
                };
                jsonResultArray.push(jsonResult);
            }
            resolve(jsonResultArray);
        });
    });

/**
 * Function adds supplier to database
 * @param name
 * @param firstName
 * @param region
 * @param addressID
 * @returns {Promise<any>}
 */
const addSupplier = (name, firstName, region, addressID) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "INSERT INTO lieferant (name, vorname, region, adresse_id) " +
            "VALUES ('" + name + "','" + firstName + "','" + region + "','" + addressID + "')";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Supplier successfully added");
            }
            resolve(result);
        });
    });

/**
 * Function updates wine in database
 * @param id
 * @param name
 * @param firstName
 * @param region
 * @param addressID
 * @returns {Promise<any>}
 */
const updateSupplier = (id, name, firstName, region, addressID) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "UPDATE lieferant SET name = '" + name + "', vorname = '" + firstName + "', region = '" + region + "', adresse_id = '"
            + addressID + "' WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Supplier successfully updated");
            }
            resolve(result);
        });
    });

/**
 * Function deletes wine in database
 * @param id
 * @returns {Promise<any>}
 */
const deleteSupplier = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "DELETE FROM artikel WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                resolve({result: false});
            } else {
                console.log("Supplier successfully deleted");
            }
            resolve({result: true});
        });
    });

/**
 * Function queries suppliers from database
 * @returns {Promise<any>}
 */
const getSuppliers = () =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM lieferant";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Supplier successfully printed");
            }
            let jsonResultArray = [];
            for (let i = 0; i < result.length; i++) {
                let jsonResult = {
                    "id": result[i].id,
                    "name": result[i].name,
                    "firstName": result[i].vorname,
                    "region": result[i].region,
                    "addressID": result[i].adresse_id
                };
                jsonResultArray.push(jsonResult);
            }
            resolve(jsonResultArray);
        });
    });


/**
 * Function queries supplier in database by id
 * @param id
 * @returns {Promise<any>}
 */
const getSupplierById = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM lieferant WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Supplier successfully returned");
            }
            let jsonResult = {
                "id": result[0].id,
                "name": result[0].name,
                "firstName": result[0].vorname,
                "region": result[0].region,
                "addressID": result[0].adresse_id
            };
            resolve(jsonResult);
        });
    });

/**
 * Function searches suppliers in database by query
 * @param query
 * @returns {Promise<any>}
 */
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
                    "id": result[r].id,
                    "name": result[r].name,
                    "firstName": result[r].vorname,
                    "region": result[r].region,
                    "addressID": result[r].adresse_id
                };
                jsonResultArray.push(jsonResult);
            }
            resolve(jsonResultArray);
        });
    });

/**
 * Function adds address to database
 * @param street
 * @param post
 * @param city
 * @param country
 * @returns {Promise<any>}
 */
const addAddress = (street, post, city, country) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "INSERT INTO adresse (land, strasse, plz, ort) " +
            "VALUES ('" + country + "','" + street + "','" + post + "','" + city + "')";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Address successfully added");
            }
            resolve(result);
        });
    });

/**
 * Function updates address in database
 * @param id
 * @param street
 * @param post
 * @param city
 * @param country
 * @returns {Promise<any>}
 */
const updateAddress = (id, street, post, city, country) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "UPDATE adresse SET strasse = '" + street + "', plz = '" + post + "', " +
            "ort = '" + city + "', land = '" + country + "' WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Address successfully updated");
            }
            resolve(result);
        });
    });

/**
 * Function deletes address in database
 * @param id
 * @returns {Promise<any>}
 */
const deleteAddress = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "DELETE FROM adresse WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Address successfully deleted");
            }
            resolve(result);
        });
    });

/**
 * Function queries addresses in database
 * @returns {Promise<any>}
 */
const getAddresses = () =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM adresse";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Adresses successfully printed");
            }
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

/**
 * Function queries address in database by id
 * @param id
 * @returns {Promise<any>}
 */
const getAddressById = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        console.log(id);
        let sql = "SELECT * FROM adresse WHERE id = '" + id + "'";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Wine successfully returned");
            }
            console.log(result);
            let jsonResult = {
                "street": result[0].strasse,
                "post": result[0].plz,
                "city": result[0].ort,
                "country": result[0].land
            }
            resolve(jsonResult);
        });
    });

/**
 * Exported functions from module
 */
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