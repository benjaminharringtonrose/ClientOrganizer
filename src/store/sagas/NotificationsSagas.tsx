import firebase from "firebase";
import { put } from "redux-saga/effects";
import { fetchNotificationsSucceeded, fetchNotificationsFailed } from "../actions";

// FETCH POSTS - SAGA

export function* fetchNotificationsSaga() {
  try {
    const uid = yield firebase.auth().currentUser?.uid;
    let notifications: firebase.firestore.DocumentData | undefined;
    const db = firebase.firestore();

    const notificationsRef = db.collection("notifications").doc(uid);

    yield notificationsRef
      .get()
      .then((notification) => {
        if (notification.exists) {
          notifications = notification.data();
          // console.log("fetchNotificationsSaga: notifications", notification.data()!);
        } else {
          // doc.data() will be undefined in this case
          console.warn("No such document!");
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
