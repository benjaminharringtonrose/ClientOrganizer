import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
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
} from "./sagas";
import { IAuthState } from "./reducers/AuthReducer";

export interface IStoreState {
  readonly accounts: IAuthState;
}

// ACTION LISTENER

function* watchUserAuthentication() {
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
}

// ROOT SAGA

function* rootSaga() {
  yield fork(watchUserAuthentication);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;
