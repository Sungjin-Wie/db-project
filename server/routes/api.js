var express = require("express");
var router = express.Router();
var connection = require("../db/mysql");
const bcrypt = require("bcrypt");
require("dotenv").config();
const salt = Number(process.env.SALT);
const crypt = (password) => bcrypt.hashSync(password, salt);
const q = require("../db/query");
const query = async (...args) => await connection.promise().query(...args);

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
//   "/initMobs",
//   $(async (req, res, next) => {
//     const mobs = [
//       params(0, "달팽이", 8, 2, 1, 3, 1000, 40),
//       params(1, "슬라임", 20, 4, 3, 7, 1001, 40),
//       params(2, "버섯", 40, 10, 5, 10, 1002, 40),
//     ];
//     await Promise.all(mobs.map((param) => query(q.insert.MOB, param)));
//     console.log("finished");
//     res.send("finished");
//   })
// );

// router.get(
//   "/initItem",
//   $(async (req, res, next) => {
//     const items = [
//       params(1000, "달팽이 껍질", 5),
//       params(1001, "슬라임의 방울", 10),
//       params(1002, "버섯의 갓", 20),
//       params(2000, "HP 회복물약", 10),
//       params(2001, "MP 회복물약", 20),
//     ];
//     await Promise.all(items.map((param) => query(q.insert.ITEM, param)));
//     console.log("finished");
//     res.send("finished");
//   })
// );

// router.get(
//   "/initInven",
//   $(async (req, res, next) => {
//     const items = [
//       params(10000040, 1000, "달팽이 껍질", 3),
//       params(10000040, 1001, "슬라임의 방울", 4),
//       params(10000040, 1002, "버섯의 갓", 2),
//       params(10000040, 2000, "HP 회복물약", 4),
//       params(10000040, 2001, "MP 회복물약", 5),
//     ];
//     await Promise.all(items.map((param) => query(q.insert.INVENTORY, param)));
//     console.log("finished");
//     res.send("finished");
//   })
// );

router.get(
  "/mobs",
  $(async (req, res, next) => {
    let [rows] = await query(q.select.MOBS);
    console.log(rows);
    res.send(rows);
  })
);

router.post(
  "/postbattle",
  $(async (req, res, next) => {
    console.log(req.body);
    let {
      CHAR_ID,
      CHAR_NAME,
      CHAR_CUR_HP,
      CHAR_HP,
      CHAR_CUR_MP,
      CHAR_MP,
      CHAR_CUR_EXP,
      CHAR_EXP,
      CHAR_ATK,
      CHAR_DEF,
      CHAR_LV,
      MOB_EXP,
      ITEM_ID,
      loot,
    } = req.body;

    let postCharacter = {
      CHAR_ID,
      CHAR_NAME,
      CHAR_CUR_HP,
      CHAR_HP,
      CHAR_CUR_MP,
      CHAR_MP,
      CHAR_CUR_EXP,
      CHAR_EXP,
      CHAR_ATK,
      CHAR_DEF,
      CHAR_LV,
    };
    let [rows] = await query(q.select.INVENTORY, params(CHAR_ID));
    console.log(rows);
    let inventory = rows;

    if (loot) {
      // loot가 true일시 인벤토리 업데이트 쿼리문 실행
      console.log(rows.length);
      let idx = -1;
      for (const item in inventory)
        if (ITEM_ID == inventory[item].ITEM_ID) {
          idx = item;
          break;
        }

      console.log(idx);
      //idx가 0 이상이면 update, -1이면 새로 삽입
      if (idx >= 0) {
        let qty = inventory[idx].ITEM_QTY + 1;
        inventory[idx].ITEM_QTY = qty;
        await query(q.update.ITEM, params(qty, CHAR_ID, ITEM_ID));
      } else {
        let qty = 1;
        let [rows] = await query(q.select.ITEM, params(ITEM_ID));
        console.log(rows);
        let ITEM_NAME = rows[0].ITEM_NAME;
        await query(
          q.insert.INVENTORY,
          params(CHAR_ID, ITEM_ID, ITEM_NAME, qty)
        );
        [rows] = await query(q.select.INVENTORY, params(CHAR_ID));
        inventory = rows;
      }
    }

    let POST_EXP = CHAR_CUR_EXP + MOB_EXP;
    if (POST_EXP >= CHAR_EXP) {
      // 레벨업 구현 - 레벨업시 HP/MP 회복 및 스탯 증가
      await query(
        q.update.LEVEL_UP,
        params(
          CHAR_HP + 5,
          CHAR_HP + 5,
          CHAR_MP + 1,
          CHAR_MP + 1,
          POST_EXP - CHAR_EXP,
          CHAR_EXP + 10,
          CHAR_LV + 1,
          CHAR_ATK + 1,
          CHAR_DEF + 1,
          CHAR_ID
        )
      );
      let currentCharacter = {
        ...postCharacter,
        CHAR_CUR_HP: CHAR_HP + 5,
        CHAR_HP: CHAR_HP + 5,
        CHAR_CUR_MP: CHAR_MP + 1,
        CHAR_MP: CHAR_MP + 1,
        CHAR_CUR_EXP: POST_EXP - CHAR_EXP,
        CHAR_EXP: CHAR_EXP + 10,
        CHAR_ATK: CHAR_ATK + 1,
        CHAR_DEF: CHAR_DEF + 1,
        CHAR_LV: CHAR_LV + 1,
      };
      console.log(currentCharacter);
      res.send({ currentCharacter, inventory });
    } else {
      // POST_BATTLE 쿼리문
      await query(
        q.update.POST_BATTLE,
        params(CHAR_CUR_HP, CHAR_CUR_MP, POST_EXP, CHAR_ID)
      );
      let currentCharacter = {
        ...postCharacter,
        CHAR_CUR_EXP: CHAR_CUR_EXP + MOB_EXP,
      };
      res.send({ currentCharacter, inventory });
    }
  })
);

