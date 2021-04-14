import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Spacing, Color } from "../styles";
import { Input } from ".";
import { Ionicons } from "@expo/vector-icons";

interface IMeaasgeSenderInputProps {
  onChangeText: (text: string) => void;
  value: string;
  onCameraPress: () => void;
  onSendPress: () => void;
}

export const MessageSenderInput = (props: IMeaasgeSenderInputProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: Spacing.small,
        paddingRight: Spacing.small,
        borderTopColor: Color.darkThemeGreyMed,
        borderTopWidth: 1,
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: Spacing.small,
        }}
        onPress={props.onCameraPress}
      >
        <Ionicons name="md-camera" size={32} color={Color.darkThemeGrey} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          minHeight: 30,
          borderColor: Color.darkThemeGreyMed,
          borderWidth: 2,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: Spacing.micro,
        }}
      >
        <Input
          style={{ backgroundColor: "transparent" }}
          selectionColor={Color.greyLight}
          onChangeText={props.onChangeText}
          value={props.value}
        />
        <TouchableOpacity style={{ paddingRight: Spacing.small }} onPress={props.onSendPress}>
          <Ionicons name={"ios-send"} color={Color.darkThemeGrey} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
