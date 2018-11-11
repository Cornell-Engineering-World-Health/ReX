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
import DropdownAlert from 'react-native-dropdownalert';
import ButtonWithImage from '../Button/ButtonWithImage';
import Modal from 'react-native-modal';
import { profile_icons } from '../Resources/constants';
import constants from '../Resources/constants';
import {IMAGES, COLOR} from '../Resources/constants';
import { HomeMedicineLogger } from '../HomeMedicineLogger';
import {
  pullMedicineFromDatabase,
  pullSettingsFromDatabase,
  databaseTakeMedicines
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
      originalDoneAmount: [0,0,0,0],
      name: "Navin",
      iconDropDown: IMAGES.afternoonColorW,
      backgroundColorDropDown: COLOR.cyan,
      message: 'You haven\'t had a headache in 5 days!'
    };
    //TODO: make one function that only pulls name from database
    pullSettingsFromDatabase((data) => {
        this.setState({
            name: data.name,
            icon: data.icon
        })
    })
    this.didRevert = [false, false, false, false]
  }

  componentWillMount() {
    let totalAmount = this.state.totalAmount;
    let doneAmount = this.state.doneAmount;
    let thisRef = this;
    pullMedicineFromDatabase(new Date(), function(formattedData){
      console.log("FORMATTED DATA ",formattedData)
      Object.keys(formattedData).forEach(function(med){
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
          i++;
        })
      })
      thisRef.setState({
        totalAmount: totalAmount,
        doneAmount: doneAmount,
        originalDoneAmount: doneAmount.slice(), //copy by value, not reference
        data: formattedData,
      })
    });
  }

  componentWillUnmount(){
    //console.log(this.state.doneAmount, this.state.originalDoneAmount, this.state.totalAmount)
    let done = this.state.doneAmount
    let o_done = this.state.originalDoneAmount
    let tot = this.state.totalAmount

    for(let i = 0; i < tot.length; i++){
      if(done[i] != o_done[i]){
        console.log('true', i)
        databaseTakeMedicines(new Date(), i, true)
      } else if(this.didRevert[i]){
        databaseTakeMedicines(new Date(), i, false)
        console.log('false', i)
      }
    }
  }


  logAll(index){
    let time
    let iconDropDown
    let backgroundColorDropDown
    let dropDownTitle = ''
    let dropDownMessage = ''


    switch(index){
      case 0: iconDropDown = IMAGES.morningColorW; backgroundColorDropDown = COLOR.red; time = 'morning'; break;
      case 2: iconDropDown = IMAGES.eveningColorW; backgroundColorDropDown = COLOR.purple; time = 'evening'; break;
      case 3: iconDropDown = IMAGES.nightColorW; backgroundColorDropDown = COLOR.blue; time = 'night'; break;
      default: iconDropDown = IMAGES.afternoonColorW; backgroundColorDropDown = COLOR.cyan; time = 'afternoon'
    }

    doneAmount = this.state.doneAmount
    dropDownTitle = time.charAt(0).toUpperCase() + time.substring(1) + ' Medications'
    if(this.state.originalDoneAmount[index] == this.state.totalAmount[index]){
      dropDownMessage = 'No '+time+' medications to be taken!'
    }else if(doneAmount[index] == this.state.totalAmount[index]){
      doneAmount[index] = this.state.originalDoneAmount[index];
      backgroundColorDropDown = COLOR.PrimaryGray
      dropDownTitle = 'Undo for '+time+' medications'
      dropDownMessage = 'Touch and hold to revert logs of ALL '+time+' medications.'
    } else {
      doneAmount[index] = this.state.totalAmount[index];
      dropDownMessage = 'All remaining '+time+' medications are taken!'
    }
    thisRef = this;
    this.setState({ doneAmount, iconDropDown, backgroundColorDropDown }, () => {this.dropdown.close(); this.dropdown.alertWithType('custom', dropDownTitle, dropDownMessage)})
  }

  revertAll(index){
    let time
    let iconDropDown
    let backgroundColorDropDown
    let dropDownTitle = ''
    let dropDownMessage = ''

    switch(index){
      case 0: iconDropDown = IMAGES.morningColorW; backgroundColorDropDown = COLOR.red; time = 'morning'; break;
      case 2: iconDropDown = IMAGES.eveningColorW; backgroundColorDropDown = COLOR.purple; time = 'evening'; break;
      case 3: iconDropDown = IMAGES.nightColorW; backgroundColorDropDown = COLOR.blue; time = 'night'; break;
      default: iconDropDown = IMAGES.afternoonColorW; backgroundColorDropDown = COLOR.cyan; time = 'afternoon'
    }
    let doneAmount = this.state.doneAmount
    let originalDoneAmount = this.state.originalDoneAmount
    dropDownTitle = time.charAt(0).toUpperCase() + time.substring(1) + ' Medications'
    if(this.state.totalAmount[index] == 0){
      dropDownMessage = 'No '+time+' medications are being tracked.'
    } else if(this.state.originalDoneAmount[index] == 0){
      dropDownMessage = 'No '+time+ ' medications to revert.'
    } else {
      doneAmount[index] = 0
      originalDoneAmount[index] = 0
      this.didRevert[index] = true;
      dropDownMessage = 'ALL '+time+' medications logs have been reverted!'
    }
    this.setState({ doneAmount, originalDoneAmount, iconDropDown, backgroundColorDropDown }, () => {this.dropdown.alertWithType('custom', dropDownTitle, dropDownMessage)})

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
      <ImageBackground style={{ flex: 1, backgroundColor: '#ffffff' }}>
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
              <View style={styles.middleMessage}>
                <Text style={styles.middleMessageText}>{this.state.message}</Text>
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
              handlerMorning={(isLongPress) => {if(!isLongPress){this.logAll(0)} else{this.revertAll(0)}}}
              handlerAfternoon={(isLongPress) => {if(!isLongPress){this.logAll(1)}else{this.revertAll(1)}}}
              handlerEvening={(isLongPress) => {if(!isLongPress){this.logAll(2)}else{this.revertAll(2)}}}
              handlerNight={(isLongPress) => {if(!isLongPress){this.logAll(3)}else{this.revertAll(3)}}}
              amtArr={remaining}
            />
          </View>
        </View>
        <DropdownAlert
          ref={ref => this.dropdown = ref}
          closeInterval={4000}
          imageSrc={this.state.iconDropDown}
          containerStyle={{
            backgroundColor: this.state.backgroundColorDropDown,
          }}
        />
      </ImageBackground>
    );
  }
}
export default Home;
