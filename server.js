var express = require("express"),
    app = express(),
    port = process.env.PORT || 8000,
    cors = require("cors"),
    mongodb = require("mongodb"),
    bodyParser = require("body-parser");

const path = require("path");
var ObjectID = mongodb.ObjectID;

var main = require('./routes/routes');
var books = require('./routes/books.route');
var cart = require('./routes/cart.route');
var Users = require('./routes/users.route');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//=====================LOCAl API========================================
var { db, dbError } = require("./dbconnection.js");
app.db = db;
app.get('/', main);
app.get('/api/bestseller_books', books);
app.get('/api/bestseller_books/:id', books);
app.post('/api/bestseller_books', books);

app.get('/api/cart', cart);
app.get('/api/cart/:id', cart);
app.post('/api/cart', cart);
app.delete('/api/cart/:id', cart);

app.post('/api/users', Users);


app.use(express.static(__dirname + '/src/assets/homepage'));
app.use('/css', express.static(__dirname + '/src/assets/homepage/css'));
app.use('/js', express.static(__dirname + '/src/assets/homepage/js'));
app.use('/img', express.static(__dirname + '/src/assets/homepage/img'));

console.log("\n\npath is " + __dirname + "\n\n");

app.use(function(req, res, next) {
    //   res.type("text/plain"); // no longer required because of render()
    res.status(404);
    //   res.send("404 - not found");
    res.send("notfound");
});

app.use(function(err, req, res, next) {
    console.log(err.stack);
    //   res.type("text/plain"); // no longer required because of render()
    res.status(500);
    res.send("500");
    // res.send("500 - Internal Server error");
});


app.listen(port);

app.use(function(req, res) {
    if (res.status(200)) {
        console.log("Server working");
    }
    res.status(404).send({ url: req.originalUrl + " not found" }); //
});
var date = new Date();
console.log("Server running at " + port + " at time: " + date);