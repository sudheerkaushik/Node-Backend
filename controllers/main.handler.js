var express = require("express"),
    app = express(),
    mongodb = require("mongodb");

var bestseller_books = "bestseller_books";

exports.get_db = function(req, res) {
    // const db = req.app.db;
    res.type("text/plain");
    res.send("API setup is ready");
    // db.collection(bestseller_books).find({}).toArray(function(err, docs) {
    //     if (err) {
    //         handleError(res, err.message, "Failed to get Database.");
    //     } else {
    //     }
    // });
};


function handleError(res, reason, message, code) {
    console.log("\n\n\nERROR: " + reason);
    res.status(code || 500).json({ "\n\n\n\nerror": message });
}