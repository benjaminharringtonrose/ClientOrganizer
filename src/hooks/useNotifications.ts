import { useState, useEffect } from "react";
import firebase from "firebase";
import { mapNotifications } from "../screens/util";
import { usePrevious } from "./usePrevious";
import { isEqual } from "lodash";

interface ILocalState {
  mappedNotifications?: any[];
}

export const useNotifications = (dispatchSetBadge: (bool: boolean) => void) => {
  const [state, setState] = useState<ILocalState>({
    mappedNotifications: undefined,
  });

  const uid = firebase.auth().currentUser?.uid;

  useEffect(() => {
    var unsubscribe = firebase
      .firestore()
      .collection("notifications")
      .doc(uid)
      .onSnapshot((doc) => {
        setState({ ...state, mappedNotifications: mapNotifications(doc.data()) });
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  const prevState = usePrevious(state);

  useEffect(() => {
    if (prevState && !isEqual(prevState?.mappedNotifications, state?.mappedNotifications)) {
      console.log("prevState: ", prevState);
      console.log("prevState?.mappedNotifications: ", prevState?.mappedNotifications);
      console.log("state?.mappedNotifications", state?.mappedNotifications);
      dispatchSetBadge(true);
    }
  }, [state.mappedNotifications]);

  return state.mappedNotifications;
};
