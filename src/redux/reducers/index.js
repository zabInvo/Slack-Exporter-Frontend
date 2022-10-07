import { combineReducers } from "redux";
import { channelsReducers } from "./channelsReducer";
import { authReducers } from "./authReducer";
import { dashboardReducer } from "./dashboardReducer";
const reducer = combineReducers({
  channelsReducers: channelsReducers,
  authReducers: authReducers,
  dashboardReducer: dashboardReducer,
});

export default reducer;
