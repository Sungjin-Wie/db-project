import { fabClasses } from "@mui/material";
import api from "../api";

export const USER_LOGIN = "user/login";
export const USER_LOGOUT = "user/logout";
export const USER_SIGNUP = "user/signup";
export const FETCH_CHARACTERS = "user/fetchCharacters";
export const SELECT_CHARACTER = "user/selectCharacter";
export const POST_SELECT_CHARACTER = "user/postSelectCharacter";

export const ERROR = "error";

export const SET_LOADING = "global/setLoading";
export const SET_LOADING_COMPLETE = "global/setLoadingComplete";

export const FETCH_CHARACTER_DATA = "game/fetchCharData";
export const GAME_MESSAGE = "game/message";
export const GAME_SET_LOCATION = "game/setLocation";
export const GAME_BATTLE_START = "game/battleStart";
export const GAME_HANDLE_ATTACK = "game/handleAttack";
export const GAME_BATTLE_TURN_POST = "game/battleTurnPost";
export const POST_BATTLE_CHARACTER = "game/postBattleCharacter";
export const POST_SELL = "game/postSell";
export const DRINK_POTION = "game/drinkPotion";
export const HANDLE_INN = "game/handleInn";

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
        case 103:
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

export const userBattleStart = (currentBattleMob) => (dispatch) => {
  dispatch(setLocation(3, "전투를 시작합니다."));
  return dispatch({
    type: GAME_BATTLE_START,
    payload: { ...currentBattleMob },
  });
};

export const userAttack =
  (currentCharacter, currentBattleMob) => async (dispatch) => {
    const { CHAR_ATK, CHAR_DEF, CHAR_CUR_HP, CHAR_NAME, CHAR_ID } =
      currentCharacter;
    const { MOB_ATK, MOB_DEF, MOB_CUR_HP, MOB_NAME, DROP_RATE, ITEM_ID } =
      currentBattleMob;
    let userDamageToMob = Math.floor(CHAR_ATK / (1 + MOB_DEF / 100));
    if (userDamageToMob <= 1) userDamageToMob = 1;
    dispatch(
      addGameMessage(
        `${CHAR_NAME}의 공격으로 ${MOB_NAME}에게 ${userDamageToMob}의 데미지!`
      )
    );
    currentBattleMob.MOB_CUR_HP = MOB_CUR_HP - userDamageToMob;
    if (currentBattleMob.MOB_CUR_HP <= 0) {
      // 전투에서 승리 - 메시지 출력, 다시 사냥터 맵으로 return dispatch
      // 전리품 확률 획득 반영 (ITEM_ID도 보내면서 loot값을 보냄)
      let loot = Math.random() * 100 < DROP_RATE;
      // 서버에 바뀐 데이터 반영 필요
      let data = { ...currentCharacter, ...currentBattleMob, loot };
      let res = await api.call.post("/postbattle", data);
      console.log(res.data);
      let postInventory = res.data.inventory;
      let postCharacter = res.data.currentCharacter;
      dispatch({
        type: POST_BATTLE_CHARACTER,
        payload: { currentCharacter: postCharacter, inventory: postInventory },
      });
      dispatch({
        type: POST_SELECT_CHARACTER,
        payload: { currentCharacter: postCharacter },
      });

      return dispatch(
        setLocation(1, `전투에서 이겼습니다! 사냥터로 돌아갑니다.`)
      );
    }
    let mobDamageToUser = Math.floor(MOB_ATK / (1 + CHAR_DEF / 100));
    if (mobDamageToUser <= 1) mobDamageToUser = 1;
    dispatch(
      addGameMessage(
        `${MOB_NAME}의 공격으로 ${CHAR_NAME}에게 ${mobDamageToUser}의 데미지!`
      )
    );
    currentCharacter.CHAR_CUR_HP = CHAR_CUR_HP - mobDamageToUser;
    if (currentCharacter.CHAR_CUR_HP <= 0) {
      // 전투에서 패배 - 메시지 출력, HP MP 회복후 마을로 return dispatch
      currentCharacter.CHAR_CUR_HP = 50;
      currentCharacter.CHAR_CUR_MP = 5;
      currentCharacter.CHAR_CUR_EXP = parseInt(
        currentCharacter.CHAR_CUR_EXP - currentCharacter.CHAR_EXP * 0.1 < 0
          ? 0
          : currentCharacter.CHAR_CUR_EXP - currentCharacter.CHAR_EXP * 0.1
      );
      currentBattleMob.MOB_EXP = 0;
      let data = { ...currentCharacter, ...currentBattleMob, loot: false };
      let res = await api.call.post("/postbattle", data);
      console.log(res.data);
      let postInventory = res.data.inventory;
      let postCharacter = res.data.currentCharacter;
      dispatch({
        type: POST_BATTLE_CHARACTER,
        payload: { currentCharacter: postCharacter, inventory: postInventory },
      });
      // 서버에 바뀐 데이터 반영 필요, currentCharacter에도 반영
      return dispatch(
        setLocation(0, `전투에서 패배했습니다. 마을로 돌아갑니다.`)
      );
    }
    // 전투가 끝나지 않았을 경우 턴을 종료하면서 바뀐 HP/MP 반영
    return dispatch({
      type: GAME_BATTLE_TURN_POST,
      payload: { currentCharacter, currentBattleMob },
    });
  };

export const userDrinkHPPotion = (currentCharacter) => async (dispatch) => {
  let data = { currentCharacter };
  let res = await api.call.post("/potion", data);
  console.log(res.data);
  return dispatch({
    type: POST_BATTLE_CHARACTER,
    payload: res.data,
  });
};

export const restAtInn = (CHAR_ID) => async (dispatch) => {
  let res = await api.call.get("/inn", { params: { id: CHAR_ID } });
  return dispatch({
    type: POST_BATTLE_CHARACTER,
    payload: res.data,
  });
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
  if (message != "") dispatch(addGameMessage(message));
  return dispatch({ type: GAME_SET_LOCATION, payload: location });
};
// 0 - 마을, 1 - 사냥터, 2 - 상점, 3 - 전투

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
