import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import FeedScreen from "../screens/FeedScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddNewClientScreen from "../screens/AddNewClientScreen";
import ClientDetailScreen from "../screens/ClientDetailsScreen";
import ClientUpdateScreen from "../screens/ClientUpdateScreen";

import Routes from "./routes";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Color, Spacing } from "../styles";
import PostScreen from "../screens/PostScreen";
import { View } from "react-native";
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
          cardOverlay: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: "#YOUR_COLOR",
              }}
            />
          ),
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
      {/* <Tab.Screen
        name={Routes.SCHEDULE_SCREEN}
        component={ScheduleScreen}
        options={{
          tabBarLabel: "Schedule",
          tabBarIcon: () => <Ionicons name="ios-calendar" size={24} color={Color.peach} />,
        }}
      /> */}

      {/* <Tab.Screen
        name={Routes.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        tabBarIcon={() => <Ionicons name="ios-notifications" size={24} color={Color.white} />}
        options={{
          tabBarLabel: "Notify",
          tabBarIcon: () => <Ionicons name="ios-notifications" size={24} color={Color.white} />,
        }}
      /> */}
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
    // Call this function when app mounts
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // currentUser should be non null.
        setState({ ...state, isLoggedIn: true });
        console.log("USER!");
      } else {
        // no user logged in. currentUser is null.
        console.log("NO USER!");
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.LOGIN_SCREEN}>
        <Stack.Screen
          name={Routes.LOGIN_SCREEN}
          component={LoginScreen}
          options={{
            headerTransparent: true,
            headerTitle: "",
            cardOverlay: () => (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#YOUR_COLOR",
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name={Routes.REGISTER_SCREEN}
          component={RegisterScreen}
          options={{ headerTransparent: true, headerTitle: "", headerTintColor: "white" }}
        />
        <Stack.Screen
          name={Routes.DASHBOARD_TABS}
          component={DashboardTabs}
          options={{
            headerTransparent: true,
            headerShown: false,
            activeBackgroundColor: "tomato",
            headerTitle: "",
            cardOverlay: () => (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#YOUR_COLOR",
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name={Routes.ADD_NEW_CLIENT_SCREEN}
          component={AddNewClientScreen}
          options={{
            headerTransparent: true,
            headerTintColor: "white",
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name={Routes.CLIENT_DETAIL_SCREEN}
          component={ClientDetailScreen}
          options={{
            headerTransparent: true,
            headerTintColor: "white",
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name={Routes.CLIENT_UPDATE_SCREEN}
          component={ClientUpdateScreen}
          options={{
            headerTransparent: true,
            headerTintColor: "white",
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
