import firebase from "firebase";

export const thumbnailData = [
  {
    id: "0",
    imageSource: require("../../assets/adley_rutschman.jpg"),
    name: "Adley Rutschman",
    school: "Oregon State",
    profession: "Catcher",
  },
  {
    id: "1",
    imageSource: require("../../assets/nick_gonzales.jpg"),
    name: "Nick Gonzales",
    school: "NM State",
    profession: "Batter",
  },
  {
    id: "2",
    imageSource: require("../../assets/takahashi_harutaro.jpg"),
    name: "Takahashi Harutaro",
    school: "New England",
    profession: "Catcher",
  },
  {
    id: "3",
    imageSource: require("../../assets/tim_dixon.jpg"),
    name: "Tim Dixon",
    school: "Little Rock",
    profession: "Catcher",
  },
  {
    id: "4",
    imageSource: require("../../assets/dylan_harley.jpg"),
    name: "Dylan Harley",
    school: "University of South Carolina",
    profession: "Catcher",
  },
];

export const thumbnailDataReversed = [
  {
    id: "4",
    imageSource: require("../../assets/dylan_harley.jpg"),
    name: "Dylan Harley",
    school: "University of South Carolina",
    profession: "Catcher",
  },
  {
    id: "3",
    imageSource: require("../../assets/tim_dixon.jpg"),
    name: "Tim Dixon",
    school: "Little Rock",
    profession: "Catcher",
  },
  {
    id: "2",
    imageSource: require("../../assets/takahashi_harutaro.jpg"),
    name: "Takahashi Harutaro",
    school: "New England",
    profession: "Catcher",
  },
  {
    id: "1",
    imageSource: require("../../assets/nick_gonzales.jpg"),
    name: "Nick Gonzales",
    school: "NM State",
    profession: "Batter",
  },
  {
    id: "0",
    imageSource: require("../../assets/adley_rutschman.jpg"),
    name: "Adley Rutschman",
    school: "Oregon State",
    profession: "Catcher",
  },
];

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

export const getDocRef = (): any => {
  return firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid);
};

const loremIpsumFillerSentence1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const loremIpsumFillerSentence2 =
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const loremIpsumFillerSentence3 =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
const loremIpsumFillerSentence4 =
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const loremIpsumFillerSentence5 =
  "Scelerisque in dictum non consectetur a erat nam at lectus.";
export const carouselItems = [
  {
    title: "Item 1",
    text: loremIpsumFillerSentence1,
    source: require("../../assets/baseballTrainer.jpg"),
  },
  {
    title: "Item 2",
    text: loremIpsumFillerSentence2,
    source: require("../../assets/tutoring.jpg"),
  },
  {
    title: "Item 3",
    text: loremIpsumFillerSentence3,
    source: require("../../assets/guitarLessons.jpg"),
  },
  {
    title: "Item 4",
    text: loremIpsumFillerSentence4,
    source: require("../../assets/swimmingLessons.jpeg"),
  },
  {
    title: "Item 5",
    text: loremIpsumFillerSentence5,
    source: require("../../assets/artLessons.jpg"),
  },
];

export const capitalizeFirstLetter = (word: string) => {
  if (!word) {
    return word;
  }
  const capitalized = word[0].toUpperCase() + word.slice(1);
  return capitalized;
};
