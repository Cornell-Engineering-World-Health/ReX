import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  Modal
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
import { IMAGES } from '../Resources/constants';
import { sendMail } from '../Mail/MailController';
import { takeSnapshotAsync } from 'expo';
import {
  AreaChart,
  LineChart,
  Grid,
  XAxis,
  YAxis
} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
//pull from database the event types that have been recorded in the database
const types = ['Date', 'Notes'];

//pretend i get an intensity + frequency for all stuff

//Title to be associated with: Headache
const headacheData = [
  { intensity: '9', duration: '2 hours', date: '4-9-18' },
  { intensity: '1', duration: '2 hours', date: '4-9-18' },
  { intensity: '8', duration: '4 hours', date: '4-10-18' },
  { intensity: '7', duration: '7 hours', date: '4-11-18' },
  { intensity: '1', duration: '12 hours', date: '4-12-18' },
  { intensity: '3', duration: '1 hours', date: '4-14-18' },
  { intensity: '4', duration: '3 hours', date: '4-15-18' },
  { intensity: '6', duration: '4 hours', date: '4-16-18' },
  { intensity: '7', duration: '7 hours', date: '4-19-18' },
  { intensity: '2', duration: '9 hours', date: '4-20-18' },
  { intensity: '4', duration: '6 hours', date: '4-22-18' },
  { intensity: '10', duration: '2 hours', date: '4-23-18' },
  { intensity: '8', duration: '5 hours', date: '4-24-18' },
  { intensity: '2', duration: '8 hours', date: '4-25-18' }
];
const kneePainData = [
  { intensity: '1', duration: '2 hours', date: '4-9-18' },
  { intensity: '2', duration: '4 hours', date: '4-10-18' },
  { intensity: '3', duration: '7 hours', date: '4-11-18' },
  { intensity: '4', duration: '12 hours', date: '4-12-18' },
  { intensity: '5', duration: '1 hours', date: '4-14-18' },
  { intensity: '6', duration: '3 hours', date: '4-15-18' },
  { intensity: '7', duration: '4 hours', date: '4-16-18' },
  { intensity: '8', duration: '7 hours', date: '4-19-18' },
  { intensity: '9', duration: '9 hours', date: '4-20-18' },
  { intensity: '10', duration: '6 hours', date: '4-22-18' },
  { intensity: '9', duration: '2 hours', date: '4-23-18' },
  { intensity: '8', duration: '5 hours', date: '4-24-18' },
  { intensity: '7', duration: '8 hours', date: '4-25-18' }
];
const medicineData = [
  { date: '4-9-18', taken: '2', missed: '2' },
  { date: '4-10-18', taken: '10', missed: '0' },
  { date: '4-11-18', taken: '1', missed: '0' },
  { date: '4-12-18', taken: '6', missed: '6' },
  { date: '4-13-18', taken: '4', missed: '0' },
  { date: '4-14-18', taken: '8', missed: '2' },
  { date: '4-16-18', taken: '2', missed: '4' },
  { date: '4-17-18', taken: '7', missed: '9 ' },
  { date: '4-18-18', taken: '3', missed: '10' },
  { date: '4-19-18', taken: '2', missed: '2' },
  { date: '4-20-18', taken: '5', missed: '3' },
  { date: '4-24-18', taken: '7', missed: '1' },
  { date: '4-26-18', taken: '4', missed: '8' },
  { date: '4-29-18', taken: '1', missed: '7' }
];

