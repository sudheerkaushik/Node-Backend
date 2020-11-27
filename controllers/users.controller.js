var express = require("express"),
  app = express(),
  mongodb = require("mongodb");

  var ObjectID = mongodb.ObjectID;
// const User = require('../models/users.model');
var UsersCollection = "Users";

/*
exports.get_books= function(req, res){
  const db = req.app.db;
  db.collection(bestseller_books).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get Books.");
    } else {
      res.status(200).json(docs);
    }
  });
};*/

exports.loginUser= function(req, res){
  const db = req.app.db;
  var credentials = req.body;

  var mail = credentials.UserEmail;
    var password = credentials.UserPwd;

  db.collection(UsersCollection).findOne(
    { email: mail},
    function(err, doc) {
      console.log(doc);
      if (err) {
        handleError(res, err.message, "User not found");
      }
      if(doc == null)
      {
        res.status(401).json({message:"User not found"});
        // res.status(404).json(doc);
      }
      else {
        // console.log(res.json(doc));
        res.json({message:"Logged in"});
        // res.status(200).json(doc);
      }

    }
  );
}

exports.registerUser= function (req, res){
  const db = req.app.db;
  var credentials = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a Book.", 400);
  }

  db.collection(UsersCollection).insertOne(newBook, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new Book.");
    } else {
      console.log("....Added a new book");
      res.status(201).json(doc.ops[0]);
    }
  });
}

/* exports.updateBookbyId= function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(UsersCollection).updateOne(
    { _id: new ObjectID(req.params.id) },
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

exports.deleteBookbyId=  function(req, res) {
  const db = req.app.db;
  db.collection(bestseller_books).deleteOne(
    { _id: new ObjectID(req.params.id) },
    function(err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete book");
      } else {
        res.status(200).json(req.params.id);
      }
    }
  );
}
 */

function handleError(res, reason, message, code) {
  console.log("\n\n\nERROR: " + reason);
  res.status(code || 500).json({"\n\n\n\nerror": message});
}
