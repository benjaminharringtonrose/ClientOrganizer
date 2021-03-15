import { useState, useEffect } from "react";
import firebase from "firebase";

export function useAuthState() {
  const [state, setState] = useState({
    isLoggedIn: false,
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setState({ ...state, isLoggedIn: true });
      } else {
        setState({ ...state, isLoggedIn: false });
      }
    });
  }, []);
  return state.isLoggedIn;
}
