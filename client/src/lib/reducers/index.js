import { combineReducers } from "redux";
import user from "./userReducer";
import global from "./globalReducer";
import game from "./gameReducer";

export default combineReducers({ user, global, game });
