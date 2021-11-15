export const USER_LOGIN = "user/login";
export const USER_LOGOUT = "user/logout";

export const userLogin = (payload) => {
  return { type: USER_LOGIN, payload };
};

export const userLogout = () => {
  return { type: USER_LOGOUT };
};