router.get(
  "/items",
  $(async (req, res, next) => {
    let [rows] = await query(q.select.ITEMS);
    console.log(rows);
    res.send(rows);
  })
);
router.get(
  "/item",
  $(async (req, res, next) => {
    let id = req.query.id;
    console.log(id);
    let [rows] = await query(q.select.ITEM, params(id));
    console.log(rows);
    res.send(rows);
  })
);

router.get(
  "/trade",
  $(async (req, res, next) => {
    let { id, qty, action, value, char } = req.query;
    //sell, buy에 따라 다르게
    if (action == "sell") {
      // 캐릭터 자금 업데이트
      let [rows] = await query(q.select.CHAR_WITH_ID, params(char));
      console.log(rows[0]);
      let money = Number(rows[0].CHAR_MONEY) + value;
      let currentCharacter = { ...rows[0], CHAR_MONEY: money };
      console.log(currentCharacter);
      // 인벤토리 수량 업데이트
      res.send(currentCharacter);
    } else {
      // 캐릭터 자금 업데이트
      // 인벤토리 수량 업데이트
    }
  })
);

router.get(
  "/playerInfo",
  $(async (req, res, next) => {
    let CHAR_ID = req.query.id;
    console.log(CHAR_ID);
    let [rows] = await query(q.select.INVENTORY, params(CHAR_ID));
    let data = { inventory: rows };
    console.log(data);
    res.send(data);
  })
);

router.get(
  "/all",
  $(async (req, res, next) => {
    console.log("/api/all");
    let [rows] = await query(q.select.RANKING);
    console.log(rows);
    res.send(rows);
  })
);

router.post(
  "/signin",
  $(async (req, res, next) => {
    console.log("/api/signin");
    console.log(req.body.email);
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
    console.log(rows.length);
    res.send(rows);
  })
);
router.get(
  "/myranking",
  $(async (req, res, next) => {
    const name = req.query.name;
    console.log(name);
    console.log("myranking");
    let [rows] = await query(q.select.PLAYER_WITH_NAME, params(name));
    let id = rows[0].PLAYER_ID;
    console.log(`id=${id}`);
    [rows] = [];
    [rows] = await query(q.select.PLAYER_RANKING, params(id));
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
    var getTextLength = function (str) {
      var len = 0;
      for (var i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length == 6) {
          len++;
        }
        len++;
      }
      return len;
    };
    if (getTextLength(characterName) > 12) {
      //닉네임이 너무 긴 경우
      res.send("103");
    } else {
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
    }
  })
);

router.post(
  "/fetchcharacters",
  $(async (req, res, next) => {
    const { name } = req.body;
    console.log(name);
    let [rows] = await query(q.select.FETCH_CHARACTERS, params(name));
    console.log(rows.length);
    res.send(rows);
  })
);

router.post(
  "/deletecharacter",
  $(async (req, res, next) => {
    const { id } = req.body;
    await query(q.delete.CHARACTER, params(id));
    let PLAYER_ID = Math.floor(id / 10);
    console.log(`id: ${PLAYER_ID}`);
    let response = await query(
      q.select.FETCH_CHARACTERS_IN_RANK,
      params(PLAYER_ID)
    );
    console.log(response[0]);
    await Promise.all(
      response[0].map((char) => {
        const { CHAR_ID, CHAR_NAME, CHAR_RANK } = char;
        console.log(CHAR_ID, CHAR_NAME, CHAR_RANK);
        return query(
          q.update.SORT_AFTER_DELETE,
          params(PLAYER_ID * 10 + CHAR_RANK, CHAR_NAME)
        );
      })
    );
    res.send("100");
  })
);

module.exports = router;
