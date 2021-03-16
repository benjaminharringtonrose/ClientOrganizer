import React from "react";
import { SafeAreaView, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface ScreenContainerProps {
  children: (JSX.Element | null)[] | JSX.Element | null;
  style?: StyleProp<ViewStyle>;
}

export function ScreenContainer(props: ScreenContainerProps) {
  return <SafeAreaView style={[{ flex: 1 }, props.style]}>{props.children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  rootContainer: {},
});
