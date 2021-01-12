import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { format } from "date-fns";
import { Color, Spacing } from "../common/styles";
import { DropdownModalCalendar } from "../common/components/DropdownModalCalendar";
interface LocalState {
  selectedDate: any;
}
export default class ScheduleScreen extends React.Component<{}, LocalState> {
  public state = {
    selectedDate: undefined,
  };
  render() {
    return (
      <ScrollView style={styles.rootContainer}>
        <StatusBar barStyle={"light-content"} />
        <View style={{ paddingHorizontal: Spacing.med }}>
          <Text style={styles.headerText}>{"Create an Appointment"}</Text>
          <DropdownModalCalendar
            label={"When"}
            onDayPress={(date) => {
              console.log(date);
              this.setState({
                selectedDate: date.dateString,
              });
            }}
            selectedDate={this.state.selectedDate}
          />
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
    fontSize: 28,
    color: Color.white,
    paddingVertical: Spacing.med,
    paddingLeft: Spacing.micro,
  },
});
