import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated
} from 'react-native';
import Moment from 'moment';
import PillDesign from '../MedicineComponents/PillDesign';
import ButtonWithImage from '../Button/ButtonWithImage';
import MedicineCard from '../Card/MedicineCard';
import Modal from 'react-native-modal';
import constants from '../Resources/constants';
import { HomeMedicineLogger } from '../HomeMedicineLogger';
import {
  pullMedicineFromDatabase,
  pullSettingsFromDatabase
} from '../../databaseUtil/databaseUtil';
const MEDICINE_BUTTON_BACKGROUND_COLOR = '#ff99ff';
import styles from './styles';

const medicineMorning = [
  {
    key: 1,
    title: 'Tylenol',
    quantity: '2 pills',
    dosage: '400 mg',
    time: '6:00 PM',
    pillDesign: 'index1',
    note: 'Take after eating meal.',
    completed: false
  },
  {
    key: 2,
    title: 'Sharpies',
    quantity: '2 pens',
    dosage: '400 mg',
    time: '8:00 AM',
    note: 'Take on empty stomach.',
    pillDesign: 'index1',
    completed: false
  },
  {
    key: 10,
    title: 'Tylenol',
    quantity: '2 pills',
    dosage: '400 mg',
    time: '6:00 PM',
    pillDesign: 'index1',
    note: 'Take after eating meal.',
    completed: false
  },
  {
    key: 11,
    title: 'Sharpies',
    quantity: '2 pens',
    dosage: '400 mg',
    time: '8:00 AM',
    note: 'Take on empty stomach.',
    pillDesign: 'index1',
    completed: false
  }
];
const medicineAfternoon = [
  {
    key: 3,
    title: 'Tylenol',
    quantity: '2 pills',
    dosage: '400 mg',
    time: '6:00 PM',
    pillDesign: 'index1',
    note: 'Take after eating meal.',
    completed: false
  },
  {
    key: 4,
    title: 'Sharpies',
    quantity: '2 pens',
    time: '8:00 AM',
    note: 'Take on empty stomach.',
    pillDesign: 'index1',
    completed: false
  }
];
const medicineEvening = [
  {
    key: 5,
    title: 'Tylenol',
    quantity: '2 pills',
    dosage: '400 mg',
    time: '6:00 PM',
    pillDesign: 'index1',
    note: 'Take after eating meal.',
    completed: false
  },
  {
    key: 6,
    title: 'Sharpies',
    quantity: '2 pens',
    time: '8:00 AM',
    note: 'Take on empty stomach.',
    pillDesign: 'index1',
    completed: false
  }
];
const medicineNight = [
  {
    key: 5,
    title: 'Tylenol',
    quantity: '2 pills',
    dosage: '400 mg',
    time: '6:00 PM',
    pillDesign: 'index1',
    note: 'Take after eating meal.',
    completed: true
  },
  {
    key: 6,
    title: 'Sharpies',
    quantity: '2 pens',
    time: '8:00 AM',
    note: 'Take on empty stomach.',
    pillDesign: 'index1',
    completed: false
  }
];

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: null,
      morning: medicineMorning,
      afternoon: medicineAfternoon,
      evening: medicineEvening,
      night: medicineNight,
      data: [],
      totalAmount: [0, 0, 0, 0],
      doneAmount: [0, 0, 0, 0],
      name: 'Navin'
    };

    //TODO: make one function that only pulls name from database
    pullSettingsFromDatabase(data => {
      this.setState({
        name: data.name
      });
    });
  }

  componentWillMount() {
    let totalAmount = this.state.totalAmount;
    let doneAmount = this.state.doneAmount;
    let thisRef = this;
    pullMedicineFromDatabase(new Date('2018-04-17'), function(formattedData) {
      console.log('asdfa', formattedData);
      Object.keys(formattedData).forEach(function(med) {
        let i = 0;
        formattedData[med].timeCategory.forEach(function(time) {
          switch (time) {
            case 'Morning':
              totalAmount[0]++;
              if (formattedData[med].taken[i]) {
                doneAmount[0]++;
              }
              break;
            case 'Afternoon':
              totalAmount[1]++;
              if (formattedData[med].taken[i]) {
                doneAmount[1]++;
              }
              break;
            case 'Evening':
              totalAmount[2]++;
              if (formattedData[med].taken[i]) {
                doneAmount[2]++;
              }
              break;
            case 'Night':
              totalAmount[3]++;
              if (formattedData[med].taken[i]) {
                doneAmount[3]++;
              }
              break;
            default:
          }
        });
      });
      thisRef.setState({
        totalAmount: totalAmount,
        doneAmount: doneAmount,
        data: formattedData
      });
    });
  }

  //TODO: onclose, should save to storage.
  componentWillUnmount() {}

  _renderButtons() {
    /**
    checkMark = (
      <Image
        style={{ left: 20, bottom: 3, width: 100, height: 100, opacity: 1 }}
        source={IMAGES.checkMark}
      />
    );
    list = [checkMark, checkMark, checkMark, checkMark];
    medicineArray = [
      this.state.morning,
      this.state.afternoon,
      this.state.evening,
      this.state.night
    ];
    for (let y = 0; y < medicineArray.length; y++) {
      for (let x = 0; x < medicineArray[y].length; x++) {
        if (!medicineArray[y][x].completed) {
          list[y] = null;
          break;
        }
      }
    }
    return list;
    */
  }

  _handleMorningPress(index, complete) {}
  _handleAfternoonPress(index, complete) {
    afternoonArray = this.state.afternoon;
    afternoonArray[index].completed = complete;

    this.setState({
      afternoon: afternoonArray
    });
  }
  _handleEveningPress(index, complete) {
    eveningArray = this.state.evening;
    eveningArray[index].completed = complete;

    this.setState({
      evening: eveningArray
    });
  }
  _handleNightPress(index, complete) {
    nightArray = this.state.night;
    nightArray[index].completed = complete;

    this.setState({
      night: nightArray
    });
  }

  logAll(index) {
    doneAmount = this.state.doneAmount;
    if (doneAmount[index] == this.state.totalAmount[index]) {
      doneAmount[index] = 0;
    } else {
      doneAmount[index] = this.state.totalAmount[index];
    }
    this.setState({ doneAmount });
  }

  render() {
    let medicineCompletion = this._renderButtons();
    let currentDate = new Date();

    let done = [];
    let remaining = [];
    for (let i = 0; i < this.state.doneAmount.length; i++) {
      done[i] =
        this.state.doneAmount[i] == this.state.totalAmount[i] ? true : false;
      remaining[i] = this.state.totalAmount[i] - this.state.doneAmount[i];
    }

    return (
      <ImageBackground style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={styles.pageContainer}>
          <View>
            <View style={styles.topInfo}>
              <View style={styles.header}>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.nameText}>{this.state.name}</Text>
              </View>
              <View style={styles.subHeader}>
                <Text style={styles.subHeaderText}>
                  {weekdays[currentDate.getDay()]}
                </Text>
                <Text style={styles.subHeaderText}>
                  {months[currentDate.getMonth()]} {currentDate.getDate()}
                </Text>
              </View>
            </View>
            <View />
          </View>
          <View style={{ alignItems: 'center' }}>
            <HomeMedicineLogger
              done={done}
              onPress={button => {
                this._onPress(button);
              }}
              handlerMorning={() => this.logAll(0)}
              handlerAfternoon={() => this.logAll(1)}
              handlerEvening={() => this.logAll(2)}
              handlerNight={() => this.logAll(3)}
              amtArr={remaining}
            />
          </View>
        </View>
        <Modal
          onBackdropPress={() => this.setState({ modalVisible: null })}
          onSwipe={() => this.setState({ modalVisible: null })}
          swipeDirection={'down'}
          swipeThreshold={25}
          style={styles.medicineStyle}
          isVisible={this.state.modalVisible == 'afternoon'}
        >
          <View style={{ flex: 0.75 }}>
            <FlatList
              data={this.state.afternoon}
              extraData={this.state}
              renderItem={({ item, index }) => {
                return (
                  <MedicineCard
                    buttonActive={true}
                    swiperActive={item.completed}
                    title={item.title}
                    timeStamp={item.time}
                    note1={item.quantity + ' ' + item.dosage}
                    note2={item.note}
                    checked={item.completed}
                    onPress={() => this._handleAfternoonPress(index, true)}
                    buttonsRight={[
                      {
                        onPress: () => this._handleAfternoonPress(index, false),

                        text: 'Undo',
                        type: 'delete'
                      }
                    ]}
                  />
                );
              }}
            />
          </View>
        </Modal>
        <Modal
          onBackdropPress={() => this.setState({ modalVisible: null })}
          onSwipe={() => this.setState({ modalVisible: null })}
          swipeDirection={'down'}
          swipeThreshold={25}
          style={styles.medicineStyle}
          isVisible={this.state.modalVisible == 'morning'}
        >
          <View style={{ flex: 0.75 }}>
            <FlatList
              data={this.state.morning}
              extraData={this.state}
              renderItem={({ item, index }) => {
                return (
                  <MedicineCard
                    buttonActive={true}
                    swiperActive={item.completed}
                    title={item.title}
                    timeStamp={item.time}
                    note1={item.quantity + ' ' + item.dosage}
                    note2={item.note}
                    checked={item.completed}
                    onPress={() => this._handleMorningPress(index, true)}
                    buttonsRight={[
                      {
                        onPress: () => this._handleMorningPress(index, false),

                        text: 'Undo',
                        type: 'delete'
                      }
                    ]}
                  />
                );
              }}
            />
          </View>
        </Modal>
        <Modal
          onBackdropPress={() => this.setState({ modalVisible: null })}
          onSwipe={() => this.setState({ modalVisible: null })}
          swipeDirection={'down'}
          swipeThreshold={25}
          style={styles.medicineStyle}
          isVisible={this.state.modalVisible == 'evening'}
        >
          <View style={{ flex: 0.75 }}>
            <FlatList
              data={this.state.evening}
              extraData={this.state}
              renderItem={({ item, index }) => {
                return (
                  <MedicineCard
                    buttonActive={true}
                    title={item.title}
                    swiperActive={item.completed}
                    timeStamp={item.time}
                    note1={item.quantity + ' ' + item.dosage}
                    note2={item.note}
                    checked={item.completed}
                    onPress={() => this._handleEveningPress(index, true)}
                    buttonsRight={[
                      {
                        onPress: () => this._handleEveningPress(index, false),

                        text: 'Undo',
                        type: 'delete'
                      }
                    ]}
                  />
                );
              }}
            />
          </View>
        </Modal>
        <Modal
          onBackdropPress={() => this.setState({ modalVisible: null })}
          onSwipe={() => this.setState({ modalVisible: null })}
          swipeDirection={'down'}
          swipeThreshold={40}
          style={styles.medicineStyle}
          isVisible={this.state.modalVisible == 'night'}
        >
          <View style={{ flex: 0.75 }}>
            <FlatList
              data={this.state.night}
              extraData={this.state}
              renderItem={({ item, index }) => {
                return (
                  <MedicineCard
                    buttonActive={true}
                    title={item.title}
                    swiperActive={item.completed}
                    timeStamp={item.time}
                    note1={item.quantity + ' ' + item.dosage}
                    note2={item.note}
                    checked={item.completed}
                    onPress={() => this._handleNightPress(index, true)}
                    buttonsRight={[
                      {
                        onPress: () => this._handleNightPress(index, false),

                        text: 'Undo',
                        type: 'delete'
                      }
                    ]}
                  />
                );
              }}
            />
          </View>
        </Modal>
      </ImageBackground>
    );
  }
}
export default Home;
