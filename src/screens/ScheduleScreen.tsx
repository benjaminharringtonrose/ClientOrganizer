import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Color, Spacing } from "../common/styles";
import { DropdownModalCalendar } from "../common/components/DropdownModalCalendar";

export default class ScheduleScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.rootContainer}>
        <StatusBar barStyle={"light-content"} />
        <View style={{ paddingHorizontal: Spacing.med }}>
          <Text style={styles.headerText}>{"Create an Appointment"}</Text>
          <DropdownModalCalendar />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Color.darkThemeGreyDark,
    paddingTop: Spacing.xxlarge,
  },
  headerText: {
    fontSize: 20,
    color: Color.white,
    paddingVertical: Spacing.xsmall,
    paddingLeft: Spacing.micro,
  },
});
