import firebase from "firebase";
import { isEqual } from "lodash";
import { Linking } from "react-native";

export const getDocRef = (): any => {
  return firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid);
};

export const getUserById = (): any => {
  let docRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid);
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.warn("getUserById: No such document!");
      }
    })
    .catch(function (error) {
      console.warn("getUserById - Error getting document:", error);
    });
};

export function mapFriends(posts: any) {
  if (!posts) {
    return;
  }
  let acc: any = [];
  for (const [key, value] of Object.entries(posts)) {
    acc = acc.concat({ ...(value as Object), id: key });
  }
  return acc;
}

export function mapNotifications(notifications: any) {
  if (!notifications) {
    return;
  }
  let acc: any = [];
  for (const [key, value] of Object.entries(notifications)) {
    acc = acc.concat({ ...(value as Object), id: key });
  }
  return acc;
}

export function deleteField() {
  firebase.firestore.FieldValue.delete();
}

export function callTelephone(phoneNumber: string) {
  if (!phoneNumber) return;
  const formattedNumber = `tel://${phoneNumber}`;
  Linking.canOpenURL(formattedNumber)
    .then((isSupported) => {
      if (isSupported) {
        Linking.openURL(formattedNumber);
      } else {
        console.warn("Phone number is not supported.");
      }
    })
    .catch((e) => console.warn(e));
}
