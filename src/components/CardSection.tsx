import React, { Component } from "react";
import { View, ViewStyle, StyleProp, StyleSheet } from "react-native";

interface CardSectionProps {
  children: any;
  style?: StyleProp<ViewStyle>;
}

export class CardSection extends Component<CardSectionProps> {
  public render() {
    const { children, style } = this.props;
    return <View style={[styles.containerStyle, style]}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
  },
});
