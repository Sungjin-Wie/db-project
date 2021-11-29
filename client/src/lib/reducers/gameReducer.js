import { GAME_MESSAGE, ERROR } from "../actions";

export const gameState = {
  currentCharacter: {},
  message: ["", "", "", "", ""],
};

const gameReducer = (state = gameState, action) => {
  const { type } = action;
  switch (type) {
    case GAME_MESSAGE: {
      const { payload } = action;
      const { message, newMessage } = payload;
      if (message[0] === "") message[0] = newMessage;
      else if (message[1] === "") message[1] = newMessage;
      else if (message[2] === "") message[2] = newMessage;
      else if (message[3] === "") message[3] = newMessage;
      else if (message[4] === "") message[4] = newMessage;
      else {
        for (let i = 0; i < 4; i++) message[i] = message[i + 1];
        message[4] = newMessage;
      }
      return {
        ...state,
        message,
      };
    }
    case ERROR:
      return {
        ...state,
        ...gameState,
      };
    default:
      return gameState;
  }
};

export default gameReducer;
