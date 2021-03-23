import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Spacing } from "../styles/Spacing";

type SpinnerType = number | "small" | "large" | undefined;

interface SpinnerProps {
  size: SpinnerType;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export class Spinner extends Component<SpinnerProps> {
  public render() {
    const { size, color, style } = this.props;
    return (
      <View style={styles.spinnerStyle}>
        <ActivityIndicator size={size} style={style} color={color} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.small,
  },
});
