import firebase from "firebase";
import { put, select, delay } from "redux-saga/effects";
import { fetchNotificationsSucceeded, fetchNotificationsFailed, dismissToast } from "../actions";
import { IStoreState } from "../store";

// FETCH POSTS - SAGA

export function* fetchNotificationsSaga() {
  try {
    const uid: string | undefined = yield firebase.auth().currentUser?.uid;
    let notifications: firebase.firestore.DocumentData | undefined;
    const db = firebase.firestore();

    const docRef = db.collection("notifications").doc(uid);

    yield docRef
      .get()
      .then((notification) => {
        if (notification.exists) {
          notifications = notification.data();
        } else {
          // doc.data() will be undefined in this case
        }
      })
      .catch((error) => {
        console.warn("Error getting document:", error);
      });
    yield put(fetchNotificationsSucceeded(notifications));
  } catch (error) {
    yield put(fetchNotificationsFailed(error));
  }
}

export function* toastWasPublished() {
  let state: IStoreState = yield select();
  if (!state.notifications.notificationVisible) {
    return;
  }
  yield delay(3000);
  state = yield select();
  if (!state.notifications.notificationVisible) {
    return;
  }
  yield put(dismissToast());
}
