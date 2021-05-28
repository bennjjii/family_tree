var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");

var app = express();
app.use(
  cors({
    origin: [process.env.SERVER_BASE_URL],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

global.__basedir = __dirname;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/images",
  express.static(path.join(__dirname, "resources/static/assets/uploads"))
);

//should match all routes here?
app.use(indexRouter);
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("/*", (req, res) => {
  console.log("path hit");
  console.log(req.originalUrl);
  console.log(req.baseUrl);
  console.log(__dirname);
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
