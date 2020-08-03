import React, { FC } from "react";
import {
  TouchableOpacity,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Text } from "react-native";
import { Spacing } from "../styles/Spacing";

interface TouchableTextProps {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TouchableText = (props: TouchableTextProps) => {
  const { text, textStyle, onPress, style } = props;
  return (
    <TouchableOpacity style={[style, styles.touchableLoginContainer]} onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableLoginContainer: {
    justifyContent: "center",
    alignSelf: "center",
  },
});
