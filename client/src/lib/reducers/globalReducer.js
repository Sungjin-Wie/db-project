import { SET_LOADING, SET_LOADING_COMPLETE, ERROR } from "../actions";

export const globalState = {
  loading: false,
};

const globalReducer = (state = globalState, action) => {
  const { type } = action;
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_LOADING_COMPLETE:
      return {
        ...state,
        loading: false,
      };
    case ERROR:
      return {
        ...state,
        ...globalState,
      };
    default:
      return globalState;
  }
};

export default globalReducer;
