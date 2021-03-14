import * as React from "react";
import { ViewProps, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

import { Color, Font, Spacing } from "../../common/style";
import { BottomModal } from "./BottomModal";
import { ButtonBottom } from "./ButtonBottom";
import { formatDateForDisplay } from "../util/utilDates";
import { Icon } from "./Icon";
import moment from "moment";

interface IMarkedDates {
  selected?: boolean;
  disabled?: boolean;
  disableTouchEvent?: boolean;
}

export interface HorizontalFieldCalendarPickerProps extends IField, FieldWrapperProps, ViewProps {
  minDate?: string;
  maxDate?: string;
  disabledDatesArray?: string[];
  disabledWeekDays?: number[];
  loadingDates?: boolean;
  title?: string;
}

interface HorizontalFieldCalendarPickerState {
  modalVisible: boolean;
  selectedValue?: string;
}

export class HorizontalFieldCalendarPicker extends React.PureComponent<
  HorizontalFieldCalendarPickerProps,
  HorizontalFieldCalendarPickerState
> {
  private datesCache = new Map();

  constructor(props: HorizontalFieldCalendarPickerProps) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedValue: props?.value,
    };
  }

  private cacheDates(disabledDates: string[], disabledWeekdays: number[]) {
    const [datesString, weekdaysString] = [`${disabledDates}`, `${disabledWeekdays}`];
    const concatDates = datesString + weekdaysString;

    if (!this.datesCache.has(concatDates)) {
      const markedDatesObject = {};
      const DISABLED = { disabled: true, disableTouchEvent: true };

      if (disabledDates.length > 0) {
        // Mark disabledDates dates
        disabledDates.forEach((day) => {
          markedDatesObject[day] = DISABLED;
        });
      }

      if (this.props.maxDate && disabledWeekdays.length > 0) {
        // Get the number of days from now until end of maxDate
        const daysToEndOfRange = moment(this.props.maxDate).diff(moment(), "days");

        for (let i = 1; i < daysToEndOfRange; i++) {
          // Iterate on days and disable the day when matches any {disabledWeekdays}
          const day = moment().add(i, "d");
          disabledWeekdays.forEach((dayOfWeek: number) => {
            if (day.day() === dayOfWeek) {
              markedDatesObject[day.format("YYYY-MM-DD")] = DISABLED;
            }
          });
        }
      }

      this.datesCache.set(concatDates, markedDatesObject);
    }
    return this.datesCache.get(concatDates);
  }

  private onValueChange = (value: any) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(value, this.props.name);
    }
    this.onCloseModal();
  };
  public focus() {
    this.onSelectDropdown();
  }

  private getMarkedDates = (
    selectedValue?: string,
    disabledDatesArray: string[] = [],
    disabledWeekDays: number[] = []
  ) => {
    const markedDatesObject: any = selectedValue ? { [selectedValue]: { selected: true } } : {};
    return {
      ...markedDatesObject,
      ...this.cacheDates(disabledDatesArray, disabledWeekDays),
    };
  };

  private onSelectDropdown = () => {
    this.setState({ modalVisible: true });
  };

  private onCloseModal = () => {
    this.setState({ modalVisible: false });
  };

  public render() {
    const {
      bottomBarDisabled,
      description,
      disabled,
      disabledDatesArray,
      disabledWeekDays,
      error,
      focused,
      maxDate,
      minDate,
      name,
      style,
      testID,
      title,
      touched,
      value,
    } = this.props;

    const markedDatesObject = this.getMarkedDates(
      this.state.selectedValue,
      disabledDatesArray,
      disabledWeekDays
    );

    return (
      <React.Fragment>
        <TouchableOpacity
          testID={`${testID}-horizontalFieldCalendarPicker-touchableOpacity`}
          onPress={this.onSelectDropdown}
        >
          <FieldWrapper
            bottomBarDisabled={bottomBarDisabled}
            description={description}
            disabled={disabled}
            error={error}
            focused={focused}
            style={style}
            testID={testID}
            touched={touched}
          >
            <View style={styles.fieldWrapperContentContainer}>
              <View style={styles.fieldContent}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text testID={"selectedDate"} style={styles.value}>
                    {formatDateForDisplay(value, "descriptive")}
                  </Text>
                </View>
              </View>
              <View style={styles.iconContainer}>
                <Icon apitureFont color={Color.greyDark} name="caret-down" size={18} />
              </View>
            </View>
          </FieldWrapper>
        </TouchableOpacity>

        <BottomModal
          title={title || name}
          isVisible={this.state.modalVisible}
          onBackdropPress={this.onCloseModal}
        >
          <Calendar
            minDate={minDate}
            maxDate={maxDate}
            markedDates={markedDatesObject}
            theme={{
              selectedDayBackgroundColor: Color.brandActive,
              selectedDayTextColor: Color.white,
              todayTextColor: Color.brandActive,
              monthTextColor: Color.black,
              textDayFontWeight: "400",
              textDayFontFamily: Font.body.fontFamily,
              textMonthFontSize: Font.headingM.fontSize,
              textDisabledColor: Color.greyMedDark,
              textDayHeaderFontFamily: Font.body.fontFamily,
              textDayHeaderFontSize: Font.body.fontSize,
            }}
            renderArrow={(direction) => (
              <Icon apitureFont color={Color.brandActive} name={`caret-${direction}`} size={24} />
            )}
            enableSwipeMonths={true}
            onDayPress={(day) => {
              this.setState({ selectedValue: day.dateString });
            }}
          />
          <ButtonBottom
            label={"Select"}
            onPress={() => {
              this.onValueChange(this.state.selectedValue);
            }}
          />
        </BottomModal>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  fieldContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Spacing.micro,
  },
  fieldWrapperContentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
  },
  title: {
    ...Font.headingS,
    color: Color.black,
  },
  titleContainer: {
    flex: 1,
  },
  value: {
    ...Font.headingS,
    color: Color.greyDark,
    textAlign: "right",
  },
  valueContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
