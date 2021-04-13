import firebase from "firebase";
import FirebaseKeys from "../api/FirebaseKeys";
import { setNotificationsHandler } from "../api/PushNotifications";

export class Firebase {
  private static instance: Firebase;

  private constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseKeys);
      setNotificationsHandler();
    }
  }

  public static getInstance(): Firebase {
    if (!Firebase.instance) {
      Firebase.instance = new Firebase();
    }
    return Firebase.instance;
  }

  public someBusinessLogic() {
    // ...
  }
}

// /**
// * The client code.
// */
// function clientCode() {
//   const db1 = Firebase.getInstance();
//   const db2 = Firebase.getInstance();

//   if (db1 === db2) {
//       console.log('Singleton works, both variables contain the same instance.');
//   } else {
//       console.log('Singleton failed, variables contain different instances.');
//   }
// }

// clientCode();
