import React, { useEffect, useState } from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import FeedScreen from "../screens/FeedScreen";
import ProfileScreen from "../screens/ProfileScreen";

import Routes from "./routes";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Color, Spacing } from "../styles";
import PostScreen from "../screens/PostScreen";
import firebase from "firebase";

const DashboardTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        initialRouteName: Routes.FEED_SCREEN,
        activeTintColor: Color.warmGrey50,
        activeBackgroundColor: Color.darkThemeGreyMed,
        inactiveBackgroundColor: Color.darkThemeGreyDark,
        labelStyle: {
          paddingBottom: Spacing.micro,
        },
        style: {
          backgroundColor: Color.darkThemeGreyDark,
        },
      }}
    >
      <Tab.Screen
        name={Routes.FEED_SCREEN}
        component={FeedScreen}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: () => <Ionicons name="ios-person" size={24} color={Color.white} />,
        }}
      />
      <Tab.Screen
        name={Routes.POST_SCREEN}
        component={PostScreen}
        options={{
          tabBarLabel: "Post",
          tabBarIcon: () => <Ionicons name="ios-person" size={24} color={Color.white} />,
        }}
      />
      <Tab.Screen
        name={Routes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: () => <FontAwesome name="gear" size={24} color={Color.white} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigator = () => {
  const [state, setState] = useState({
    isLoggedIn: false,
  });
  const Stack = createStackNavigator();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setState({ ...state, isLoggedIn: true });
      } else {
        setState({ ...state, isLoggedIn: false });
      }
    });
  }, []);

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        {state.isLoggedIn ? (
          <Stack.Screen
            name={Routes.DASHBOARD_TABS}
            component={DashboardTabs}
            options={{
              headerTransparent: true,
              headerShown: false,
              headerTitle: "",
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name={Routes.LOGIN_SCREEN}
              component={LoginScreen}
              options={{
                headerTransparent: true,
                headerTitle: "",
              }}
            />
            <Stack.Screen
              name={Routes.REGISTER_SCREEN}
              component={RegisterScreen}
              options={{ headerTransparent: true, headerTitle: "", headerTintColor: "white" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
