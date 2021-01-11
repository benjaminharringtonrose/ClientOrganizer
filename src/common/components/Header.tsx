import React, { Component } from "react";
import { View, Text, StyleSheet, ViewStyle, StyleProp, TextStyle } from "react-native";
import { Color, Spacing } from "../styles";

interface HeaderProps {
  title: string;
  description: string;
  subdescription?: string;
  style?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  descriptionTextStyle?: StyleProp<TextStyle>;
}

export default class Header extends Component<HeaderProps> {
  render() {
    const { title, description, subdescription, style } = this.props;
    return (
      <View style={[style, styles.headerContainer]}>
        <Text style={[styles.titleText]}>{title}</Text>
        <Text style={[styles.descriptionText]}>{description}</Text>
        <Text style={[styles.subdescriptionText]}>{subdescription}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    position: "relative",
    backgroundColor: Color.darkThemeGreyDark,
    borderBottomWidth: 1,
    borderBottomColor: Color.white,
  },
  // TEXTS //
  titleText: {
    fontSize: 30,
    color: Color.greyLight,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 18,
    color: Color.darkThemeBlueGrey,
    textAlign: "center",
  },
  subdescriptionText: {
    fontSize: 16,
    color: Color.greyLight,
    textAlign: "center",
    marginTop: Spacing.small,
  },
});
