import React from "react";
import { View } from "react-native";

interface DividerProps {
  borderWidth: number;
  borderColor: string;
}

export const Divider = (props: DividerProps) => {
  const { borderWidth, borderColor } = props;
  return <View style={{ backgroundColor: borderColor, height: borderWidth }} />;
};
