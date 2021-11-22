module.exports = {
  select: {
    CHARACTER: (CHAR_NAME) => [CHAR_NAME],
    PLAYER: (PLAYER_NAME) => [PLAYER_NAME],
    CHARACTER_COUNT: (PLAYER_NAME) => [PLAYER_NAME],
  },
  insert: {
    CHARACTER: (CHAR_ID, PLAYER_ID, CHAR_NAME) => [
      CHAR_ID,
      PLAYER_ID,
      CHAR_NAME,
    ],
    PLAYER: (PLAYER_PW, PLAYER_NAME, PLAYER_EMAIL) => [
      PLAYER_PW,
      PLAYER_NAME,
      PLAYER_EMAIL,
    ],
  },
};
