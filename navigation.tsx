import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./src/auth/LoginScreen";
import RegisterScreen from "./src/auth/RegisterScreen";
import HomeScreen from "./src/dashboard/HomeScreen";
import ScheduleScreen from "./src/dashboard/ScheduleScreen";
import NotificationScreen from "./src/dashboard/NotificationScreen";
import ProfileScreen from "./src/dashboard/ProfileScreen";

import { Ionicons } from "@expo/vector-icons";
import { Color } from "./src/common/styles/Colors";
import { Spacing } from "./src/common/styles/Spacing";
import AddNewClientScreen from "./src/forms/AddNewClientScreen";
import ClientDetailScreen from "./src/dashboard/ClientDetailsScreen";
import firebase from "firebase";

export enum Routes {
  LOGIN_SCREEN = "LOGIN_SCREEN",
  REGISTER_SCREEN = "REGISTER_SCREEN",
  HOME_SCREEN = "HOME_SCREEN",
  SCHEDULE_SCREEN = "SCHEDULE_SCREEN",
  NOTIFICATION_SCREEN = "NOTIFICATION_SCREEN",
  PROFILE_SCREEN = "PROFILE_SCREEN",
  DASHBOARD_TABS = "DASHBOARD_TABS",
  ADD_NEW_CLIENT_SCREEN = "ADD_NEW_CLIENT_SCREEN",
  CLIENT_DETAIL_SCREEN = "CLIENT_DETAIL_SCREEN",
}

const DashboardTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Color.white,
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
        name={Routes.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <Ionicons name="ios-home" size={24} color={Color.white} />,
        }}
      />
      <Tab.Screen
        name={Routes.SCHEDULE_SCREEN}
        component={ScheduleScreen}
        options={{
          tabBarLabel: "Schedule",
          tabBarIcon: () => (
            <Ionicons name="ios-calendar" size={24} color={Color.white} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        tabBarIcon={() => (
          <Ionicons name="ios-notifications" size={24} color={Color.white} />
        )}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: () => (
            <Ionicons name="ios-notifications" size={24} color={Color.white} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => <Ionicons name="ios-person" size={24} color={Color.white} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigator = (): JSX.Element => {
  const Stack = createStackNavigator();
  const initialRouteName = firebase.apps.length
    ? Routes.DASHBOARD_TABS
    : Routes.LOGIN_SCREEN;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name={Routes.LOGIN_SCREEN}
          component={LoginScreen}
          options={{ headerTransparent: true, headerTitle: "" }}
        />
        <Stack.Screen
          name={Routes.REGISTER_SCREEN}
          component={RegisterScreen}
          options={{ headerTransparent: true, headerTitle: "" }}
        />
        <Stack.Screen
          name={Routes.DASHBOARD_TABS}
          component={DashboardTabs}
          options={{
            headerTransparent: true,
            headerShown: false,
            activeBackgroundColor: "tomato",
          }}
        />
        <Stack.Screen
          name={Routes.ADD_NEW_CLIENT_SCREEN}
          component={AddNewClientScreen}
          options={{ headerTransparent: true, headerTitle: "" }}
        />
        <Stack.Screen
          name={Routes.CLIENT_DETAIL_SCREEN}
          component={ClientDetailScreen}
          options={{ headerTransparent: true, headerTitle: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};