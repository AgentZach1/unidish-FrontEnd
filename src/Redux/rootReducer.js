import { combineReducers } from "redux";
import userReducer from "./userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // use local storage as default

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"], // only user will be persisted, add other reducers if needed
};

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here
});

export default persistReducer(persistConfig, rootReducer); // wrap rootReducer with persistReducer