var express = require("express"),
  app = express(),
  mongodb = require("mongodb");

  var ObjectID = mongodb.ObjectID;
const userCart = require('../models/cart.model');
var userCartCollection = "userCart";
//*************** CART API ***************
exports.getCartItems= function(req, res){
  const db = req.app.db;

  db.collection(userCartCollection)
    .find({})
    .toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get Cart data.");
      } else {
        res.status(200).json(docs);
      }
    });
};

exports.addTocart= function(req, res){
  const db = req.app.db;
  var newCartItem = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a Cart item.", 400);
  }

  db.collection(userCartCollection).insertOne(newCartItem, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Already in Cart");
    } else {
      res.status(201).json({"message":"Book Added"});
    }
  });
}

exports.deleteFromCart= function(req, res){
  const db = req.app.db;
  db.collection(userCartCollection).deleteOne({ _id: req.params.id }, function(
    err,
    result
  ) {
    if (err) {
      handleError(
        res,
        err.message,
        "Failed to delete cart item " + req.params.id
      );
      /*return res.status(500).send("Failed to delete cart item");*/
    } else {
      console.log(res.status(200).json(result));
      console.log(
        "SERVER message : Cart item deleted from server.js " + req.params.id
      );
    }
  });
}

function handleError(res, reason, msg, code) {
  console.log("\n\n\nERROR: " + reason+" "+msg);
  res.status(code || 500).json({'message': msg});
}
