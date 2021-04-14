import { IStringMap } from "../screens/RegisterScreen";
import { useState, useEffect } from "react";
import firebase from "firebase";

interface ILocalState {
  mappedMessages?: IStringMap<any>[];
}

export const useMessages = (threadId?: string) => {
  const [state, setState] = useState<ILocalState>({
    mappedMessages: undefined,
  });

  const uid = firebase.auth().currentUser?.uid;

  useEffect(() => {
    var unsubscribe = firebase
      .firestore()
      .collection("messages")
      .doc(uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const docData = doc.data();
          for (const [key, item] of Object.entries(docData!)) {
            if (key === threadId) {
              let messages: any = [];
              for (const [key, message] of Object.entries(item.messages!)) {
                messages = messages.concat({ ...(message as Object), id: key });
              }
              messages.sort(function (a: any, b: any) {
                return a.timestamp < b.timestamp;
              });
              setState({ ...state, mappedMessages: messages });
            }
          }
        }
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return state.mappedMessages;
};
