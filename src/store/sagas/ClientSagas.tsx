import { put } from "redux-saga/effects";
import firebase from "firebase";
require("firebase/firestore");
import { DELETE_CLIENT, UPDATE_CLIENT, ADD_CLIENT } from "../actions/types";
import { getDocRef } from "../../screens/util";
import uuid from "uuid-random";
import { fetchUserRequested } from "./UserSagas";

// ADD CLIENT - ACTIONS

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
