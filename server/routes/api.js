var express = require("express");
var router = express.Router();
var connection = require("../db/mysql");
const q = require("../db/query");
const $ = (asyncFn) => async (req, res, next) =>
  await asyncFn(req, res, next).catch(next);
const params = (...params) => [...params];

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
    const sql1 = "SELECT * FROM PLAYERS ";
    const sql2 = "SELECT CHAR_ID, PLAYER_ID, CHAR_NAME FROM CHARACTERS ";
    let data = {};
    let response = await connection.promise().query(sql1);
    data.players = response[0];
    response = await connection.promise().query(sql2);
    data.characters = response[0];
    console.log(data);
    res.send(data);
  })
);

router.get(
  "/createplayer",
  $(async (req, res, next) => {
    console.log("/api/createplayer");
    // await connection
    //   .promise()
    //   .query(
    //     q.insert.PLAYER,
    //     params("passwordtest", "테스트유저2", "test@test.2")
    //   );
    res.send("foo");
  })
);
// 플레이어가 존재하는지 확인하고,
// 메일이 중복이면 이미 존재하는 계정 오류를,
// 아이디가 중복이면 아이디 중복을,
// 둘 다 미해당이면 캐릭터를 생성한다.

router.get(
  "/ranking",
  $(async (req, res, next) => {
    console.log("ranking");
    const [rows] = await connection.promise().query(q.select.RANKING);
    console.log(rows);
    res.send(rows);
  })
);

router.get(
  "/createcharacter",
  $(async (req, res, next) => {
    //유저명, 만들 캐릭터명을 받는다
    console.log("searchcharacter");
    let [rows] = await connection
      .promise()
      .query(q.select.CHARACTER, params("fdas"));
    console.log(rows.length);
    if (rows.length === 1) {
      //이미 있는 캐릭터명일 경우
      console.log("already exists");
      res.send("exists");
    } else {
      let [rows] = await connection
        .promise()
        .query(q.select.CHARACTER_COUNT, params("테스트유저1"));
      if (rows[0].COUNT === 10) {
        // 캐릭터가 열개가 넘으면 생성불가
        res.send("cannot create characters anymore");
      } else {
        console.log("createcharacter");
        await connection
          .promise()
          .query(
            q.insert.CHARACTER,
            params(10000005, 1000000, "테스트캐릭타")
          );
        res.send("created");
      }
    }
  })
);

module.exports = router;
