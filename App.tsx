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
      apiKey: "AIzaSyDFuLrVQJ_jbHS6UmpFxJbpHGiWVJN2CdM",
      authDomain: "organizer-ae5f7.firebaseapp.com",
      databaseURL: "https://organizer-ae5f7.firebaseio.com",
      projectId: "organizer-ae5f7",
      storageBucket: "organizer-ae5f7.appspot.com",
      messagingSenderId: "643110698367",
      appId: "1:643110698367:web:8f367024bdabbd25886e4a",
      measurementId: "G-KC0368LSQB",
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
