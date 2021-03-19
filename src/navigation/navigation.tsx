import React from "react";
import { useAuthState } from "../hooks/useAuthState";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import FeedScreen from "../screens/FeedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostScreen from "../screens/PostScreen";
import FriendsListScreen from "../screens/FriendsListScreen";
import TabBar from "./components/TabBar";
import FindFriendsScreen from "../screens/FindFriendsScreen";
import MessageScreen from "../screens/MessageScreen";
import MessageDetailsScreen from "../screens/MessageDetailsScreen";
import NotificationScreen from "../screens/NotificationScreen";
import { Routes } from "./routes";

export const defaultNavigationOptions = { headerTransparent: true, headerShown: false };

const MessageNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen name={Routes.MESSAGE_SCREEN} component={MessageScreen} />
      <Stack.Screen name={Routes.MESSAGE_DETAILS_SCREEN} component={MessageDetailsScreen} />
    </Stack.Navigator>
  );
};

const NotificationNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen name={Routes.NOTIFICATION_SCREEN} component={NotificationScreen} />
      {/* <Stack.Screen name={} component={} /> */}
    </Stack.Navigator>
  );
};

const DashboardTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator tabBar={(props: any) => <TabBar {...props} />}>
      <Tab.Screen name={Routes.FEED_SCREEN} component={FeedScreen} />
      <Tab.Screen name={Routes.FRIENDS_TAB_NAVIGATOR} component={MaterialTopTabs} />
      <Tab.Screen name={Routes.POST_SCREEN} component={PostScreen} />
      <Tab.Screen name={Routes.MESSAGE_NAVIGATOR} component={MessageNavigator} />
      <Tab.Screen name={Routes.NOTIFICATION_NAVIGATOR} component={NotificationNavigator} />
      <Tab.Screen name={Routes.PROFILE_SCREEN} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AuthNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={Routes.REGISTER_SCREEN} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const MaterialTopTabs = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator tabBar={(props: any) => <TabBar {...props} />}>
      <Tab.Screen name={Routes.FIND_FRIENDS_SCREEN} component={FindFriendsScreen} />
      <Tab.Screen name={Routes.FRIENDS_LIST_SCREEN} component={FriendsListScreen} />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  const Stack = createStackNavigator();
  const isLoggedin = useAuthState();

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={defaultNavigationOptions}>
        {isLoggedin ? (
          <Stack.Screen name={Routes.DASHBOARD_TAB_NAVIGATOR} component={DashboardTabNavigator} />
        ) : (
          <Stack.Screen name={Routes.AUTH_NAVIGATOR} component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
