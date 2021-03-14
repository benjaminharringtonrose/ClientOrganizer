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
      <View style={[styles.rootContainer, style]}>
        {!!label && <Text style={styles.labelText}>{label}</Text>}

        <TextInput
          {...this.props}
          secureTextEntry={secureTextEntry}
          autoCorrect={false}
          autoCapitalize={autoCapitalize || "none"}
          style={[styles.input, textStyle]}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor ? placeholderTextColor : Color.warmGrey300}
          selectionColor={selectionColor || Color.warmGrey50}
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
    backgroundColor: Color.warmGrey800,
    borderRadius: 5,
    paddingVertical: Spacing.small,
    shadowColor: Color.darkThemeGreyDark,
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.4,
  },
  input: {
    flex: 1,
    paddingRight: Spacing.small,
    paddingLeft: Spacing.small,
    fontSize: 18,
    color: Color.warmGrey50,
  },
  labelText: {
    fontSize: 18,
    paddingLeft: Spacing.med,
    color: Color.warmGrey50,
  },
  valueStyle: {
    fontSize: 16,
    paddingLeft: 20,
    color: Color.white,
  },
});
