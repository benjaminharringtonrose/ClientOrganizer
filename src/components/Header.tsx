import React from "react";
import { View, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Spacing, Color, TextStyles } from "../styles";

interface IHeaderProps {
  headerLeft?: JSX.Element | null;
  title?: string;
  headerCenter?: JSX.Element | null;
  headerRight?: JSX.Element | null;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Header(props: IHeaderProps) {
  return (
    <View style={[styles.rootContainer, props.containerStyle]}>
      <View style={styles.leftContainer}>{props.headerLeft}</View>
      <View style={styles.centerContainer}>
        <Text style={[TextStyles.header, props.titleStyle]}>{props.title}</Text>
      </View>
      <View style={styles.rightContainer}>{props.headerRight}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    minHeight: 50,
    justifyContent: "space-between",
    paddingBottom: Spacing.small,
    borderBottomColor: Color.darkThemeGreyMed,
    borderBottomWidth: 1,
  },
  leftContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: { fontWeight: "500", color: Color.white },
});
