import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Spacing, Color } from "../styles";

interface IBubbleSenderProps {
  message?: string;
}

export const BubbleSender = (props: IBubbleSenderProps) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.bubbleContainer}>
        <Text style={styles.text}>{props.message}</Text>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginBottom: Spacing.micro,
    marginHorizontal: Spacing.small,
  },
  bubbleContainer: {
    flex: 1,
    paddingVertical: Spacing.xsmall,
    paddingHorizontal: Spacing.med,
    backgroundColor: Color.primary,
    borderRadius: 20,
    width: screenWidth * 0.8,
  },
  text: {
    color: Color.white,
    fontSize: 18,
  },
});
