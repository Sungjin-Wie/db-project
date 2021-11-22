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
};

module.exports.select = {
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
    SELECT CHAR_RANK, CHAR_NAME, CHAR_LV, CHAR_EXP 
    FROM (
      SELECT CHAR_NAME, CHAR_LV, CHAR_EXP, 
      @Rank := @Rank + 1 AS CHAR_RANK
      FROM CHARACTERS C, (SELECT @Rank := 0) R
      ORDER BY CHAR_LV DESC, CHAR_EXP DESC
      ) C;
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
};
