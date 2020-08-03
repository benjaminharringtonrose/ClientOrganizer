import firebase from "firebase";
require("firebase/firestore");

export function signIn(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function signOut() {
  firebase.auth().signOut();
}

export function getCollection(typeElements, uid) {
  return firebase.firestore().collection(typeElements).where("uid", "==", uid).get();
}

export function getDocById(typeElements, id) {
  return firebase.firestore().collection(typeElements).doc(id).get();
}

export function addDoc(typeElements, doc) {
  return firebase.firestore().collection(typeElements).add(doc);
}

export function updateDoc(typeElements, id, newDoc) {
  return firebase.firestore().collection(typeElements).doc(id).update(newDoc);
}

export function deleteDoc(typeElements, id) {
  firebase.firestore().collection(typeElements).doc(id).delete();
}

export function saveFileOnStorage({ path }: any, { file }: any, { metadata }: any) {
  return firebase.storage().ref(path).put(file, metadata);
}

export function deleteFileOnStorage(path?: string) {
  firebase.storage().ref(path).delete();
}

export function getPathReference(fullPath?: string) {
  return firebase.storage().ref(fullPath);
}
