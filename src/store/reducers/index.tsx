import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";
import InitialFlowReducer from "./InitialFlowReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  users: UserReducer,
  initialFlow: InitialFlowReducer,
});

export default rootReducer;