const totalData = [headacheData, medicineData, kneePainData];
const totalHeaders = ['Headaches', 'Medicines', 'Knee Pain'];

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: totalHeaders[0],
      scrollViewWidth: 0,
      scrollViewHeight: 0,
      chart: ''
    };
    if (totalData.length > 0) {
      this.setState({ title: totalHeaders[0] });
    } else {
      this.setState({ title: 'No events logged!' });
    }
  }
  _getOpacity(intensity) {
    return intensity / 10;
  }

  //color is a string (IN RGBA NOTATION)
  _getColor(intensity, currentRGB) {
    var index = currentRGB.lastIndexOf(',');
    var firstHalf = currentRGB.slice(0, index + 1);
    let alpha = intensity / 10;
    return firstHalf + alpha + ')';
  }
  _renderElement(data, index, isDate) {
    dataExpansion = [];
    isMedicine = false; //by default, turns to true if the field taken is present
    if (isDate) {
      return (
        <View style={styles.dateColumn}>
          <Text style={styles.dateText}>{data.date}</Text>
        </View>
      );
    }
    if (data.intensity) {
      dataExpansion.push(
        <Text style={styles.btnText}>{'Intensity: ' + data.intensity}</Text>
      );
    }
    if (data.duration) {
      dataExpansion.push(
        <Text style={styles.btnText}>{'Duration: ' + data.duration}</Text>
      );
    }
    if (data.additionalNotes) {
      dataExpansion.push(
        <Text style={styles.btnText}>{'Notes: ' + data.additionalNotes}</Text>
      );
    }
    if (data.taken) {
      dataExpansion.push(
        <Text style={styles.btnText}>{'Taken: ' + data.taken}</Text>
        //THIS IS A MEDICINE VIEW so...
      );
      isMedicine = true;
    }
    if (data.missed) {
      dataExpansion.push(
        <Text style={styles.btnText}>{'Missed: ' + data.missed}</Text>
      );
      isMedicine = true;
    }

    boxColor = null;
    if (isMedicine) {
      missedColor = 'rgba(255, 165, 160, 1)';
      boxColor = 'rgba(160, 255, 164, 1)';
      if (data.missed > 0) {
        var miss = parseInt(data.missed);
        var taken = parseInt(data.taken);
        boxColor = this._getColor(miss / (miss + taken) * 10, missedColor);
      }
    } else {
      boxColor = this._getColor(data.intensity, 'rgba(0, 175, 255, 0)');
    }
    opac = this._getOpacity(data.intensity);

    return (
      <TouchableOpacity
        onPress={() => {
          console.log(index, 'index');
          console.log(data, 'data');
          this.setState({ modalID: 'chart' });
        }}
      >
        <View style={[styles.btn, { backgroundColor: boxColor }]}>
          {dataExpansion}
        </View>
      </TouchableOpacity>
    );
  }
  async _exportScreen() {
    uri = await takeSnapshotAsync(this, {
      format: 'jpg',
      result: 'file'
    });
    sendMail(
      ['navinr13@gmail.com'],
      this.state.title + ' Information',
      'Exporting information from Jellyfiih',
      [uri],
      null
    );
  }
  _renderHeader() {
    return (
      <View style={styles.header}>
        <View style={{ marginLeft: 20 }}>
          <Text style={styles.mainHeaderText}>{this.state.title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this._exportScreen();
          }}
        >
          <Image source={IMAGES.export} style={{ width: 50, height: 50 }} />
          <Text> Export </Text>
        </TouchableOpacity>
      </View>
    );
  }
  _getDate(d) {
    date = d.item.date;
    var num = date.indexOf('-');
    var endNum = date.lastIndexOf('-');
    return parseInt(date.substring(num + 1, endNum));
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this._renderHeader()}
        <Swiper
          bounces={true}
          loop={false}
          showsPagination={false}
          showButton={true}
          onIndexChanged={index =>
            this.setState({ title: totalHeaders[index] })
          }
        >
          {totalData.map((eventTypeData, index) => (
            <View style={styles.container}>
              <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row
                  data={types}
                  style={styles.head}
                  textStyle={styles.headerText}
                />
              </Table>
              <ScrollView
                onContentSizeChange={(width, height) => {
                  this.setState({
                    scrollViewWidth: width,
                    scrollViewHeight: height
                  });
                }}
              >
                {eventTypeData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    <Cell
                      key={index}
                      data={this._renderElement(rowData, index, true)}
                      textStyle={styles.text}
                    />
                    <Cell
                      key={index * -1}
                      data={this._renderElement(rowData, index, false)}
                      textStyle={styles.text}
                    />
                  </TableWrapper>
                ))}
              </ScrollView>
            </View>
          ))}
        </Swiper>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ marginTop: 10, fontSize: 25, textAlign: 'center' }}>
            Headaches
          </Text>
          <View style={{ flexDirection: 'row', padding: 20 }}>
            <YAxis
              min={0}
              max={10}
              data={totalData[0]}
              svg={{
                fill: 'grey',
                fontSize: 10
              }}
              contentInset={{ top: 10, bottom: 10 }}
              formatLabel={value => value}
              yAccessor={item => {
                return parseInt(item.item.intensity);
              }}
            />
            <View style={{ flex: 1 }}>
              <LineChart
                showGrid={true}
                gridMin={0}
                gridMax={10}
                animate={true}
                style={{ height: 200 }}
                data={totalData[0]}
                xAccessor={item => {
                  return this._getDate(item);
                }}
                yAccessor={item => {
                  return parseInt(item.item.intensity);
                }}
                contentInset={{ top: 10, bottom: 10 }}
                curve={shape.curveNatural}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
              />
              <XAxis
                style={{ marginHorizontal: -10 }}
                data={totalData[0]}
                svg={{
                  fill: 'grey',
                  fontSize: 10
                }}
                contentInset={{ top: 10, bottom: 10, left: 10 }}
                formatLabel={value => value}
                xAccessor={item => {
                  return this._getDate(item);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ead3ff'
  },
  mainHeaderText: {
    fontSize: 35,
    textAlign: 'center',
    color: '#000000'
  },
  dateColumn: {
    flex: 0.5,
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateText: {
    fontStyle: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000000'
  },
  container: { flex: 1, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#ffffff' },
  text: { fontSize: 23, textAlign: 'center' },
  headerText: {
    color: '#000000',
    fontSize: 25,
    textAlign: 'center'
  },
  row: { flexDirection: 'row', backgroundColor: '#ffffff' },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 2
  },
  btnText: { textAlign: 'left', color: '#000000', fontSize: 18 }
});
