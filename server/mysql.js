require("dotenv").config();

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  multipleStatements: true
});

module.exports = connection;