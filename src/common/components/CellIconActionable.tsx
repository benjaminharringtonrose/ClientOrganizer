import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle, View } from "react-native";
import { Icon } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import CardSection from "../components/CardSection";
import { Spacing } from "../styles/Spacing";
import { Color } from "../styles/Colors";

interface CellIconActionableProps {
  label: string;
  labelColor?: string;
  onPress: any;
  iconLeftName?: string;
  iconLeftColor?: string;
  iconLeftSize?: number;
  iconRightName?: string;
  iconRightColor?: string;
  iconRightSize?: number;
  style?: ViewStyle;
}

export default class CellIconActionable extends Component<CellIconActionableProps> {
  private getIcon = () => {
    const { iconLeftName, iconLeftSize, iconLeftColor } = this.props;
    switch (iconLeftName) {
      case "guitar":
        return (
          <Icon
            name={iconLeftName}
            type={"font-awesome-5"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "language":
        return (
          <Icon
            name={iconLeftName}
            type={"font-awesome-5"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "paint-brush":
        return (
          <Icon
            name={iconLeftName}
            type={"font-awesome-5"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "book":
        return (
          <Icon
            name={iconLeftName}
            type={"font-awesome-5"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "baseball-ball":
        return (
          <Icon
            name={iconLeftName}
            type={"font-awesome-5"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "baseball-bat":
        return (
          <Icon
            name={iconLeftName}
            type={"material-community"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "basketball-hoop":
        return (
          <Icon
            name={iconLeftName}
            type={"material-community"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "golf":
        return (
          <Icon
            name={iconLeftName}
            type={"material-community"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "swimmer":
        return (
          <Icon
            name={iconLeftName}
            type={"font-awesome-5"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "piano":
        return (
          <Icon
            name={iconLeftName}
            type={"material-community"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "modern-mic":
        return (
          <Icon
            name={iconLeftName}
            type={"entypo"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "ios-musical-note":
        return (
          <Icon
            name={iconLeftName}
            type={"ionicon"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "violin":
        return (
          <Icon
            name={iconLeftName}
            type={"material-community"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "soccer":
        return (
          <Icon
            name={iconLeftName}
            type={"material-community"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      default:
        console.warn("May have entered wrong value for icon name.");
        return <View />;
    }
  };
  public render() {
    const {
      label,
      onPress,
      iconLeftName,
      iconRightName,
      iconRightSize,
      style,
    } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[style, styles.touchable]}>
        <CardSection style={[style, styles.cardSectionContainer]}>
          {iconLeftName && this.getIcon()}
          <Text style={styles.labelText}>{label}</Text>
          {iconRightName && (
            <AntDesign
              name={iconRightName}
              style={styles.icon}
              size={iconRightSize}
              color={Color.white}
            />
          )}
        </CardSection>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cardSectionContainer: {
    alignItems: "center",
    paddingVertical: Spacing.med,
    paddingHorizontal: Spacing.med,
  },
  icon: {
    paddingRight: Spacing.small,
    justifyContent: "flex-end",
  },
  touchable: {
    backgroundColor: "transparent",
  },
  labelText: {
    flex: 1,
    fontSize: 20,
    paddingLeft: Spacing.small,
    color: Color.white,
  },
});
