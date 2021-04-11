import React from "react";
import { TouchableOpacity, StyleProp, ViewStyle, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IButtonBackProps {
  onPress?: () => void;
  iconSize: number;
  iconColor: string;
  style?: StyleProp<ViewStyle>;
}

export function ButtonBack(props: IButtonBackProps) {
  return (
    <View style={props.style}>
      <TouchableOpacity onPress={props.onPress}>
        <Ionicons name="md-arrow-back" size={props.iconSize} color={props.iconColor} />
      </TouchableOpacity>
    </View>
  );
}
