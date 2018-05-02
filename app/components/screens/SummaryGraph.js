import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  Modal,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
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

const januaryData = { frequency: 2, avgIntensity: 9 };
const februaryData = { frequency: 1, avgIntensity: 8 };
const marchData = { frequency: 3, avgIntensity: 4 };
const aprilData = { frequency: 10, avgIntensity: 5 };
const mayData = { frequency: 4, avgIntensity: 8 };
const juneData = { frequency: 10, avgIntensity: 5 };
const julyData = { frequency: 5, avgIntensity: 1 };
const augustData = { frequency: 10, avgIntensity: 3 };
const septemberData = { frequency: 9, avgIntensity: 5 };
const octoberData = { frequency: 1, avgIntensity: 8 };
const novemberData = { frequency: 3, avgIntensity: 9 };
const decemberData = { frequency: 5, avgIntensity: 9 };
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
const yearInitials = [
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
export default class SummaryGraph extends React.Component {
  constructor(props) {
    super(props);
    let w = Dimensions.get('window').width;
    this.state = {
      width: w,
      type: 'Headache',
      graphType: 'Frequency'
    };
  }
  _getColor(intensity, currentRGB) {
    var index = currentRGB.lastIndexOf(',');
    var firstHalf = currentRGB.slice(0, index + 1);
    let alpha = intensity / 10;
    return firstHalf + alpha + ')';
  }

  _formatData(data, baseRGB) {
    for (let x = 0; x < data.length; x++) {
      let color = this._getColor(data[x].avgIntensity, baseRGB);
      data[x].svg = { fill: color };
    }
    return data;
  }
  _renderXAxis(data) {
    let axis = [];
    let length = data.length;
    let w = this.state.width / length;
    for (var x = 0; x < length; x++) {
      axis.push(
        <View style={{ width: w }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{data[x]}</Text>
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
    let axis = [];
    let h = height;
    let length = maxVal - minVal;
    for (var x = maxVal; x > minVal; x--) {
      axis.push(
        <View style={{ height: h / length }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{x}</Text>
        </View>
      );
    }
    return (
      <View
        style={{
          height: height,
          flexDirection: 'column',
          marginBottom: height / length * 0.5
        }}
      >
        {axis}
      </View>
    );
  }
  _getStats() {
    var total = 0;
    var l = yearData.length;
    var counter = 0; //number of headahces
    var mostFrequentMonth = []; //array of most frequent months
    var highestFrequency = 0;
    for (var x = 0; x < l; x++) {
      let ai = yearData[x].avgIntensity;
      let f = yearData[x].frequency;

      total += ai * f;
      counter += f;
      if (f > highestFrequency) {
        highestFrequency = f;
        mostFrequentMonth = [constants.MONTH[x]];
      } else if (f == highestFrequency) {
        mostFrequentMonth.push(constants.MONTH[x]);
      }
    }

    return {
      avgIntensity: Math.round(total / counter),
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
      'Headache Frequency Information',
      'Exporting information from Jellyfiih',
      [uri],
      null
    );
  }

  render() {
    let formattedData = this._formatData(yearData, 'rgba(0, 175, 255, 0)');
    let xAxis = this._renderXAxis(yearInitials);
    let yAxis = this._renderYAxis(0, 10, 200);
    let stats = this._getStats();
    let body = (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
          {yAxis}
          <View style={styles.container}>
            <BarChart
              animate={true}
              style={{ height: 200, width: this.state.width }}
              data={formattedData}
              yAccessor={item => {
                return item.item.frequency;
              }}
              xAccessor={index => {
                return yearInitials[index];
              }}
              contentInset={{ top: 0, bottom: 0 }}
              gridMin={0}
              gridMax={10}
              spacingInner={0}
            />
            {xAxis}
          </View>
        </View>
        <View style={styles.body}>
          <View>
            <Text style={styles.bodyText}>
              The average headache intensity was...
            </Text>
            <Text style={styles.bodySubText}> {stats.avgIntensity} / 10</Text>
          </View>
          <View>
            <Text style={styles.bodyText}>
              Headaches happened most frequently in...
            </Text>
            <Text style={styles.bodySubText}>
              {stats.mostFrequentMonth.map((month, index) => {
                console.log(month);
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
    );

    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.mainHeaderText}>Headache Frequency 2018</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this._exportScreen(body);
            }}
          >
            <Image source={IMAGES.export} style={{ width: 25, height: 25 }} />
            <Text> Export </Text>
          </TouchableOpacity>
        </View>
        {body}
      </View>
    );
  }
}

styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  container: {
    flex: 1
  },
  mainHeaderText: {
    fontSize: 35,
    textAlign: 'center',
    color: '#000000'
  },
  header: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ead3ff',
    marginBottom: 10
  },
  title: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center'
  },
  bodyText: {
    fontSize: 20,
    color: '#000000',
    alignSelf: 'center'
  },
  bodySubText: {
    fontSize: 30,
    color: '#000000',
    alignSelf: 'center'
  },
  body: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-around'
  }
});
