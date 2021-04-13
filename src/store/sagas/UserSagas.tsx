import { put } from "redux-saga/effects";
import firebase from "firebase";
require("firebase/firestore");
import uuid from "uuid-random";
import { fetchPostsRequested, addPostSucceeded, addPostFailed } from "../actions/FeedActions";
import {
  fetchUserSucceeded,
  fetchUserFailed,
  fetchAllUsersSucceeded,
  fetchAllUsersFailed,
  IFetchUserRequested,
  uploadAvatarSucceeded,
  uploadAvatarFailed,
} from "../actions";

// FETCH USER - SAGA

export function* fetchUserSaga(action: IFetchUserRequested) {
  try {
    const uid = action.payload;
    const doc: any = yield firebase.firestore().collection("users").doc(uid).get();
    yield put(fetchUserSucceeded(doc.data()));
  } catch (error) {
    yield put(fetchUserFailed(error));
  }
}

export function* fetchAllUsersSaga() {
  try {
    const users: firebase.firestore.DocumentData[] = [];
    yield firebase
      .firestore()
      .collection("users")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          users.push(user);
        });
      });
    yield put(fetchAllUsersSucceeded(users));
  } catch (error) {
    yield put(fetchAllUsersFailed(error));
  }
}

// UPLOAD PHOTO - ASYNC

export const uploadPhotoAsync = async (uri: RequestInfo, filename: string | undefined) => {
  return new Promise(async (res, rej) => {
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
  }).catch((error) => {
    console.error(error);
  });
};

// UPLOAD AVATAR - SAGA

export function* uploadAvatarSaga(action: any) {
  try {
    const uri = action.payload;
    const uid = firebase.auth().currentUser?.uid;
    const avatarUri: string | undefined = yield uploadPhotoAsync(uri, `avatars/${uid}`);
    yield firebase.firestore().collection("users").doc(uid).set(
      {
        avatar: avatarUri,
      },
      { merge: true }
    );
    if (avatarUri) {
      yield put(uploadAvatarSucceeded(avatarUri));
    }
  } catch (error) {
    yield put(uploadAvatarFailed({ error }));
  }
}

// ADD POST - SAGA

export function* addPostSaga(action: any) {
  try {
    const { firstName, lastName, avatar, text, image } = action.payload;
    const uid: string | undefined = yield firebase.auth().currentUser?.uid;
    const postID: string = uuid();
    const imageID: string = uuid();
    let imageUri: unknown;
    if (image) {
      imageUri = yield uploadPhotoAsync(image, `images/${postID}`);
    }
    const avatarUri: string | undefined = yield uploadPhotoAsync(avatar, `avatars/${imageID}`);
    firebase
      .firestore()
      .collection("posts")
      .add({
        postID,
        firstName,
        lastName,
        avatar: avatarUri,
        text,
        uid,
        timestamp: Date.now(),
        image: imageUri || "",
      });
    yield put(fetchPostsRequested());
    yield put(addPostSucceeded());
  } catch (err) {
    yield put(addPostFailed({ err }));
  }
}
