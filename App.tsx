import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "./src/store/store";
import firebase from "firebase";
import { Color } from "./src/styles";
import { Navigator } from "./src/navigation/navigation";
import FirebaseKeys from "./src/api/FirebaseKeys";

class App extends Component {
  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseKeys);
    }
  }
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle={"light-content"} />
        <Navigator />
      </Provider>
    );
  }
}
export default App;
