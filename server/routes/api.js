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
  connection.query(sql1 + sql2, function (error, results, fields) {
    if (error) throw error;
    console.log("results: ", results);
    res.send(JSON.stringify(results, null, 2));
  });
});

const CREATE_PLAYER_QUERY = "INSERT INTO PLAYERS VALUES(NULL, ?, ?, ?);";
const CREATE_PLAYER_PARAMS = function (PLAYER_PW, PLAYER_NAME, PLAYER_EMAIL) {
  return [PLAYER_PW, PLAYER_NAME, PLAYER_EMAIL];
};

router.get("/createplayer", function (req, res, next) {
  console.log("createplayer");
  connection.query(
    CREATE_PLAYER_QUERY,
    CREATE_PLAYER_PARAMS("passwordtest", "테스트유저2", "test@test.2"),
    function (error, results, fields) {
      if (error) throw error;
      console.log("results: ", results[0]);
      res.send(results);
    }
  );
});
// 플레이어가 존재하는지 확인하고,
// 메일이 중복이면 이미 존재하는 계정 오류를,
// 아이디가 중복이면 아이디 중복을,
// 둘 다 미해당이면 캐릭터를 생성한다.

const GET_RANKING_QUERY = `SELECT CHAR_RANK, CHAR_NAME, CHAR_LV, CHAR_EXP FROM (
  SELECT CHAR_NAME, CHAR_LV, CHAR_EXP, 
  @Rank := @Rank + 1 AS CHAR_RANK
  FROM CHARACTERS C, (SELECT @Rank := 0) R
  ORDER BY CHAR_LV DESC, CHAR_EXP DESC
  ) C`;

router.get("/ranking", function (req, res, next) {
  console.log("ranking");
  connection.query(GET_RANKING_QUERY, function (error, results, fields) {
    if (error) throw error;
    console.log("results: ", results);
    res.send(results);
  });
});

const CREATE_CHARACTER_QUERY =
  "INSERT INTO CHARACTERS (CHAR_ID, PLAYER_ID, CHAR_NAME) VALUES (?, ?, ?);";
const CREATE_CHARACTER_PARAMS = function (CHAR_ID, PLAYER_ID, CHAR_NAME) {
  return [CHAR_ID, PLAYER_ID, CHAR_NAME];
};

router.get("/createcharacter", function (req, res, next) {
  console.log("createcharacter");
  connection.query(
    CREATE_CHARACTER_QUERY,
    CREATE_CHARACTER_PARAMS(10000004, 1000000, "테스트캐릭4"),
    function (error, results, fields) {
      if (error) throw error;
      console.log("results: ", results[0]);
      res.send(results);
    }
  );
});
//캐릭터가 존재하는지를 확인하고,
// 캐릭터가 존재한다면 이미 있는 캐릭터 오류를 반환한다.
//캐릭터가 존재하지 않으면 캐릭터를 생성한다.

module.exports = router;
