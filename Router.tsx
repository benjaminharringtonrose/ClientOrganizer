import React, { Component } from "react";
import { Scene, Router, Tabs } from "react-native-router-flux";

import LoginScreen from "./src/auth/LoginScreen";
import RegisterScreen from "./src/auth/RegisterScreen";

import HomeScreen from "./src/dashboard/HomeScreen";
import ScheduleScreen from "./src/dashboard/ScheduleScreen";
import NotificationScreen from "./src/dashboard/NotificationScreen";
import ProfileScreen from "./src/dashboard/ProfileScreen";
import StartupScreen from "./src/dashboard/StartupScreen";

import { Ionicons } from "@expo/vector-icons";
import { Color } from "./src/common/styles/Colors";

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="initial" hideNavBar>
            <Scene key="navigateToStartup" component={StartupScreen} navTransparent />
            <Scene
              key="navigateToLogin"
              component={LoginScreen}
              navTransparent
              hideNavBar={false}
              back
              backButtonTintColor={Color.white}
            />
            <Scene
              key="navigateToRegister"
              component={RegisterScreen}
              hideNavBar={false}
              navTransparent
              back
              backButtonTintColor={Color.white}
            />
            <Tabs
              key="tabs"
              activeBackgroundColor={Color.darkThemeGreyDark}
              inactiveBackgroundColor={Color.darkThemeGreyDark}
            >
              <Tabs
                key="home"
                component={HomeScreen}
                tabBarLabel={"Home"}
                hideNavBar={true}
                back={false}
                icon={() => <Ionicons name="ios-home" size={24} color={Color.white} />}
              />
              <Tabs
                key="notifications"
                component={NotificationScreen}
                tabBarLabel={"Notifications"}
                hideNavBar={true}
                icon={() => (
                  <Ionicons name="ios-notifications" size={24} color={Color.white} />
                )}
              />
              <Tabs
                key="messages"
                component={ScheduleScreen}
                tabBarLabel="Schedule"
                hideNavBar={true}
                icon={() => (
                  <Ionicons name="ios-chatboxes" size={24} color={Color.white} />
                )}
              />
              <Tabs
                key="profile"
                component={ProfileScreen}
                hideNavBar={true}
                tabBarLabel="Profile"
                icon={() => <Ionicons name="ios-person" size={24} color={Color.white} />}
              />
            </Tabs>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default RouterComponent;
