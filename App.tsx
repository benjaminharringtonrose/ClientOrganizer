import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import RouterComponent from "./Router";
import store from "./src/store/store";
import firebase from "firebase";
import { Color } from "./src/common/styles/Colors";

class App extends Component {
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyC1rGuEd2HjgZxhOxw8jC8KP7SSLqN1smo",
      authDomain: "ulrn-f2a04.firebaseapp.com",
      databaseURL: "https://ulrn-f2a04.firebaseio.com",
      projectId: "ulrn-f2a04",
      storageBucket: "ulrn-f2a04.appspot.com",
      messagingSenderId: "84581802313",
      appId: "1:84581802313:web:02f058aecc8411427aba98",
      measurementId: "G-M99C4XXF7D",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle={"light-content"} />
        <View style={{ flex: 1 }}>
          <RouterComponent />
        </View>
      </Provider>
    );
  }
}
export default App;
