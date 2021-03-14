import React, { Component } from "react";
import { Color, Spacing } from "../styles";
import { FontAwesome } from "@expo/vector-icons";
import Input from "./Input";
import { IKeyboard } from "../../types";
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";

interface ISearchBarProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder?: string;
  keyboardType?: IKeyboard;
  style?: StyleProp<ViewStyle>;
}
export default class SearchBar extends Component<ISearchBarProps> {
  public render() {
    const { onChangeText, value, placeholder, keyboardType, style } = this.props;
    return (
      <View style={[style, styles.rootContainer]}>
        <FontAwesome
          name={"search"}
          size={18}
          color={Color.peach}
          style={{ paddingLeft: Spacing.small }}
        />
        <Input
          label={""}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder ? placeholder : "Search"}
          placeholderTextColor={Color.peachDark}
          secureTextEntry={false}
          keyboardType={keyboardType}
          autoCapitalize={"words"}
          selectionColor={Color.peach}
          textStyle={{ color: Color.peach }}
          style={{ backgroundColor: Color.warmGrey900 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.warmGrey900,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Color.peach,
  },
});
