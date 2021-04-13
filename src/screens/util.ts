import firebase from "firebase";
import { orderBy } from "lodash";
import { Linking } from "react-native";
import { IStringMap } from "./RegisterScreen";
import { useImperativeHandle } from "react";

export const getCurrentUserDocRef = (): any => {
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

export function mapMessages(messages: any) {
  if (!messages) {
    return;
  }
  let acc: any = [];
  for (const [key, value] of Object.entries(messages)) {
    acc = acc.concat({ ...(value as Object), id: key });
  }
  acc.reverse();
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

export const getMessages = (messages?: IStringMap<any>) => {
  if (!messages) {
    return;
  }
  const acc: any = [];
  for (const [key, item] of Object.entries(messages)) {
    const message = {
      messageId: item.messageId,
      message: item.message,
      timestamp: item.timestamp,
      senderId: item.senderId,
    };
    acc.push(message);
  }
  const sortedMessages = orderBy(acc, "timestamp", "desc");
  return sortedMessages;
};

export const getMostRecentMessage = (messages: IStringMap<any>) => {
  console.log("messages", messages);
  if (!messages) {
    return;
  }
  const acc: any = [];
  for (const [key, item] of Object.entries(messages)) {
    acc.push({
      message: item.message as string,
      messageId: item.messageId,
      timestamp: item.timestamp,
    });
  }
  const mostRecentMessage = orderBy(acc, "timestamp", "asc").pop();
  return mostRecentMessage.message;
};

export const getFriendsAsync = async (friends?: string[]) => {
  if (!friends) {
    return;
  }
  let friendsData: IStringMap<any>[] = [];
  await firebase
    .firestore()
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        friends.forEach((userId) => {
          if (userId === user.uid) {
            const publicUserData = {
              uid: user.uid,
              firstName: user.firstName,
              lastName: user.lastName,
              pushToken: user?.pushToken?.data || "",
              avatar: user.avatar,
            };
            friendsData.push(publicUserData);
          }
        });
      });
    })
    .catch((error) => {
      console.warn(error);
    });
  return friendsData;
};
