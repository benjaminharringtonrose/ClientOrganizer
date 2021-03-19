import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "./src/store/store";
import firebase from "firebase";
import { RootNavigator } from "./src/navigation/navigation";
import FirebaseKeys from "./src/api/FirebaseKeys";
import { setNotificationsHandler } from "./src/api/PushNotifications";

class App extends Component {
  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseKeys);
      setNotificationsHandler();
    }
  }
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle={"light-content"} />
        <RootNavigator />
      </Provider>
    );
  }
}
export default App;
