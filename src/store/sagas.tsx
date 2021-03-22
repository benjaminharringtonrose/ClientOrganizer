import { fork, takeLatest } from "redux-saga/effects";
import firebase from "firebase";
require("firebase/firestore");
import {
  FETCH_USER,
  AVATAR_CHANGED,
  FETCH_POSTS,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "./actions/types";
import uuid from "uuid-random";
import Firebase from "../../Firebase";
import { fetchUserSaga, fetchPostsSaga } from "./sagas/UserSagas";
import { loginUserSaga, logoutUserSaga, registerUserSaga } from "./sagas/AuthSagas";

// PHOTO UPLOAD - ASYNC

export const uploadPhotoAsync = (
  uri: RequestInfo,
  filename: string | undefined
): Promise<unknown> => {
  return new Promise(async (res, rej) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  });
};

// ADD AVATAR - ASYNC

const addAvatarAsync = async (data: any) => {
  try {
    let remoteUri = null;
    const db = firebase.firestore().collection("users").doc(`${firebase.auth().currentUser?.uid}`);
    if (data) {
      remoteUri = await uploadPhotoAsync(data, `avatars/${firebase.auth().currentUser?.uid}`);
      db.set({ avatar: remoteUri }, { merge: true });
    }
  } catch (error) {
    alert(`Error: ${error}`);
  }
};

// ADD POST - SAGA

export async function addPostSaga({ firstName, lastName, avatar, text, image }: any) {
  const uid = firebase.auth().currentUser;
  const postID = uuid();
  let imageUri: unknown = undefined;
  if (image) {
    imageUri = await uploadPhotoAsync(image, `posts/${postID}/image`);
  }
  const avatarUri = await uploadPhotoAsync(avatar, `posts/${postID}/avatar`);
  return new Promise((res, rej) => {
    Firebase.firestore
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
      })
      .then((ref: any) => {
        res(ref);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
}
