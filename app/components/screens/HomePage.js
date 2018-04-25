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
import ButtonWithImage from '../Button/ButtonWithImage';
import Modal from 'react-native-modal';
import { IMAGES, profile_icons } from '../Resources/constants';
import constants from '../Resources/constants';
import { HomeMedicineLogger } from '../HomeMedicineLogger';
import {
  pullMedicineFromDatabase,
  pullSettingsFromDatabase
} from '../../databaseUtil/databaseUtil';
const MEDICINE_BUTTON_BACKGROUND_COLOR = '#ff99ff';
import styles from './styles';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: null,
      data: [],
      totalAmount: [0, 0, 0, 0],
      doneAmount: [0, 0, 0, 0],
      name: 'Navin'
    };

    //TODO: make one function that only pulls name from database
    pullSettingsFromDatabase(data => {
      this.setState({
        name: data.name,
        icon: data.icon
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
    let currentDate = new Date();

    let done = [];
    let remaining = [];
    for (let i = 0; i < this.state.doneAmount.length; i++) {
      done[i] =
        this.state.doneAmount[i] == this.state.totalAmount[i] ? true : false;
      remaining[i] = this.state.totalAmount[i] - this.state.doneAmount[i];
    }

    return (
      <ImageBackground
        style={{ flex: 1, backgroundColor: '#ffffff' }}
        source={IMAGES.darkBlueGradient2}
      >
        <View style={styles.pageContainer}>
          <View>
            <View style={styles.topInfo}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <View style={styles.header}>
                  <Text style={styles.welcomeText}>Welcome</Text>
                  <Text style={styles.nameText}>{this.state.name}</Text>
                </View>
                <View style={{ marginTop: 25, marginRight: 20 }}>
                  <Image
                    source={profile_icons[this.state.icon]}
                    style={{ width: 100, height: 100, resizeMode: 'contain' }}
                  />
                </View>
              </View>
              <View style={styles.subHeader}>
                <Text style={styles.subHeaderText}>
                  {constants.DAY[currentDate.getDay()]}
                </Text>
                <Text style={styles.subHeaderText}>
                  {constants.MONTH[currentDate.getMonth()]}{' '}
                  {currentDate.getDate()}
                </Text>
              </View>
            </View>
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
      </ImageBackground>
    );
  }
}
export default Home;
