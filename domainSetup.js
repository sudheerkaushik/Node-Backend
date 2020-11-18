var express = require("express"),
  app = express(),
  path = require("path"),
  http = require("http"),
  handlebars = require("express-handlebars");

app.set("port", process.env.PORT || 3000);

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.set("views", path.join(__dirname + "/public", "views"));
console.log("Path is " + path.join(__dirname + "/public", "views"));

// ************ Static file serving *******************
app.use(express.static(__dirname + "/public/assets"));
app.use(express.static(__dirname + "/qa")); // Added for qa folder, removing it wont finid test files


// ******* Erro handling throuh domains  ********
app.use(function(req, res, next){

    var domain = require('domain').create();
    domain.on('error', function(err){
        console.log('Domain error caught - > ', err.stack);
        try {
            setTimeout(function(){
                console.log('failsafe shutdown');
                process.exit(1);
            }, 5000);

            var worker=require('cluster').worker;
            if(worker) worker.disconnect();
            
            server.close();
            try {
                next(err);
                
            } catch (err) {
                console.log('Express error mechanism failed '+ err.stack);
                res.statusCode= 500;
                res.setHeader('Content-Type', 'text/plain')
                res.end('Server error');
                
            }
        } catch (err) {
            console.log('Unable to send 500 repsonse = > '+err.stack);
        }

    });
    domain.add(req);
    domain.add(res);

    domain.run(next);
});


// ************* Routes **********

app.get('/epic-fail', function(req, res){
    process.nextTick(function(){
    throw new Error('Kaboom!');
    });
    });

app.get("/", function(req, res) {
  //   res.type("text/plain"); // no longer required because of render()
  res.render("home");
});

app.use(function(req, res, next) {
  res.locals.showTests =
    app.get("env") !== "production" && req.query.test === "1";
  next();
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

// ********* The normal server running ********

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Listening on port %d.', app.get('port'));
    });