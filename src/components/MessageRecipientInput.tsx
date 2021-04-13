import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Spacing, Color } from "../styles";
import { Input } from ".";
import { Ionicons } from "@expo/vector-icons";

interface IMessageRecipientInputProps {
  onChangeText: (text: string) => void;
  onAddRecipientPress: () => void;
  value: string;
}

export const MessageRecipientInput = (props: IMessageRecipientInputProps) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.leftText}>{"To:"}</Text>
      <Input
        style={styles.input}
        selectionColor={Color.greyLight}
        onChangeText={props.onChangeText}
        value={props.value}
      />

      <TouchableOpacity style={{ marginLeft: Spacing.small }} onPress={props.onAddRecipientPress}>
        <Ionicons name={"ios-add-circle-outline"} color={Color.primary} size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.small,
    paddingRight: Spacing.small,
    borderBottomColor: Color.darkThemeGreyMed,
    borderBottomWidth: 1,
  },
  leftText: {
    fontSize: 18,
    color: Color.greyLight,
    paddingHorizontal: Spacing.small,
  },
  input: {
    flex: 1,
    minHeight: 40,
    borderColor: Color.darkThemeGreyMed,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: Color.black,
  },
});
