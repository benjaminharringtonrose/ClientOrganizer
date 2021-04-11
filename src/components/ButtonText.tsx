import React from "react";
import { Text, View, TouchableOpacity, StyleProp, TextStyle, ViewStyle } from "react-native";

interface IButtonTextProps {
  text: string;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
export function ButtonText(props: IButtonTextProps) {
  return (
    <View style={props.containerStyle}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={props.textStyle}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}
