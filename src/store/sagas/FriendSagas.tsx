import { put } from "redux-saga/effects";
import firebase from "firebase";
import {
  fetchUserRequested,
  deleteFriendSucceeded,
  deleteFriendFailed,
  publishToast,
  fetchNotificationsRequested,
} from "../actions";
import { fetchAllFriendsFailed, addFriendSucceeded, addFriendFailed } from "../actions";
import uuid from "uuid-random";
import { NOTIFICATION_TYPE } from "../types";
import { NOTIFICATION, sendPushNotification } from "../../api/PushNotifications";

// ADD FRIEND SAGA

export function* addFriendSaga(action: any) {
  try {
    const {
      friendId,
      friendFirstName,
      friendLastName,
      friendAvatar,
      friendPushToken,
      uid,
      firstName,
      lastName,
      avatar,
    } = action.payload;

    const userCollectionRef = yield firebase.firestore().collection("users");
    var notificationsCollectionRef = yield firebase.firestore().collection("notifications");

    // add B to A's friendList
    yield userCollectionRef.doc(uid).update({
      friendsList: firebase.firestore.FieldValue.arrayUnion(friendId),
    });

    // add A to B's friendList
    yield userCollectionRef.doc(friendId).update({
      friendsList: firebase.firestore.FieldValue.arrayUnion(uid),
    });

    // remove old notification
    yield notificationsCollectionRef.doc(uid).set(
      {
        [friendId!]: firebase.firestore.FieldValue.delete(),
      },
      { merge: true }
    );

    // add new notification
    yield notificationsCollectionRef.doc(uid).set(
      {
        [uid!]: {
          notificationType: NOTIFICATION.GENERAL,
          notificationStatus: "unread",
          message: "You accepted their friend request.",
          timestamp: Date.now(),
          theirUid: friendId,
          firstName: friendFirstName,
          lastName: friendLastName,
          avatar: friendAvatar,
        },
      },
      { merge: true }
    );

    yield notificationsCollectionRef.doc(friendId).set(
      {
        [uid!]: {
          notificationType: NOTIFICATION.GENERAL,
          notificationStatus: "unread",
          message: "accepted your friend request.",
          timestamp: Date.now(),
          theirUid: friendId,
          firstName,
          lastName,
          avatar,
        },
      },
      { merge: true }
    );

    yield put(addFriendSucceeded());
    yield put(publishToast(NOTIFICATION_TYPE.SUCCESS, "Accepted friend request."));
    yield put(fetchUserRequested(uid));
    yield put(fetchNotificationsRequested());
  } catch (error) {
    yield put(addFriendFailed(error));
  }
}

export function* deleteFriendSaga(action: any) {
  try {
    const { id } = action.payload;
    const uid = yield firebase.auth().currentUser?.uid;
    const collectionRef = firebase.firestore().collection("users");
    yield collectionRef.doc(uid).set(
      {
        friends: {
          [id!]: firebase.firestore.FieldValue.delete(),
        },
      },
      { merge: true }
    );
    yield put(deleteFriendSucceeded());
    yield put(fetchUserRequested(uid));
  } catch (error) {
    yield put(deleteFriendFailed(error));
  }
}

export function* fetchAllFriendsSaga() {
  try {
  } catch (error) {
    yield put(fetchAllFriendsFailed(error));
  }
}

export function* fetchAllFriendRequestsSaga() {
  try {
  } catch (error) {
    yield put(fetchAllFriendsFailed(error));
  }
}

export function* sendFriendRequest(action: any) {
  try {
    const {
      notificationType,
      theirUid,
      theirPushToken,
      firstName,
      lastName,
      avatar,
    } = action.payload;
    // doc ref to the user you're sending the friend request to.
    const docRef = yield firebase.firestore().collection("notifications").doc(theirUid);
    // but below you'll be sending the CURRENT users info
    const uid = yield firebase.auth().currentUser?.uid;
    const notificationId = uuid();
    yield docRef.set(
      {
        [uid!]: {
          notificationId,
          notificationType,
          notificationStatus: "unread",
          message: "wants to be your friend.",
          timestamp: Date.now(),
          theirUid: uid,
          theirPushToken,
          firstName,
          lastName,
          avatar,
        },
      },
      { merge: true }
    );
    yield console.log("theirPushToken: ", theirPushToken);
    yield sendPushNotification({
      expoPushToken: theirPushToken,
      title: `Friend request from ${firstName} ${lastName}`,
      message: "You've received a friend request.",
      data: {
        vibrate: false,
      },
    });
    yield put(publishToast(NOTIFICATION_TYPE.SUCCESS, "Friend request sent."));
  } catch (error) {
    console.warn(error);
  }
}
