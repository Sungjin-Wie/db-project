import api from "../api";

export const USER_LOGIN = "user/login";
export const USER_LOGOUT = "user/logout";
export const USER_SIGNUP = "user/signup";

export const ERROR = "error";

export const SET_LOADING = "global/setLoading";
export const SET_LOADING_COMPLETE = "global/setLoadingComplete";

export const userLogin = (payload) => async (dispatch) => {
  let res;
  try {
    console.log(payload);
    const { email, password, navigate } = payload;
    dispatch(setLoading());
    res = await api.call.post("/signin", { email, password });
    dispatch(setLoadingComplete());
    console.log(res.data);
    switch (res.data) {
      case 101: {
        alert("아이디를 입력해주세요.");
        return dispatch({ type: ERROR });
      }
      case 102: {
        alert("비밀번호를 입력해주세요.");
        return dispatch({ type: ERROR });
      }
      case 103: {
        alert("존재하지 않는 아이디입니다.");
        return dispatch({ type: ERROR });
      }
      case 104: {
        alert("비밀번호가 틀렸습니다.");
        return dispatch({ type: ERROR });
      }
      default: {
        alert("환영합니다.");
        navigate("/");
        return dispatch({ type: USER_LOGIN, payload: { ...res.data } });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const userSignUp = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    const { email, password, name, navigate } = payload;
    dispatch(setLoading());
    const res = await api.call.post("/signup", { email, password, name });
    console.log(res);
    dispatch(setLoadingComplete());
    switch (res.data) {
      case 100: {
        alert("회원가입이 완료되었습니다.");
        navigate("/");
        return dispatch({ type: USER_SIGNUP });
      }
      case 101: {
        alert("아이디가 이미 존재합니다.");
        return dispatch({ type: ERROR });
      }
      case 102: {
        alert("이름이 이미 존재합니다.");
        return dispatch({ type: ERROR });
      }
      default:
        return dispatch({ type: ERROR });
    }
  } catch (e) {
    console.log(e);
  }
};

export const userLogout = () => {
  return { type: USER_LOGOUT };
};

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const setLoadingComplete = () => {
  return { type: SET_LOADING_COMPLETE };
};
