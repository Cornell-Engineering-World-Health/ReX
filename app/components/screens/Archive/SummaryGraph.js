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
import { Dropdown } from 'react-native-material-dropdown';
import GestureRecognizer, {
  swipeDirections
} from 'react-native-swipe-gestures';

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

    let currentMonth = new Date().getMonth();
    let w = Dimensions.get('window').width * 0.95;

    this.state = {
      width: w,
      yAxisType: MODES[1], //frequency
      xAxisData: [], // need to change
      xAxisLabels: [], //need to change
      isOpen: false,
      type: 'Default',
      durationView: YEAR_VIEW, //start out in year view
      lastViewedMonth: 10
    };
  }

  /**
    Used when duration changes between three month, six month, and year view
    Pass in the constant that corresponds to the duration you want.
  */
  _updateMonthAndLabels(tempDurationView) {}

  /*
    Returns what the x axis labels should be given that the endIndex will be
    the the last element viewed in the graph. For example, given durationView = THREE_MONTH_VIEW,
    there are clearly only 3 x axis values. The values are in chronological order, the 2 months before
    and the month of the endIndex.

    Note: 0 < endIndex <  len(<duration-initials>)

    endIndex correspond to a valid index within an array of potential duration initials.
  */
  _getXAxisLabels(durationView, endIndex) {
    return monthInitials; //dummy data
  }

  /*
    Render the previous group of data. The new page will be based on what duration
    is being shown (3 month view, 6 month, year, etc). The previous group of data
    is the data up to but not including the first item of data that is
    *currently* being rendered.
  */
  _renderPrevious() {}

  /*
    Render the next group of data. The new page will be based on what duration
    is being shown (3 month view, 6 month, year, etc). The next group of data
    is the data after the *last* element currently being rendered.
  */
  _renderAfter() {}

  /*
  Given an intensity, and a base RBGA value, a color is rendered to reflect the
  intensity. The color given back is (intensity * 10) % opaque.

  0 < intensity <= 10
  */
  _getColor(intensity, currentRGB) {
    var index = currentRGB.lastIndexOf(',');
    var firstHalf = currentRGB.slice(0, index + 1);
    let alpha = intensity / 10;
    return firstHalf + alpha + ')';
  }

  _renderXAxis() {
    let axis = [];
    let length = this.state.xAxisLabels.length;
    let w = this.state.width / length;

    for (var x = 0; x < length; x++) {
      axis.push(
        <View key={x} style={{ width: w, alignItems: 'center' }}>
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

  /*
Build actual y axis that will be put next to the chart
*/
  _renderYAxis() {
    let axis = null; //change to render an actual axis
  }

  _handleMenuPress() {
    this.setState({ isOpen: false }, () =>
      setTimeout(() => {
        this._exportScreen();
      }, 200)
    );
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
          onPress={() => this._handleMenuPress()}
        >
          <Text style={{ fontSize: 20, fontWeight: '100' }}>Export Data</Text>
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

    let xAxis = this._renderXAxis();
    let yAxis = this._renderYAxis();

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
                {/*
                  obsolete, kept for reference. Uses the old formattedData object
                  for rendering the BarChart, while done properly should render differently

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
                />*/}
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
              <Text style={styles.bodySubText}>{stats.avgIntensity} / 10</Text>
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
