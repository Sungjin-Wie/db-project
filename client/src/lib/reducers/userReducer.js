import { USER_LOGIN, USER_LOGOUT } from "../actions";

export const userState = {
  isLoggedIn: false,
  name: "",
};

const userReducer = (state = userState, action) => {
  const { type } = action;
  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        name: "승진",
      };
    case USER_LOGOUT:
      return {
        ...state,
        ...userState,
      };
    default:
      return state;
  }
};

export default userReducer;
