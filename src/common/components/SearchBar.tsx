import React, { Component } from "react";
import { Color } from "../styles/Colors";
import { Spacing } from "../styles/Spacing";
import { FontAwesome } from "@expo/vector-icons";
import Input from "./Input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IKeyboard } from "../types";
import { StyleProp, ViewStyle } from "react-native";

interface ISearchBarProps {
  onChangeText: (text: string) => void;
  value: string;
  onPress?: () => void;
  placeholder?: string;
  keyboardType?: IKeyboard;
  style?: StyleProp<ViewStyle>;
}
export default class SearchBar extends Component<ISearchBarProps> {
  public render() {
    const { onChangeText, value, placeholder, onPress, keyboardType } = this.props;
    return (
      <>
        <Input
          label={""}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder ? placeholder : "Search"}
          placeholderTextColor={Color.greyMedDark}
          secureTextEntry={false}
          selectionColor={Color.greyLight}
          keyboardType={keyboardType}
          autoCapitalize={"words"}
        />
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          onPress={onPress}
        >
          <FontAwesome
            name={"search"}
            size={18}
            color={Color.white}
            style={{ paddingRight: Spacing.small }}
          />
        </TouchableOpacity>
      </>
    );
  }
}
