import firebase from "firebase";
import { call, put } from "redux-saga/effects";
import { getDocRef } from "../../screens/util";
import {
  loginUserSucceeded,
  loginUserFailed,
  logoutUserSucceeded,
  logoutUserFailed,
  fetchUserRequested,
  fetchAllUsersRequested,
  registerUserSucceeded,
  registerUserFailed,
  setUserId,
} from "../actions";

// LOGIN USER - SAGA

export function* loginUserSaga(action: any) {
  try {
    const { email, password } = action.payload;
    const auth = firebase.auth();
    const data = yield call([auth, auth.signInWithEmailAndPassword], email, password);
    yield put(loginUserSucceeded(data));
    const uid = yield firebase.auth().currentUser?.uid;
    yield firebase.firestore().collection("users").doc(uid).set(
      {
        uid: uid,
      },
      { merge: true }
    );
    yield put(fetchUserRequested(uid));
    yield put(fetchAllUsersRequested());
  } catch (error) {
    yield put(loginUserFailed(error));
  }
}

// REGISTER - SAGA

export function* registerUserSaga(action: any) {
  try {
    const { firstName, lastName, email, password } = action.payload;
    const auth = firebase.auth();
    const data = yield call([auth, auth.createUserWithEmailAndPassword], email, password);
    const db = getDocRef();
    yield db.set({
      firstName,
      lastName,
      email,
    });
    yield put(registerUserSucceeded(data));
    const uid = firebase.auth().currentUser?.uid;
    yield db.set(
      {
        uid,
      },
      { merge: true }
    );
    yield put(fetchUserRequested(uid));
  } catch (error) {
    console.warn(error);
    yield put(registerUserFailed(error));
  }
}

// LOGOUT USER - SAGA

export function* logoutUserSaga() {
  try {
    yield call(() => firebase.auth().signOut());
    yield put(logoutUserSucceeded());
  } catch (error) {
    yield put(logoutUserFailed(error));
  }
}
