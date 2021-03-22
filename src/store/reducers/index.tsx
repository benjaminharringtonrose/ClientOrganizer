import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";
import FeedReducer from "./FeedReducer";
import FriendReducer from "./FriendReducer";
import NotificationsReducer from "./NotificationsReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  feed: FeedReducer,
  friend: FriendReducer,
  notifications: NotificationsReducer,
});

export default rootReducer;

export { IAuthState } from "./AuthReducer";
export { IFeedState } from "./FeedReducer";
export { IFriendState } from "./FriendReducer";
export { IUserState } from "./UserReducer";
export { INotificationsState } from "./NotificationsReducer";
