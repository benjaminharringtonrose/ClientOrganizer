import { fork, takeLatest } from "redux-saga/effects";
import { put, call } from "redux-saga/effects";
import firebase from "firebase";
require("firebase/firestore");
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  FETCH_USER,
  DELETE_CLIENT,
  UPDATE_CLIENT,
  ADD_CLIENT,
  AVATAR_CHANGED,
  FETCH_POSTS,
} from "./actions/types";
import { getDocRef } from "../screens/util";
import uuid from "uuid-random";

// FETCH USER - ACTIONS

function fetchUserRequested(data: any) {
  return {
    type: FETCH_USER.REQUESTED,
    payload: data,
  };
}

function fetchUserSuccess(data: any) {
  return {
    type: FETCH_USER.SUCCEEDED,
    payload: data,
  };
}
function fetchUserFail(error: any) {
  return {
    type: FETCH_USER.FAILED,
    payload: error,
  };
}

// FETCH USER - SAGA

export function* fetchUserSaga(action: any) {
  try {
    const uid = action.payload;
    // yield console.log("FETCH USER SAGA - UID", uid);
    const doc = yield firebase.firestore().collection("users").doc(uid).get();
    yield put(fetchUserSuccess(doc.data()));
  } catch (error) {
    yield put(fetchUserFail({ error }));
  }
}

// FETCH POSTS - ACTIONS

function fetchPostsSuccess(data: any) {
  return {
    type: FETCH_POSTS.SUCCEEDED,
    payload: data,
  };
}
function fetchPostsFail(error: any) {
  return {
    type: FETCH_POSTS.FAILED,
    payload: error,
  };
}

// FETCH POSTS - SAGA

export function* fetchPostsSaga() {
  try {
    const posts: firebase.firestore.DocumentData[] = [];
    yield firebase
      .firestore()
      .collection("posts")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          posts.push(post);
        });
      });

    const sortedPosts = posts.sort((a, b) => b.timestamp - a.timestamp);

    yield put(fetchPostsSuccess(sortedPosts));
  } catch (error) {
    yield put(fetchPostsFail({ error }));
  }
}

function addClientSuccess() {
  return {
    type: ADD_CLIENT.SUCCEEDED,
  };
}
function addClientFail(error: any) {
  return {
    type: ADD_CLIENT.FAILED,
    payload: error,
  };
}

// ADD CLIENT - SAGA

export function* addClientSaga(action: any) {
  try {
    const { firstName, lastName, address, phoneNumber, email, notes } = action.payload;
    // yield console.log(" ADD CLIENT SAGA", action);
    const doc = yield getDocRef();
    doc.set(
      {
        clients: {
          [uuid()]: {
            firstName,
            lastName,
            address,
            phoneNumber,
            email,
            notes,
          },
        },
      },
      { merge: true }
    );
    yield put(addClientSuccess());
    const uid = yield firebase.auth().currentUser?.uid;
    yield put(fetchUserRequested(uid));
  } catch (error) {
    yield put(addClientFail(error));
  }
}

// UPDATE CLIENT - ACTIONS

export const updateClientSucceeded = () => ({
  type: UPDATE_CLIENT.SUCCEEDED,
});

export const updateClientFailed = (error: any) => ({
  type: UPDATE_CLIENT.FAILED,
  payload: error,
});

// UPDATE CLIENT - SAGA

export function* updateClientSaga(action: any) {
  try {
    const { clientId, fieldLabel, fieldValue } = action.payload;
    const uid = yield firebase.auth().currentUser?.uid;
    // yield console.log("saga - clientid", clientId); // ID CHECKS
    // yield console.log("saga - uid", uid);
    // yield console.log("saga - new value", fieldValue);
    yield firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set(
        {
          clients: {
            [clientId!]: {
              [fieldLabel]: fieldValue,
            },
          },
        },
        { merge: true }
      );
    yield put(updateClientSucceeded());
    yield put(fetchUserRequested(uid));
  } catch (error) {
    yield put(updateClientFailed(error));
  }
}

// DELETE CLIENT - ACTIONS

export const deleteClientSucceeded = () => ({
  type: DELETE_CLIENT.SUCCEEDED,
});

export const deleteClientFailed = (error: any) => ({
  type: DELETE_CLIENT.FAILED,
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
    const { email, password, firstName, lastName, avatar } = action.payload;
    // yield console.log("action.payload - regster saga", action.payload);
    const auth = firebase.auth();
    const data = yield call([auth, auth.createUserWithEmailAndPassword], email, password);
    const db = getDocRef();
    yield db.set({
      firstName,
      lastName,
      email,
      avatar,
    });
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
    try {
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
    } catch (error) {
      console.log(error);
    }
  });
};

// ADD AVATAR - ASYNC

const addAvatarAsync = async (data: any) => {
  try {
    let remoteUri = null;
    const db = firebase.firestore().collection("users").doc(`${firebase.auth().currentUser?.uid}`);
    if (data) {
      remoteUri = await uploadPhotoAsync(data, `avatars/${firebase.auth().currentUser?.uid}`);
      db.set({ avatar: remoteUri }, { merge: true });
    }
  } catch (error) {
    alert(`Error: ${error}`);
  }
};

// ACTION LISTENER

function* watchUserAuthentication() {
  yield takeLatest(FETCH_USER.REQUESTED, fetchUserSaga);
  yield takeLatest(FETCH_POSTS.REQUESTED, fetchPostsSaga);
  yield takeLatest(ADD_CLIENT.REQUESTED, addClientSaga);
  yield takeLatest(UPDATE_CLIENT.REQUESTED, updateClientSaga);
  yield takeLatest(DELETE_CLIENT.REQUESTED, deleteClientSaga);
  yield takeLatest(LOGIN_USER.REQUESTED, loginUserSaga);
  yield takeLatest(LOGOUT_USER.REQUESTED, logoutUserSaga);
  yield takeLatest(REGISTER_USER.REQUESTED, registerUserSaga);
  yield takeLatest(AVATAR_CHANGED, addAvatarAsync);
}

// ROOT SAGA

export default function* rootSaga() {
  yield fork(watchUserAuthentication);
}
