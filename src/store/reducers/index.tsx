import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";
import FeedReducer from "./FeedReducer";
import FriendReducer from "./FriendReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  feed: FeedReducer,
  friend: FriendReducer,
});

export default rootReducer;
