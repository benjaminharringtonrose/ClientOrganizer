import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Color, Spacing } from "../styles";

interface ButtonProps {
  onPress: any;
  label: any;
  labelSize?: number;
  style?: StyleProp<ViewStyle>;
}

export class Button extends Component<ButtonProps> {
  public render() {
    const { label, labelSize, onPress, style } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]}>
        <Text style={[styles.textStyle, { fontSize: labelSize || 18 }]}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: "center",
    paddingVertical: 10,
    color: Color.white,
  },
  buttonStyle: {
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 5,
    backgroundColor: Color.darkThemeGreyMed,
    shadowColor: Color.darkThemeGreyDark,
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.4,
  },
});
