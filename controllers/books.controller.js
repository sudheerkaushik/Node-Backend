var express = require("express"),
    app = express(),
    mongodb = require("mongodb");

var ObjectID = mongodb.ObjectID;
const Book = require('../models/books.model');
var bestseller_books = "bestseller_books";


exports.get_books = function(req, res) {
    const db = req.app.db;
    db.collection(bestseller_books).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get Books.");
        } else {
            res.status(200).json(docs);
        }
    });
};
exports.get_books_byId = function(req, res) {
    const db = req.app.db;
    db.collection(bestseller_books).findOne({ _id: new ObjectID(req.params.id) },
        function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to get book");
            } else {
                res.status(200).json(doc);
            }
        }
    );
};

exports.insertBook = function(req, res) {
    const db = req.app.db;
    var newBook = req.body;

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a Book.", 400);
    }

    db.collection(bestseller_books).insertOne(newBook, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new Book.");
        } else {
            console.log("....Added a new book");
            res.status(201).json(doc.ops[0]);
        }
    });
}

exports.updateBookbyId = function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(bestseller_books).updateOne({ _id: new ObjectID(req.params.id) },
        updateDoc,
        function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to update book");
            } else {
                updateDoc._id = req.params.id;
                res.status(200).json(updateDoc);
            }
        }
    );
}

exports.deleteBookbyId = function(req, res) {
    const db = req.app.db;
    db.collection(bestseller_books).deleteOne({ _id: new ObjectID(req.params.id) },
        function(err, result) {
            if (err) {
                handleError(res, err.message, "Failed to delete book");
            } else {
                res.status(200).json(req.params.id);
            }
        }
    );
}



function handleError(res, reason, message, code) {
    console.log("\n\n\nERROR: " + reason);
    res.status(code || 500).json({ "\n\n\n\nerror": message });
}