import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddNewClientScreen from "../screens/AddNewClientScreen";
import ClientDetailScreen from "../screens/ClientDetailsScreen";
import ClientUpdateScreen from "../screens/ClientUpdateScreen";

import Routes from "./routes";
import { Ionicons } from "@expo/vector-icons";
import { Color, Spacing } from "../common/styles";

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
          tabBarIcon: () => <Ionicons name="ios-calendar" size={24} color={Color.white} />,
        }}
      />
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
          tabBarLabel: "Profile",
          tabBarIcon: () => <Ionicons name="ios-person" size={24} color={Color.white} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigator = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.LOGIN_SCREEN}>
        <Stack.Screen
          name={Routes.LOGIN_SCREEN}
          component={LoginScreen}
          options={{ headerTransparent: true, headerTitle: "" }}
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
