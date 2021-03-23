import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLinkProps } from "@react-navigation/native";

interface IButtonBackProps {
  onPress?: () => void;
  iconSize: number;
  iconColor: string;
}

export function ButtonBack(props: IButtonBackProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Ionicons name="md-arrow-back" size={props.iconSize} color={props.iconColor} />
    </TouchableOpacity>
  );
}
