import { fork, takeLatest } from "redux-saga/effects";
import { put, call } from "redux-saga/effects";
import firebase from "firebase";
require("firebase/firestore");
import uuid from "uuid-random";
import { FETCH_USER, FETCH_POSTS } from "../actions/types";

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
      })
      .then((ref: any) => {
        res(ref);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
}
