import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle, View } from "react-native";
import { Icon } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import CardSection from "../components/CardSection";
import { Spacing } from "../styles/Spacing";
import { Color } from "../styles/Colors";

interface CellIconActionableProps {
  label?: string;
  labelColor?: string;
  labelRight?: string;
  onPress: () => void;
  iconLeftName?: "plus" | "minus" | "book" | "right" | "left";
  iconLeftColor?: string;
  iconLeftSize?: number;
  iconRightName?: string;
  iconRightColor?: string;
  iconRightSize?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

export default class CellIconActionable extends Component<CellIconActionableProps> {
  private getIcon = () => {
    const { iconLeftName, iconLeftSize } = this.props;
    switch (iconLeftName) {
      case "plus":
        return (
          <Icon
            name={iconLeftName}
            type={"antdesign"}
            color={Color.white}
            size={iconLeftSize}
          />
        );
      case "minus":
        return (
          <Icon
            name={iconLeftName}
            type={"antdesign"}
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
      case "right":
        <Icon
          name={iconLeftName}
          type={"antdesign"}
          color={Color.white}
          size={iconLeftSize}
        />;
      default:
        console.warn("May have entered wrong value for icon name.");
        return <View />;
    }
  };
  public render() {
    const {
      label,
      labelRight,
      onPress,
      iconLeftName,
      iconRightName,
      iconRightSize,
      iconRightColor,
      style,
      disabled,
    } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled || false}
        onPress={onPress}
        style={[style, styles.touchable]}
      >
        <CardSection style={[style, styles.cardSectionContainer]}>
          {iconLeftName && this.getIcon()}
          <Text style={styles.labelText}>{label || " "}</Text>
          {labelRight && <Text style={styles.labelRightText}>{labelRight || " "}</Text>}
          {iconRightName && (
            <AntDesign
              name={iconRightName}
              style={styles.icon}
              size={iconRightSize}
              color={iconRightColor || Color.white}
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
    paddingVertical: Spacing.small,
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
    fontSize: 18,
    paddingLeft: Spacing.small,
    color: Color.white,
  },
  labelRightText: {
    fontSize: 18,
    paddingHorizontal: Spacing.small,
    color: Color.white,
  },
});
