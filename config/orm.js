const { createPool } = require("mysql");
// Import MySQL connection.
var connection = require("../config/connection.js");

// Object for all our SQL statement functions.
var orm = {
    selectAll: function(table, cb) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table + " (" + cols + ") VALUES ('" + vals + "') ";

        // queryString += " (";
        // queryString += cols.toString();
        // queryString += ") ";
        // queryString += "VALUES (";
        // queryString += vals;
        // queryString += ") ";

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
          });
    },

    updateOne: function(table, devouredCol, id, cb) {
        
        const queryString = "UPDATE " + table + " SET " + devouredCol + " = true WHERE id = " + id;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
}

// Export the orm object so that it can be used for the model (burgers.js)
module.exports = orm;