import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Color } from "../styles/Colors";
import { Spacing } from "../styles/Spacing";

interface InputProps {
  label: string;
  value: string;
  onChangeText: any;
  placeholder?: string;
  secureTextEntry: boolean;
  maxLength?: number;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad"
    | "decimal-pad"
    | "visible-password"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "name-phone-pad"
    | "twitter"
    | "web-search"
    | undefined;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: string;
  selectionColor?: string;
}

export default class Input extends Component<InputProps> {
  public render() {
    const {
      label,
      value,
      onChangeText,
      secureTextEntry,
      maxLength,
      keyboardType,
      style,
      textStyle,
      placeholder,
      placeholderTextColor,
      selectionColor,
    } = this.props;
    return (
      <View style={[style, styles.containerStyle]}>
        {!!label && <Text style={styles.labelStyle}>{label}</Text>}

        <TextInput
          secureTextEntry={secureTextEntry}
          autoCorrect={false}
          autoCapitalize={"none"}
          style={[textStyle, styles.inputStyle]}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          selectionColor={selectionColor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    paddingRight: Spacing.small,
    paddingLeft: Spacing.small,
    fontSize: 16,
    lineHeight: 23,
    color: Color.white,
    alignSelf: "center",
  },
  labelStyle: {
    fontSize: 16,
    paddingLeft: Spacing.med,
    color: Color.greyMed,
  },
  valueStyle: {
    fontSize: 16,
    paddingLeft: 20,
    color: Color.white,
  },
  containerStyle: {
    flex: 1,
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
  },
});
