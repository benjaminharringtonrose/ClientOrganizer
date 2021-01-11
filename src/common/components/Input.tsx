import React, { Component } from "react";
import { TextInput, View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Color, Spacing } from "../styles";

interface InputProps {
  label?: string;
  value?: string;
  onChangeText: any;
  placeholder?: string;
  secureTextEntry?: boolean;
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
  onSubmitEditting?: () => void;
  returnKeyType?: "default" | "go" | "next" | "previous";
  returnKeyLabel?: string;
  autoCapitalize?: "words" | "characters" | "sentences";
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
      onSubmitEditting,
      returnKeyType,
      returnKeyLabel,
      autoCapitalize,
    } = this.props;
    return (
      <View style={[style, styles.rootContainer]}>
        {!!label && <Text style={styles.labelText}>{label}</Text>}

        <TextInput
          {...this.props}
          secureTextEntry={secureTextEntry}
          autoCorrect={false}
          autoCapitalize={autoCapitalize || "none"}
          style={[textStyle, styles.input]}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor ? placeholderTextColor : Color.darkThemeGrey}
          selectionColor={selectionColor}
          onSubmitEditing={onSubmitEditting}
          returnKeyType={returnKeyType}
          returnKeyLabel={returnKeyLabel}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingRight: Spacing.small,
    paddingLeft: Spacing.small,
    fontSize: 16,
    color: Color.white,
  },
  labelText: {
    fontSize: 16,
    paddingLeft: Spacing.med,
    color: Color.greyMed,
  },
  valueStyle: {
    fontSize: 16,
    paddingLeft: 20,
    color: Color.white,
  },
});
