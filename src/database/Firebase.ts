import firebase, { firestore } from "firebase";
import FirebaseKeys from "../api/FirebaseKeys";
import { setNotificationsHandler } from "../api/PushNotifications";

export class Firebase {
  private static instance: Firebase;
  private uid: string | undefined;
  private db: firestore.Firestore;

  private constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseKeys);
      setNotificationsHandler();
    }
    this.uid = firebase.auth().currentUser?.uid;
    this.db = firebase.firestore();
  }

  public static getInstance(): Firebase {
    if (!Firebase.instance) {
      Firebase.instance = new Firebase();
    }
    return Firebase.instance;
  }

  public getCurrentUser = () => {
    if (!this.uid) {
      return;
    }
    this.db
      .collection("users")
      .doc(this.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      });
  };
}

// /**
// * The client code.
// */
// function clientCode() {
//   const db1 = Firebase.getInstance();
//   const db2 = Firebase.getInstance();

//   if (db1 === db2) {
//       // Singleton works, both variables contain the same instance.
//   } else {
//       // Singleton failed, variables contain different instances.
//   }
// }

// clientCode();
