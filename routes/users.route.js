
const express = require('express'),
app = express(),
router = express.Router(),
users_controller = require('../controllers/users.controller');

//*************** cart ***************
/* router.get("/api/cart", cart_controller.get_cart);

router.get("/api/cart/:id",cart_controller.get_cart_byId);

router.post("/api/cart/",cart_controller.fillCart); */

router.post("/api/users",users_controller.loginUser);

// router.delete("/api/cart/:id",users_controller.deleteFromCart);

module.exports = router;




//*************** Users API ***************
/* app.get("/api/Users", function(req, res) {
  db.collection(Users)
    .find({})
    .toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get Users list.");
      } else {
        res.status(200).json(docs);
      }
    });
});
 */
/* app.post("/api/login", function (req, res) {

  const email = req.body.email,
    password = req.body.password;

  if (validateEmailAndPassword()) {
    const userId = findUserIdForEmail(email);

    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 120,
      subject: userId
    })

  // send the JWT back to the user
  // TODO - multiple options available
}
  else {
    // send status 401 Unauthorized
    res.sendStatus(401);
  }
}); */
// this is the session token we created above
// const jwtBearerToken = jwt.sign(...);

// set it in an HTTP Only + Secure Cookie
// set it in the HTTP Response body
// res.status(200).json({
//   idToken: jwtBearerToken,
//   expiresIn: 30000
// });
/* app.post("/api/Users", function(req, res) {
  var newUser = req.body;

  // if (!req.body.name) {
  //   handleError(res, "Invalid user input", "Must provide a User.", 400);
  // }

  db.collection(Users).insertOne(newUser, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new User.");
    } else {
      // res.status(201).json(doc.ops[0]);
      console.log("New User regsitered");
    }
  });
});
app.get("/api/Users/:id", function(req, res) {
  var username = req.params.id,
    password = req.body.password;
  console.log(req.params);
  db.collection(Users).findOne({ name: username }, function(err, doc) {
    // if (!user) {
    //     console.log("Account not found");
    //     res.redirect('/signin');
    // } else if (!user.validPassword(password)) {
    //     console.log("Password not matched");
    //     res.redirect('/signin');
    // } else {
    //     console.log("voila Account");
    //     req.session.user = user.dataValues;
    //     res.redirect('/home');
    // }
    if (err) {
      handleError(res, err.message, "Failed to get User based on ID");
    } else {
      res.status(200).json(doc);
    }
  });
}); */
/*



app.put("/api/Users/:id", function(req, res) {
    var updateUser = req.body;
    delete updateUser._id;

    db.collection(Users).updateOne({ _id: new ObjectID(req.params.id) }, updateUser, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update User");
        } else {
            updateUser._id = req.params.id;
            res.status(200).json(updateUser);
        }
    });
});

app.delete("/api/Users/:id", function(req, res) {

    db.collection(Users).deleteOne({ _id: new ObjectID(req.params.id) }, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete User");
        } else {
            res.status(200).json(req.params.id);
        }
    });
});
 */
