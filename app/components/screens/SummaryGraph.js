import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from 'react-native-table-component';
import constants, { IMAGES } from '../Resources/constants';
import { sendMail } from '../Mail/MailController';
import { takeSnapshotAsync } from 'expo';
import {
  AreaChart,
  LineChart,
  Grid,
  XAxis,
  YAxis,
  BarChart
} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import SideMenu from 'react-native-side-menu';
import ButtonSelector from '../MenuBar/ButtonSelector';
import { Dropdown } from 'react-native-material-dropdown';
import GestureRecognizer, {
  swipeDirections
} from 'react-native-swipe-gestures';
//AVG DURATION IN MINUTES
//-----------------------------FOR YEAR VIEW----------------------------------//
const januaryData = { avgFrequency: 25, avgIntensity: 5, avgDuration: 10 }; //averages over the course of only the month
const februaryData = { avgFrequency: 1, avgIntensity: 4, avgDuration: 10 };
const marchData = { avgFrequency: 3, avgIntensity: 2, avgDuration: 9 };
const aprilData = { avgFrequency: 25, avgIntensity: 4, avgDuration: 1 };
const mayData = { avgFrequency: 4, avgIntensity: 2, avgDuration: 4 };
const juneData = {};
const julyData = {};
const augustData = {};
const septemberData = {};
const octoberData = {};
const novemberData = {};
const decemberData = {};
const yearData = [
  januaryData,
  februaryData,
  marchData,
  aprilData,
  mayData,
  juneData,
  julyData,
  augustData,
  septemberData,
  octoberData,
  novemberData,
  decemberData
];
//----------------------------------------------------------------------------//

const monthInitials = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
];

const THREE_MONTH_VIEW = 'Three Months';
const SIX_MONTH_VIEW = 'Six Months';
const YEAR_VIEW = 'Year';
const VIEWS_DURATION_TRANSLATOR = {
  'Three Months': 3,
  'Six Months': 6,
  Year: 12
};

const MODES = ['Intensity', 'Frequency', 'Duration']; //types of graphs we support
const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

export default class SummaryGraph extends React.Component {
  constructor(props) {
    super(props);

    let DEFAULT_VIEW = YEAR_VIEW; //original duration to be displayed

    let currentMonth = new Date().getMonth();
    let w = Dimensions.get('window').width * 0.95;
    let xAxis = this._getMonthAndLabels(DEFAULT_VIEW, currentMonth);

    this.state = {
      width: w,
      yAxisType: MODES[1],
      xAxisData: xAxis.xAxisData,
      xAxisLabels: xAxis.xAxisLabels,
      isOpen: false,
      type: 'Headache',
      durationView: DEFAULT_VIEW,
      lastViewedMonth: 3
    };
  }

  /**
    Used when duration changes between three month, six month, and year view
    Pass in the constant that corresponds to the duration you want.
  */
  _updateMonthAndLabels(tempDurationView) {
    let xAxis = this._getMonthAndLabels(
      tempDurationView,
      this.state.lastViewedMonth
    );
    this.setState({
      durationView: tempDurationView,
      xAxisData: xAxis.xAxisData,
      xAxisLabels: xAxis.xAxisLabels
    });
  }

  /**
    Returns an object containing two arrays -- one for the xAxis data and the other
    with the x axis labels

    {

    xAxisData: _____
    xAxisLabels:____

    }
  */
  _getMonthAndLabels(durationView, endMonth) {
    let labels = [];
    let data = [];
    let data_length = 0;

    switch (durationView) {
      case THREE_MONTH_VIEW:
        data_length = 3;
        break;
      case SIX_MONTH_VIEW:
        data_length = 6;
        break;
      case YEAR_VIEW:
        data_length = 12;
        endMonth = 11;
        break;
    }

    let startMonth = endMonth + 1 - data_length;

    if (startMonth < 0) startMonth = 12 + startMonth;

    if (startMonth < endMonth) {
      for (var x = startMonth; x < endMonth + 1; x++) {
        data.push(yearData[x]);
        labels.push(monthInitials[x]);
      }
    } else {
      for (var x = startMonth; x < 12; x++) {
        data.push(yearData[x]);
        labels.push(monthInitials[x]);
      }
      for (var x = 0; x < endMonth + 1; x++) {
        data.push(yearData[x]);
        labels.push(monthInitials[x]);
      }
    }
    return {
      xAxisData: data,
      xAxisLabels: labels
    };
  }
  _renderPrevious() {
    console.log('rendering previous');
    let lastViewedMonth =
      this.state.lastViewedMonth -
      VIEWS_DURATION_TRANSLATOR[this.state.durationView];

    if (lastViewedMonth < 0) {
      lastViewedMonth = 12 + lastViewedMonth;
    }
    let xAxis = this._getMonthAndLabels(
      this.state.durationView,
      lastViewedMonth
    );
    this.setState({
      lastViewedMonth: lastViewedMonth,
      xAxisData: xAxis.xAxisData,
      xAxisLabels: xAxis.xAxisLabels
    });
  }

