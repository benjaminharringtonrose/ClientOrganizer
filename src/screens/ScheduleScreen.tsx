import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Color, Spacing } from "../styles";
import { DropdownModalCalendar } from "../components/DropdownModalCalendar";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

interface LocalState {
  title: string;
  selectedDate: any;
}
export default function ScheduleScreen() {
  const [state, setState] = useState<LocalState>({
    title: "",
    selectedDate: undefined,
  });

  return (
    <ScrollView style={styles.rootContainer}>
      <StatusBar barStyle={"light-content"} />
      <Card>
        <Text style={styles.headerText}>{"Create an Appointment"}</Text>
        <Input
          label={"Title"}
          value={state.title}
          onChangeText={(title: string) => setState({ ...state, title })}
          style={{ marginBottom: Spacing.small }}
        />
        <DropdownModalCalendar
          label={"When"}
          onDayPress={(date) => {
            console.log(date);
            setState({
              ...state,
              selectedDate: date.dateString,
            });
          }}
          selectedDate={state.selectedDate}
          style={{ marginBottom: Spacing.large }}
        />
        <Button label={"Submit"} onPress={() => {}} />
      </Card>
    </ScrollView>
  );
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
