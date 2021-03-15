import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

interface ScreenContainerProps {
  children: (JSX.Element | null)[] | JSX.Element | null;
  backgroundColor?: string;
}

export function ScreenContainer(props: ScreenContainerProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: props.backgroundColor }}>
      {props.children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {},
});
