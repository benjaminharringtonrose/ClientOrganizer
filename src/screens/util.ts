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
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
};

export function mapClients(clients: any) {
  if (isEqual(clients, {})) {
    return {};
  }
  let acc: any = [];
  for (const [key, value] of Object.entries(clients)) {
    acc = acc.concat({ ...(value as Object), id: key });
  }
  acc.sort(function (a: any, b: any) {
    if (!a || !b) {
      return 0;
    }
    var nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
    var nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
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
    .catch((e) => console.log(e));
}
