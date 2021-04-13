import { createSelector } from "reselect";
import { IStoreState } from "./store";
import firebase from "firebase";

const uid = firebase.auth().currentUser?.uid;

function getThread(state: IStoreState) {
  return state.messages.threads?.filter((thread) => {
    return thread.threadId === uid;
  });
}
