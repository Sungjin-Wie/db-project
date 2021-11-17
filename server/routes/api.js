var express = require("express");
var router = express.Router();
var connection = require("../mysql");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/all", function (req, res, next) {
  connection.query("SELECT * FROM TEST", function (error, results, fields) {
    if (error) throw error;
    console.log("results: ", results[0]);
    res.send(results);
  });
});

module.exports = router;
