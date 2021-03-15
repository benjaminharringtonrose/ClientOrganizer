import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Color } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import Routes from "../routes";

export function TabBar({ state, navigation }: any) {
  return (
    <View
      style={{
        flexDirection: "row",
        borderTopColor: Color.darkThemeGreyMed,
        borderTopWidth: 0.5,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {state.routes.map((route: any, index: any) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIconName = () => {
          switch (route.name) {
            case Routes.FEED_SCREEN:
              return "ios-home-outline";
            case Routes.POST_SCREEN:
              return "ios-add-circle-outline";
            case Routes.PROFILE_SCREEN:
              return "ios-settings-outline";
            case Routes.FIND_FRIENDS_SCREEN:
              return "ios-person-add-outline";
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Ionicons name={getIconName()} color={"white"} size={20} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
