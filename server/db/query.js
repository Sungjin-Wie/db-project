module.exports.update = {
  SORT_AFTER_DELETE: `
  UPDATE CHARACTERS
  SET CHAR_ID=?
  WHERE CHAR_NAME=?
  `,
};

module.exports.delete = {
  CHARACTER: `
  DELETE FROM CHARACTERS
  WHERE CHAR_ID = ?;
  `,
};

module.exports.insert = {
  CHARACTER: `
  INSERT INTO CHARACTERS 
  (CHAR_ID, PLAYER_ID, CHAR_NAME) 
  VALUES (?, ?, ?);
  `,
  PLAYER: `
  INSERT INTO PLAYERS 
  VALUES(NULL, ?, ?, ?);
  `,
  ITEM: `
  INSERT INTO ITEMS VALUES(?, ?, ?);
  `,
  MOB: `
  INSERT INTO MOBS
  VALUES(?, ?, ?, ?, ?, ?, ?, ?);
  `,
  INVENTORY: `
  INSERT INTO INVENTORY
  VALUES(?, ?, ?, ?);
  `,
};

module.exports.select = {
  PLAYER_WITH_NAME: `
  SELECT PLAYER_ID
  FROM PLAYERS
  WHERE PLAYER_NAME=?
  `,
  CHARACTER: `
  SELECT CHAR_NAME
  FROM CHARACTERS
  WHERE CHAR_NAME=?;
    `,
  CHARACTER_COUNT: `
  SELECT COUNT(*) AS COUNT
  FROM CHARACTERS
  WHERE PLAYER_ID = (
    SELECT PLAYER_ID
    FROM PLAYERS
    WHERE PLAYER_NAME=?
    );
    `,
  RANKING: `
  SELECT CHAR_RANK, CHAR_NAME, CHAR_LV, CHAR_EXP, CHAR_CUR_EXP 
  FROM (
    SELECT CHAR_NAME, CHAR_LV, CHAR_EXP, CHAR_CUR_EXP,
    @Rank := @Rank + 1 AS CHAR_RANK
    FROM CHARACTERS C, (SELECT @Rank := 0) R
    ORDER BY CHAR_LV DESC, CHAR_EXP DESC
    ) C
  WHERE CHAR_RANK <= 100;
  `,
  PLAYER_RANKING: `
  SELECT CHAR_RANK, CHAR_NAME, CHAR_LV, CHAR_EXP, CHAR_CUR_EXP , PLAYER_ID
  FROM (
    SELECT CHAR_NAME, CHAR_LV, CHAR_EXP, CHAR_CUR_EXP, PLAYER_ID,
    @Rank := @Rank + 1 AS CHAR_RANK
    FROM CHARACTERS C, (SELECT @Rank := 0) R
    ORDER BY CHAR_LV DESC, CHAR_EXP DESC
    ) C
  WHERE PLAYER_ID=?;
  `,
  SIGNIN_EMAIL: `
  SELECT * FROM (
    SELECT * FROM PLAYERS
    WHERE 1=1 AND
    PLAYER_EMAIL=?
  ) P;
  `,
  SIGNUP_EMAIL: `
  SELECT * FROM (
    SELECT * FROM PLAYERS
    WHERE 1=1 AND
    PLAYER_EMAIL=?
  ) P;
  `,
  SIGNUP_NAME: `
  SELECT * FROM (
    SELECT * FROM PLAYERS
    WHERE 1=1 AND
    PLAYER_NAME=?
    ) P;
  `,
  FETCH_CHARACTERS: `
  SELECT * FROM CHARACTERS
  WHERE PLAYER_ID=(
    SELECT PLAYER_ID FROM PLAYERS
    WHERE PLAYER_NAME=?
  );
  `,
  FETCH_CHARACTERS_IN_RANK: `
  SELECT CHAR_ID, CHAR_NAME,     
  @Rank := @Rank + 1 AS CHAR_RANK
  FROM CHARACTERS C, (SELECT @Rank := -1) R  
  WHERE PLAYER_ID=?   
  ORDER BY CHAR_ID ASC;
  `,
  INVENTORY: `
  SELECT ITEM_ID, ITEM_NAME, ITEM_QTY
  FROM INVENTORY
  WHERE CHAR_ID=?;
  `,
  MOBS: `
  SELECT *
  FROM MOBS;
  `,
  ITEMS: `
  SELECT *
  FROM ITEMS;
  `,
};
