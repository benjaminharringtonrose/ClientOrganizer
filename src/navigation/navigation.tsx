import React from "react";
import { useAuthState } from "../hooks/useAuthState";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen, { IStringMap } from "../screens/RegisterScreen";
import FeedScreen from "../screens/FeedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostScreen from "../screens/PostScreen";
import FriendsListScreen from "../screens/FriendsListScreen";
import TabBar from "./components/TabBar";
import FindFriendsScreen from "../screens/FindFriendsScreen";
import MessageScreen from "../screens/MessageScreen";
import MessageDetailsScreen from "../screens/MessageDetailsScreen";
import NotificationScreen from "../screens/NotificationsScreen";
import CreateMessageScreen from "../screens/CreateMessageScreen";

import { Routes } from "./routes";
import { Color, Spacing, TextStyles } from "../styles";
import { ButtonBack } from "../components";

export const defaultNavigationOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Color.black,
  },
  headerTitleStyle: TextStyles.header,
};

export type CreateMessageParamList = {
  [Routes.CREATE_MESSAGE_SCREEN]: undefined;
};

const MessageModals = () => {
  const Stack = createStackNavigator<CreateMessageParamList>();
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen name={Routes.CREATE_MESSAGE_SCREEN} component={CreateMessageScreen} />
    </Stack.Navigator>
  );
};

export type MessageParamList = {
  [Routes.MESSAGE_SCREEN]: undefined;
  [Routes.MESSAGE_DETAILS_SCREEN]: {
    messages: IStringMap<any>[];
  };
  [Routes.MESSAGE_MODALS]: undefined;
};

const MessageNavigator = () => {
  const Stack = createStackNavigator<MessageParamList>();
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions} mode="modal" headerMode="none">
      <Stack.Screen name={Routes.MESSAGE_SCREEN} component={MessageScreen} />
      <Stack.Screen name={Routes.MESSAGE_DETAILS_SCREEN} component={MessageDetailsScreen} />
      <Stack.Screen name={Routes.MESSAGE_MODALS} component={MessageModals} />
    </Stack.Navigator>
  );
};

const NotificationNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ ...defaultNavigationOptions, title: "Notifications" }}>
      <Stack.Screen name={Routes.NOTIFICATION_SCREEN} component={NotificationScreen} />
    </Stack.Navigator>
  );
};

const FeedNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ ...defaultNavigationOptions, title: "Feed" }}>
      <Stack.Screen name={Routes.FEED_SCREEN} component={FeedScreen} />
    </Stack.Navigator>
  );
};

const PostNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.POST_SCREEN} component={PostScreen} />
    </Stack.Navigator>
  );
};

const ProfileNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ ...defaultNavigationOptions, title: "Profile" }}>
      <Stack.Screen name={Routes.PROFILE_SCREEN} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const DashboardTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={() => ({ headerShown: true })}
      tabBar={(props: any) => <TabBar {...props} />}
    >
      <Tab.Screen name={Routes.FEED_NAVIGATOR} component={FeedNavigator} />
      <Tab.Screen name={Routes.POST_NAVIGATOR} component={PostNavigator} />
      <Tab.Screen name={Routes.MESSAGE_NAVIGATOR} component={MessageNavigator} />
      <Tab.Screen name={Routes.NOTIFICATION_NAVIGATOR} component={NotificationNavigator} />
      <Tab.Screen name={Routes.FRIENDS_TAB_NAVIGATOR} component={MaterialTopTabs} />
      <Tab.Screen name={Routes.PROFILE_NAVIGATOR} component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export type AuthParamList = {
  [Routes.LOGIN_SCREEN]: undefined;
  [Routes.REGISTER_SCREEN]: undefined;
};

const AuthNavigator = () => {
  const Stack = createStackNavigator<AuthParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        title: "SocialApp",
        headerStyle: {
          backgroundColor: Color.black,
        },
      }}
    >
      <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={Routes.REGISTER_SCREEN}
        component={RegisterScreen}
        options={({ navigation }: StackNavigationProp<AuthParamList, any>) => ({
          headerLeft: () => (
            <ButtonBack
              onPress={() => navigation.goBack()}
              iconSize={24}
              iconColor={Color.white}
              style={{ paddingLeft: Spacing.small }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const MaterialTopTabs = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={Routes.FRIENDS_LIST_SCREEN}
      tabBar={(props: any) => <TabBar {...props} />}
    >
      <Tab.Screen name={Routes.FRIENDS_LIST_SCREEN} component={FriendsListScreen} />
      <Tab.Screen name={Routes.FIND_FRIENDS_SCREEN} component={FindFriendsScreen} />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  const Stack = createStackNavigator();
  const isLoggedin = useAuthState();

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedin ? (
          <Stack.Screen name={Routes.DASHBOARD_TAB_NAVIGATOR} component={DashboardTabNavigator} />
        ) : (
          <Stack.Screen name={Routes.AUTH_NAVIGATOR} component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
