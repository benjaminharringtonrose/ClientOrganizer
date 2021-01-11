import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Color, Spacing } from "../common/styles";
import { Calendar } from "react-native-calendars";

export default class ScheduleScreen extends React.Component {
  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: Color.darkThemeGreyDark,
          paddingTop: Spacing.xxlarge,
        }}
      >
        <StatusBar barStyle={"light-content"} />
        <Text style={{ textAlign: "center", color: Color.white }}>{"Schedule"}</Text>
        <View style={{ flex: 1, borderRadius: 10 }}>
          <Calendar
            onDayPress={(day) => {
              console.log("selected day", day);
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
