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
  UPLOAD_PHOTO,
} from "./actions";
import {
  fetchUserSaga,
  fetchPostsSaga,
  loginUserSaga,
  logoutUserSaga,
  registerUserSaga,
  addPostSaga,
  uploadPhotoAsync,
} from "./sagas";

// ACTION LISTENER

function* watchUserAuthentication() {
  yield takeLatest(FETCH_USER.REQUESTED, fetchUserSaga);
  yield takeLatest(FETCH_POSTS.REQUESTED, fetchPostsSaga);
  yield takeLatest(ADD_POST.REQUESTED, addPostSaga);
  yield takeLatest(UPLOAD_PHOTO.REQUESTED, uploadPhotoAsync);
  yield takeLatest(LOGIN_USER.REQUESTED, loginUserSaga);
  yield takeLatest(LOGOUT_USER.REQUESTED, logoutUserSaga);
  yield takeLatest(REGISTER_USER.REQUESTED, registerUserSaga);
}

// ROOT SAGA

function* rootSaga() {
  yield fork(watchUserAuthentication);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;
