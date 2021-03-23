import React from "react";
import { View, Text } from "react-native";
import { Color } from "../styles";
import { ScreenContainer } from "../components";

export function CreateMessageScreen() {
  return (
    <ScreenContainer>
      <Text style={{ fontSize: 40, color: Color.white }}>{"CREATE MESSAGE SCREEN"}</Text>
    </ScreenContainer>
  );
}
