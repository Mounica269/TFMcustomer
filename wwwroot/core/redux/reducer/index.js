import { combineReducers } from "redux";
import account from "./account";
import common from "./common";
import chat from "./chat";

export default combineReducers({
    account,
    common,
    chat,
});
