import { applyMiddleware, createStore, compose } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";

const composedEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composedEnhancers(applyMiddleware(thunk)));

export default store;