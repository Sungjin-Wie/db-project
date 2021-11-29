var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var apiRouter = require("./routes/api");

var app = express();
app.all("*", (req, res, next) => {
  var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(ip);
  let protocol = req.headers["x-forwarded-proto"] || req.protocol;
  if (req.hostname == "114.205.146.154")
    res.redirect(`https://db-online.kro.kr/`);
  else if (protocol == "https") {
    next();
  } else {
    console.log(`${req.hostname}`);
    console.log(`${req.url}`);
    let from = `${protocol}://${req.hostname}${req.url}`;
    let to = `https://${req.hostname}${req.url}`;
    console.log(`[${req.method}]: ${from} -> ${to}`);
    res.redirect(to);
  }
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/build")));
const index = path.join(__dirname, "../client/build", "index.html");

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(index);
});

app.get("/sitemap.xml", (req, res, next) => {
  res.header("Content-Type", "text/xml");
  res.sendFile(path.join(__dirname, "../client/build", "sitemap.xml"));
});

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  console.log(__dirname);
  res.sendFile(index);
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
