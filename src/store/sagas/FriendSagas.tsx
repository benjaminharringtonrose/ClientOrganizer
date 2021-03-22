import { put } from "redux-saga/effects";
import firebase from "firebase";
import { getDocRef } from "../../screens/util";
import {
  fetchUserRequested,
  deleteFriendSucceeded,
  deleteFriendFailed,
  ISendFriendRequest,
  publishToast,
} from "../actions";
import { fetchAllFriendsFailed, addFriendSucceeded, addFriendFailed } from "../actions";
import uuid from "uuid-random";
import { IFriendRequest, NOTIFICATION_TYPE } from "../types";
import { IActions } from "../store";

// ADD FRIEND SAGA

export function* addFriendSaga(action: any) {
  try {
    const {
      friendId,
      friendFirstName,
      friendLastName,
      friendAvatar,
      uid,
      firstName,
      lastName,
      avatar,
    } = action.payload;

    // set the personB in personA's friends list
    yield firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set(
        {
          friends: {
            [friendId]: {
              friendId,
              friendFirstName,
              friendLastName,
              friendAvatar,
            },
          },
        },
        { merge: true }
      );

    // set the personA in personB's friends list
    yield firebase
      .firestore()
      .collection("users")
      .doc(friendId)
      .set(
        {
          friends: {
            [uid]: {
              friendId: uid,
              friendFirstName: firstName,
              friendLastName: lastName,
              friendAvatar: avatar,
            },
          },
        },
        { merge: true }
      );
    yield put(addFriendSucceeded());
    yield put(fetchUserRequested(uid));
  } catch (error) {
    yield put(addFriendFailed(error));
  }
}

export function* deleteFriendSaga(action: any) {
  try {
    const { id } = action.payload;
    const uid = yield firebase.auth().currentUser?.uid;
    yield firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set(
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
    yield console.log("PAYLOADDDDDD", firstName);
    // doc ref to the user you're sending the friend request to.
    const doc = yield firebase.firestore().collection("notifications").doc(theirUid);
    // but below you'll be sending the CURRENT users info
    const uid = yield firebase.auth().currentUser?.uid;
    const notificationId = uuid();
    yield doc.set(
      {
        [uid!]: {
          notificationId,
          notificationType,
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
    yield put(publishToast(NOTIFICATION_TYPE.SUCCESS, "Friend request sent."));
  } catch (error) {
    console.warn(error);
  }
}
