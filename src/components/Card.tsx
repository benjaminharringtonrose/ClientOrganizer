import React, { Component } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { Spacing } from "../styles/Spacing";

interface CardProps {
  children: any;
  style?: StyleProp<ViewStyle>;
}

export class Card extends Component<CardProps> {
  public render() {
    const { children, style } = this.props;
    return <View style={[style, styles.containerStyle]}>{children}</View>;
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "transparent",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginTop: Spacing.small,
    marginHorizontal: Spacing.small,
  },
};
