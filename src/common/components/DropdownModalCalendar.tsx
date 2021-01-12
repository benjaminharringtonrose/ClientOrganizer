import React, { Component } from "react";
import { DropdownModal } from "./DropdownModal";
import { Calendar } from "react-native-calendars";

interface LocalState {
  selectedDate: any;
  showModal: boolean;
}
export class DropdownModalCalendar extends Component<{}, LocalState> {
  public state = {
    selectedDate: new Date().toISOString().slice(0, 10),
    showModal: false,
  };
  private onPress = () => {
    this.setState({ showModal: true });
  };
  private onBackdropPress = () => {
    this.setState({ showModal: false });
  };
  public render() {
    const markedDates: any = this.state.selectedDate
      ? { [this.state.selectedDate]: { selected: true } }
      : {};

    return (
      <DropdownModal
        onPress={this.onPress}
        value={this.state.selectedDate || "Select Date"}
        isVisible={this.state.showModal}
        onBackdropPress={this.onBackdropPress}
      >
        <Calendar
          onDayPress={(date) => {
            this.setState({ selectedDate: date.dateString, showModal: false });
          }}
          markedDates={markedDates}
        />
      </DropdownModal>
    );
  }
}
