var express = require("express");
var router = express.Router();
var connection = require("../mysql");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/all", function (req, res, next) {
  console.log("selectall");
  const sql1 = "SELECT * FROM PLAYERS; ";
  const sql2 = "SELECT CHAR_ID, PLAYER_ID, CHAR_NAME FROM CHARACTERS; ";
  connection.query(
    sql1 + sql2,
    function (error, results, fields) {
      if (error) throw error;
      console.log("results: ", results);
      res.send(JSON.stringify(results, null, 2));
    }
  );
});

router.get("/player", function (req, res, next) {
  console.log("createplayer");
  connection.query(
    'INSERT INTO PLAYERS VALUES(NULL, "password", "테스트유저1", "test@test.com")',
    function (error, results, fields) {
      if (error) throw error;
      console.log("results: ", results[0]);
      res.send(results);
    }
  );
});

router.get("/char", function (req, res, next) {
  console.log("createcharacter");
  connection.query(
    'INSERT INTO CHARACTERS (CHAR_ID, PLAYER_ID, CHAR_NAME) VALUES(10000002, 1000000, "테스트캐릭3")',
    function (error, results, fields) {
      if (error) throw error;
      console.log("results: ", results[0]);
      res.send(results);
    }
  );
});

// router.get("/createinventory", function (req, res, next) {
//   connection.query(
//     'INSERT INTO INVENTORY VALUES(10000000, 1000000, "테스트캐릭터", "test@test.com")',
//     function (error, results, fields) {
//       if (error) throw error;
//       console.log("results: ", results[0]);
//       res.send(results);
//     }
//   );
// });

module.exports = router;
