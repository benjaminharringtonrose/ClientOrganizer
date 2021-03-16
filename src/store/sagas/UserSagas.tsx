import { put } from "redux-saga/effects";
import * as firebase from "firebase";
require("firebase/firestore");
import uuid from "uuid-random";
import { FETCH_USER, FETCH_POSTS, ADD_POST, UPLOAD_PHOTO } from "../actions/types";

// FETCH USER - ACTIONS

export function fetchUserRequested(data: any) {
  return {
    type: FETCH_USER.REQUESTED,
    payload: data,
  };
}

export function fetchUserSucceeded(data: any) {
  return {
    type: FETCH_USER.SUCCEEDED,
    payload: data,
  };
}
export function fetchUserFailed(error: any) {
  return {
    type: FETCH_USER.FAILED,
    payload: error,
  };
}

// FETCH USER - SAGA

export function* fetchUserSaga(action: any) {
  try {
    const uid = action.payload;
    const doc = yield firebase.firestore().collection("users").doc(uid).get();
    yield put(fetchUserSucceeded(doc.data()));
  } catch (error) {
    yield put(fetchUserFailed({ error }));
  }
}

// FETCH POSTS - ACTIONS
function fetchPostsRequested() {
  return {
    type: FETCH_POSTS.REQUESTED,
  };
}

function fetchPostsSucceeded(data: any) {
  return {
    type: FETCH_POSTS.SUCCEEDED,
    payload: data,
  };
}
function fetchPostsFailed(error: any) {
  return {
    type: FETCH_POSTS.FAILED,
    payload: error,
  };
}

// FETCH POSTS - SAGA

export function* fetchPostsSaga() {
  try {
    const posts: firebase.firestore.DocumentData[] = [];
    yield firebase
      .firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          posts.push(post);
        });
      });

    yield put(fetchPostsSucceeded(posts));
  } catch (error) {
    yield put(fetchPostsFailed({ error }));
  }
}

// UPLOAD PHOTO - ACTIONS

export function uploadPhotoRequested() {
  return {
    type: UPLOAD_PHOTO.REQUESTED,
  };
}

export function uploadPhotoSucceeded(data: any) {
  return {
    type: UPLOAD_PHOTO.SUCCEEDED,
    payload: data,
  };
}
export function uploadPhotoFailed(error: any) {
  return {
    type: UPLOAD_PHOTO.FAILED,
    payload: error,
  };
}

// PHOTO UPLOAD - ASYNC

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

// ADD POST - ACTIONS

export function addPostRequested() {
  return {
    type: ADD_POST.REQUESTED,
  };
}

export function addPostSucceeded() {
  return {
    type: ADD_POST.SUCCEEDED,
  };
}
export function addPostFailed(error: any) {
  return {
    type: ADD_POST.FAILED,
    payload: error,
  };
}

// ADD POST - SAGA

export function* addPostSaga(action: any) {
  try {
    const { firstName, lastName, avatar, text, image } = action.payload;
    const uid = yield firebase.auth().currentUser?.uid;
    const postID = uuid();
    let imageUri: unknown = undefined;
    if (image) {
      imageUri = yield uploadPhotoAsync(image, `posts/${postID}/image`);
    }
    const avatarUri = yield uploadPhotoAsync(avatar, `posts/${postID}/avatar`);
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
    yield put(addPostSucceeded());
  } catch (err) {
    yield put(addPostFailed({ err }));
  }
}
