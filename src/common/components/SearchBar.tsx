import React, { Component } from "react";
import { Color, Spacing } from "../styles";
import { FontAwesome } from "@expo/vector-icons";
import Input from "./Input";
import { IKeyboard } from "../types";
import { StyleProp, ViewStyle, View } from "react-native";

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
      <View
        style={[
          style,
          {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: Color.warmGrey800,
            borderRadius: 5,
          },
        ]}
      >
        <FontAwesome
          name={"search"}
          size={18}
          color={Color.warmGrey300}
          style={{ paddingLeft: Spacing.small }}
        />
        <Input
          label={""}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder ? placeholder : "Search"}
          secureTextEntry={false}
          keyboardType={keyboardType}
          autoCapitalize={"words"}
        />
      </View>
    );
  }
}
