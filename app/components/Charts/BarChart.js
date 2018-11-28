import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';
import { BarChart, YAxis, Grid } from 'react-native-svg-charts';
import moment from 'moment';
import constants, { COLOR } from '../../resources/constants.js';
import { G, Line } from 'react-native-svg';

/*Dual gridlines*/
const CustomGrid = ({ x, y, data, ticks }) => (
  <G>
    {// Horizontal grid
    ticks.map(tick => (
      <Line
        key={tick}
        x1={'0%'}
        x2={'100%'}
        y1={y(tick)}
        y2={y(tick)}
        stroke={'rgba(0,0,0,0.1)'}
      />
    ))}
    {// Vertical grid
    data.map((_, index) => (
      <Line
        key={index}
        y1={'0%'}
        y2={'100%'}
        x1={x(index)}
        x2={x(index)}
        stroke={'rgba(0,0,0,0.1)'}
      />
    ))}
  </G>
);

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

    for (var x = 0; x <= daysInMonth; x += interval) {
      //  {x % 5 == 0 ? x : ''}
      xAxis.push(
        <View
          key={x}
          style={{
            width: width,
            height: 20
          }}
        >
          <Text style={styles.xAxisNumbers}>{x + 1}</Text>
        </View>
      );
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

    const width = screenWidth * 0.05;
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {this.props.noData ? (
            <View style={styles.noDataOverlay}>
              <Text style={styles.noDataText}>Nothing Logged!</Text>
            </View>
          ) : null}
          <YAxis
            data={this.props.data}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{
              fill: 'grey',
              fontSize: 12
            }}
            style={{ width: width }}
            min={0}
          />
          <BarChart
            showGrid
            xMax={this.props.data.length}
            xMin={0}
            animate
            style={{
              width: screenWidth * 0.95
            }}
            data={this.props.data}
            svg={{
              fill: '#474747'
            }}
            contentInset={contentInset}
            gridMin={0}
          >
            {this.props.noData ? null : <CustomGrid belowChart={true} />}
          </BarChart>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  xAxis: {
    flexDirection: 'row',
    width: screenWidth * 0.95,
    height: 20,
    alignSelf: 'flex-end'
  },
  xAxisNumbers: {
    fontSize: 12,
    fontWeight: '100'
  },
  noDataOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noDataText: {
    fontSize: 35,
    fontWeight: '200'
  }
});
