import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";
import ClientReducer from "./ClientReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  client: ClientReducer,
});

export default rootReducer;