  _renderAfter() {
    let lastViewedMonth =
      this.state.lastViewedMonth +
      VIEWS_DURATION_TRANSLATOR[this.state.durationView];
    if (lastViewedMonth >= 12) {
      lastViewedMonth = lastViewedMonth - 12;
    }
    let xAxis = this._getMonthAndLabels(
      this.state.durationView,
      lastViewedMonth
    );
    this.setState({
      lastViewedMonth: lastViewedMonth,
      xAxisData: xAxis.xAxisData,
      xAxisLabels: xAxis.xAxisLabels
    });
  }
  _getColor(intensity, currentRGB) {
    var index = currentRGB.lastIndexOf(',');
    var firstHalf = currentRGB.slice(0, index + 1);
    let alpha = intensity / 5;
    return firstHalf + alpha + ')';
  }

  _formatData(data, baseRGB) {
    for (let x = 0; x < data.length; x++) {
      if (!data[x].avgIntensity) data[x].avgIntensity = 0;
      if (!data[x].avgDuration) data[x].avgDuration = 0;
      if (!data[x].avgFrequency) data[x].avgFrequency = 0;
      let color = this._getColor(data[x].avgIntensity, baseRGB);
      data[x].svg = { fill: color };
    }

    return data;
  }
  _renderXAxis() {
    let axis = [];
    let length = this.state.xAxisLabels.length;
    let w = this.state.width / length;

    for (var x = 0; x < length; x++) {
      axis.push(
        <View style={{ width: w, alignItems: 'center' }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
            {this.state.xAxisLabels[x]}
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          height: 50,
          flexDirection: 'row'
        }}
      >
        {axis}
      </View>
    );
  }
  _renderYAxis(minVal, maxVal, height) {
    //for simplicity, this function changes maxVal to be an even number (would be above the maxVal)
    //want a maximum of 10 labels on the screen at one time
    let interval = 1; //assume rendering every label (interval 1 means render everything)
    if (maxVal - minVal > 10) {
      //there are more than 10 labels, need to only render some of them
      interval = Math.round((maxVal - minVal) / 10.0);
    }
    let axis = [];
    let h = height;
    let length = maxVal - minVal;
    for (var x = maxVal; x > minVal; x = x - interval) {
      axis.push(
        <View
          style={{
            height: h / length * interval
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{x}</Text>
        </View>
      );
    }
    return (
      <View
        style={{
          height: height
        }}
      >
        {axis}
      </View>
    );
  }
  _getStats() {
    var total = 0;
    var length = this.state.xAxisData.length;
    var counter = 0; //number of occurances
    var mostFrequentMonth = []; //array of most frequent months
    var greatestFrequency = 0; //holds the greatest number of times the thing occurred
    var greatestIntensity = 0;
    var greatestDuration = 0;
    var avgLength = 0; // average duration

    for (var x = 0; x < length; x++) {
      let avgIntensity = this.state.xAxisData[x].avgIntensity;
      let avgFrequency = this.state.xAxisData[x].avgFrequency;
      let avgDuration = this.state.xAxisData[x].avgDuration;

      if (!avgFrequency) continue;

      counter += avgFrequency;
      if (avgIntensity) {
        total += avgIntensity * avgFrequency;
      }
      if (avgDuration) {
        avgLength += avgDuration * avgFrequency;
      }
      if (avgFrequency > greatestFrequency) {
        greatestFrequency = avgFrequency;
        mostFrequentMonth = [constants.MONTH[x]];
      } else if (avgFrequency == greatestFrequency) {
        mostFrequentMonth.push(constants.MONTH[x]);
      }

      if (avgDuration > greatestDuration) greatestDuration = avgDuration;
      if (avgIntensity > greatestIntensity) greatestIntensity = avgIntensity;
    }

    return {
      avgIntensity: Math.round(total / counter), //average intensity over the course of the entire dataset
      greatestIntensity: greatestIntensity,

      avgDuration: Math.round(avgLength / counter), //average duration over the entire dataset
      greatestDuration: greatestDuration,

      greatestFrequency: greatestFrequency,

      mostFrequentMonth: mostFrequentMonth
    };
  }
  async _exportScreen(body) {
    uri = await takeSnapshotAsync(this, {
      format: 'jpg',
      result: 'file'
    });
    sendMail(
      ['navinr13@gmail.com'],
      this.state.type + 'Frequency Information',
      'Exporting information from Jellyfiih',
      [uri],
      null
    );
  }

  render() {
    let dropDownModes = [
      { value: MODES[0] },
      { value: MODES[1] },
      { value: MODES[2] }
    ];
    let dropDownTime = [
      { value: THREE_MONTH_VIEW },
      { value: SIX_MONTH_VIEW },
      { value: YEAR_VIEW }
    ];
    const menu = (
      <View style={styles.menuWrapper}>
        <TouchableOpacity
          style={styles.exportButton}
          onPress={() => {
            this.setState({ isOpen: false }, () =>
              setTimeout(() => {
                this._exportScreen();
              }, 200)
            );
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Export Data</Text>
        </TouchableOpacity>
        <View style={{ padding: 10 }} />
        <Dropdown
          value={'Frequency'}
          label="Graph Type"
          data={dropDownModes}
          fontSize={15}
          selectedItemColor={'#56f769'}
          onChangeText={(value, index, data) =>
            this.setState({ yAxisType: value })
          }
        />
        <View style={{ padding: 10 }} />
        <Dropdown
          value={this.state.durationView}
          label="Duration"
          data={dropDownTime}
          fontSize={15}
          selectedItemColor={'#56f769'}
          onChangeText={(value, index, data) => {
            this._updateMonthAndLabels(value);
          }}
        />
      </View>
    );

    let formattedData = this._formatData(
      this.state.xAxisData,
      'rgba(0, 175, 255, 0)'
    );
    let stats = this._getStats();
    let xAxis = this._renderXAxis();
    let yAxis = this._renderYAxis(
      0,
      stats['greatest' + this.state.yAxisType],
      200
    );

    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.mainHeaderText}>
              {this.state.type} {' ' + this.state.yAxisType} 2018
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({ isOpen: true });
            }}
          >
            <View style={{ padding: 20 }}>
              <Image
                source={IMAGES.hamburgerMenu}
                style={{ width: 25, height: 25 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
            {yAxis}
            <View style={styles.container}>
              <GestureRecognizer
                onSwipeRight={state => this._renderPrevious()}
                onSwipeLeft={state => this._renderAfter()}
              >
                <BarChart
                  animate={true}
                  style={{ height: 200, width: this.state.width }}
                  data={formattedData}
                  yAccessor={item => {
                    return item.item['avg' + this.state.yAxisType];
                  }}
                  xAccessor={index => {
                    return monthInitials[index];
                  }}
                  contentInset={{ top: 0, bottom: 0 }}
                  gridMin={0}
                  spacingInner={0}
                />
              </GestureRecognizer>
              {xAxis}
              <View style={{ alignItems: 'center' }}>
                <Text>Insert Graph Title Here? Y Axis unit? </Text>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.subBodyView}>
              <Text style={styles.bodyText}>
                Average Headache Intensity:{'  '}
              </Text>
              <Text style={styles.bodySubText}>{stats.avgIntensity} / 5</Text>
            </View>
            <View style={styles.subBodyView}>
              <Text style={styles.bodyText}>Average Duration:{'  '}</Text>
              <Text style={styles.bodySubText}>
                {stats.avgDuration} minutes
              </Text>
            </View>
            <View style={{ padding: 20 }}>
              <Text style={styles.bodyText}>Greatest Frequency:{'  '}</Text>
              <Text style={styles.bodySubText}>
                {stats.mostFrequentMonth.map((month, index) => {
                  if (stats.mostFrequentMonth.length == 1) return month;
                  if (index == stats.mostFrequentMonth.length - 1)
                    return ' and ' + month;
                  if (index == stats.mostFrequentMonth.length - 2) return month;
                  return month + ', ';
                })}
              </Text>
            </View>
          </View>
        </View>
        <Modal
          backdropOpacity={0.3}
          onBackdropPress={() => this.setState({ isOpen: false })}
          isVisible={this.state.isOpen}
          style={styles.menu}
        >
          {menu}
        </Modal>
      </View>
    );
  }
}

styles = StyleSheet.create({
  exportButton: {
    height: 50,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aedfe1'
  },
  menu: {
    justifyContent: 'flex-end',
    margin: 0
  },
  menuWrapper: {
    width: window.width,
    height: window.height,
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 0.45
  },
  wrapper: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  container: {
    flex: 1
  },
  mainHeaderText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#000000'
  },
  header: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ead3ff',
    marginBottom: 10
  },
  subBodyView: {
    flexDirection: 'row',
    padding: 10
  },
  bodyText: {
    fontSize: 20,
    color: '#000000'
  },
  bodySubText: {
    fontSize: 20,
    color: '#3b2dff',
    alignSelf: 'center',
    flexWrap: 'wrap'
  },
  body: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  }
});
