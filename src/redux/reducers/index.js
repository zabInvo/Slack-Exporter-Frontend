import { combineReducers } from "redux";
import { channelsReducers } from "./channelsReducer";

const reducer = combineReducers({
    channelsReducers: channelsReducers,
});

export default reducer;