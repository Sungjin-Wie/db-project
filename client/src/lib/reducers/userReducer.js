import { USER_LOGIN, USER_LOGOUT, USER_SIGNUP, ERROR } from "../actions";

export const userState = {
  isLoggedIn: false,
  name: "",
  email: "",
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
    case ERROR:
      return state;
    default:
      return state;
  }
};

export default userReducer;
