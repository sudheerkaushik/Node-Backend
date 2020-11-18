var express = require("express"),
  app = express(),
  path = require("path"),
  handlebars = require("express-handlebars"),
  formidale = require("formidable"),
  jqupload = require("jquery-file-upload-middleware"),
  credentials = require("./public/assets/credentials"),
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session");


  // ******* Persistance file system using FileStorage *********

  // ******** Session management ********
app.use(require("body-parser")());
app.use(cookieParser(credentials.cookieSecret));
app.use(expressSession({ secret: credentials.cookieSecret }));
app.set("port", process.env.PORT || 3000);

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.set("views", path.join(__dirname + "/public", "views"));
console.log("Path is " + path.join(__dirname + "/public", "views"));

app.use(express.static(__dirname + "/public/assets"));
app.use(express.static(__dirname + "/qa")); // Added for qa folder, removing it wont finid test files

// ******** Flash message using Express Session *********
app.use(function(req, res, next) {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

// ******** Routes *********
app.get("/", function(req, res) {
  //   res.type("text/plain"); // no longer required because of render()
  res.render("home");
  res.clearCookie("username");
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

// var obj = {
//   currency: {
//   name: 'United States dollars',
//   abbrev: 'USD',
//   },
//   tours: [
//   { name: 'Hood River', price: '$99.95' },
//   { name: 'Oregon Coast', price, '$159.95' }
//   ],
//   specialsUrl: '/january-specials',
//   currencies: [ 'USD', 'GBP', 'BTC' ],
//   }
app.get("/tours", function(req, res) {
  res.render("tour", { tourPack: obj });
});
app.get("/tours/request-group-rate", function(req, res) {
  res.render("tours/request-group-rate");
});

// ************ Get Weather data **************

/* function getWeatherData() {
  return {
    locations: [
      {
        name: "Portland",
        forecastUrl: "http://www.wunderground.com/US/OR/Portland.html",
        iconUrl: "http://icons-ak.wxug.com/i/c/k/cloudy.gif",
        weather: "Overcast",
        temp: "54.1 F (12.3 C)"
      },
      {
        name: "Bend",
        forecastUrl: "http://www.wunderground.com/US/OR/Bend.html",
        iconUrl: "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
        weather: "Partly Cloudy",
        temp: "55.0 F (12.8 C)"
      },
      {
        name: "Manzanita",
        forecastUrl: "http://www.wunderground.com/US/OR/Manzanita.html",
        iconUrl: "http://icons-ak.wxug.com/i/c/k/rain.gif",
        weather: "Light Rain",
        temp: "55.0 F (12.8 C)"
      }
    ]
  };
}
app.use(function(req, res, next) {
  if (!res.locals.partials) res.locals.partials = {};
  res.locals.partials.weather = getWeatherData();
  next();
}); */

// ************ Form Handling ***************

app.get("/newsletters", function(req, res) {
  res.render("newsletters", { csrf: "XXX2534332" });
});

app.post("/newsletters", function(req, res) {
  res.render("newsletters", { csrf: "XXX2534332" });
  // *** Flash using sessoin starts
  var name = req.body.name || "",
    email = req.body.email || "";
  if (!email.match("/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/")) {
    if (req.xhr) return res.json({ error: "Invalid email entered" });
    req.session.flash = {
      //use `res.locals` if you do wish to show flash on same page
      type: "danger",
      intro: "Invalid email",
      message: "Enter correct email"
    };
    res.redirect(303, "/notfound");
  }
  // var NewsLetterSignup = req.session;
  req = new NewsLetterSignup({ name: name, email: email }).save(function(err) {
    if (err) {
      if (req.xhr) return res.json({ error: "Database error" });
      req.session.flash = {
        type: "danger",
        intro: "Database error",
        message: "Failed to subscribe to Database"
      };
    }
    if (req.xhr) return res.json({ success: true });
    req.session.flash = {
      type: "Success",
      intro: "Newsletters Subscribes",
      message: "You are subscribed to newsletters"
    };
    return res.redirect(303, "/thankyou");
  });
});

app.get("/newslettersAjax", function(req, res) {
  res.render("newslettersAjax", { csrf: "XXX2534332" });
});

app.post("/process", function(req, res) {
  console.log("\n\nForm (from querystring): " + req.query.form);
  console.log("CSRF token (from hidden form field): " + req.body._csrf);
  console.log("Name (from visible form field): " + req.body.name);
  console.log("Email (from visible form field): " + req.body.email);
  res.redirect(303, "/thankyou");
});

app.post("/processAjax", function(req, res) {
  if (req.xhr || req.accepts("json,html") === "json") {
    // if there were an error, we would send { error: 'error description' }
    res.send({ success: true });
  } else {
    // if there were an error, we would redirect to an error page
    res.redirect(303, "/thankyou");
  }
});

//                 ****** File upload *****
app.get("/contest/vacation-photo", function(req, res) {
  var date = new Date();
  res.render("contest/vacation-photo", {
    year: date.getFullYear(),
    month: date.getMonth()
  });
});

app.post("/contest/vacation-photo/:year/:month", function(req, res) {
  var form = new formidale.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (err) res.redirect(303, "/notfound");
    console.log("\nFields are ");
    console.log(fields);
    console.log("\nFiles are ");
    console.log(files);
    res.redirect(303, "/thankyou");
  });
});
app.get("/fileUpload", function(req, res) {
  res.render("fileUpload");
});

app.use("/upload", function(req, res, next) {
  var date = new Date();
  jqupload.fileHandler({
    uploadDir: function() {
      return __dirname + "/public/uploads/" + date;
    },
    uploadUrl: function() {
      return "/uploads/" + date;
    }
  })(req, res, next);
});

// ************ Coookies ********************

app.get("/login", function(req, res) {
  //   res.type("text/plain"); // no longer required because of render()
  res.render("login", { layout: "loginLayout" });
  res.cookie("username", "ironman");
});

// ************ error pages ********************

app.get("/thankyou", function(req, res) {
  res.render("thankyou");
});

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


app.listen(app.get("port"), function() {
  console.log(credentials.cookieSecret);
  console.log(
    "app started on " +
      app.get("env") +
      " " +
      app.get("port") +
      " press C to terminate"
  );
});
