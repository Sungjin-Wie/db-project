module.exports = {
  select: {
    CHARACTER: `
        SELECT CHAR_NAME
        FROM CHARACTERS
        WHERE CHAR_NAME=?
        `,
    CHARACTER_COUNT: `
        SELECT COUNT(*) AS COUNT
        FROM CHARACTERS
        WHERE PLAYER_ID = (
          SELECT PLAYER_ID
          FROM PLAYERS
          WHERE PLAYER_NAME=?
          )
      `,
    RANKING: `
      SELECT CHAR_RANK, CHAR_NAME, CHAR_LV, CHAR_EXP 
      FROM (
        SELECT CHAR_NAME, CHAR_LV, CHAR_EXP, 
        @Rank := @Rank + 1 AS CHAR_RANK
        FROM CHARACTERS C, (SELECT @Rank := 0) R
        ORDER BY CHAR_LV DESC, CHAR_EXP DESC
        ) C
        `,
  },
  insert: {
    CHARACTER: `
  INSERT INTO CHARACTERS 
  (CHAR_ID, PLAYER_ID, CHAR_NAME) 
  VALUES (?, ?, ?)
  `,
    PLAYER: `
  INSERT INTO PLAYERS 
  VALUES(NULL, ?, ?, ?)
  `,
  },
};
