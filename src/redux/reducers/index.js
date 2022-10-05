import { combineReducers } from "redux";
import { channelsReducers } from "./channelsReducer";
import { authReducers } from "./authReducer";
const reducer = combineReducers({
  channelsReducers: channelsReducers,
  authReducers: authReducers,
});

export default reducer;
