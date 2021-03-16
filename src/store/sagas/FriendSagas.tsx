import { FETCH_ALL_FRIENDS, ADD_FRIEND, DELETE_FRIEND } from "../types";
import { put } from "redux-saga/effects";
import firebase from "firebase";
import uuid from "uuid-random";
import { getDocRef } from "../../screens/util";
import { fetchUserRequested } from "./UserSagas";

// FETCH ALL FRIENDS - ACTIONS AND SAGA

export const fetchAllFriendsSucceeded = () => ({
  type: FETCH_ALL_FRIENDS.SUCCEEDED,
});

export const fetchAllFriendsFailed = (error: any) => ({
  type: FETCH_ALL_FRIENDS.FAILED,
  payload: error,
});

export function* fetchAllFriendsSaga() {
  try {
  } catch (error) {
    yield put(fetchAllFriendsFailed({ error }));
  }
}

// ADD FRIEND - ACTIONS AND SAGA

export const addFriendSucceeded = () => ({
  type: ADD_FRIEND.SUCCEEDED,
});

export const addFriendFailed = (error: any) => ({
  type: ADD_FRIEND.FAILED,
  payload: error,
});

export function* addFriendSaga(action: any) {
  try {
    const { firstName, lastName, email, avatar } = action.payload;
    const uid = yield firebase.auth().currentUser?.uid;
    const doc = yield getDocRef();
    doc.set(
      {
        friends: {
          [uuid()]: {
            firstName,
            lastName,
            email,
            avatar,
          },
        },
      },
      { merge: true }
    );
    yield put(addFriendSucceeded());
    yield put(fetchUserRequested(uid));
  } catch (error) {
    yield put(addFriendFailed({ error }));
  }
}

// DELETE FRIEND - ACTIONS AND SAGA

export const deleteFriendSucceeded = () => ({
  type: DELETE_FRIEND.SUCCEEDED,
});

export const deleteFriendFailed = (error: any) => ({
  type: DELETE_FRIEND.FAILED,
  payload: error,
});

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
    yield put(deleteFriendFailed({ error }));
  }
}
