import React, { Component } from "react";
import { View, StyleProp, ViewStyle, ScrollView } from "react-native";
import { Spacing } from "../styles/Spacing";

interface CardProps {
  children: any;
  style?: StyleProp<ViewStyle>;
}

export default class Card extends Component<CardProps> {
  public render() {
    const { children, style } = this.props;
    return (
      <ScrollView style={{ flex: 1 }} indicatorStyle={"white"}>
        <View style={[style, styles.containerStyle]}>{children}</View>
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "transparent",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 10,
    marginHorizontal: Spacing.micro,
  },
};
