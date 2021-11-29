import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGNUP,
  FETCH_CHARACTERS,
  SELECT_CHARACTER,
  ERROR,
} from "../actions";

export const userState = {
  isLoggedIn: false,
  name: "",
  email: "",
  characters: [],
  currentCharacter: {},
  message: ["", "", "", "", ""],
};

const userReducer = (state = userState, action) => {
  console.log(action);
  const { type } = action;
  switch (type) {
    case USER_LOGIN: {
      const { payload } = action;
      return {
        ...state,
        isLoggedIn: true,
        name: payload.name,
        email: payload.email,
      };
    }
    case USER_LOGOUT:
      return {
        ...state,
        ...userState,
      };
    case USER_SIGNUP:
      return { ...userState };
    case FETCH_CHARACTERS: {
      const { payload } = action;
      return {
        ...state,
        characters: payload,
      };
    }
    case SELECT_CHARACTER: {
      const { payload } = action;
      return {
        ...state,
        currentCharacter: payload,
      };
    }
    case ERROR:
      return state;
    default:
      return state;
  }
};

export default userReducer;
