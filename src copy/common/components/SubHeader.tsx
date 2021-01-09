import React, { Component } from "react";
import { View, Text, StyleSheet, ViewStyle, StyleProp, TextStyle } from "react-native";
import { Spacing } from "../styles/Spacing";
import { Color } from "../styles/Colors";
import { Divider } from "./Divider";

interface HeaderProps {
  label: string;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
}

export default class SubHeader extends Component<HeaderProps> {
  render() {
    const { label, fontSize, style } = this.props;
    return (
      <View style={style}>
        <Text style={[styles.subHeaderText, { fontSize: fontSize ? fontSize : 20 }]}>
          {label}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subHeaderText: {
    color: Color.white,
    paddingLeft: Spacing.micro,
    marginBottom: Spacing.xsmall,
    marginTop: Spacing.xsmall,
  },
});
