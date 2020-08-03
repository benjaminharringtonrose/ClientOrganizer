import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  users: UserReducer,
});

export default rootReducer;
