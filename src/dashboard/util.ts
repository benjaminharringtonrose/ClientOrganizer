import firebase from "firebase";

export const capitalizeFirstLetter = (word: string) => {
  if (!word) {
    return word;
  }
  const capitalized = word[0].toUpperCase() + word.slice(1);
  return capitalized;
};

export const getDocRef = (): any => {
  return firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid);
};

export const getUserById = (): any => {
  let docRef = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser?.uid);
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
