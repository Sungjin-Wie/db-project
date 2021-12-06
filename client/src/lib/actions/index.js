import api from "../api";

export const USER_LOGIN = "user/login";
export const USER_LOGOUT = "user/logout";
export const USER_SIGNUP = "user/signup";
export const FETCH_CHARACTERS = "user/fetchCharacters";
export const SELECT_CHARACTER = "user/selectCharacter";

export const ERROR = "error";

export const SET_LOADING = "global/setLoading";
export const SET_LOADING_COMPLETE = "global/setLoadingComplete";

export const FETCH_CHARACTER_DATA = "game/fetchCharData";
export const GAME_MESSAGE = "game/message";
export const GAME_SET_LOCATION = "game/setLocation";

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
      case 103: {
        alert("정보를 전부 입력해주세요.");
        return dispatch({ type: ERROR });
      }
      default:
        return dispatch({ type: ERROR });
    }
  } catch (e) {
    console.log(e);
  }
};

export const userLogout = (navigate) => async (dispatch) => {
  alert("로그아웃되었습니다.");
  navigate("/");
  return dispatch({ type: USER_LOGOUT });
};

export const createCharacter =
  ({ characterName, name, navigate }) =>
  async (dispatch) => {
    console.log(characterName, name);
    if (characterName == "") {
      alert("캐릭터 이름을 입력해주세요.");
      return dispatch({ type: ERROR });
    } else {
      dispatch(setLoading());
      const res = await api.call.post("/createcharacter", {
        characterName,
        name,
      });
      console.log(res.data);
      dispatch(setLoadingComplete());
      switch (res.data) {
        case 100:
          alert("생성되었습니다.");
          return dispatch(fetchCharacters(name));
        case 101:
          alert("이미 존재하는 캐릭터명입니다.");
          return dispatch({ type: ERROR });
        case 102:
          alert("캐릭터는 10개까지 생성 가능합니다.");
          return dispatch({ type: ERROR });
        default:
          return dispatch({ type: ERROR });
      }
    }
  };

export const userGameStart = (char, navigate) => async (dispatch) => {
  console.log(char);
  let res = await api.call.get("/playerInfo", { params: { id: char.CHAR_ID } });
  console.log(res.data);
  let payload = { stats: { ...char }, inventory: { ...res.data } };
  res = await api.call.get("/mobs");
  console.log(res.data);
  payload = { ...payload, mobs: res.data };
  res = await api.call.get("/items");
  console.log(res.data);
  payload = { ...payload, items: res.data };
  dispatch({
    type: FETCH_CHARACTER_DATA,
    payload,
  });
  alert(`${char.CHAR_NAME}님, DB온라인에 접속합니다.`);
  navigate("/game");
  return dispatch({ type: SELECT_CHARACTER, payload: { ...char } });
};

// export const fetchCharData = (CHAR_ID) => async (dispatch) => {
//   console.log(CHAR_ID);
//   const res = await api.call.get("/playerInfo", { params: { id: CHAR_ID } });
//   console.log(res);
//   return dispatch({ type: FETCH_CHARACTER_DATA, payload: { ...res.data } });
// };

export const addGameMessage = (newMessage) => {
  return { type: GAME_MESSAGE, payload: { newMessage } };
};

export const setLocation = (location, message) => (dispatch) => {
  dispatch(addGameMessage(message));
  return dispatch({ type: GAME_SET_LOCATION, payload: location });
};

export const fetchCharacters = (name) => async (dispatch) => {
  console.log(name);
  const res = await api.call.post("/fetchcharacters", { name });
  console.log(res.data);
  return dispatch({ type: FETCH_CHARACTERS, payload: res.data });
};

export const deleteCharacter = (CHAR_ID, name) => async (dispatch) => {
  dispatch(setLoading());
  await api.call.post("/deletecharacter", { id: CHAR_ID });
  alert("캐릭터가 삭제되었습니다.");
  dispatch(setLoadingComplete());
  return dispatch(fetchCharacters(name));
};

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const setLoadingComplete = () => {
  return { type: SET_LOADING_COMPLETE };
};
