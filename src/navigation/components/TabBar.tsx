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
        backgroundColor: Color.darkThemeGreyDark,
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
              return "ios-person";
            case Routes.POST_SCREEN:
              return "ios-add";
            case Routes.PROFILE_SCREEN:
              return "ios-settings-outline";
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Ionicons
              name={getIconName()}
              color={"white"}
              size={route.name === Routes.POST_SCREEN ? 40 : 20}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
