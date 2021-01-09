import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Spacing } from "../styles/Spacing";
import { Color } from "../styles/Colors";

interface ButtonProps {
  onPress: any;
  label: any;
  labelSize?: number;
  style?: StyleProp<ViewStyle>;
}

export default class Button extends Component<ButtonProps> {
  public render() {
    const { label, labelSize, onPress, style } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[style, styles.buttonStyle]}>
        <Text style={[styles.textStyle, { fontSize: labelSize || 18 }]}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: "center",
    fontWeight: "600",
    paddingVertical: 10,
    color: Color.white,
  },
  buttonStyle: {
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 5,
    marginLeft: Spacing.micro,
    marginRight: Spacing.micro,
    backgroundColor: Color.darkThemeGreyMed,
  },
});
