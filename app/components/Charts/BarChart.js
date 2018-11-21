import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';
import { BarChart, YAxis, Grid, XAxis } from 'react-native-svg-charts';
import moment from 'moment';
import constants, { COLOR } from '../Resources/constants.js';
//Gives months in the form 'JAN', 'FEB' etc
const SHORTENED_MONTHS = constants.SHORTENED_MONTH;

/*
Used to distinguish month view and year view
*/
const VIEWS = ['MONTH_VIEW', 'YEAR_VIEW'];

const screenWidth = Dimensions.get('window').width;

/*
props
view:     one of the constants defined above in VIEWS (ex: VIEWS[0])
month     int corresponding to the index of the month (0 corresponding to January)
year      int corresponding to the year
data      list of data (list of ONLY int values)
*/

export default class Bar extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderXAxis() {
    return this.props.view == VIEWS[0]
      ? this._renderMonthAxis()
      : this._renderYearAxis();
  }

  _renderMonthAxis() {
    let xAxis = [];
    let daysInMonth = moment(
      this.props.year + '-' + (this.props.month + 1),
      'YYYY-MM'
    ).daysInMonth();
    let interval = 5;
    let width = screenWidth * 0.95 / daysInMonth * interval;
    for (var x = 0; x < daysInMonth; x++) {
      //  {x % 5 == 0 ? x : ''}
      if (x % interval == 0) {
        xAxis.push(
          <View key={x} style={{ width: width, height: 10 }}>
            <Text style={styles.xAxisNumbers}>{x + 1}</Text>
          </View>
        );
      }
    }
    return xAxis;
  }

  _renderYearAxis() {
    let xAxis = [];
    let interval = 2;
    let width = screenWidth * 0.95 / 12 * interval;
    for (var x = 0; x < 12; x++) {
      if (x % interval == 0) {
        xAxis.push(
          <View key={x} style={{ width: width }}>
            <Text style={styles.xAxisNumbers}>{SHORTENED_MONTHS[x]}</Text>
          </View>
        );
      }
    }
    return xAxis;
  }

  render() {
    const contentInset = { top: 20, bottom: 10 };
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <YAxis
            data={this.props.data}
            contentInset={contentInset}
            svg={{
              fill: 'grey',
              fontSize: 10
            }}
            numberOfTicks={10}
            style={{ width: screenWidth * 0.05, marginBottom: 12 }}
          />
          <BarChart
            animate
            style={{
              width: screenWidth * 0.95
            }}
            data={this.props.data}
            svg={{
              stroke: COLOR.cyan,
              fill: '#474747'
            }}
            contentInset={contentInset}
          />
        </View>
        <View style={styles.xAxis}>{this._renderXAxis()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    width: screenWidth * 0.95,
    flex: 1,
    flexDirection: 'row'
  },
  xAxis: {
    flexDirection: 'row',
    width: screenWidth * 0.95,
    height: 20,
    alignSelf: 'flex-end'
  },
  xAxisNumbers: {
    fontSize: 12
  }
});
