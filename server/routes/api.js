var express = require("express");
var router = express.Router();
var connection = require("../mysql");
const $ = (asyncFn) => async (req, res, next) =>
  await asyncFn(req, res, next).catch(next);

/* GET users listing. */
router.get(
  "/",
  $(async (req, res, next) => {
    res.send("respond with a resource");
  })
);

router.get(
  "/all",
  $(async (req, res, next) => {
    console.log("/api/all");
    const sql1 = "SELECT * FROM PLAYERS; ";
    const sql2 = "SELECT CHAR_ID, PLAYER_ID, CHAR_NAME FROM CHARACTERS; ";
    const [rows] = await connection.promise().query(sql1 + sql2);
    console.log(rows);
    res.send(rows);
  })
);

const CREATE_PLAYER_QUERY = "INSERT INTO PLAYERS VALUES(NULL, ?, ?, ?);";
const CREATE_PLAYER_PARAMS = function (PLAYER_PW, PLAYER_NAME, PLAYER_EMAIL) {
  return [PLAYER_PW, PLAYER_NAME, PLAYER_EMAIL];
};

router.get(
  "/createplayer",
  $(async (req, res, next) => {
    console.log("/api/createplayer");
    await connection
      .promise()
      .query(
        CREATE_PLAYER_QUERY,
        CREATE_PLAYER_PARAMS("passwordtest", "테스트유저2", "test@test.2")
      );
    res.send("foo");
  })
);
// 플레이어가 존재하는지 확인하고,
// 메일이 중복이면 이미 존재하는 계정 오류를,
// 아이디가 중복이면 아이디 중복을,
// 둘 다 미해당이면 캐릭터를 생성한다.

const GET_RANKING_QUERY = `
SELECT CHAR_RANK, CHAR_NAME, CHAR_LV, CHAR_EXP 
FROM (
  SELECT CHAR_NAME, CHAR_LV, CHAR_EXP, 
  @Rank := @Rank + 1 AS CHAR_RANK
  FROM CHARACTERS C, (SELECT @Rank := 0) R
  ORDER BY CHAR_LV DESC, CHAR_EXP DESC
  ) C`;

router.get(
  "/ranking",
  $(async (req, res, next) => {
    console.log("ranking");
    const [rows] = await connection.promise().query(GET_RANKING_QUERY);
    console.log(rows);
    res.send(rows);
  })
);

const CREATE_CHARACTER_QUERY =
  "INSERT INTO CHARACTERS (CHAR_ID, PLAYER_ID, CHAR_NAME) VALUES (?, ?, ?);";
const CREATE_CHARACTER_PARAMS = function (CHAR_ID, PLAYER_ID, CHAR_NAME) {
  return [CHAR_ID, PLAYER_ID, CHAR_NAME];
};

router.get(
  "/createcharacter",
  $(async (req, res, next) => {
    console.log("createcharacter");
    await connection
      .promise()
      .query(
        CREATE_CHARACTER_QUERY,
        CREATE_CHARACTER_PARAMS(10000004, 1000000, "테스트캐릭4")
      );
    res.send("fooooo");
  })
);
//캐릭터가 존재하는지를 확인하고,
// 캐릭터가 존재한다면 이미 있는 캐릭터 오류를 반환한다.
//캐릭터가 존재하지 않으면 캐릭터를 생성한다.

module.exports = router;
