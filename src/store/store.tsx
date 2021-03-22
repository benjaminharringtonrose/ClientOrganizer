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
} from "./sagas";
import { IAuthState, IFriendState, IFeedState, IUserState, INotificationsState } from "./reducers";

import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";
import FeedReducer from "./reducers/FeedReducer";
import FriendReducer from "./reducers/FriendReducer";
import {
  IAuthActions,
  IFeedActions,
  IFriendActions,
  IUserActions,
  setUserId,
  INotificationsActions,
} from "./actions";
import NotificaitonsReducer from "./reducers/NotificationsReducer";

export interface IStoreState {
  readonly auth: IAuthState;
  readonly user: IUserState;
  readonly friend: IFriendState;
  readonly feed: IFeedState;
  readonly notifications: INotificationsState;
}

export type IActions =
  | IAuthActions
  | IFeedActions
  | IFriendActions
  | IUserActions
  | INotificationsActions;

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
  friend: FriendReducer,
  notifications: NotificaitonsReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;
