import React, { Component } from "react";
import { DropdownModal } from "./DropdownModal";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import { Color } from "../../styles";
import { View, StyleProp, ViewStyle } from "react-native";

interface DropdownModalCalendarProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  onDayPress: (date: any) => void;
  selectedDate: any;
}

interface LocalState {
  showModal: boolean;
}
export class DropdownModalCalendar extends Component<DropdownModalCalendarProps, LocalState> {
  public state = {
    showModal: false,
  };

  private onPress = () => {
    this.setState({ showModal: true });
  };

  private onBackdropPress = () => {
    this.setState({ showModal: false });
  };

  public render() {
    const markedDates: any = this.props.selectedDate
      ? { [this.props.selectedDate!]: { selected: true } }
      : { [new Date().toISOString().slice(0, 10)]: { selected: true } };

    return (
      <View style={this.props.style}>
        <DropdownModal
          label={this.props.label}
          onPress={this.onPress}
          value={this.props.selectedDate}
          isVisible={this.state.showModal}
          onBackdropPress={this.onBackdropPress}
          modalTitle={"Select Date"}
        >
          <Calendar
            onDayPress={(date) => {
              this.props.onDayPress(date);
              this.setState({
                showModal: false,
              });
            }}
            markedDates={markedDates}
            theme={{
              calendarBackground: Color.darkThemeGreyMed,
              todayTextColor: Color.white,
              dayTextColor: Color.white,
              textDisabledColor: Color.greyMed,
              arrowColor: Color.white,
              monthTextColor: Color.white,
            }}
          />
        </DropdownModal>
      </View>
    );
  }
}
