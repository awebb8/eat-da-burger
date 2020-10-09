var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.all(function(data) {
        var burgerObject = {
            burgers: data
        };
        console.log(burgerObject);
        res.render("index", burgerObject);
    });
});

// create a new burger to eat
router.post("/api/burgers", function(req, res) {
    burgers.create([
        "name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function(result) {
        // Send back the ID of the newly created burger
        res.json({ id: result.insertId });
    });
});

// Update burger if devoured
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("You have eaten burger", condition);
    burger.update({
        devoured: req.body.sleepy
    }, condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


// Export routes for server.js to use
module.exports = router;