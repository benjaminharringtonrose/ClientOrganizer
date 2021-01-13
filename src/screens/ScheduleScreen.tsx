import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Color, Spacing } from "../common/styles";
import { DropdownModalCalendar } from "../common/components/DropdownModalCalendar";
import Input from "../common/components/Input";
import Button from "../common/components/Button";
import Card from "../common/components/Card";

interface LocalState {
  title: string;
  selectedDate: any;
}
export default class ScheduleScreen extends React.Component<{}, LocalState> {
  public state = {
    title: "",
    selectedDate: undefined,
  };
  render() {
    return (
      <ScrollView style={styles.rootContainer}>
        <StatusBar barStyle={"light-content"} />
        <Card>
          <Text style={styles.headerText}>{"Create an Appointment"}</Text>
          <Input
            label={"Title"}
            value={this.state.title}
            onChangeText={(title: string) => this.setState({ title })}
            style={{ marginBottom: Spacing.small }}
          />
          <DropdownModalCalendar
            label={"When"}
            onDayPress={(date) => {
              console.log(date);
              this.setState({
                selectedDate: date.dateString,
              });
            }}
            selectedDate={this.state.selectedDate}
            style={{ marginBottom: Spacing.large }}
          />
          <Button label={"Submit"} onPress={() => {}} />
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Color.darkThemeGreyMed,
    paddingTop: Spacing.xlarge,
  },
  headerText: {
    fontSize: 30,
    color: Color.warmGrey200,
    paddingVertical: Spacing.med,
    paddingLeft: Spacing.micro,
  },
});
