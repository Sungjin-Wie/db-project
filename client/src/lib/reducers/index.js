import { combineReducers } from "redux";
import user from "./userReducer";
import global from "./globalReducer";

export default combineReducers({ user, global });
