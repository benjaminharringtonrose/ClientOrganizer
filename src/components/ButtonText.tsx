import React from "react";
import { Text, View, TouchableOpacity, StyleProp, TextStyle } from "react-native";

interface IButtonTextProps {
  text: string;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
}
export function ButtonText(props: IButtonTextProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={props.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
}
