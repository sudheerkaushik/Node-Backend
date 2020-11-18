var express = require("express"),
  app = express(),
  path = require("path"),
  http = require("http"),
  handlebars = require("express-handlebars");

app.set("port", process.env.PORT || 3000);

// **** enabling cache
app.enable("view-cache"); // from https://www.npmjs.com/package/express-handlebars

//    Views setup
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.set("views", path.join(__dirname + "/public", "views"));
console.log("Path is " + path.join(__dirname + "/public", "views"));

// ************ Static file serving *******************
app.use(express.static(__dirname + "/public/assets"));
app.use(express.static(__dirname + "/qa")); // Added for qa folder, removing it wont finid test files

// ********** middleware for testing *************
/* 
app.use(function(req, res, next) {
  console.log('processing request for "' + req.url + '"....');
  next();
});
app.use(function(req, res, next) {
  console.log("terminating request");
  res.send("thanks for playing!");
  // note that we do NOT call next() here...this terminates the request
});
app.use(function(req, res, next) {
  console.log("whoops, i'll never get called!");
});
 */
// ************** Everything Request-Response *******************
app.disable("x-powered-by");
app.get("/headers", function(req, res) {
  res.set("Content-Type", "text/plain");
  var s = "";
  for (var name in req.headers) s += name + " : " + req.headers[name] + "/n";
  res.send(s);
});

 // *********** API setup (Returning from database)  ***********

var tours = [
  { id: 0, name: "Hood River", price: 99.99 },
  { id: 1, name: "Oregon Coast", price: 149.95 }
];

app.get("/api/tours", function(req, res) {
  res.json(tours);
});

// ************* Routes **********

app.get("/", function(req, res) {
  //   res.type("text/plain"); // no longer required because of render()
  res.render("home");
});

app.use(function(req, res, next) {
  res.locals.showTests =
    app.get("env") !== "production" && req.query.test === "1";
  next();
});

var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple."
];

app.get("/about", function(req, res) {
  //   res.type("text/plain"); // no longer required because of render()
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", {
    fortune: randomFortune,
    pageTestScript: "/test-contact.js"
  });
});

//*******    Tour routes *******/

app.get("/tours", function(req, res) {
  res.render("tour");
});
app.get("/tours/request-group-rate", function(req, res) {
  res.render("tours/request-group-rate");
});

// *********** Handling Uncaught Exceptions ***************8
app.get('/fail', function(req, res){ // sends user to 500
  throw new Error('Nope!');
  });

// ************ error pages ********************

app.use(function(req, res, next) {
  //   res.type("text/plain"); // no longer required because of render()
  res.status(404);
  //   res.send("404 - not found");
  res.render("notfound");
});

app.use(function(err, req, res, next) {
  console.log(err.stack);
  //   res.type("text/plain"); // no longer required because of render()
  res.status(500);
  res.render("fivehundred");
  // res.send("500 - Internal Server error");
});

// ******* logging on development and production  ********

switch (app.get("env")) {
  case "development":
    app.use(require("morgan")("dev"));
    break;
  case "production":
    app.use(
      require("express-logger")({
        path: __dirname + "/logs/node_logger.log"
      })
    );
    break;
}

// ******* App cluster  ********

function startServer() {
  http.createServer(app).listen(app.get("port"), function() {
    console.log(
      "Server running on " + app.get("env") + " : " + app.get("port")
    );
  });
}

if (require.main === module) {
  startServer();
} else {
  module.exports = startServer;
}

// ********* The normal server running ********

// app.listen(app.get("port"), function() {
//   console.log("app started on " + app.get("port") + " press C to terminate");
// });
