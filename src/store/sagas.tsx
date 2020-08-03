import { fork, takeLatest } from "redux-saga/effects";
import { put, call } from "redux-saga/effects";
import firebase from "firebase";
require("firebase/firestore");
import { getDocById } from "./firebaseAPI";
import { Actions } from "react-native-router-flux";
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
} from "./actions/types";

export function* fetchUserSaga(action: any) {
  try {
    const { uid } = action.payload;
    const doc = yield getDocById("users", uid);
    const user = {
      ...doc.data(),
      uid: doc.id,
    };
    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserFail({ error }));
  }
}

export function* loginUserSaga(action: any) {
  try {
    const { email, password } = action.payload;
    const auth = firebase.auth();
    const data = yield call([auth, auth.signInWithEmailAndPassword], email, password);
    yield put(loginUserSuccess(data));

    Actions.tabs();
  } catch (error) {
    yield put(loginUserFail(error));
  }
}

function loginUserSuccess(data: any) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
}

function loginUserFail(error: any) {
  return {
    type: LOGIN_USER_FAIL,
    payload: error,
  };
}

export function* logoutUserSaga() {
  try {
    yield call(() => firebase.auth().signOut());
    yield Actions.initial();
    yield put(logoutUserSuccess());
  } catch (error) {
    yield put(logoutUserFail(error));
  }
}

function logoutUserSuccess() {
  return {
    type: LOGOUT_USER_SUCCESS,
  };
}

function logoutUserFail(error: any) {
  return {
    type: LOGOUT_USER_FAIL,
    payload: error,
  };
}

// PHOTO UPLOAD ASYNC

export const uploadPhotoAsync = (
  uri: RequestInfo,
  filename: string | undefined
): Promise<unknown> => {
  return new Promise(async (res, rej) => {
    const response = await fetch(uri);
    const file = await response.blob();
    let upload = firebase.storage().ref(filename).put(file);
    upload.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        rej(err);
      },
      async () => {
        const url = await upload.snapshot.ref.getDownloadURL();
        res(url);
      }
    );
  });
};

const addAvatar = async (data: any) => {
  try {
    let remoteUri = null;
    const db = firebase
      .firestore()
      .collection("users")
      .doc(`${firebase.auth().currentUser?.uid}`);
    if (data) {
      remoteUri = await uploadPhotoAsync(
        data,
        `avatars/${firebase.auth().currentUser?.uid}`
      );
      db.set({ avatar: remoteUri }, { merge: true });
    }
  } catch (error) {
    alert(`Error: ${error}`);
  }
};

// REGISTER SAGA

export function* registerUserSaga(action: any) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      avatar,
      category,
      subcategory,
      subsubcategory,
      age,
    } = action.payload;
    const auth = firebase.auth();
    const data = yield call([auth, auth.createUserWithEmailAndPassword], email, password);
    const db = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid);
    db.set({
      firstName,
      lastName,
      email,
      avatar,
      category,
      subcategory,
      subsubcategory,
      age,
    });
    addAvatar(avatar);
    yield put(registerUserSuccess(data));
    Actions.tabs();
  } catch (error) {
    console.log(error);
    yield put(registerUserFail(error));
  }
}

function registerUserSuccess(data: any) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: data,
  };
}

function registerUserFail(error: any) {
  return {
    type: REGISTER_USER_FAIL,
    payload: error,
  };
}

function fetchUserSuccess(data: any) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data,
  };
}
function fetchUserFail(error: { error: any }) {
  return {
    type: FETCH_USER_FAIL,
    payload: error,
  };
}

// ACTION LISTENER

function* watchUserAuthentication() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUserSaga);
  yield takeLatest(LOGIN_USER_REQUEST, loginUserSaga);
  yield takeLatest(LOGOUT_USER_REQUEST, logoutUserSaga);
  yield takeLatest(REGISTER_USER_REQUEST, registerUserSaga);
}

// ROOT SAGA

export default function* rootSaga() {
  yield fork(watchUserAuthentication);
}
