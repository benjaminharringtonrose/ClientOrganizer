import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "./src/store/store";
import firebase from "firebase";
import { Color } from "./src/common/styles";
import { Navigator } from "./src/navigation/navigation";
import Firebase from "./src/api/firebase";

class App extends Component {
  componentDidMount() {
    if (!firebase.apps.length) {
      Firebase;
    }
  }
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle={"light-content"} />
        <View style={{ flex: 1, backgroundColor: Color.darkThemeGreyDark }}>
          <Navigator />
        </View>
      </Provider>
    );
  }
}
export default App;
