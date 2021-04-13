import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { RootNavigator } from "./src/navigation/navigation";
import ToastNotification from "./src/components/ToastNotification";
import { Firebase } from "./src/database/Firebase";

class App extends Component {
  public componentDidMount() {
    Firebase.getInstance();
  }
  public render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle={"light-content"} />
        <RootNavigator />
        <ToastNotification />
      </Provider>
    );
  }
}
export default App;
