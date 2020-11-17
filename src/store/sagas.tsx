import { fork, takeLatest } from "redux-saga/effects";
import { put, call } from "redux-saga/effects";
import firebase from "firebase";
require("firebase/firestore");
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
  DELETE_CLIENT_REQUESTED,
  DELETE_CLIENT_SUCCEEDED,
  DELETE_CLIENT_FAILED,
} from "./actions/types";
import { getDocRef, deleteField } from "../dashboard/util";

// FETCH USER - ACTIONS

function fetchUserRequested(data: any) {
  return {
    type: FETCH_USER_REQUEST,
    payload: data,
  };
}

function fetchUserSuccess(data: any) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data,
  };
}
function fetchUserFail(error: any) {
  return {
    type: FETCH_USER_FAIL,
    payload: error,
  };
}

// FETCH USER - SAGA

export function* fetchUserSaga(action: any) {
  try {
    const uid = action.payload;
    yield console.log("FETCH USER SAGA - UID", uid);
    const doc = yield firebase.firestore().collection("users").doc(uid).get();
    const user = {
      ...doc.data(),
    };
    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserFail({ error }));
  }
}

// DELETE CLIENT - ACTIONS

export const deleteClientSucceeded = () => ({
  type: DELETE_CLIENT_SUCCEEDED,
});

export const deleteClientFailed = (error: any) => ({
  type: DELETE_CLIENT_FAILED,
  payload: error,
});

// DELETE CLIENT - SAGA

export function* deleteClientSaga(action: any) {
  try {
    const clientId = action.payload;
    const uid = yield firebase.auth().currentUser?.uid;
    // yield console.log("saga - clientid", clientId); // ID CHECKS
    // yield console.log("saga - uid", uid);
    yield firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set(
        {
          clients: {
            [clientId!]: firebase.firestore.FieldValue.delete(),
          },
        },
        { merge: true }
      );
    yield put(deleteClientSucceeded());
    yield put(fetchUserRequested(uid));
  } catch (error) {
    yield put(deleteClientFailed(error));
  }
}

// LOGIN USER - ACTIONS

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

// LOGIN USER - SAGA

export function* loginUserSaga(action: any) {
  try {
    const { email, password } = action.payload;
    const auth = firebase.auth();
    const data = yield call([auth, auth.signInWithEmailAndPassword], email, password);
    yield put(loginUserSuccess(data));
  } catch (error) {
    yield put(loginUserFail(error));
  }
}

// LOGOUT USER - ACTIONS

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

// REGISTER - SAGA

export function* registerUserSaga(action: any) {
  try {
    const { email, password, firstName, lastName, avatar } = action.payload;
    const auth = firebase.auth();
    const data = yield call([auth, auth.createUserWithEmailAndPassword], email, password);
    const db = getDocRef();
    db.set({
      firstName,
      lastName,
      email,
      avatar,
    });
    addAvatarAsync(avatar);
    yield put(registerUserSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(registerUserFail(error));
  }
}

// PHOTO UPLOAD - ASYNC

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

// ADD AVATAR - ASYNC

const addAvatarAsync = async (data: any) => {
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

// ACTION LISTENER

function* watchUserAuthentication() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUserSaga);
  yield takeLatest(DELETE_CLIENT_REQUESTED, deleteClientSaga);
  yield takeLatest(LOGIN_USER_REQUEST, loginUserSaga);
  yield takeLatest(LOGOUT_USER_REQUEST, logoutUserSaga);
  yield takeLatest(REGISTER_USER_REQUEST, registerUserSaga);
}

// ROOT SAGA

export default function* rootSaga() {
  yield fork(watchUserAuthentication);
}
