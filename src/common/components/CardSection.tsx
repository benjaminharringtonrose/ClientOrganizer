import React, { Component } from "react";
import { View, ViewStyle, StyleProp, StyleSheet } from "react-native";
import { Color } from "../styles/Colors";
import { Spacing } from "../styles/Spacing";

interface CardSectionProps {
  children: any;
  style?: StyleProp<ViewStyle>;
}

export default class CardSection extends Component<CardSectionProps> {
  public render() {
    const { children, style } = this.props;
    return <View style={[styles.containerStyle, style]}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.darkThemeGreyMed,
    backgroundColor: Color.darkThemeGreyMed,
    padding: 2,
    flexDirection: "row",
    position: "relative",
    marginBottom: Spacing.small,
  },
});
