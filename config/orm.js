const { createPool } = require("mysql");
// Import MySQL connection.
var connection = require("../config/connection.js");

  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Black Bean Burger => 'Black Bean Burger')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Black Bean Burger'} => ["name='Black Bean Burger'"]
        // e.g. {devoured: true} => ["devoured=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

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

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
          });
    },

    updateOne: function(table, objColVals, condition, cb) {
        
        const queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
}

// Export the orm object so that it can be used for the model (burgers.js)
module.exports = orm;