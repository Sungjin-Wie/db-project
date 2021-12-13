import {
  GAME_MESSAGE,
  GAME_SET_LOCATION,
  GAME_BATTLE_START,
  ERROR,
  FETCH_CHARACTER_DATA,
  GAME_BATTLE_TURN_POST,
  POST_BATTLE_CHARACTER,
  POST_SELL,
} from "../actions";

export const gameState = {
  currentCharacter: {},
  inventory: [],
  message: ["", "", "", "", ""],
  location: ["마을", "사냥터", "상점", "전투", "여관"],
  currentLoc: 0,
  mobs: [],
  items: [],
  currentBattleMob: {},
};

const gameReducer = (state = gameState, action) => {
  const { type } = action;
  switch (type) {
    case GAME_MESSAGE: {
      const { payload } = action;
      const { newMessage } = payload;
      const { message } = state;
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
    case GAME_SET_LOCATION: {
      const { payload } = action;
      return {
        ...state,
        currentLoc: payload,
      };
    }
    case FETCH_CHARACTER_DATA: {
      const { payload } = action;
      const { stats, inventory, mobs, items } = payload;
      let returnState = { ...state };
      if (inventory !== undefined) returnState = { ...state, ...inventory };
      if (stats !== undefined)
        returnState = { ...returnState, stats, currentCharacter: { ...stats } };
      returnState = {
        ...returnState,
        mobs,
        message: ["DB온라인을 시작합니다.", "", "", "", ""],
        currentLoc: 0,
        items,
      };
      return returnState;
    }
    case GAME_BATTLE_START: {
      const { payload } = action;
      return {
        ...state,
        currentBattleMob: payload,
      };
    }
    case GAME_BATTLE_TURN_POST: {
      const { currentCharacter, currentBattleMob } = action.payload;
      return {
        ...state,
        currentCharacter,
        currentBattleMob,
      };
    }
    case POST_BATTLE_CHARACTER: {
      let { currentCharacter, inventory } = action.payload;
      return {
        ...state,
        currentCharacter: { ...state.currentCharacter, ...currentCharacter },
        stats: { ...state.currentCharacter, ...currentCharacter },
        inventory,
      };
    }
    case POST_SELL: {
      let { currentCharacter } = action.payload;
      return {
        ...state,
        currentCharacter: { ...state.currentCharacter, ...currentCharacter },
        stats: { ...state.currentCharacter, ...currentCharacter },
      };
    }
    case ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default gameReducer;
