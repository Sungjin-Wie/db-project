var express = require("express");
var router = express.Router();
var connection = require("../db/mysql");
const bcrypt = require("bcrypt");
require("dotenv").config();
const salt = Number(process.env.SALT);
const crypt = (password) => bcrypt.hashSync(password, salt);
const q = require("../db/query");
const query = async (...args) =>
  args.length == 1
    ? await connection.promise().query(...args)
    : await connection.promise().query(args[0], args[1]);

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

// router.get(
//   "/test",
//   $(async (req, res, next) => {
//     await connection
//       .promise()
//       .query(
//         q.insert.PLAYER,
//         params(crypt("password1!"), "이름하야2", "tmdwls1203@test.com2")
//       );
//     res.send("created");
//   })
// );

router.get(
  "/all",
  $(async (req, res, next) => {
    console.log("/api/all");
    const sql1 = "SELECT * FROM PLAYERS WHERE 1=?;";
    const sql2 = "SELECT CHAR_ID, PLAYER_ID, CHAR_NAME FROM CHARACTERS;";
    let data = {};
    let response = await query(sql1, [1]);
    data.players = response[0];
    response = await query(sql2);
    data.characters = response[0];
    console.log(data);
    res.send(data);
  })
);

router.post(
  "/signin",
  $(async (req, res, next) => {
    console.log("/api/signin");
    console.log(req.body);
    const { email, password } = req.body;
    if (email == "") {
      // 아이디 미입력시 101 반환
      res.send("101");
    } else if (password == "") {
      // 비밀번호 미입력시 102 반환
      res.send("102");
    } else {
      let response = await query(q.select.SIGNIN_EMAIL, params(email));
      if (response[0].length === 0) {
        // 아이디가 없는 경우 103 반환
        console.log("No ID Found");
        res.send("103");
      } else {
        console.log("ID Correct");
        let cryptedPassword = response[0][0].PLAYER_PW;
        let isPasswordCorrect = await bcrypt.compare(password, cryptedPassword);
        console.log("isPasswordCorrect: ", isPasswordCorrect);
        if (!isPasswordCorrect) {
          // 비밀번호가 틀린 경우 104 반환
          res.send("104");
        } else {
          // 로그인에 성공하는 경우 로그인 정보 반환
          const data = {
            email: response[0][0].PLAYER_EMAIL,
            name: response[0][0].PLAYER_NAME,
          };
          console.log(data);
          res.send(data);
        }
      }
    }
  })
);

router.post(
  "/signup",
  $(async (req, res, next) => {
    console.log("/api/signup");
    console.log(req.body);
    const { email, password, name } = req.body;
    if (email != "" && password != "" && name != "") {
      let response = await query(q.select.SIGNUP_EMAIL, params(email));
      console.log(response[0].length);
      if (response[0].length == 1) {
        //아이디가 있는 경우 101 반환
        console.log("아이디가 존재합니다");
        res.send("101");
      } else {
        response = await query(q.select.SIGNUP_NAME, params(name));
        console.log(response[0].length);
        if (response[0].length == 1) {
          // 이름이 존재하는 경우 102 반환
          console.log("이름이 존재합니다.");
          res.send("102");
        } else {
          await query(q.insert.PLAYER, params(crypt(password), name, email));
          res.send("100");
        }
      }
    } else {
      res.send("103");
    }
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
    const [rows] = await query(q.select.RANKING);
    console.log(rows);
    res.send(rows);
  })
);

router.post(
  "/createcharacter",
  $(async (req, res, next) => {
    //유저명, 만들 캐릭터명을 받는다
    console.log("searchcharacter");
    console.log(req.body);
    const { characterName, name } = req.body;
    let [rows] = await query(q.select.CHARACTER, params(characterName));
    console.log(rows.length);
    if (rows.length === 1) {
      //이미 있는 캐릭터명일 경우 101 전송
      console.log("already exists");
      res.send("101");
    } else {
      let [rows] = await query(q.select.PLAYER_WITH_NAME, params(name));
      let id = rows[0].PLAYER_ID;
      [rows] = [];
      console.log("PLAYER_ID: ", id);
      [rows] = await query(q.select.CHARACTER_COUNT, params(name));
      console.log(`response: ${rows[0]}`);
      let count = rows[0].COUNT || 0;
      console.log("character count: ", count);
      if (rows[0].COUNT && rows[0].COUNT === 10) {
        // 캐릭터가 열개가 넘으면 생성불가, 102 전송
        res.send("102");
      } else {
        console.log("createcharacter");
        console.log(id * 10 + count, id, characterName);
        await query(
          q.insert.CHARACTER,
          params(id * 10 + count, id, characterName)
        );
        // 100 전송(생성됨)
        res.send("100");
      }
    }
  })
);

router.post(
  "/fetchcharacters",
  $(async (req, res, next) => {
    const { name } = req.body;
    console.log(name);
    let [rows] = await query(q.select.FETCH_CHARACTERS, params(name));
    console.log(rows);
    res.send(rows);
  })
);

module.exports = router;
