import { createStore, applyMiddleware, combineReducers, Reducer } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { takeLatest, fork } from "redux-saga/effects";
import {
  FETCH_USER,
  FETCH_POSTS,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  ADD_POST,
  UPLOAD_AVATAR,
  FETCH_ALL_USERS,
  ADD_FRIEND,
  DELETE_FRIEND,
  FETCH_ALL_FRIENDS,
  SET_USER_ID,
  FETCH_NOTIFICATIONS,
  TOAST_NOTIFICATION,
  SEND_FRIEND_REQUEST,
  SEND_MESSAGE,
  FETCH_MESSAGES,
} from "./types";
import {
  fetchUserSaga,
  fetchPostsSaga,
  loginUserSaga,
  logoutUserSaga,
  registerUserSaga,
  addPostSaga,
  uploadAvatarSaga,
  fetchAllUsersSaga,
  addFriendSaga,
  deleteFriendSaga,
  fetchAllFriendsSaga,
  fetchNotificationsSaga,
  toastWasPublished,
  sendFriendRequest,
} from "../store/sagas";
import { IAuthState, IFriendsState, IFeedState, IUserState, INotificationsState } from "./reducers";

import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";
import FeedReducer from "./reducers/FeedReducer";
import FriendsReducer from "./reducers/FriendsReducer";
import {
  IAuthActions,
  IFeedActions,
  IFriendsActions,
  IUserActions,
  setUserId,
  INotificationsActions,
} from "./actions";
import NotificaitonsReducer from "./reducers/NotificationsReducer";
import { sendMessageSaga, fetchMessagesSaga } from "./sagas/MessagesSagas";
import MessagesReducer, { IMessagesState } from "./reducers/MessagesReducer";
import { IMessagesActions } from "./actions/MessagesActions";

export interface IStoreState {
  readonly auth: IAuthState;
  readonly user: IUserState;
  readonly friends: IFriendsState;
  readonly feed: IFeedState;
  readonly notifications: INotificationsState;
  readonly messages: IMessagesState;
}

export type IActions =
  | IAuthActions
  | IFeedActions
  | IFriendsActions
  | IUserActions
  | INotificationsActions
  | IMessagesActions;

// ROOT ACTION LISTENER

function* rootActionListener() {
  yield takeLatest(LOGIN_USER.REQUESTED, loginUserSaga);
  yield takeLatest(REGISTER_USER.REQUESTED, registerUserSaga);
  yield takeLatest(LOGOUT_USER.REQUESTED, logoutUserSaga);

  yield takeLatest(FETCH_USER.REQUESTED, fetchUserSaga);
  yield takeLatest(FETCH_ALL_USERS.REQUESTED, fetchAllUsersSaga);

  yield takeLatest(FETCH_POSTS.REQUESTED, fetchPostsSaga);
  yield takeLatest(ADD_POST.REQUESTED, addPostSaga);

  yield takeLatest(UPLOAD_AVATAR.REQUESTED, uploadAvatarSaga);

  yield takeLatest(ADD_FRIEND.REQUESTED, addFriendSaga);
  yield takeLatest(DELETE_FRIEND.REQUESTED, deleteFriendSaga);
  yield takeLatest(FETCH_ALL_FRIENDS.REQUESTED, fetchAllFriendsSaga);

  yield takeLatest(SET_USER_ID.SET, setUserId);

  yield takeLatest(FETCH_NOTIFICATIONS.REQUESTED, fetchNotificationsSaga);
  yield takeLatest(TOAST_NOTIFICATION.PUBLISH, toastWasPublished);

  yield takeLatest(SEND_FRIEND_REQUEST.SENT, sendFriendRequest);

  yield takeLatest(SEND_MESSAGE.REQUESTED, sendMessageSaga);
  yield takeLatest(FETCH_MESSAGES.REQUESTED, fetchMessagesSaga);
}

// ROOT SAGA

function* rootSaga() {
  yield fork(rootActionListener);
}

// ROOT REDUCER

const rootReducer: Reducer<IStoreState, IActions> = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  feed: FeedReducer,
  friends: FriendsReducer,
  notifications: NotificaitonsReducer,
  messages: MessagesReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;
