import { REGISTER_USER, LOGIN_USER, FETCH_USER, LOGOUT_USER } from "../types";
import firebase from "firebase";
import { call, put } from "redux-saga/effects";
import { getDocRef } from "../../screens/util";
import { fetchUserSaga } from "./UserSagas";

// LOGIN USER - ACTIONS

function loginUserSuccess(data: any) {
  return {
    type: LOGIN_USER.SUCCEEDED,
    payload: data,
  };
}

function loginUserFail(error: any) {
  return {
    type: LOGIN_USER.FAILED,
    payload: error,
  };
}

// LOGIN USER - SAGA

export function* loginUserSaga(action: any) {
  try {
    const { email, password } = action.payload;
    const auth = firebase.auth();
    const data = yield call([auth, auth.signInWithEmailAndPassword], email, password);
    yield put(loginUserSuccess(data));
    const uid = yield firebase.auth().currentUser?.uid;
    yield fetchUserSaga({ type: FETCH_USER.REQUESTED, payload: uid });
  } catch (error) {
    yield put(loginUserFail(error));
  }
}

// LOGOUT USER - ACTIONS

function logoutUserSuccess() {
  return {
    type: LOGOUT_USER.SUCCEEDED,
  };
}

function logoutUserFail(error: any) {
  return {
    type: LOGOUT_USER.FAILED,
    payload: error,
  };
}

// LOGOUT USER - SAGA

export function* logoutUserSaga() {
  try {
    yield call(() => firebase.auth().signOut());
    yield put(logoutUserSuccess());
  } catch (error) {
    yield put(logoutUserFail(error));
  }
}

// REGISTER USER - ACTIONS

function registerUserSuccess(data: any) {
  return {
    type: REGISTER_USER.SUCCEEDED,
    payload: data,
  };
}

function registerUserFail(error: any) {
  return {
    type: REGISTER_USER.FAILED,
    payload: error,
  };
}

// REGISTER - SAGA

export function* registerUserSaga(action: any) {
  try {
    const { email, password, firstName, lastName } = action.payload;
    // yield console.log("action.payload - regster saga", action.payload);
    const auth = firebase.auth();
    const data = yield call([auth, auth.createUserWithEmailAndPassword], email, password);
    const db = getDocRef();
    yield db.set({
      firstName,
      lastName,
      email,
    });
    yield put(registerUserSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(registerUserFail(error));
  }
}
