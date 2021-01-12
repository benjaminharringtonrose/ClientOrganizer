import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { format } from "date-fns";
import { Color, Spacing } from "../common/styles";
import { DropdownModalCalendar } from "../common/components/DropdownModalCalendar";
import CardSection from "../common/components/CardSection";
import Input from "../common/components/Input";
import SubHeader from "../common/components/SubHeader";
import CellLabelCenterActionable from "../common/components/CellLabelCenterActionable";

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
        <View style={{ paddingHorizontal: Spacing.med }}>
          <Text style={styles.headerText}>{"Create an Appointment"}</Text>
          <CardSection>
            <Input
              label={"Title"}
              value={this.state.title}
              onChangeText={(title: string) => this.setState({ title })}
            />
          </CardSection>
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
          <View style={{ marginTop: Spacing.xlarge }}>
            <CellLabelCenterActionable label={"Submit"} onPress={() => {}} />
          </View>
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
