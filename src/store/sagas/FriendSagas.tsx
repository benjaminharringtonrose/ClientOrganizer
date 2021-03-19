import { DELETE_FRIEND } from "../types";
import { put } from "redux-saga/effects";
import firebase from "firebase";
import uuid from "uuid-random";
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
    const { theirUid, firstName, lastName, avatar } = action.payload;
    console.log("ACTION.PAYLOAD", action.payload);

    const uid = yield firebase.auth().currentUser?.uid;
    const doc = yield getDocRef();
    doc.set(
      {
        friends: {
          [theirUid]: {
            theirUid,
            firstName,
            lastName,
            avatar,
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
