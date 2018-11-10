import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import constants from '../Resources/constants.js';

//MONTHS allows for indices to map to month values
const MONTHS = constants.MONTH;

//Gives months in the form 'JAN', 'FEB' etc
const SHORTENED_MONTHS = constants.SHORTENED_MONTH;

/*
List of potential symptoms. For TESTING PURPOSES, will only use Headache and Back Pain.
*/
const SYMPTOMS = ['Headache', 'Back Pain'];

/*
List of potential modes.

Modes are defined as data that can be graphed over time.

For now, only Frequency and Duration are allowed.
*/
const MODES = ['Frequency', 'Duration'];

export default class Trends extends React.Component {
  constructor(props) {
    super(props);

    /*
      Get current month and year, and default to month view.
    */
    let currDate = new Date();
    let currMonth = currDate.getMonth();
    let currYear = currDate.getFullYear();

    this.state = {
      selectedMonth: currMonth /*index of the current month where -1 corresponds to no selected month.
                                 [int where -1 <= selectedMonth < 12] */,
      selectedYear: currYear,
      selectedSymptom: SYMPTOMS[0], //start with "Headache"
      selectedMode: MODES[0] // start with 'Frequency'
    };
  }

  /*
    Based on selectedMonth and selectedYear (values in state),
    returns a date of the form: Jan '18
  */
  getShortenedDate() {
    let prefix = "'";
    let shortYear = this.state.selectedYear % 100;

    return SHORTENED_MONTHS[currMonth] + ' ' + prefix + shortYear;
  }

  /*
  Based on selectedMonth and selectedYear (values in state),
   returns a date of the form: January 2018
  */
  getFullDate() {
    return MONTHS[this.state.selectedMonth] + ' ' + this.state.selectedYear;
  }

  /*
  Return title in the form of
  '<Mode> of <Selected Symptom> <shortened date>'

  Mode and Selected symptoms are from state, and shortened date
  is full when month is -1, and just the last two digits when month is defined.
  */
  getTitle() {
    let date = '';
    let month = this.state.selectedMonth;
    let year = this.state.selectedYear;
    if (this.state.selectedMonth > -1) {
      date = '' + month + '/' + year % 1000;
    } else {
      date = '' + year;
    }

    return this.state.selectedMode + ' of ' + this.state.selectedSymptom + date;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.graphContainer} />
        <View style={styles.footer} />>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
