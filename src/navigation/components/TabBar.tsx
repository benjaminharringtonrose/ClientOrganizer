import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Color } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import Routes from "../routes";
import { connect } from "react-redux";

interface IPropsFromState {
  avatar: string;
}

function TabBar(props: any) {
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
              return <Ionicons name={"ios-home-outline"} color={"white"} size={20} />;
            case Routes.POST_SCREEN:
              return <Ionicons name={"ios-add-circle-outline"} color={"white"} size={20} />;
            case Routes.PROFILE_SCREEN:
              return <Ionicons name={"ios-settings-outline"} color={"white"} size={20} />;
            case Routes.FIND_FRIENDS_SCREEN:
              return <Ionicons name={"ios-person-add-outline"} color={"white"} size={20} />;
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
    </View>
  );
}

const mapStateToProps = (state: any) => {
  return {
    avatar: state.user?.user?.avatar,
  };
};

export default connect(mapStateToProps, {})(TabBar);
