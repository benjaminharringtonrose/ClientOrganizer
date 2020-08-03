import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from "react-native";

type SpinnerType = number | "small" | "large" | undefined;

interface SpinnerProps {
  size: SpinnerType;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export default class Spinner extends Component<SpinnerProps> {
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
  },
});
