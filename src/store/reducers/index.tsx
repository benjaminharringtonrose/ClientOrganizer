import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";
import FeedReducer from "./FeedReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  feed: FeedReducer,
});

export default rootReducer;
