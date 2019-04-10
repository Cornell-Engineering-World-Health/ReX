import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { pullAllMedicineData } from "../../databaseUtil/databaseUtil";
import moment from "moment";
import { CalendarList } from "react-native-calendars";

const colorScale = ["#ff4949", "#fc7e7e", "#ffaaaa", "#ffcece", "#b7ffca"];

export default class MedicineCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CalendarList
        horizontal={true}
        pagingEnabled={true}
        markingType={"custom"}
        markedDates={this.props.medicine}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "black",
          dayTextColor: "#2d4150",
          textMonthFontWeight: "bold",
          textDayFontSize: 19,
          textMonthFontSize: 24,
          textDayHeaderFontSize: 15
        }}
        onDayPress={day => {
          this.props.onDayPress(day);
        }}
        style={this.props.style}
      />
    );
  }
}

const styles = StyleSheet.create({});
