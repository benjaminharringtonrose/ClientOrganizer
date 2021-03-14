import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle, View } from "react-native";
import { Icon } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Color, Spacing } from "../../styles";

interface CellIconActionableProps {
  label?: string;
  labelColor?: string;
  labelRight?: string;
  labelRightColor?: string;
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
          <Icon name={iconLeftName} type={"antdesign"} color={Color.white} size={iconLeftSize} />
        );
      case "minus":
        return (
          <Icon name={iconLeftName} type={"antdesign"} color={Color.white} size={iconLeftSize} />
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
        <Icon name={iconLeftName} type={"antdesign"} color={Color.white} size={iconLeftSize} />;
      default:
        console.warn("May have entered wrong value for icon name.");
        return <View />;
    }
  };
  public render() {
    const {
      label,
      labelColor,
      labelRight,
      labelRightColor,
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
        style={[styles.rootContainer, style]}
      >
        {!!iconLeftName && this.getIcon()}
        <Text style={[styles.labelText, labelColor ? { color: labelColor } : undefined]}>
          {label || " "}
        </Text>
        {!!labelRight && (
          <Text
            style={[
              styles.labelRightText,
              labelRightColor ? { color: labelRightColor } : undefined,
            ]}
          >
            {labelRight}
          </Text>
        )}
        {!!iconRightName && (
          <AntDesign
            name={iconRightName}
            style={styles.icon}
            size={iconRightSize}
            color={iconRightColor || labelRightColor || Color.white}
          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: Spacing.small,
    justifyContent: "flex-end",
  },
  rootContainer: {
    flex: 1,
    flexDirection: "row",
    minHeight: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.warmGrey800,
    borderRadius: 5,
    paddingVertical: Spacing.xsmall,
  },
  labelText: {
    flex: 1,
    fontSize: 18,
    paddingLeft: Spacing.small,
    color: Color.warmGrey50,
  },
  labelRightText: {
    fontSize: 18,
    paddingHorizontal: Spacing.small,
    color: Color.white,
  },
});
