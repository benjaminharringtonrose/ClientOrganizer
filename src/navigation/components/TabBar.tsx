import React from "react";
import { View, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { Color, Spacing } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { Routes } from "../routes";
import { connect } from "react-redux";

interface IPropsFromState {
  avatar: string;
}

function TabBar(props: any) {
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        borderTopColor: Color.darkThemeGreyMed,
        borderTopWidth: 0.5,
        borderBottomColor: Color.darkThemeGreyMed,
        borderBottomWidth: 0.5,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: Spacing.med,
      }}
    >
      {props.state.routes.map((route: any, index: any) => {
        const isFocused = props.state.index === index;
        const onPress = () => {
          const event = props.navigation.emit({
            type: "tabPress",
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name);
          }
        };

        const getIcon = () => {
          switch (route.name) {
            case Routes.FEED_SCREEN:
              return (
                <Ionicons
                  name={isFocused ? "ios-home" : "ios-home-outline"}
                  color={isFocused ? Color.white : Color.greyMed}
                  size={20}
                />
              );
            case Routes.POST_SCREEN:
              return (
                <Ionicons
                  name={isFocused ? "ios-add-circle" : "ios-add-circle-outline"}
                  color={isFocused ? Color.white : Color.greyMed}
                  size={20}
                />
              );
            case Routes.PROFILE_SCREEN:
              return (
                <Ionicons
                  name={isFocused ? "ios-settings" : "ios-settings-outline"}
                  color={isFocused ? Color.white : Color.greyMed}
                  size={20}
                />
              );
            case Routes.FIND_FRIENDS_SCREEN:
              return (
                <Ionicons
                  name={isFocused ? "ios-person-add" : "ios-person-add-outline"}
                  color={isFocused ? Color.white : Color.greyMed}
                  size={20}
                />
              );
            case Routes.FRIENDS_LIST_SCREEN:
              return (
                <Ionicons
                  name={isFocused ? "people" : "people-outline"}
                  color={isFocused ? Color.white : Color.greyMed}
                  size={20}
                />
              );
            case Routes.FRIENDS_TABS:
              return (
                <Ionicons
                  name={isFocused ? "ios-person-add" : "ios-person-add-outline"}
                  color={isFocused ? Color.white : Color.greyMed}
                  size={20}
                />
              );
            case Routes.MESSAGE_NAVIGATOR:
              return (
                <Ionicons
                  name={isFocused ? "ios-chatbox-ellipses" : "ios-chatbox-ellipses-outline"}
                  color={isFocused ? Color.white : Color.greyMed}
                  size={20}
                />
              );
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            {getIcon()}
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}

const mapStateToProps = (state: any) => {
  return {
    avatar: state.user?.user?.avatar,
  };
};

export default connect(mapStateToProps, {})(TabBar);
