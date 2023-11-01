import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist"; // add this import

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store); // create a persistor object
export default store;