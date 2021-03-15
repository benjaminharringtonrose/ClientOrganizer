import React, { useEffect, useState } from "react";
import { useAuthState } from "../hooks/useAuthState";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import FeedScreen from "../screens/FeedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostScreen from "../screens/PostScreen";

import Routes from "./routes";
import { TabBar } from "./components/TabBar";
import FindFriendsScreen from "../screens/FindFriendsScreen";

const DashboardTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator tabBar={(props: any) => <TabBar {...props} />}>
      <Tab.Screen name={Routes.FEED_SCREEN} component={FeedScreen} />
      <Tab.Screen name={Routes.POST_SCREEN} component={PostScreen} />
      <Tab.Screen name={Routes.FIND_FRIENDS_SCREEN} component={FindFriendsScreen} />
      <Tab.Screen name={Routes.PROFILE_SCREEN} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const Navigator = () => {
  const Stack = createStackNavigator();
  const isLoggedin = useAuthState();

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        {isLoggedin ? (
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
