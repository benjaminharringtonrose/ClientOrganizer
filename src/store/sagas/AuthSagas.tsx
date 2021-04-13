import firebase from "firebase";
import { call, put } from "redux-saga/effects";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { getCurrentUserDocRef } from "../../screens/util";
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
  fetchNotificationsRequested,
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
    const db = getCurrentUserDocRef();
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
    yield getAndSetDevicePushToken();
    yield put(fetchUserRequested(uid));
    yield put(fetchNotificationsRequested());
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

export const getAndSetDevicePushToken = () => {
  return Permissions.getAsync(Permissions.NOTIFICATIONS)
    .then((response) =>
      response.status === "granted" ? response : Permissions.askAsync(Permissions.NOTIFICATIONS)
    )
    .then((response) => {
      if (response.status !== "granted") {
        return Promise.reject(new Error("Push notifications permission was rejected"));
      }

      return Notifications.getExpoPushTokenAsync();
    })
    .then((token) => {
      const db = getCurrentUserDocRef();
      db.set(
        {
          pushToken: token,
        },
        { merge: true }
      );
    })
    .catch((error) => {
      console.log("Error while registering device push token", error);
    });
};
