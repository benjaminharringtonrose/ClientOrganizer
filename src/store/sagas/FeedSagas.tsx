import firebase from "firebase";
import { put } from "redux-saga/effects";
import { fetchPostsSucceeded, fetchPostsFailed } from "../actions/FeedActions";

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
