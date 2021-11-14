import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const logger = createLogger();

const persistConfig = {
  key: "root",
  storage,
};

let middleWare = [thunk];
if (process.env.NODE_ENV === "development") {
  middleWare.push(logger);
}

const enhancedReducer = persistReducer(persistConfig, reducer);

const configureStore = () => {
  const store = createStore(enhancedReducer, applyMiddleware(...middleWare));
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
