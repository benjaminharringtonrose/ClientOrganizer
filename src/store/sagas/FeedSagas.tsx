import firebase from "firebase";
import { put } from "redux-saga/effects";
import { fetchPostsSucceeded, fetchPostsFailed } from "../actions/FeedActions";
import { uploadPhotoAsync } from ".";

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
    yield put(fetchPostsFailed(error));
  }
}

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
