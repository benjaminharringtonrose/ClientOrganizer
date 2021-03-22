import { put } from "redux-saga/effects";
import firebase from "firebase";
import { getDocRef } from "../../screens/util";
import {
  fetchUserRequested,
  deleteFriendSucceeded,
  deleteFriendFailed,
  ISendFriendRequest,
} from "../actions";
import { fetchAllFriendsFailed, addFriendSucceeded, addFriendFailed } from "../actions";

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

export function sendFriendRequest(action: ISendFriendRequest) {
  try {
  } catch (error) {
    console.warn(error);
  }
}
